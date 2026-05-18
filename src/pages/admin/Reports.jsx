import React from 'react';
import { EMPLOYEES } from '../../data/seedData';
import { calcScore, scoreColor } from '../../utils/scoring';
import { GoalStatusBadge, QStatusBadge } from '../../components/Badge';
import ProgressBar from '../../components/ProgressBar';

export default function Reports({ goals }) {
  function exportCSV() {
    const headers = ['Employee', 'Goal Title', 'Thrust Area', 'UoM', 'Target', 'Weightage', 'Status', 'Q1 Actual', 'Q1 Score'];
    const rows = goals.map(g => {
      const score = calcScore(g, g.q1Actual ?? 0);
      return [EMPLOYEES[g.emp]?.name, g.title, g.thrust, g.uom, g.target, g.weightage, g.status, g.q1Actual, score];
    });
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'achievement_report.csv'; a.click();
    URL.revokeObjectURL(url);
  }

  const emps = Object.entries(EMPLOYEES).filter(([, e]) => e.role === 'employee');

  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Reports</div><div className="page-sub">Achievement reports & exports</div></div>
        <button className="btn btn-primary" onClick={exportCSV}>⬇ Export CSV</button>
      </div>

      <div className="table-wrap">
        <div className="table-header"><span className="card-title" style={{ margin: 0 }}>Achievement Report</span></div>
        <table>
          <thead><tr><th>Employee</th><th>Goal</th><th>Target</th><th>Q1 Actual</th><th>Q1 Score</th><th>Q-Status</th><th>Approval</th></tr></thead>
          <tbody>
            {goals.map(g => {
              const score = calcScore(g, g.q1Actual ?? 0);
              const sColor = scoreColor(score);
              return (
                <tr key={g.id}>
                  <td>{EMPLOYEES[g.emp]?.name}</td>
                  <td className="font-bold">{g.title}</td>
                  <td className="mono">{g.target}</td>
                  <td className="mono">{g.q1Actual}</td>
                  <td><div className="mini-progress"><div className="mini-bar"><div className="mini-fill" style={{ width: `${score}%`, background: sColor }} /></div><span className="mono text-sm" style={{ color: sColor }}>{score}%</span></div></td>
                  <td><QStatusBadge status={g.qStatus} /></td>
                  <td><GoalStatusBadge status={g.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-title">Check-in Completion Dashboard</div>
        {emps.map(([id, emp]) => {
          const eg = goals.filter(g => g.emp === id && g.status === 'approved');
          const completed = eg.filter(g => g.qStatus === 'Completed').length;
          const pct = eg.length > 0 ? Math.round((completed / eg.length) * 100) : 0;
          return (
            <div className="gauge-row" key={id}>
              <div className="gauge-name"><span className="font-bold">{emp.name}</span><div className="text-sm text-muted">{completed}/{eg.length} completed</div></div>
              <div className="gauge-bar"><ProgressBar value={pct} color="progress-green" /></div>
              <span className="gauge-pct">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
