import React from 'react';
import StatCard from '../../components/StatCard';
import ProgressBar from '../../components/ProgressBar';
import { EMPLOYEES, THRUST_AREAS } from '../../data/seedData';

export default function AdminDashboard({ goals, auditLog }) {
  const approved = goals.filter(g => g.status === 'approved').length;
  const pending = goals.filter(g => g.status === 'pending').length;
  const rework = goals.filter(g => g.status === 'rework').length;
  const emps = Object.entries(EMPLOYEES).filter(([, e]) => e.role === 'employee');

  const thrustDist = THRUST_AREAS.map(t => ({ name: t, count: goals.filter(g => g.thrust === t).length })).filter(d => d.count > 0);
  const maxCount = Math.max(...thrustDist.map(d => d.count), 1);

  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Admin Dashboard</div><div className="page-sub">Organisation-wide goal overview</div></div></div>

      <div className="stats-row">
        <StatCard value={goals.length} label="Total Goals" colorClass="text-accent" />
        <StatCard value={approved} label="Approved" colorClass="text-accent" />
        <StatCard value={pending} label="Pending" colorClass="text-warn" />
        <StatCard value={rework} label="Rework" colorClass="text-danger" />
      </div>

      <div className="grid2">
        <div className="card">
          <div className="card-title">Employee Completion Status</div>
          {emps.map(([id, emp]) => {
            const eg = goals.filter(g => g.emp === id);
            const ea = eg.filter(g => g.status === 'approved').length;
            const tw = eg.reduce((s, g) => s + g.weightage, 0);
            const pct = eg.length > 0 ? Math.round((ea / eg.length) * 100) : 0;
            return (
              <div className="gauge-row" key={id}>
                <div className="gauge-name">
                  <span className="font-bold">{emp.name}</span>
                  <span className={`badge ${tw === 100 ? 'badge-approved' : 'badge-pending'}`} style={{ marginLeft: 8 }}>{tw}%</span>
                  <div className="text-sm text-muted">{ea}/{eg.length} goals approved</div>
                </div>
                <div className="gauge-bar"><ProgressBar value={pct} color="progress-green" /></div>
                <span className="gauge-pct">{pct}%</span>
              </div>
            );
          })}
        </div>
        <div className="card">
          <div className="card-title">Recent Audit Events</div>
          {auditLog.slice(0, 5).map((a, i) => (
            <div key={a.id}>
              <div className="font-bold" style={{ fontSize: 13 }}>{a.action}</div>
              <div className="text-muted text-sm">{a.detail}</div>
              <div className="mono text-sm text-muted" style={{ marginTop: 2 }}>{a.user} · {a.time}</div>
              {i < 4 && <hr className="divider" />}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Goal Distribution by Thrust Area</div>
        {thrustDist.map(d => (
          <div className="gauge-row" key={d.name}>
            <span className="gauge-name">{d.name}</span>
            <div className="gauge-bar"><ProgressBar value={(d.count / maxCount) * 100} color="progress-blue" /></div>
            <span className="gauge-pct">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
