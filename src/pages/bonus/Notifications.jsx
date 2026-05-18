import React, { useState } from 'react';

export default function Notifications({ notifications, currentUserId, markNotifRead, markAllRead }) {
  const [filter, setFilter] = useState('all');
  const mine = notifications.filter(n => n.to === currentUserId || currentUserId === 'admin1');
  const filtered = mine.filter(n => {
    if (filter === 'email') return n.channel === 'email';
    if (filter === 'teams') return n.channel === 'teams';
    if (filter === 'unread') return !n.read;
    return true;
  });

  return (
    <div className="page">
      <div className="page-header">
        <div><div className="page-title">Notifications</div><div className="page-sub">Email & Teams notification centre</div></div>
        <button className="btn btn-secondary" onClick={() => markAllRead(currentUserId)}>Mark all as read</button>
      </div>

      <div className="tabs">
        {['all', 'email', 'teams', 'unread'].map(f => (
          <div key={f} className={`tab${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : f === 'email' ? '✉ Email' : f === 'teams' ? '🟦 Teams' : 'Unread'}
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty"><div className="empty-icon">🔔</div>No notifications to display.</div>
      ) : filtered.map(n => (
        <div key={n.id} className={`notif-card${!n.read ? ' unread' : ''}`} onClick={() => markNotifRead(n.id)}>
          <span className="notif-icon">{n.channel === 'teams' ? '🟦' : '✉'}</span>
          <div className="notif-body">
            <div className="notif-subject">{n.subject}</div>
            <div className="notif-text">{n.body}</div>
            {n.channel === 'teams' && (
              <div className="teams-card">
                <div className="teams-card-header"><span>🟦</span> <span className="teams-card-bot">AtomQuest Bot</span></div>
                <div className="teams-card-title">{n.subject}</div>
                <div className="teams-card-body">{n.body}</div>
                <button className="teams-card-btn">Open in Portal</button>
              </div>
            )}
            <div className="notif-time">{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
