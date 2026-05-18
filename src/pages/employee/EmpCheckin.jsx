import React from 'react';
import { QUARTERS, QUARTER_KEY_MAP, STATUS_OPTIONS } from '../../data/seedData';
import { calcScore, calcWeightedScore, scoreColor } from '../../utils/scoring';
import ProgressBar from '../../components/ProgressBar';
import { QStatusBadge } from '../../components/Badge';

export default function EmpCheckin({ goals, empId, activeQ, setActiveQ, updateActual, updateQStatus, windowStatuses }) {
  const qKey = QUARTER_KEY_MAP[activeQ] || 'q1Actual';
  const approved = goals.filter(g => g.emp === empId && g.status === 'approved');
  const weighted = calcWeightedScore(goals.filter(g => g.emp === empId), qKey);
  const wColor = scoreColor(weighted);

  // Check if window is open for this quarter
  const qIndex = QUARTERS.indexOf(activeQ);
  const windowOpen = windowStatuses && windowStatuses[qIndex + 1] ? windowStatuses[qIndex + 1].status === 'open' : true;

  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Check-in</div><div className="page-sub">Log your quarterly achievements</div></div></div>

      <div className="tabs">
        {QUARTERS.map(q => (
          <div key={q} className={`tab${activeQ === q ? ' active' : ''}`} onClick={() => setActiveQ(q)}>{q}</div>
        ))}
      </div>

      {!windowOpen && <div className="alert alert-warn">⏸ The {activeQ} check-in window is currently closed. You cannot submit updates at this time.</div>}

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">Your {activeQ.split(' ')[0]} weighted score</span>
          <span className="mono font-bold" style={{ fontSize: 22, color: wColor }}>{weighted}%</span>
        </div>
        <ProgressBar value={weighted} color={weighted >= 80 ? 'progress-green' : weighted >= 50 ? 'progress-accent' : 'progress-fill'} style={{ marginTop: 8 }} />
      </div>

      {approved.length === 0 ? (
        <div className="empty"><div className="empty-icon">📋</div>No approved goals yet. Get manager approval first.</div>
      ) : approved.map(g => {
        const score = calcScore(g, g[qKey] ?? 0);
        const sColor = scoreColor(score);
        const isSharedReadonly = g.shared && g.primaryOwner !== empId;
        return (
          <div className="checkin-card" key={g.id}>
            <div className="checkin-card-header">
              <div>
                <span className="font-bold">{g.title}</span>
                {g.shared && <span className="badge badge-shared" style={{ marginLeft: 8 }}>Shared</span>}
                <div className="goal-card-meta" style={{ marginTop: 4 }}>
                  <span className="goal-tag">{g.thrust}</span>
                  <span className="goal-tag">{g.uom}</span>
                  <span className="goal-weight">{g.weightage}%</span>
                </div>
              </div>
              <QStatusBadge status={g.qStatus} />
            </div>
            <div className="checkin-inputs">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Planned Target</label>
                <input className="form-input" value={g.target} disabled />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Actual Achievement</label>
                {g.uom === 'Timeline' ? (
                  <input className="form-input" type="date" value={g[qKey] || ''} readOnly={isSharedReadonly || !windowOpen}
                    onChange={e => updateActual(g.id, qKey, e.target.value, empId)} />
                ) : (
                  <input className="form-input" type="number" value={g[qKey] || ''} readOnly={isSharedReadonly || !windowOpen}
                    onChange={e => updateActual(g.id, qKey, e.target.value, empId)}
                    onBlur={e => updateActual(g.id, qKey, e.target.value, empId)} placeholder="Enter actual" />
                )}
                {isSharedReadonly && <div className="form-hint">Synced from primary owner</div>}
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Progress Status</label>
                <select className="form-select" value={g.qStatus} disabled={!windowOpen}
                  onChange={e => updateQStatus(g.id, e.target.value)}>
                  {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="checkin-score">
              <span className="text-sm text-muted">Score:</span>
              <div style={{ flex: 1, maxWidth: 200 }}>
                <ProgressBar value={score} color={score >= 80 ? 'progress-green' : score >= 50 ? 'progress-accent' : 'progress-fill'} />
              </div>
              <span className="mono font-bold" style={{ color: sColor }}>{score}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
