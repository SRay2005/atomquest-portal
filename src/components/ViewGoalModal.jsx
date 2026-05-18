import React from 'react';
import { calcScore, scoreColor } from '../utils/scoring';
import ProgressBar from './ProgressBar';
import { QUARTER_KEY_MAP } from '../data/seedData';

export default function ViewGoalModal({ goal, activeQ, onClose }) {
  if (!goal) return null;
  const qKey = QUARTER_KEY_MAP[activeQ] || 'q1Actual';
  const score = calcScore(goal, goal[qKey] ?? 0);
  const color = scoreColor(score);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{goal.title}</span>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className="modal-body">
          {goal.shared && (
            <div className="alert alert-info">🔗 This is a shared/departmental goal. Achievement is synced from the primary owner.</div>
          )}
          <div className="approval-detail-grid">
            <div className="approval-detail-item"><label>Thrust Area</label><span>{goal.thrust}</span></div>
            <div className="approval-detail-item"><label>Unit of Measurement</label><span className="mono">{goal.uom}</span></div>
            <div className="approval-detail-item"><label>Target</label><span className="mono">{goal.target}</span></div>
            <div className="approval-detail-item"><label>Weightage</label><span className="text-accent mono">{goal.weightage}%</span></div>
          </div>
          {goal.desc && <div className="approval-desc">{goal.desc}</div>}
          <div style={{ marginTop: 16 }}>
            <div className="card-title">{activeQ} Score</div>
            <div className="flex items-center gap-12">
              <div style={{ flex: 1 }}><ProgressBar value={score} color={score >= 80 ? 'progress-green' : score >= 50 ? 'progress-accent' : 'progress-fill'} /></div>
              <span className="mono" style={{ color, fontSize: 16, fontWeight: 700 }}>{score}%</span>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
