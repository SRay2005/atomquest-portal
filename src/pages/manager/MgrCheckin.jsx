import React, { useState } from 'react';
import { EMPLOYEES, QUARTERS, QUARTER_KEY_MAP } from '../../data/seedData';
import { calcScore, scoreColor } from '../../utils/scoring';
import { QStatusBadge } from '../../components/Badge';

export default function MgrCheckin({ goals, activeQ, setActiveQ, checkinComments, setCheckinComments, currentUser }) {
  const reports = Object.entries(EMPLOYEES).filter(([, e]) => e.manager === 'mgr1');
  const [selectedEmp, setSelectedEmp] = useState(reports[0]?.[0] || '');
  const [successMsg, setSuccessMsg] = useState('');
  const qKey = QUARTER_KEY_MAP[activeQ] || 'q1Actual';
  const commentKey = `${selectedEmp}-${activeQ}`;
  const empGoals = goals.filter(g => g.emp === selectedEmp && g.status === 'approved');

  function saveComment() {
    setSuccessMsg('Check-in comment saved successfully.');
    setTimeout(() => setSuccessMsg(''), 3000);
  }

  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Team Check-in</div><div className="page-sub">Review planned vs actual per employee</div></div></div>
      <div className="tabs">
        {QUARTERS.map(q => (<div key={q} className={`tab${activeQ === q ? ' active' : ''}`} onClick={() => setActiveQ(q)}>{q}</div>))}
      </div>
      <div className="tabs">
        {reports.map(([id, emp]) => (<div key={id} className={`tab${selectedEmp === id ? ' active' : ''}`} onClick={() => setSelectedEmp(id)}>{emp.name}</div>))}
      </div>

      {successMsg && <div className="alert alert-success success-msg">{successMsg}</div>}

      <div className="table-wrap">
        <table>
          <thead><tr><th>Goal</th><th>UoM</th><th>Target</th><th>Actual</th><th>Score</th><th>Q-Status</th></tr></thead>
          <tbody>
            {empGoals.length === 0 ? (
              <tr><td colSpan="6"><div className="empty">No approved goals for this employee.</div></td></tr>
            ) : empGoals.map(g => {
              const score = calcScore(g, g[qKey] ?? 0);
              const sColor = scoreColor(score);
              return (
                <tr key={g.id}>
                  <td className="font-bold">{g.title}</td>
                  <td className="mono">{g.uom}</td>
                  <td className="mono">{g.target}</td>
                  <td className="mono">{g[qKey] || '—'}</td>
                  <td><div className="mini-progress"><div className="mini-bar"><div className="mini-fill" style={{ width: `${score}%`, background: sColor }} /></div><span className="mono text-sm" style={{ color: sColor }}>{score}%</span></div></td>
                  <td><QStatusBadge status={g.qStatus} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-title">Check-in Comment</div>
        <textarea className="form-textarea w-full" placeholder="Structured check-in comment for this employee..."
          value={checkinComments[commentKey] || ''}
          onChange={e => setCheckinComments(p => ({ ...p, [commentKey]: e.target.value }))} />
        <div style={{ marginTop: 10 }}>
          <button className="btn btn-primary" onClick={saveComment}>Save Check-in</button>
        </div>
      </div>
    </div>
  );
}
