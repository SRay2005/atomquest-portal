import React from 'react';
import StatCard from '../../components/StatCard';
import ProgressBar from '../../components/ProgressBar';
import { EMPLOYEES } from '../../data/seedData';

export default function MgrDashboard({ goals }) {
  const reports = Object.entries(EMPLOYEES).filter(([, e]) => e.manager === 'mgr1');
  const allTeamGoals = goals.filter(g => reports.some(([id]) => id === g.emp));
  const pending = allTeamGoals.filter(g => g.status === 'pending').length;
  const approved = allTeamGoals.filter(g => g.status === 'approved').length;

  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Manager Dashboard</div><div className="page-sub">Team overview & pending actions</div></div></div>

      <div className="stats-row">
        <StatCard value={reports.length} label="Direct Reports" colorClass="text-accent" />
        <StatCard value={pending} label="Pending Approvals" colorClass={pending > 0 ? 'text-warn' : 'text-accent'} />
        <StatCard value={approved} label="Approved Goals" colorClass="text-accent" />
        <StatCard value={allTeamGoals.length} label="Total Goals" colorClass="text-accent" />
      </div>

      <div className="card">
        <div className="card-title">Team Completion</div>
        {reports.map(([id, emp]) => {
          const eg = goals.filter(g => g.emp === id);
          const ea = eg.filter(g => g.status === 'approved').length;
          const tw = eg.reduce((s, g) => s + g.weightage, 0);
          const pct = eg.length > 0 ? Math.round((ea / eg.length) * 100) : 0;
          return (
            <div className="gauge-row" key={id}>
              <div className="gauge-name">
                <div className="font-bold">{emp.name}</div>
                <div className="text-sm text-muted">{eg.length} goals · {tw}% weight</div>
              </div>
              <div className="gauge-bar"><ProgressBar value={pct} color="progress-green" /></div>
              <span className="gauge-pct">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
