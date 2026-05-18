import React, { useState } from 'react';
import { uid } from '../../utils/scoring';

const TRIGGER_LABELS = {
  employee_not_submitted: 'Employee has not submitted goals',
  manager_not_approved: 'Manager has not approved goals',
  checkin_not_completed: 'Quarterly check-in not completed',
};

export default function Escalations({ escalationRules, setEscalationRules, escalations, setEscalations, addAudit, currentUser }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', trigger: 'employee_not_submitted', days: 7, chain: ['manager'], active: true });
  const [successMsg, setSuccessMsg] = useState('');

  function addRule() {
    if (!form.name.trim()) return;
    setEscalationRules(prev => [...prev, { ...form, id: uid(), days: parseInt(form.days) || 1 }]);
    setShowForm(false);
    setForm({ name: '', trigger: 'employee_not_submitted', days: 7, chain: ['manager'], active: true });
  }

  function toggleActive(id) {
    setEscalationRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  }

  function deleteRule(id) {
    setEscalationRules(prev => prev.filter(r => r.id !== id));
  }

  function resolveEsc(id) {
    setEscalations(prev => prev.map(e => e.id === id ? { ...e, status: 'resolved', resolvedBy: currentUser.name } : e));
    addAudit('Escalation resolved', null, `Escalation ${id} resolved by ${currentUser.name}`, currentUser.name);
    setSuccessMsg('Escalation resolved.');
    setTimeout(() => setSuccessMsg(''), 3000);
  }

  function dismissEsc(id) {
    setEscalations(prev => prev.map(e => e.id === id ? { ...e, status: 'dismissed' } : e));
  }

  function toggleChain(val) {
    setForm(p => ({ ...p, chain: p.chain.includes(val) ? p.chain.filter(c => c !== val) : [...p.chain, val] }));
  }

  const levelLabels = { 1: 'Level 1 — Manager notified', 2: 'Level 2 — Skip-level', 3: 'Level 3 — HR' };

  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Escalations</div><div className="page-sub">Rule configurator & escalation log</div></div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ Add Rule</button>
      </div>

      {successMsg && <div className="alert alert-success success-msg">{successMsg}</div>}

      {showForm && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-title">New Escalation Rule</div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Rule Name</label><input className="form-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Trigger</label>
              <select className="form-select" value={form.trigger} onChange={e => setForm(p => ({ ...p, trigger: e.target.value }))}>
                {Object.entries(TRIGGER_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label className="form-label">Days</label><input className="form-input" type="number" min="1" value={form.days} onChange={e => setForm(p => ({ ...p, days: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Escalation Chain</label>
              <div className="flex gap-8" style={{ marginTop: 4 }}>
                {['manager', 'skip_level', 'hr'].map(c => (
                  <label className="form-check" key={c}><input type="checkbox" checked={form.chain.includes(c)} onChange={() => toggleChain(c)} /><span>{c.replace('_', ' ')}</span></label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-8" style={{ marginTop: 8 }}>
            <button className="btn btn-primary" onClick={addRule}>Save</button>
            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="table-wrap">
        <div className="table-header"><span className="card-title" style={{ margin: 0 }}>Escalation Rules</span></div>
        <table>
          <thead><tr><th>Rule Name</th><th>Trigger</th><th>Days</th><th>Chain</th><th>Active</th><th>Actions</th></tr></thead>
          <tbody>
            {escalationRules.map(r => (
              <tr key={r.id}>
                <td className="font-bold">{r.name}</td>
                <td className="text-sm">{TRIGGER_LABELS[r.trigger]}</td>
                <td className="mono">{r.days}</td>
                <td className="mono text-sm">{r.chain.join(', ')}</td>
                <td><label className="form-check"><input type="checkbox" checked={r.active} onChange={() => toggleActive(r.id)} /></label></td>
                <td><button className="btn btn-danger btn-sm" onClick={() => deleteRule(r.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card-title" style={{ marginTop: 20 }}>Escalation Log <span className="badge badge-pending" style={{ marginLeft: 8 }}>{escalations.filter(e => e.status === 'open').length} open</span></div>
      {escalations.map(e => (
        <div className={`esc-card ${e.status}`} key={e.id}>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold">{e.empName}</span>
              <div className="text-muted text-sm" style={{ marginTop: 2 }}>{e.reason}</div>
              <div className="mono text-sm text-muted" style={{ marginTop: 4 }}>Raised: {e.raisedOn}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div><span className="badge badge-pending" style={{ marginBottom: 4 }}>{levelLabels[e.level]}</span></div>
              <span className={`badge badge-${e.status}`}>{e.status}</span>
              {e.resolvedBy && <div className="text-sm text-muted" style={{ marginTop: 2 }}>by {e.resolvedBy}</div>}
            </div>
          </div>
          {e.status === 'open' && (
            <div className="flex gap-8" style={{ marginTop: 10 }}>
              <button className="btn btn-success btn-sm" onClick={() => resolveEsc(e.id)}>Resolve</button>
              <button className="btn btn-secondary btn-sm" onClick={() => dismissEsc(e.id)}>Dismiss</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
