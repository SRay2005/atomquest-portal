import { useState } from 'react';
import { INITIAL_GOALS } from '../data/seedData';
import { uid } from '../utils/scoring';

export function useGoals() {
  const [goals, setGoals] = useState(INITIAL_GOALS);

  function addGoal(formData, empId) {
    const myGoals = goals.filter(g => g.emp === empId);
    const currentTotal = myGoals.reduce((s, g) => s + g.weightage, 0);
    if (myGoals.length >= 8) return { success: false, error: 'Maximum 8 goals per employee reached' };
    if (formData.weightage < 10) return { success: false, error: 'Minimum weightage per goal is 10%' };
    if (currentTotal + formData.weightage > 100) return { success: false, error: `Adding this would exceed 100% (${100 - currentTotal}% remaining)` };
    const newGoal = {
      ...formData,
      id: uid(),
      emp: empId,
      status: 'pending',
      qStatus: 'Not Started',
      q1Actual: 0, q2Actual: 0, q3Actual: 0, q4Actual: 0,
      primaryOwner: formData.shared ? empId : empId,
    };
    setGoals(prev => [...prev, newGoal]);
    return { success: true };
  }

  function approveGoal(id) {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, status: 'approved' } : g));
  }

  function returnGoal(id) {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, status: 'rework' } : g));
  }

  function updateGoal(id, updates) {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  }

  function unlockGoal(id) {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, status: 'pending' } : g));
  }

  function updateActual(id, qKey, value, currentEmpId) {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        return { ...g, [qKey]: parseFloat(value) || 0 };
      }
      // Sync shared goals from primary owner
      const source = prev.find(x => x.id === id);
      if (source && source.shared && source.primaryOwner === currentEmpId && g.shared && g.title === source.title && g.id !== id) {
        return { ...g, [qKey]: parseFloat(value) || 0 };
      }
      return g;
    }));
  }

  function updateQStatus(id, status) {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, qStatus: status } : g));
  }

  function deleteGoal(id) {
    const goal = goals.find(g => g.id === id);
    if (goal?.status === 'approved') return { success: false, error: 'Cannot delete approved goals' };
    setGoals(prev => prev.filter(g => g.id !== id));
    return { success: true };
  }

  return { goals, setGoals, addGoal, approveGoal, returnGoal, updateGoal, unlockGoal, updateActual, updateQStatus, deleteGoal };
}
