import React from 'react';

export default function StatCard({ value, label, colorClass = 'text-accent' }) {
  return (
    <div className="stat-card">
      <div className={`stat-num ${colorClass}`}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
