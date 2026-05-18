import React from 'react';

export default function AuditLog({ auditLog }) {
  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Audit Log</div><div className="page-sub">Append-only audit trail of all actions</div></div></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Detail</th></tr></thead>
          <tbody>
            {auditLog.map(a => (
              <tr key={a.id}>
                <td><span className="mono text-sm">{a.time}</span></td>
                <td className="font-bold">{a.user}</td>
                <td><span className="badge badge-pending">{a.action}</span></td>
                <td className="text-muted text-sm">{a.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
