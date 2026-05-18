/**
 * Scoring Engine — AtomQuest Goal Portal
 * All scoring logic lives here. Import everywhere scores are displayed.
 */

function calcScore(goal, actual) {
  const uom = goal.uom;
  const t = parseFloat(goal.target);
  const a = parseFloat(actual);

  if (isNaN(a)) return 0;

  if (uom === 'Min (Numeric)' || uom === 'Min (%)') {
    if (a >= t) return 100;
    return t > 0 ? Math.min(100, Math.round((a / t) * 100)) : 0;
  }

  if (uom === 'Max (Numeric)' || uom === 'Max (%)') {
    if (a <= t) return 100;
    return a > 0 ? Math.min(100, Math.round((t / a) * 100)) : 100;
  }

  if (uom === 'Zero-based') {
    return a === 0 ? 100 : 0;
  }

  if (uom === 'Timeline') {
    if (!goal.target) return 0;
    const deadline = new Date(goal.target);
    const done = actual ? new Date(actual) : new Date();
    if (done <= deadline) return 100;
    const daysLate = Math.round((done - deadline) / 86400000);
    return Math.max(0, 100 - daysLate * 5);
  }

  return 0;
}

function calcWeightedScore(goals, qKey = 'q1Actual') {
  const approved = goals.filter(g => g.status === 'approved');
  if (!approved.length) return 0;
  const total = approved.reduce((sum, g) => {
    const score = calcScore(g, g[qKey] ?? 0);
    return sum + (score * g.weightage) / 100;
  }, 0);
  return Math.round(total);
}

function scoreColor(score) {
  if (score >= 80) return 'var(--success)';
  if (score >= 50) return 'var(--warn)';
  return 'var(--danger)';
}

function uid() {
  return Math.random().toString(36).slice(2, 8);
}

export { calcScore, calcWeightedScore, scoreColor, uid };
