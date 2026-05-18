import React from 'react';

export default function ProgressBar({ value, color = 'progress-accent', style = {} }) {
  const w = Math.min(100, Math.max(0, value || 0));
  return (
    <div className="progress-wrap" style={style}>
      <div className={`progress-fill ${color}`} style={{ width: `${w}%` }} />
    </div>
  );
}
