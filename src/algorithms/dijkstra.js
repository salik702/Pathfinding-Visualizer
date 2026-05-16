/**
 * Dijkstra's algorithm — minimum total cost path using node weights.
 * Uses a min-heap ordered by g(n) = cost from start.
 */

import { MinHeap } from './utils';
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

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;

  const heap = new MinHeap((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    return a.col - b.col;
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

      const newCost = currentNode.distance + getTraversalCost(neighbor);
      if (newCost < neighbor.distance) {
        neighbor.distance = newCost;
        neighbor.previousNode = currentNode;
        heap.push(neighbor);
      }
    }
  }

  return visitedNodesInOrder;
}
