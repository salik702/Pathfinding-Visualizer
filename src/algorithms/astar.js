/**
 * A* Search — f(n) = g(n) + h(n)
 * g(n) = actual weighted cost from start, h(n) = Manhattan distance to goal.
 */

import { MinHeap, manhattanDistance } from './utils';
import { getTraversalCost } from '../utils/gridHelper';

function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}

export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  startNode.heuristic = manhattanDistance(startNode, finishNode);
  startNode.totalDistance = startNode.heuristic;

  const heap = new MinHeap((a, b) => {
    if (a.totalDistance !== b.totalDistance) return a.totalDistance - b.totalDistance;
    return b.heuristic - a.heuristic;
  });
  heap.push(startNode);

  while (!heap.isEmpty()) {
    const currentNode = heap.pop();

    if (currentNode.isVisited) continue;
    if (currentNode.isWall) continue;
    if (currentNode.distance === Infinity) break;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;

    for (const neighbor of getNeighbors(currentNode, grid)) {
      if (neighbor.isWall || neighbor.isVisited) continue;

      const tentativeG = currentNode.distance + getTraversalCost(neighbor);
      if (tentativeG < neighbor.distance) {
        neighbor.distance = tentativeG;
        neighbor.heuristic = manhattanDistance(neighbor, finishNode);
        neighbor.totalDistance = neighbor.distance + neighbor.heuristic;
        neighbor.previousNode = currentNode;
        heap.push(neighbor);
      }
    }
  }

  return visitedNodesInOrder;
}
