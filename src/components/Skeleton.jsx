import React from 'react';

export default function Skeleton({ type = 'text', count = 1 }) {
  const elements = [];
  for (let i = 0; i < count; i++) {
    elements.push(
      <div 
        key={i} 
        className={`skeleton skeleton-${type}`} 
      />
    );
  }
  return <>{elements}</>;
}
