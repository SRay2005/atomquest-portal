import React from 'react';
import { calcScore, scoreColor } from '../utils/scoring';
import ProgressBar from './ProgressBar';

export default function GoalCard({ goal, qKey = 'q1Actual', onView, onDelete, showActions = true }) {
  const score = calcScore(goal, goal[qKey] ?? 0);
  const color = scoreColor(score);
  const statusClass = `badge badge-${goal.status}`;
  return (
    <div className="goal-card">
      <div className="flex items-center justify-between">
        <div>
          <span className="goal-card-title">{goal.title}</span>
          {goal.shared && <span className="badge badge-shared" style={{ marginLeft: 8 }}>Shared</span>}
        </div>
        {showActions && (
          <div className="flex gap-8">
            {onView && <button className="btn btn-secondary btn-sm" onClick={() => onView(goal)}>View</button>}
            {onDelete && goal.status !== 'approved' && (
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(goal.id)}>Delete</button>
            )}
          </div>
        )}
      </div>
      <div className="goal-card-meta">
        <span className="goal-tag">{goal.thrust}</span>
        <span className="goal-tag">{goal.uom}</span>
        <span className="goal-weight">{goal.weightage}%</span>
        <span className={statusClass}>{goal.status}</span>
      </div>
      {goal.status === 'approved' && (
        <div className="goal-progress-row">
          <span className="goal-progress-label">{qKey.replace('Actual', '')} Score</span>
          <div style={{ flex: 1 }}><ProgressBar value={score} color={score >= 80 ? 'progress-green' : score >= 50 ? 'progress-accent' : 'progress-fill'} style={{ height: 5 }} /></div>
          <span className="goal-score" style={{ color }}>{score}%</span>
        </div>
      )}
    </div>
  );
}
