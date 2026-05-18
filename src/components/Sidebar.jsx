import React from 'react';
import { NAV_ITEMS } from '../data/seedData';

export default function Sidebar({ role, page, setPage, setRole, pendingApprovals, unreadNotifs, currentUser, isOpen, closeSidebar }) {
  const items = NAV_ITEMS[role] || [];
  const roleLabels = { employee: 'Emp', manager: 'Mgr', admin: 'Admin' };

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
        <div className="role-switcher">
          {Object.entries(roleLabels).map(([r, label]) => (
            <button
              key={r}
              className={`role-btn${role === r ? ' active' : ''}`}
              onClick={() => { setRole(r); setPage('dashboard'); closeSidebar(); }}
            >
              {label}
            </button>
          ))}
        </div>
        {currentUser && (
          <div className="sidebar-user">
            <strong>{currentUser.name}</strong>
            {currentUser.dept}
          </div>
        )}
      </div>
      </div>
    </>
  );
}
