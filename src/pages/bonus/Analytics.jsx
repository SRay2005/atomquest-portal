import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { QOQ_DATA, HEATMAP_DATA, THRUST_AREAS, UOM_TYPES, EMPLOYEES } from '../../data/seedData';
import { calcScore } from '../../utils/scoring';

const COLORS = { accent: '#f0a500', blue: '#3b82f6', success: '#22c55e', warn: '#f59e0b', danger: '#ef4444' };
const ttStyle = { background: '#1e2330', border: '1px solid #2a3045', fontSize: 12, fontFamily: 'Sora' };
const axTick = { fill: '#6b7694', fontSize: 11 };

function heatColor(v) {
  if (v === 0) return '#2a3045';
  if (v <= 50) { const t = v / 50; return `rgb(${Math.round(127 + 90 * t)}, ${Math.round(29 + 90 * t)}, ${Math.round(29 + 8 * t)})`; }
  const t = (v - 50) / 50;
  return `rgb(${Math.round(217 - 196 * t)}, ${Math.round(119 + 9 * t)}, ${Math.round(6 + 55 * t)})`;
}

export default function Analytics({ goals, checkinComments }) {
  const thrustData = THRUST_AREAS.map(t => ({ name: t.substring(0, 10), count: goals.filter(g => g.thrust === t).length })).filter(d => d.count > 0);
  const uomData = UOM_TYPES.map(u => ({ name: u, count: goals.filter(g => g.uom === u).length })).filter(d => d.count > 0);
  const statusData = [
    { name: 'Approved', value: goals.filter(g => g.status === 'approved').length, color: COLORS.success },
    { name: 'Pending', value: goals.filter(g => g.status === 'pending').length, color: COLORS.warn },
    { name: 'Rework', value: goals.filter(g => g.status === 'rework').length, color: COLORS.danger },
    { name: 'Draft', value: goals.filter(g => g.status === 'draft').length, color: '#6b7694' },
  ].filter(d => d.value > 0);

  // Manager effectiveness
  const managers = Object.entries(EMPLOYEES).filter(([, e]) => e.role === 'manager');
  const mgrTable = managers.map(([mId, mgr]) => {
    const reports = Object.entries(EMPLOYEES).filter(([, e]) => e.manager === mId);
    const reportIds = reports.map(([id]) => id);
    const teamGoals = goals.filter(g => reportIds.includes(g.emp));
    const approvedG = teamGoals.filter(g => g.status === 'approved');
    const avgScore = approvedG.length > 0 ? Math.round(approvedG.reduce((s, g) => s + calcScore(g, g.q1Actual ?? 0), 0) / approvedG.length) : 0;
    const comments = Object.keys(checkinComments).filter(k => reportIds.some(id => k.startsWith(id))).length;
    const completed = approvedG.filter(g => g.qStatus === 'Completed').length;
    const compRate = approvedG.length > 0 ? Math.round((completed / approvedG.length) * 100) : 0;
    return { name: mgr.name, reports: reports.length, approved: approvedG.length, avgScore, comments, compRate };
  });

  return (
    <div className="page">
      <div className="page-header"><div><div className="page-title">Analytics</div><div className="page-sub">Quarter-on-quarter trends, distributions & insights</div></div></div>

      {/* Section 1: QoQ Trend */}
      <div className="card">
        <div className="card-title">Quarter-on-Quarter Trend</div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={QOQ_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3045" />
            <XAxis dataKey="quarter" tick={axTick} />
            <YAxis domain={[0, 100]} tick={axTick} />
            <Tooltip contentStyle={ttStyle} />
            <Legend />
            <Line type="monotone" dataKey="avgScore" stroke={COLORS.accent} strokeWidth={2} dot={{ fill: COLORS.accent }} name="Avg Score %" />
            <Line type="monotone" dataKey="completed" stroke={COLORS.blue} strokeWidth={2} dot={{ fill: COLORS.blue }} name="Goals Completed" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Section 2: Heatmap */}
      <div className="card">
        <div className="card-title">Completion Heatmap</div>
        <div className="heatmap-grid">
          <div className="heatmap-row">
            <div className="heatmap-label" />
            {['Q1', 'Q2', 'Q3', 'Q4'].map(q => <div className="heatmap-qlabel" key={q}>{q}</div>)}
          </div>
          {HEATMAP_DATA.map(emp => (
            <div className="heatmap-row" key={emp.name}>
              <div className="heatmap-label">{emp.name}</div>
              {['q1', 'q2', 'q3', 'q4'].map(q => (
                <div key={q} className="heatmap-cell" style={{ background: heatColor(emp[q]) }} title={`${emp.name} — ${q.toUpperCase()}: ${emp[q]}%`}>
                  {emp[q] === 0 ? '—' : emp[q]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Distributions */}
      <div className="grid3">
        <div className="card">
          <div className="card-title">By Thrust Area</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={thrustData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3045" />
              <XAxis dataKey="name" tick={axTick} />
              <YAxis tick={axTick} />
              <Tooltip contentStyle={ttStyle} />
              <Bar dataKey="count" fill={COLORS.blue} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title">By UoM Type</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={uomData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3045" />
              <XAxis type="number" tick={axTick} />
              <YAxis dataKey="name" type="category" tick={axTick} width={90} />
              <Tooltip contentStyle={ttStyle} />
              <Bar dataKey="count" fill={COLORS.accent} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <div className="card-title">By Status</div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {statusData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={ttStyle} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section 4: Manager Effectiveness */}
      <div className="table-wrap">
        <div className="table-header"><span className="card-title" style={{ margin: 0 }}>Manager Effectiveness Dashboard</span></div>
        <table>
          <thead><tr><th>Manager</th><th>Reports</th><th>Goals Approved</th><th>Avg Q1 Score</th><th>Check-in Comments</th><th>Completion Rate</th></tr></thead>
          <tbody>
            {mgrTable.sort((a, b) => b.compRate - a.compRate).map(m => (
              <tr key={m.name}>
                <td className="font-bold">{m.name}</td>
                <td className="mono">{m.reports}</td>
                <td className="mono">{m.approved}</td>
                <td>
                  <div className="mini-progress">
                    <div className="mini-bar"><div className="mini-fill" style={{ width: `${m.avgScore}%`, background: COLORS.accent }} /></div>
                    <span className="mono text-sm text-accent">{m.avgScore}%</span>
                  </div>
                </td>
                <td className="mono">{m.comments}</td>
                <td className="mono">{m.compRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
