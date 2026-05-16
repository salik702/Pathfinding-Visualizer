/**
 * BFS — unweighted shortest path by number of steps (hops).
 * Ignores node weights entirely; each edge costs exactly 1 move.
 */

function getBfsNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  // DOWN → RIGHT → UP → LEFT (tie-break when multiple equal-hop paths exist)
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  return neighbors;
}

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const queue = [startNode];
  startNode.isVisited = true;

  while (queue.length > 0) {
    const currentNode = queue.shift();
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;

    for (const neighbor of getBfsNeighbors(currentNode, grid)) {
      if (!neighbor.isVisited && !neighbor.isWall) {
        neighbor.isVisited = true;
        neighbor.previousNode = currentNode;
        queue.push(neighbor);
      }
    }
  }

  return visitedNodesInOrder;
}
