import React from 'react';

export default function CycleMgmt({ cycleOpen, setCycleOpen, windowStatuses, setWindowStatuses, addAudit, currentUser }) {
  function toggleCycle(open) {
    setCycleOpen(open);
    addAudit(open ? 'Cycle opened' : 'Cycle closed', null, open ? 'FY 2025-26 cycle opened' : 'FY 2025-26 cycle closed', currentUser.name);
  }

  function toggleWindow(idx, status) {
    setWindowStatuses(prev => prev.map((w, i) => i === idx ? { ...w, status } : w));
    addAudit(`Window ${status}`, null, `${windowStatuses[idx].name} ${status}`, currentUser.name);
  }

  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Cycle Management</div><div className="page-sub">Configure goal-setting cycle & check-in windows</div></div></div>

      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>FY 2025-26</div>
            <span className={`badge ${cycleOpen ? 'badge-approved' : 'badge-rework'}`} style={{ marginTop: 6 }}>{cycleOpen ? 'Active' : 'Closed'}</span>
          </div>
          <div className="flex gap-8">
            <button className="btn btn-primary" onClick={() => toggleCycle(true)} disabled={cycleOpen}>Open Cycle</button>
            <button className="btn btn-danger" onClick={() => toggleCycle(false)} disabled={!cycleOpen}>Close Cycle</button>
          </div>
        </div>
      </div>

      <div className="table-wrap">
        <div className="table-header"><span className="card-title" style={{ margin: 0 }}>Check-in Windows</span></div>
        <table>
          <thead><tr><th>Phase Name</th><th>Opens</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {windowStatuses.map((w, i) => (
              <tr key={w.id}>
                <td className="font-bold">{w.name}</td>
                <td><input className="form-input" type="date" value={w.opens} style={{ width: 160 }}
                  onChange={e => setWindowStatuses(prev => prev.map((x, j) => j === i ? { ...x, opens: e.target.value } : x))} /></td>
                <td><span className={`badge ${w.status === 'open' ? 'badge-approved' : 'badge-draft'}`}>{w.status}</span></td>
                <td>
                  <div className="flex gap-8">
                    <button className="btn btn-success btn-sm" disabled={w.status === 'open'} onClick={() => toggleWindow(i, 'open')}>Open</button>
                    <button className="btn btn-danger btn-sm" disabled={w.status === 'closed'} onClick={() => toggleWindow(i, 'closed')}>Close</button>
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
