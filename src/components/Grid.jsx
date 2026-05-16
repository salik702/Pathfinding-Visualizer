import React, { useRef, useState, useEffect } from 'react';
import Node from './Node';
import { COLS, ROWS } from '../utils/gridHelper';

const GRID_GAP = 3;
const GRID_PADDING = 20;
const MIN_CELL = 18;
const MAX_CELL = 34;

const Grid = ({ grid, onMouseDown, onMouseEnter, onMouseUp }) => {
  const hostRef = useRef(null);
  const [cellSize, setCellSize] = useState(28);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const updateSize = () => {
      const { width, height } = el.getBoundingClientRect();
      const availableW = width - GRID_PADDING;
      const availableH = height - GRID_PADDING;
      const fromW = (availableW - (COLS - 1) * GRID_GAP) / COLS;
      const fromH = (availableH - (ROWS - 1) * GRID_GAP) / ROWS;
      const fitted = Math.floor(Math.min(fromW, fromH));
      setCellSize(Math.min(MAX_CELL, Math.max(MIN_CELL, fitted)));
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="grid-sizing-host">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`,
          gridAutoRows: `${cellSize}px`,
          gap: `${GRID_GAP}px`,
        }}
      >
        {grid.map((row, rowIdx) => {
          return (
            <React.Fragment key={rowIdx}>
              {row.map((node) => {
                const { row, col, isStart, isEnd, isWall, isVisited, isPath } = node;
                return (
                  <Node
                    key={`${row}-${col}`}
                    col={col}
                    isEnd={isEnd}
                    isStart={isStart}
                    isWall={isWall}
                    isWeight={node.isWeight}
                    weight={node.weight}
                    isVisited={isVisited}
                    isPath={isPath}
                    onMouseDown={(row, col) => onMouseDown(row, col)}
                    onMouseEnter={(row, col) => onMouseEnter(row, col)}
                    onMouseUp={() => onMouseUp()}
                    row={row}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
