import React from 'react';
import { GoalStatusBadge } from '../../components/Badge';
import WeightMeter from '../../components/WeightMeter';

export default function MyGoals({ goals, empId, onAdd, onDelete, setModal }) {
  const my = goals.filter(g => g.emp === empId);
  const totalW = my.reduce((s, g) => s + g.weightage, 0);

  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">My Goals</div><div className="page-sub">Create and manage your goals</div></div>
        <button className="btn btn-primary" disabled={my.length >= 8} onClick={() => setModal({ type: 'addGoal' })}>+ Add Goal</button>
      </div>

      <WeightMeter totalWeight={totalW} />

      <div className="table-wrap">
        <table>
          <thead><tr>
            <th>Goal Title</th><th>Thrust Area</th><th>UoM</th><th>Target</th><th>Weightage</th><th>Status</th><th>Actions</th>
          </tr></thead>
          <tbody>
            {my.length === 0 ? (
              <tr><td colSpan="7"><div className="empty"><div className="empty-icon">◎</div>No goals yet. Click "+ Add Goal" to start.</div></td></tr>
            ) : my.map(g => (
              <tr key={g.id}>
                <td><span className="font-bold">{g.title}</span>{g.shared && <span className="badge badge-shared" style={{ marginLeft: 8 }}>Shared</span>}</td>
                <td><span className="goal-tag">{g.thrust}</span></td>
                <td><span className="mono">{g.uom}</span></td>
                <td><span className="mono">{g.target}</span></td>
                <td><span className="text-accent mono font-bold">{g.weightage}%</span></td>
                <td><GoalStatusBadge status={g.status} /></td>
                <td>
                  <div className="flex gap-8">
                    <button className="btn btn-secondary btn-sm" onClick={() => setModal({ type: 'viewGoal', data: g })}>View</button>
                    {g.status !== 'approved' && <button className="btn btn-danger btn-sm" onClick={() => onDelete(g.id)}>Delete</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
