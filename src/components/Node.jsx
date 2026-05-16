import React from 'react';

const Node = ({
  col,
  isEnd,
  isStart,
  isWall,
  isWeight,
  weight,
  isVisited,
  isPath,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  row,
}) => {
  const classNames = ['node'];

  if (isStart) classNames.push('node-start');
  if (isEnd) classNames.push('node-end');
  if (isWall) classNames.push('node-wall');
  if (isWeight) classNames.push('node-weight', `node-weight-${weight}`);
  if (isVisited) classNames.push('node-visited');
  if (isPath) classNames.push('node-path');

  return (
    <div
      id={`node-${row}-${col}`}
      className={classNames.join(' ')}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      data-weight={isWeight ? weight : undefined}
    >
      {isWeight && !isStart && !isEnd && !isWall && (
        <span className="node-weight-label">{weight}</span>
      )}
    </div>
  );
};

export default Node;
