import React, { useState } from 'react';
import { THRUST_AREAS, UOM_TYPES } from '../data/seedData';

export default function AddGoalModal({ currentWeight, goalCount, onAdd, onClose }) {
  const [form, setForm] = useState({ title: '', desc: '', thrust: THRUST_AREAS[0], uom: UOM_TYPES[0], target: '', weightage: '', shared: false });
  const [errors, setErrors] = useState({});
  const remaining = 100 - currentWeight;

  function getHint(uom) {
    if (uom === 'Zero-based') return 'Target is always 0';
    if (uom === 'Timeline') return 'Pick the deadline date';
    if (uom.includes('%')) return 'Enter a percentage value';
    return 'Enter a numeric value';
  }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = 'Goal title is required';
    if (form.uom !== 'Zero-based' && (form.target === '' || form.target === null)) e.target = 'Target value is required';
    const w = parseInt(form.weightage);
    if (form.weightage === '' || isNaN(w)) e.weightage = 'Weightage must be a number';
    else if (w < 10) e.weightage = 'Minimum weightage per goal is 10%';
    else if (currentWeight + w > 100) e.weightage = `Adding this goal would exceed 100% (${remaining}% remaining)`;
    if (goalCount >= 8) e.general = 'Maximum 8 goals per employee reached';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    const target = form.uom === 'Zero-based' ? 0 : form.uom === 'Timeline' ? form.target : parseFloat(form.target);
    onAdd({ ...form, target, weightage: parseInt(form.weightage) });
    onClose();
  }

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Add New Goal</span>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">×</button>
        </div>
        <div className="modal-body">
          <div className="alert alert-info">{goalCount}/8 goals · {currentWeight}% used · {remaining}% remaining</div>
          {errors.general && <div className="alert alert-danger">{errors.general}</div>}

          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" maxLength={120} value={form.title} onChange={e => set('title', e.target.value)} placeholder="Goal title" />
            {errors.title && <div className="form-error">{errors.title}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Optional description" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Thrust Area</label>
              <select className="form-select" value={form.thrust} onChange={e => set('thrust', e.target.value)}>
                {THRUST_AREAS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Unit of Measurement</label>
              <select className="form-select" value={form.uom} onChange={e => { set('uom', e.target.value); if (e.target.value === 'Zero-based') set('target', 0); else set('target', ''); }}>
                {UOM_TYPES.map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Target</label>
              {form.uom === 'Zero-based' ? (
                <input className="form-input" value="0" disabled />
              ) : form.uom === 'Timeline' ? (
                <input className="form-input" type="date" value={form.target} onChange={e => set('target', e.target.value)} />
              ) : (
                <input className="form-input" type="number" value={form.target} onChange={e => set('target', e.target.value)} placeholder={getHint(form.uom)} />
              )}
              {errors.target && <div className="form-error">{errors.target}</div>}
              <div className="form-hint">{getHint(form.uom)}</div>
            </div>
            <div className="form-group">
              <label className="form-label">Weightage (%)</label>
              <input className="form-input" type="number" min="10" max={remaining} value={form.weightage} onChange={e => set('weightage', e.target.value)} placeholder="Min 10%" />
              {errors.weightage && <div className="form-error">{errors.weightage}</div>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-check">
              <input type="checkbox" checked={form.shared} onChange={e => set('shared', e.target.checked)} />
              <span>Mark as Shared Goal</span>
            </label>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={goalCount >= 8}>Submit Goal</button>
        </div>
      </div>
    </div>
  );
}
