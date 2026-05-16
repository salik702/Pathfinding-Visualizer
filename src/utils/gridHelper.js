export const ROWS = 20;
export const COLS = 32;

export const WEIGHT_LEVELS = [5, 10];

export const createNode = (col, row, startNode, endNode) => {
  return {
    col,
    row,
    isStart: row === startNode.row && col === startNode.col,
    isEnd: row === endNode.row && col === endNode.col,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isWeight: false,
    weight: 1,
    previousNode: null,
    totalDistance: Infinity,
    heuristic: 0,
  };
};

export const getInitialGrid = (startNode, endNode) => {
  const grid = [];
  for (let row = 0; row < ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < COLS; col++) {
      currentRow.push(createNode(col, row, startNode, endNode));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.map((r) => r.slice());
  const node = newGrid[row][col];
  const willBeWall = !node.isWall;
  newGrid[row][col] = {
    ...node,
    isWall: willBeWall,
    isWeight: false,
    weight: 1,
  };
  return newGrid;
};

/**
 * Apply a weight brush to a cell.
 * @param {number} brush - 5, 10, or 1 to clear
 * @param {{ toggleOffIfSame?: boolean }} options - click same weight again to clear
 */
export const applyWeightBrush = (grid, row, col, brush, { toggleOffIfSame = false } = {}) => {
  const newGrid = grid.map((r) => r.slice());
  const node = newGrid[row][col];
  const clear = brush <= 1;
  const sameWeighted = node.isWeight && node.weight === brush;

  if (clear || (toggleOffIfSame && sameWeighted)) {
    newGrid[row][col] = {
      ...node,
      isWeight: false,
      weight: 1,
      isWall: false,
    };
  } else {
    newGrid[row][col] = {
      ...node,
      isWeight: true,
      weight: brush,
      isWall: false,
    };
  }
  return newGrid;
};

/** Cost to enter a cell during weighted search (always ≥ 1). */
export const getTraversalCost = (node) => (node.isWeight ? node.weight : 1);

export const getNodesInShortestPathOrder = (finishNode) => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

/** Deep-clone grid rows and reset algorithm state while preserving walls/weights. */
export const resetGridForAlgorithm = (grid) => {
  return grid.map((row) =>
    row.map((node) => ({
      ...node,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      totalDistance: Infinity,
      heuristic: 0,
      previousNode: null,
    }))
  );
};

export const clearWallsFromGrid = (grid) =>
  grid.map((row) =>
    row.map((node) => ({
      ...node,
      isWall: false,
    }))
  );

export const clearWeightsFromGrid = (grid) =>
  grid.map((row) =>
    row.map((node) => ({
      ...node,
      isWeight: false,
      weight: 1,
    }))
  );
