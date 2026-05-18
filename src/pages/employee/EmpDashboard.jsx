import React from 'react';
import StatCard from '../../components/StatCard';
import GoalCard from '../../components/GoalCard';
import ProgressBar from '../../components/ProgressBar';
import { THRUST_AREAS } from '../../data/seedData';

export default function EmpDashboard({ goals, empId, activeQ, qKey, setPage, setModal }) {
  const my = goals.filter(g => g.emp === empId);
  const total = my.reduce((s, g) => s + g.weightage, 0);
  const approved = my.filter(g => g.status === 'approved').length;
  const pending = my.filter(g => g.status === 'pending').length;

  const thrustData = THRUST_AREAS.map(t => {
    const tg = my.filter(g => g.thrust === t);
    return { name: t, weight: tg.reduce((s, g) => s + g.weightage, 0) };
  }).filter(d => d.weight > 0);

  const timeline = [
    { label: 'Phase 1 — Goal Setting', date: 'May 2025', status: 'done' },
    { label: 'Q1 Check-in', date: 'July 2025', status: 'active' },
    { label: 'Q2 Check-in', date: 'October 2025', status: 'upcoming' },
    { label: 'Q3 Check-in', date: 'January 2026', status: 'upcoming' },
    { label: 'Q4 / Annual', date: 'March 2026', status: 'upcoming' },
  ];

  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Dashboard</div><div className="page-sub">Your goal overview & cycle status</div></div></div>

      <div className="stats-row">
        <StatCard value={`${my.length}/8`} label="Goals Created" colorClass="text-accent" />
        <StatCard value={`${total}%`} label="Total Weightage" colorClass={total === 100 ? 'text-accent' : total > 100 ? 'text-danger' : 'text-warn'} />
        <StatCard value={approved} label="Approved" colorClass="text-accent" />
        <StatCard value={pending} label="Pending" colorClass="text-warn" />
      </div>

      {my.length > 0 && total !== 100 && <div className="alert alert-warn">Total weightage is {total}% — must equal 100% before submission.</div>}
      {pending > 0 && <div className="alert alert-info">{pending} goal(s) pending manager approval.</div>}

      <div className="grid2">
        <div className="card">
          <div className="card-title">Goal Status</div>
          {my.length === 0 ? (
            <div className="empty"><div className="empty-icon">◎</div><div>No goals yet.</div><button className="btn btn-primary btn-sm" style={{ marginTop: 12 }} onClick={() => setPage('goals')}>Add your first goal →</button></div>
          ) : (
            <>
              {my.slice(0, 4).map(g => <GoalCard key={g.id} goal={g} qKey={qKey} showActions={false} />)}
              {my.length > 4 && <button className="btn btn-secondary btn-sm" style={{ marginTop: 8 }} onClick={() => setPage('goals')}>+{my.length - 4} more →</button>}
            </>
          )}
        </div>
        <div className="card">
          <div className="card-title">Cycle Timeline</div>
          <div className="timeline">
            {timeline.map((t, i) => (
              <div className="tl-item" key={i}>
                <div className={`tl-dot ${t.status}`} />
                <div className="tl-label">{t.label}</div>
                <div className="tl-date">{t.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {thrustData.length > 0 && (
        <div className="card">
          <div className="card-title">Weightage by Thrust Area</div>
          {thrustData.map(d => (
            <div className="gauge-row" key={d.name}>
              <span className="gauge-name">{d.name}</span>
              <div className="gauge-bar"><ProgressBar value={d.weight} color="progress-blue" /></div>
              <span className="gauge-pct">{d.weight}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
