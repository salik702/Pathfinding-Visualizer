import React, { useState, useEffect, useCallback, useRef } from 'react';
import Grid from './components/Grid';
import Controls from './components/Controls';
import StatsPanel from './components/StatsPanel';
import {
  getInitialGrid,
  getNewGridWithWallToggled,
  applyWeightBrush,
  WEIGHT_LEVELS,
  getNodesInShortestPathOrder,
  resetGridForAlgorithm,
  clearWallsFromGrid,
  clearWeightsFromGrid,
} from './utils/gridHelper';
import { calculatePathCost } from './algorithms/utils';
import { dijkstra } from './algorithms/dijkstra';
import { bfs } from './algorithms/bfs';
import { astar } from './algorithms/astar';
import { ShieldCheck, Boxes } from 'lucide-react';

const START_NODE_ROW = 8;
const START_NODE_COL = 7;
const FINISH_NODE_ROW = 8;
const FINISH_NODE_COL = 25;

const defaultStats = () => ({
  visitedCount: 0,
  pathLength: 0,
  pathCost: 0,
  executionTime: 0,
});

const App = () => {
  const [grid, setGrid] = useState([]);
  const [grid2, setGrid2] = useState([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);
  const [startNodePos, setStartNodePos] = useState({ row: START_NODE_ROW, col: START_NODE_COL });
  const [endNodePos, setEndNodePos] = useState({ row: FINISH_NODE_ROW, col: FINISH_NODE_COL });

  const [speed, setSpeed] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [activeAlgo, setActiveAlgo] = useState(null);
  const [comparisonAlgos, setComparisonAlgos] = useState({ alpha: null, beta: null });
  const [editMode, setEditMode] = useState('wall');
  const [weightBrush, setWeightBrush] = useState(WEIGHT_LEVELS[0]);
  const weightStrokeRef = useRef(new Set());

  const [stats, setStats] = useState(defaultStats());
  const [stats2, setStats2] = useState(defaultStats());

  useEffect(() => {
    const initialGrid = getInitialGrid(startNodePos, endNodePos);
    setGrid(initialGrid);
    setGrid2(structuredClone(initialGrid));
  }, []);

  useEffect(() => {
    const endStroke = () => {
      setMouseIsPressed(false);
      setIsDraggingStart(false);
      setIsDraggingEnd(false);
      weightStrokeRef.current = new Set();
    };
    window.addEventListener('mouseup', endStroke);
    return () => window.removeEventListener('mouseup', endStroke);
  }, []);

  const applyToGrids = useCallback(
    (updater) => {
      setGrid((prev) => updater(prev));
      if (comparisonMode) {
        setGrid2((prev) => updater(prev));
      }
    },
    [comparisonMode]
  );

  const isBlockedCell = useCallback(
    (row, col) =>
      (row === startNodePos.row && col === startNodePos.col) ||
      (row === endNodePos.row && col === endNodePos.col),
    [startNodePos, endNodePos]
  );

  const toggleWall = useCallback(
    (row, col) => {
      if (isRunning || isBlockedCell(row, col)) return;
      const updater = (prev) => getNewGridWithWallToggled(prev, row, col);
      setGrid(updater);
      if (comparisonMode) setGrid2(updater);
    },
    [isRunning, isBlockedCell, comparisonMode]
  );

  const paintWeight = useCallback(
    (row, col, { toggleOffIfSame = false } = {}) => {
      if (isRunning || isBlockedCell(row, col)) return;
      const updater = (prev) =>
        applyWeightBrush(prev, row, col, weightBrush, { toggleOffIfSame });
      setGrid(updater);
      if (comparisonMode) setGrid2(updater);
    },
    [isRunning, isBlockedCell, comparisonMode, weightBrush]
  );

  const handleWeightMouseDown = useCallback(
    (row, col) => {
      if (isRunning || isBlockedCell(row, col)) return;

      weightStrokeRef.current = new Set();
      weightStrokeRef.current.add(`${row}-${col}`);

      const applyWithToggle = (prev) => {
        const node = prev[row]?.[col];
        const toggleOff =
          weightBrush > 1 && node?.isWeight && node?.weight === weightBrush;
        return applyWeightBrush(prev, row, col, weightBrush, { toggleOffIfSame: toggleOff });
      };

      setGrid(applyWithToggle);
      if (comparisonMode) setGrid2(applyWithToggle);
    },
    [isRunning, isBlockedCell, comparisonMode, weightBrush]
  );

  const handleWeightMouseEnter = useCallback(
    (row, col) => {
      const key = `${row}-${col}`;
      if (weightStrokeRef.current.has(key)) return;
      weightStrokeRef.current.add(key);
      paintWeight(row, col, { toggleOffIfSame: false });
    },
    [paintWeight]
  );

  const handleMouseDown = (row, col) => {
    if (isRunning) return;

    if (row === startNodePos.row && col === startNodePos.col) {
      setIsDraggingStart(true);
    } else if (row === endNodePos.row && col === endNodePos.col) {
      setIsDraggingEnd(true);
    } else if (editMode === 'weight') {
      handleWeightMouseDown(row, col);
    } else {
      toggleWall(row, col);
    }
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || isRunning) return;

    if (isDraggingStart) {
      if (row === endNodePos.row && col === endNodePos.col) return;

      const updateStart = (g) =>
        g.map((r) =>
          r.map((n) => ({
            ...n,
            isStart: n.row === row && n.col === col,
            isEnd: n.row === endNodePos.row && n.col === endNodePos.col,
            isVisited: false,
            isPath: false,
            isWall: n.row === row && n.col === col ? false : n.isWall,
          }))
        );

      applyToGrids(updateStart);
      setStartNodePos({ row, col });
    } else if (isDraggingEnd) {
      if (row === startNodePos.row && col === startNodePos.col) return;

      const updateEnd = (g) =>
        g.map((r) =>
          r.map((n) => ({
            ...n,
            isEnd: n.row === row && n.col === col,
            isStart: n.row === startNodePos.row && n.col === startNodePos.col,
            isVisited: false,
            isPath: false,
            isWall: n.row === row && n.col === col ? false : n.isWall,
          }))
        );

      applyToGrids(updateEnd);
      setEndNodePos({ row, col });
    } else if (editMode === 'weight') {
      handleWeightMouseEnter(row, col);
    } else {
      toggleWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setIsDraggingStart(false);
    setIsDraggingEnd(false);
    weightStrokeRef.current = new Set();
  };

  const updateGridCell = (setter, row, col, patch) => {
    setter((prevGrid) => {
      const newGrid = prevGrid.map((r) => r.slice());
      newGrid[row][col] = { ...newGrid[row][col], ...patch };
      return newGrid;
    });
  };

  const animateAlgorithm = (visitedNodesInOrder, pathNodes, pathCost, isGrid2 = false) => {
    const setter = isGrid2 ? setGrid2 : setGrid;
    const statsSetter = isGrid2 ? setStats2 : setStats;

    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(pathNodes, pathCost, isGrid2);
        }, speed * i);
        return;
      }

      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        updateGridCell(setter, node.row, node.col, { isVisited: true });
        statsSetter((prev) => ({ ...prev, visitedCount: i + 1 }));
      }, speed * i);
    }
  };

  const animateShortestPath = (pathNodes, pathCost, isGrid2 = false) => {
    const setter = isGrid2 ? setGrid2 : setGrid;
    const statsSetter = isGrid2 ? setStats2 : setStats;

    for (let i = 0; i < pathNodes.length; i++) {
      setTimeout(() => {
        const node = pathNodes[i];
        updateGridCell(setter, node.row, node.col, { isPath: true });
        statsSetter((prev) => ({
          ...prev,
          pathLength: i + 1,
          pathCost,
        }));

        if (i === pathNodes.length - 1) {
          if (!comparisonMode || isGrid2) {
            setIsRunning(false);
            setActiveAlgo(null);
          }
        }
      }, 50 * i);
    }
  };

  const runAlgoLogic = (algoType, targetGrid, endPos) => {
    const start = targetGrid[startNodePos.row][startNodePos.col];
    const end = targetGrid[endPos.row][endPos.col];
    const t0 = performance.now();

    let visitedNodes = [];
    if (algoType === 'dijkstra') visitedNodes = dijkstra(targetGrid, start, end);
    else if (algoType === 'bfs') visitedNodes = bfs(targetGrid, start, end);
    else if (algoType === 'astar') visitedNodes = astar(targetGrid, start, end);

    const pathNodes = getNodesInShortestPathOrder(end);
    const pathCost = calculatePathCost(pathNodes);
    const reachedGoal = pathNodes.length > 0 && pathNodes[0] === start;

    return {
      visitedNodes,
      pathNodes: reachedGoal ? pathNodes : [],
      pathCost: reachedGoal ? pathCost : 0,
      stats: {
        executionTime: (performance.now() - t0).toFixed(2),
        pathCost: reachedGoal ? pathCost : 0,
        pathLength: reachedGoal ? pathNodes.length : 0,
      },
    };
  };

  const runAlgorithm = (algoType, algoType2 = null) => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveAlgo(algoType);

    const cleanGrid = resetGridForAlgorithm(grid);
    setGrid(cleanGrid);
    setStats({ ...defaultStats(), executionTime: 0 });

    if (comparisonMode && algoType2) {
      setComparisonAlgos({ alpha: algoType, beta: algoType2 });
      const cleanGrid2 = resetGridForAlgorithm(grid2);
      setGrid2(cleanGrid2);
      setStats2({ ...defaultStats(), executionTime: 0 });

      const res1 = runAlgoLogic(algoType, cleanGrid, endNodePos);
      const res2 = runAlgoLogic(algoType2, cleanGrid2, endNodePos);

      setStats((prev) => ({ ...prev, executionTime: res1.stats.executionTime }));
      setStats2((prev) => ({ ...prev, executionTime: res2.stats.executionTime }));

      animateAlgorithm(res1.visitedNodes, res1.pathNodes, res1.pathCost, false);
      animateAlgorithm(res2.visitedNodes, res2.pathNodes, res2.pathCost, true);
    } else {
      const result = runAlgoLogic(algoType, cleanGrid, endNodePos);
      setStats((prev) => ({ ...prev, executionTime: result.stats.executionTime }));
      animateAlgorithm(result.visitedNodes, result.pathNodes, result.pathCost, false);
    }
  };

  const resetGrid = () => {
    const start = { row: START_NODE_ROW, col: START_NODE_COL };
    const end = { row: FINISH_NODE_ROW, col: FINISH_NODE_COL };
    const initial = getInitialGrid(start, end);
    setGrid(initial);
    setGrid2(structuredClone(initial));
    setStartNodePos(start);
    setEndNodePos(end);
    setStats(defaultStats());
    setStats2(defaultStats());
    setIsRunning(false);
    setActiveAlgo(null);
  };

  const clearWalls = () => {
    applyToGrids(clearWallsFromGrid);
  };

  const clearWeights = () => {
    applyToGrids(clearWeightsFromGrid);
  };

  const generateMaze = () => {
    const buildMaze = (g) =>
      g.map((r) =>
        r.map((n) => {
          const becomesWall = Math.random() < 0.3 && !n.isStart && !n.isEnd;
          return {
            ...n,
            isWall: becomesWall,
            isWeight: becomesWall ? false : n.isWeight,
            weight: becomesWall ? 1 : n.weight,
            isVisited: false,
            isPath: false,
          };
        })
      );

    setGrid((prev) => buildMaze(prev));
    if (comparisonMode) {
      setGrid2((prev) => buildMaze(prev));
    }
  };

  return (
    <div className="app-container">
      <header className="header glass">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Boxes size={32} color="var(--accent-primary)" />
          <h1>
            Smart Pathfinding <span style={{ color: 'var(--accent-primary)' }}>Visualizer</span>
          </h1>
        </div>

        <div className="header-controls">
          <div style={{ display: 'flex', gap: '1.5rem', marginRight: '2rem' }}>
            <div className="legend-item">
              <div className="legend-swatch legend-start" />
              START
            </div>
            <div className="legend-item">
              <div className="legend-swatch legend-end" />
              TARGET
            </div>
            <div className="legend-item">
              <div className="legend-swatch legend-wall" />
              OBSTACLE
            </div>
            <div className="legend-item">
              <div className="legend-swatch legend-weight" />
              WEIGHTED
            </div>
          </div>
          <button
            className={`btn-futuro ${comparisonMode ? 'active' : ''}`}
            onClick={() => setComparisonMode(!comparisonMode)}
            disabled={isRunning}
            style={{ width: '200px' }}
          >
            <ShieldCheck size={18} />
            {comparisonMode ? 'Dual Grid Active' : 'Enable Dual Comparison'}
          </button>
        </div>
      </header>

      <main className="main-content">
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Controls
            onRunBfs={() => runAlgorithm('bfs', comparisonMode ? 'dijkstra' : null)}
            onRunDijkstra={() => runAlgorithm('dijkstra', comparisonMode ? 'astar' : null)}
            onRunAstar={() => runAlgorithm('astar', comparisonMode ? 'bfs' : null)}
            onReset={resetGrid}
            onClearWalls={clearWalls}
            onClearWeights={clearWeights}
            onGenerateMaze={generateMaze}
            speed={speed}
            setSpeed={setSpeed}
            isRunning={isRunning}
            activeAlgo={activeAlgo}
            editMode={editMode}
            setEditMode={setEditMode}
            weightBrush={weightBrush}
            setWeightBrush={setWeightBrush}
          />
        </aside>

        <section className="grid-viewport">
          <div className={`grid-wrapper glass ${editMode === 'weight' ? 'edit-weight' : 'edit-wall'}`}>
            {comparisonMode ? (
              <div className="comparison-grid-layout">
                <div style={{ position: 'relative' }}>
                  <span className="grid-label">ALGORITHM ALPHA</span>
                  <Grid
                    grid={grid}
                    editMode={editMode}
                    isRunning={isRunning}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseUp={handleMouseUp}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <span className="grid-label">ALGORITHM BETA</span>
                  <Grid
                    grid={grid2}
                    editMode={editMode}
                    isRunning={isRunning}
                    onMouseDown={() => {}}
                    onMouseEnter={() => {}}
                    onMouseUp={() => {}}
                  />
                </div>
              </div>
            ) : (
              <Grid
                grid={grid}
                editMode={editMode}
                isRunning={isRunning}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            )}
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <div style={{ flex: 1 }}>
              <StatsPanel
                {...stats}
                activeAlgo={comparisonMode ? comparisonAlgos.alpha : activeAlgo}
                title={comparisonMode ? 'Alpha Performance' : 'Performance Metrics'}
              />
            </div>
            {comparisonMode && (
              <div style={{ flex: 1 }}>
                <StatsPanel
                  {...stats2}
                  activeAlgo={comparisonAlgos.beta}
                  title="Beta Performance"
                />
              </div>
            )}
          </div>
        </section>
      </main>

      <footer style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
        SYSTEM STATUS:{' '}
        <span style={{ color: isRunning ? '#f59e0b' : '#10b981' }}>
          {isRunning ? 'PROCESSING ALGORITHM...' : 'STANDBY - READY FOR INPUT'}
        </span>{' '}
        • DAA SEMESTER PROJECT 2026
      </footer>
    </div>
  );
};

export default App;
