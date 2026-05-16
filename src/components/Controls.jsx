import React from 'react';
import {
  Zap,
  RotateCcw,
  Trash2,
  Dna,
  Cpu,
  Layers,
  Gauge,
  ChevronRight,
  Scale,
} from 'lucide-react';

const Controls = ({
  onRunBfs,
  onRunDijkstra,
  onRunAstar,
  onReset,
  onClearWalls,
  onClearWeights,
  onGenerateMaze,
  speed,
  setSpeed,
  isRunning,
  activeAlgo,
  editMode,
  setEditMode,
  weightBrush,
  setWeightBrush,
}) => {
  return (
    <div className="control-sidebar">
      <div className="panel-card glass">
        <div className="panel-title">
          <Trash2 size={16} />
          Edit Mode
        </div>
        <p className="edit-mode-hint">
          {editMode === 'weight'
            ? 'Pick a cost brush, then click or drag on cells. Dijkstra & A* avoid high-cost tiles; BFS ignores weights.'
            : 'Click and drag to place or remove walls'}
        </p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className={`btn-futuro ${editMode === 'wall' ? 'active' : ''}`}
            onClick={() => setEditMode('wall')}
            disabled={isRunning}
            style={{ flex: 1 }}
          >
            Walls
          </button>
          <button
            className={`btn-futuro ${editMode === 'weight' ? 'active' : ''}`}
            onClick={() => setEditMode('weight')}
            disabled={isRunning}
            style={{ flex: 1 }}
          >
            <Scale size={16} /> Weights
          </button>
        </div>
        {editMode === 'weight' && (
          <div className="weight-brush-group">
            <button
              type="button"
              className={`btn-futuro weight-brush-btn ${weightBrush === 5 ? 'active' : ''}`}
              onClick={() => setWeightBrush(5)}
              disabled={isRunning}
            >
              Cost 5
            </button>
            <button
              type="button"
              className={`btn-futuro weight-brush-btn ${weightBrush === 10 ? 'active' : ''}`}
              onClick={() => setWeightBrush(10)}
              disabled={isRunning}
            >
              Cost 10
            </button>
            <button
              type="button"
              className={`btn-futuro weight-brush-btn ${weightBrush === 1 ? 'active' : ''}`}
              onClick={() => setWeightBrush(1)}
              disabled={isRunning}
            >
              Eraser
            </button>
          </div>
        )}
      </div>

      <div className="panel-card glass">
        <div className="panel-title">
          <Cpu size={16} />
          Select Algorithm
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            className={`btn-futuro ${activeAlgo === 'dijkstra' ? 'active' : ''}`}
            onClick={onRunDijkstra}
            disabled={isRunning}
          >
            <Zap size={18} /> Dijkstra&apos;s
            <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
          </button>
          <button
            className={`btn-futuro ${activeAlgo === 'astar' ? 'active' : ''}`}
            onClick={onRunAstar}
            disabled={isRunning}
          >
            <Layers size={18} /> A* Search
            <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
          </button>
          <button
            className={`btn-futuro ${activeAlgo === 'bfs' ? 'active' : ''}`}
            onClick={onRunBfs}
            disabled={isRunning}
          >
            <Dna size={18} /> BFS Path
            <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
          </button>
        </div>
      </div>

      <div className="panel-card glass">
        <div className="panel-title">
          <Gauge size={16} />
          Simulation Speed
        </div>
        <div className="speed-hud">
          <input
            type="range"
            min="1"
            max="50"
            value={51 - speed}
            onChange={(e) => setSpeed(51 - parseInt(e.target.value, 10))}
            disabled={isRunning}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
            }}
          >
            <span>SLOW</span>
            <span style={{ color: 'var(--accent-primary)' }}>{51 - speed}x SPEED</span>
            <span>FAST</span>
          </div>
        </div>
      </div>

      <div className="panel-card glass" style={{ marginTop: 'auto' }}>
        <div className="panel-title">
          <Trash2 size={16} />
          Workspace Actions
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button className="btn-futuro" onClick={onGenerateMaze} disabled={isRunning}>
            <Layers size={18} /> Generate Maze
          </button>
          <button className="btn-futuro" onClick={onClearWalls} disabled={isRunning}>
            <Trash2 size={18} /> Clear Walls
          </button>
          <button className="btn-futuro" onClick={onClearWeights} disabled={isRunning}>
            <Scale size={18} /> Clear Weights
          </button>
          <button
            className="btn-futuro"
            onClick={onReset}
            disabled={isRunning}
            style={{ borderColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}
          >
            <RotateCcw size={18} /> Factory Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
