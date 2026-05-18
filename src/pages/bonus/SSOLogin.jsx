import React, { useState } from 'react';

export default function SSOLogin() {
  const [loading, setLoading] = useState(false);
  const [authed, setAuthed] = useState(false);

  function handleLogin() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setAuthed(true); }, 1200);
  }

  if (authed) {
    return (
      <div className="sso-page">
        <div className="sso-card">
          <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Welcome, Neha Kapoor</h2>
          <span className="badge badge-approved" style={{ marginBottom: 12 }}>Manager (L1)</span>
          <p className="text-muted text-sm" style={{ marginTop: 12 }}>Authenticated via Microsoft Entra ID</p>
          <p className="mono text-sm text-muted" style={{ marginTop: 4 }}>Role assigned from Azure AD group: L1-Managers</p>
          <button className="btn btn-primary" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }} onClick={() => setAuthed(false)}>Continue to Portal</button>
        </div>
      </div>
    );
  }

  return (
    <div className="sso-page">
      <div className="sso-card">
        <div style={{ fontSize: 48, marginBottom: 12 }}>⚛</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>AtomQuest Portal</h2>
        <p className="text-muted" style={{ fontSize: 13, marginBottom: 24 }}>Sign in with your organisational account</p>

        <button className="ms-btn" onClick={handleLogin} disabled={loading}>
          {loading ? (
            <><span className="mono">⟳</span> Authenticating with Microsoft Entra ID...</>
          ) : (
            <><span>🪟</span> Sign in with Microsoft</>
          )}
        </button>

        <div style={{ margin: '20px 0', color: 'var(--muted)', fontSize: 12 }}>— or preview org —</div>

        <div className="org-card" style={{ textAlign: 'left' }}>
          <div className="flex items-center justify-between">
            <div><span className="font-bold">Rahul Singh</span> <span className="badge badge-locked" style={{ marginLeft: 6 }}>Admin</span></div>
          </div>
          <div className="mono text-sm text-muted" style={{ marginTop: 4 }}>Azure AD group: HR-Admins</div>
        </div>
        <div className="org-arrow">↓</div>
        <div className="org-card" style={{ textAlign: 'left' }}>
          <div className="flex items-center justify-between">
            <div><span className="font-bold">Neha Kapoor</span> <span className="badge badge-approved" style={{ marginLeft: 6 }}>Manager</span></div>
          </div>
          <div className="mono text-sm text-muted" style={{ marginTop: 4 }}>Azure AD group: L1-Managers</div>
        </div>
        <div className="org-arrow">↓</div>
        <div className="org-card" style={{ textAlign: 'left' }}>
          <div className="flex items-center justify-between">
            <div><span className="font-bold">Priya Sharma, Arjun Mehta</span> <span className="badge badge-pending" style={{ marginLeft: 6 }}>Employee</span></div>
          </div>
          <div className="mono text-sm text-muted" style={{ marginTop: 4 }}>Azure AD groups: Sales-Team / Ops-Team</div>
        </div>
      </div>
    </div>
  );
}
