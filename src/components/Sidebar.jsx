import React from 'react';
import { NAV_ITEMS } from '../data/seedData';

export default function Sidebar({ role, page, setPage, pendingApprovals, unreadNotifs, currentUser, isOpen, closeSidebar, onLogout }) {
  const items = NAV_ITEMS[role] || [];

  return (
    <>
      {isOpen && <div className="overlay" style={{ zIndex: 85 }} onClick={closeSidebar} />}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <h1>⚛ AtomQuest</h1>
          <p>Goal Tracking Portal</p>
        </div>
        <nav className="sidebar-nav">
        {items.map(item => {
          const isActive = page === item.key;
          const showDot = (item.key === 'approvals' && pendingApprovals > 0) ||
                          (item.key === 'notifications' && unreadNotifs > 0);
          return (
            <div
              key={item.key}
              className={`nav-item${isActive ? ' active' : ''}`}
              onClick={() => { setPage(item.key); closeSidebar(); }}
              tabIndex={0}
              role="button"
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
              {showDot && <span className="notif-dot" />}
            </div>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        {currentUser && (
          <div className="sidebar-user" style={{ marginBottom: 12 }}>
            <strong>{currentUser.name}</strong>
            <div className="text-muted text-sm">{currentUser.dept}</div>
          </div>
        )}
        <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={onLogout}>
          Logout
        </button>
      </div>
      </div>
    </>
  );
}
