import React from 'react';

export function GoalStatusBadge({ status }) {
  const cls = {
    pending: 'badge-pending', approved: 'badge-approved',
    rework: 'badge-rework', locked: 'badge-locked', draft: 'badge-draft',
  }[status] || 'badge-draft';
  return <span className={`badge ${cls}`}>{status}</span>;
}

export function QStatusBadge({ status }) {
  const cls = {
    'Not Started': 'badge-not-started',
    'On Track': 'badge-on-track',
    'Completed': 'badge-completed',
  }[status] || 'badge-not-started';
  return <span className={`badge ${cls}`}>{status}</span>;
}
