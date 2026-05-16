import React from 'react';
import { Activity, Clock, Navigation, Hash, Coins } from 'lucide-react';

const ALGO_LABELS = {
  bfs: 'BFS — shortest steps (ignores cell costs)',
  dijkstra: 'Dijkstra — lowest total path cost',
  astar: 'A* — lowest cost with heuristic',
};

const StatsPanel = ({ visitedCount, pathLength, pathCost, executionTime, title, activeAlgo }) => {
  return (
    <div className="panel-card glass">
      <div className="panel-title">
        <Activity size={16} />
        {title || 'Real-time Metrics'}
      </div>
      {activeAlgo && (
        <p className="stats-algo-label">{ALGO_LABELS[activeAlgo] || activeAlgo}</p>
      )}
      <div className="stats-list">
        <div className="stat-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Hash size={14} color="var(--text-muted)" />
            <span className="stat-label">Visited Nodes</span>
          </div>
          <span className="stat-value">{visitedCount}</span>
        </div>
        <div className="stat-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Navigation size={14} color="var(--text-muted)" />
            <span className="stat-label">Path Steps</span>
          </div>
          <span className="stat-value">{pathLength}</span>
        </div>
        <div className="stat-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Coins size={14} color="var(--text-muted)" />
            <span className="stat-label">Path Cost</span>
          </div>
          <span className="stat-value">{pathCost}</span>
        </div>
        <div className="stat-item">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={14} color="var(--text-muted)" />
            <span className="stat-label">Exec Time</span>
          </div>
          <span className="stat-value">{executionTime}ms</span>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
