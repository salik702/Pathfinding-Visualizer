/**
 * Shared pathfinding utilities for BFS, Dijkstra, and A*.
 */

/** Manhattan distance heuristic for A*. */
export function manhattanDistance(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

import { getTraversalCost } from '../utils/gridHelper';

/**
 * Sum traversal cost along a path (cost to enter each cell after the start).
 * BFS ignores weights when choosing a route; this metric is for display only.
 */
export function calculatePathCost(pathNodes) {
  if (!pathNodes || pathNodes.length <= 1) return 0;
  return pathNodes.slice(1).reduce((sum, node) => sum + getTraversalCost(node), 0);
}

/** Min-heap priority queue for weighted search algorithms. */
export class MinHeap {
  constructor(compareFn) {
    this.heap = [];
    this.compare = compareFn;
  }

  get size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  push(item) {
    this.heap.push(item);
    this._bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.isEmpty()) return undefined;
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._bubbleDown(0);
    }
    return top;
  }

  _bubbleUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index], this.heap[parent]) >= 0) break;
      [this.heap[index], this.heap[parent]] = [this.heap[parent], this.heap[index]];
      index = parent;
    }
  }

  _bubbleDown(index) {
    const length = this.heap.length;
    while (true) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let smallest = index;

      if (left < length && this.compare(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < length && this.compare(this.heap[right], this.heap[smallest]) < 0) {
        smallest = right;
      }
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}
