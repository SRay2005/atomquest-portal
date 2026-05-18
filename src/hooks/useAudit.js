import { useState } from 'react';
import { INITIAL_AUDIT } from '../data/seedData';
import { uid } from '../utils/scoring';

export function useAudit() {
  const [auditLog, setAuditLog] = useState(INITIAL_AUDIT);

  function addAudit(action, goalId, detail, userName) {
    const entry = {
      id: uid(),
      time: new Date().toLocaleString(),
      user: userName,
      action,
      goalId: goalId || null,
      detail,
    };
    setAuditLog(prev => [entry, ...prev]); // newest first
  }

  return { auditLog, addAudit };
}
