import React from 'react';
import ProgressBar from './ProgressBar';

export default function WeightMeter({ totalWeight }) {
  const cls = totalWeight === 100 ? 'wt-ok' : totalWeight > 100 ? 'wt-err' : 'wt-warn';
  const barColor = totalWeight === 100 ? 'progress-green' : totalWeight > 100 ? 'progress-fill' : 'progress-accent';
  return (
    <div className="weight-meter">
      <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
        <span className={`weight-total ${cls}`}>{totalWeight}%</span>
        <span className="text-muted text-sm">of 100% allocated</span>
      </div>
      <ProgressBar value={totalWeight} color={barColor} />
      {totalWeight !== 100 && (
        <div className="form-hint" style={{ marginTop: 6 }}>
          {totalWeight < 100
            ? `${100 - totalWeight}% remaining — total must equal 100% before submitting.`
            : `Exceeds 100% by ${totalWeight - 100}% — remove or reduce weightage.`}
        </div>
      )}
    </div>
  );
}
