import React, { useState } from 'react';
import { EMPLOYEES } from '../../data/seedData';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryMsg, setRecoveryMsg] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    setError('');

    // Find the user by id (username)
    const userKey = Object.keys(EMPLOYEES).find(k => k === username.toLowerCase());
    
    if (!userKey) {
      setError('Invalid username or password.');
      return;
    }

    const user = EMPLOYEES[userKey];
    if (user.password !== password) {
      setError('Invalid username or password.');
      return;
    }

    onLogin(user.role, userKey);
  }

  function handleRecover(e) {
    e.preventDefault();
    if (!recoveryEmail) return;
    setRecoveryMsg(`A password recovery link has been sent to ${recoveryEmail}.`);
    setTimeout(() => {
      setShowForgot(false);
      setRecoveryMsg('');
      setRecoveryEmail('');
    }, 3000);
  }

  return (
    <div className="app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div className="card" style={{ width: 400, maxWidth: '90%', padding: '40px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <h1 style={{ fontSize: 32, margin: 0 }}>⚛ AtomQuest</h1>
          <p className="text-muted" style={{ marginTop: 8 }}>Goal Tracking Portal</p>
        </div>

        {error && <div className="alert alert-danger" style={{ marginBottom: 20 }}>{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Username (Role ID)</label>
            <input 
              className="form-input" 
              placeholder="e.g. emp1, mgr1, admin1" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              className="form-input" 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            Sign In
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button 
            className="btn" 
            style={{ background: 'transparent', color: 'var(--muted)', fontSize: 13, border: 'none', padding: 0 }}
            onClick={() => setShowForgot(true)}
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {showForgot && (
        <div className="overlay" onClick={() => setShowForgot(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <span className="modal-title">Recover Password</span>
              <button className="modal-close" onClick={() => setShowForgot(false)} aria-label="Close modal">×</button>
            </div>
            <div className="modal-body">
              {recoveryMsg ? (
                <div className="alert alert-success">{recoveryMsg}</div>
              ) : (
                <form onSubmit={handleRecover}>
                  <p className="text-muted text-sm" style={{ marginBottom: 16 }}>
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email"
                      className="form-input" 
                      placeholder="name@atomberg.com" 
                      value={recoveryEmail}
                      onChange={e => setRecoveryEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Send Recovery Link
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
