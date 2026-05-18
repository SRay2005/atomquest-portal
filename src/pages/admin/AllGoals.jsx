import React from 'react';
import { EMPLOYEES } from '../../data/seedData';
import { GoalStatusBadge } from '../../components/Badge';

export default function AllGoals({ goals, unlockGoal, addAudit, currentUser }) {
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">All Goals</div><div className="page-sub">Organisation-wide goal list</div></div></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Employee</th><th>Goal</th><th>Thrust</th><th>UoM</th><th>Weight</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {goals.map(g => (
              <tr key={g.id}>
                <td>{EMPLOYEES[g.emp]?.name}</td>
                <td className="font-bold">{g.title}</td>
                <td><span className="goal-tag">{g.thrust}</span></td>
                <td className="mono">{g.uom}</td>
                <td className="mono text-accent">{g.weightage}%</td>
                <td><GoalStatusBadge status={g.status} /></td>
                <td>
                  {g.status === 'approved' && (
                    <button className="btn btn-secondary btn-sm" onClick={() => {
                      unlockGoal(g.id);
                      addAudit('Goal unlocked', g.id, 'Unlocked for editing by Admin', currentUser.name);
                    }}>🔓 Unlock</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
