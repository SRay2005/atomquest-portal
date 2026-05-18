import React, { useState } from 'react';
import { EMPLOYEES, QUARTER_KEY_MAP } from '../../data/seedData';
import { calcScore, scoreColor } from '../../utils/scoring';
import { GoalStatusBadge } from '../../components/Badge';

export default function TeamGoals({ goals, activeQ }) {
  const reports = Object.entries(EMPLOYEES).filter(([, e]) => e.manager === 'mgr1');
  const [selectedEmp, setSelectedEmp] = useState(reports[0]?.[0] || '');
  const qKey = QUARTER_KEY_MAP[activeQ] || 'q1Actual';
  const empGoals = goals.filter(g => g.emp === selectedEmp);

  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Team Goals</div><div className="page-sub">View goal sheets by employee</div></div></div>
      <div className="tabs">
        {reports.map(([id, emp]) => (
          <div key={id} className={`tab${selectedEmp === id ? ' active' : ''}`} onClick={() => setSelectedEmp(id)}>{emp.name}</div>
        ))}
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Goal</th><th>Thrust</th><th>Target</th><th>Weight</th><th>Status</th><th>{activeQ.split(' ')[0]} Score</th></tr></thead>
          <tbody>
            {empGoals.length === 0 ? (
              <tr><td colSpan="6"><div className="empty">No goals for this employee.</div></td></tr>
            ) : empGoals.map(g => {
              const score = calcScore(g, g[qKey] ?? 0);
              const sColor = scoreColor(score);
              return (
                <tr key={g.id}>
                  <td className="font-bold">{g.title}</td>
                  <td><span className="goal-tag">{g.thrust}</span></td>
                  <td className="mono">{g.target}</td>
                  <td className="mono text-accent">{g.weightage}%</td>
                  <td><GoalStatusBadge status={g.status} /></td>
                  <td><div className="mini-progress"><div className="mini-bar"><div className="mini-fill" style={{ width: `${score}%`, background: sColor }} /></div><span className="mono text-sm" style={{ color: sColor }}>{score}%</span></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
