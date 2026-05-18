import React, { useState } from 'react';
import { EMPLOYEES } from '../../data/seedData';
import { GoalStatusBadge } from '../../components/Badge';

export default function Approvals({ goals, approveGoal, returnGoal, updateGoal, addAudit, addNotification, currentUser }) {
  const [reworkComments, setReworkComments] = useState({});
  const [edits, setEdits] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const pendingGoals = goals.filter(g => g.status === 'pending');
  const reviewedGoals = goals.filter(g => ['approved', 'rework'].includes(g.status));

  function handleApprove(goal) {
    setErrorMsg('');
    const edit = edits[goal.id];
    let finalWeight = goal.weightage;
    
    if (edit) {
      finalWeight = edit.weightage !== undefined ? parseInt(edit.weightage) || goal.weightage : goal.weightage;
      if (finalWeight !== goal.weightage) {
        // Validate that total weightage doesn't exceed 100%
        const otherGoals = goals.filter(g => g.emp === goal.emp && g.id !== goal.id && g.status !== 'rework');
        const currentTotal = otherGoals.reduce((sum, g) => sum + g.weightage, 0);
        if (currentTotal + finalWeight > 100) {
          setErrorMsg(`Cannot approve: ${EMPLOYEES[goal.emp]?.name}'s total weightage would be ${currentTotal + finalWeight}% (Maximum 100%).`);
          return;
        }
      }

      updateGoal(goal.id, {
        target: edit.target !== undefined ? edit.target : goal.target,
        weightage: finalWeight
      });
    }
    approveGoal(goal.id);
    addAudit('Goal approved', goal.id, `Goal '${goal.title}' approved${edit ? ' (with edits)' : ''}`, currentUser.name);
    addNotification({
      type: 'approved', to: goal.emp, toName: EMPLOYEES[goal.emp]?.name || goal.emp,
      subject: `Your Goal Was Approved ✓`, body: `Your goal '${goal.title}' has been approved by ${currentUser.name}.`,
      channel: 'email', deepLink: '/goals'
    });
    setSuccessMsg(`"${goal.title}" approved successfully.`);
    setTimeout(() => setSuccessMsg(''), 3000);
  }

  function handleReturn(goal) {
    const comment = reworkComments[goal.id] || '';
    returnGoal(goal.id);
    addAudit('Goal returned for rework', goal.id, `${goal.title} sent back${comment ? ' — ' + comment : ''}`, currentUser.name);
    addNotification({
      type: 'rework', to: goal.emp, toName: EMPLOYEES[goal.emp]?.name || goal.emp,
      subject: 'Goal Returned for Rework', body: `Your goal '${goal.title}' has been returned.${comment ? ' Feedback: ' + comment : ''} Please revise and resubmit.`,
      channel: 'email', deepLink: '/goals'
    });
    setSuccessMsg(`"${goal.title}" returned for rework.`);
    setTimeout(() => setSuccessMsg(''), 3000);
  }

  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Approvals</div><div className="page-sub">Review and approve team goals</div></div></div>

      {errorMsg && <div className="alert alert-danger" style={{ marginBottom: 16 }}>{errorMsg}</div>}
      {successMsg && <div className="alert alert-success success-msg">{successMsg}</div>}

      {pendingGoals.length === 0 ? (
        <div className="alert alert-success">✓ All goals have been reviewed. No pending approvals.</div>
      ) : pendingGoals.map(g => {
        const emp = EMPLOYEES[g.emp];
        return (
          <div className="approval-card" key={g.id}>
            <div className="emp-info">{emp?.name} · {emp?.dept}</div>
            <div className="goal-title-lg">{g.title}</div>
            <div className="approval-detail-grid">
              <div className="approval-detail-item"><label>Thrust Area</label><span>{g.thrust}</span></div>
              <div className="approval-detail-item"><label>UoM</label><span className="mono">{g.uom}</span></div>
              <div className="approval-detail-item">
                <label>Target</label>
                {g.uom === 'Zero-based' ? <span className="mono">0</span> : (
                  <input className="form-input" style={{ padding: '4px 8px', height: 28 }} value={edits[g.id]?.target ?? g.target} onChange={e => setEdits(p => ({ ...p, [g.id]: { ...p[g.id], target: e.target.value } }))} />
                )}
              </div>
              <div className="approval-detail-item">
                <label>Weightage (%)</label>
                <input className="form-input" type="number" style={{ padding: '4px 8px', height: 28, width: 80 }} value={edits[g.id]?.weightage ?? g.weightage} onChange={e => setEdits(p => ({ ...p, [g.id]: { ...p[g.id], weightage: e.target.value } }))} />
              </div>
            </div>
            {g.desc && <div className="approval-desc">{g.desc}</div>}
            <div className="approval-actions">
              <button className="btn btn-success" onClick={() => handleApprove(g)}>✓ Approve</button>
              <input className="form-input rework-input" placeholder="Rework comment (optional)"
                value={reworkComments[g.id] || ''} onChange={e => setReworkComments(p => ({ ...p, [g.id]: e.target.value }))} />
              <button className="btn btn-danger" onClick={() => handleReturn(g)}>↩ Return for Rework</button>
            </div>
          </div>
        );
      })}

      {reviewedGoals.length > 0 && (
        <div className="table-wrap" style={{ marginTop: 20 }}>
          <div className="table-header"><span className="card-title" style={{ margin: 0 }}>Previously Reviewed</span></div>
          <table>
            <thead><tr><th>Employee</th><th>Goal</th><th>Weight</th><th>Status</th></tr></thead>
            <tbody>
              {reviewedGoals.map(g => (
                <tr key={g.id}>
                  <td>{EMPLOYEES[g.emp]?.name}</td>
                  <td className="font-bold">{g.title}</td>
                  <td className="mono text-accent">{g.weightage}%</td>
                  <td><GoalStatusBadge status={g.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
