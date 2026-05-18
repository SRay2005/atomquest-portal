import React, { useState } from 'react';
import './styles/tokens.css';
import './styles/components.css';

import { EMPLOYEES, INITIAL_NOTIFICATIONS, INITIAL_ESCALATION_RULES, INITIAL_ESCALATIONS, INITIAL_WINDOWS, QUARTER_KEY_MAP } from './data/seedData';
import { useGoals } from './hooks/useGoals';
import { useAudit } from './hooks/useAudit';
import { uid } from './utils/scoring';

import Sidebar from './components/Sidebar';
import AddGoalModal from './components/AddGoalModal';
import ViewGoalModal from './components/ViewGoalModal';
import Skeleton from './components/Skeleton';

// Employee pages
import EmpDashboard from './pages/employee/EmpDashboard';
import MyGoals from './pages/employee/MyGoals';
import EmpCheckin from './pages/employee/EmpCheckin';

// Manager pages
import MgrDashboard from './pages/manager/MgrDashboard';
import Approvals from './pages/manager/Approvals';
import TeamGoals from './pages/manager/TeamGoals';
import MgrCheckin from './pages/manager/MgrCheckin';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import CycleMgmt from './pages/admin/CycleMgmt';
import AllGoals from './pages/admin/AllGoals';
import AuditLog from './pages/admin/AuditLog';
import Reports from './pages/admin/Reports';

// Bonus pages
import SSOLogin from './pages/bonus/SSOLogin';
import Notifications from './pages/bonus/Notifications';
import Escalations from './pages/bonus/Escalations';
import Analytics from './pages/bonus/Analytics';

import Login from './pages/auth/Login';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('employee');
  const [currentUserId, setCurrentUserId] = useState('emp1');
  const [page, setPage] = useState('dashboard');
  const [modal, setModal] = useState(null);
  const [activeQ, setActiveQ] = useState('Q1 (Jul)');
  const [checkinComments, setCheckinComments] = useState({});
  const [cycleOpen, setCycleOpen] = useState(true);
  const [windowStatuses, setWindowStatuses] = useState(INITIAL_WINDOWS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [escalationRules, setEscalationRules] = useState(INITIAL_ESCALATION_RULES);
  const [escalations, setEscalations] = useState(INITIAL_ESCALATIONS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading state on page change for demo purposes
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [page, role]);

  const { goals, addGoal, approveGoal, returnGoal, updateGoal, unlockGoal, updateActual, updateQStatus, deleteGoal } = useGoals();
  const { auditLog, addAudit } = useAudit();

  const currentUser = EMPLOYEES[currentUserId];
  const qKey = QUARTER_KEY_MAP[activeQ] || 'q1Actual';

  const pendingApprovals = goals.filter(g => g.status === 'pending').length;
  const unreadNotifs = notifications.filter(n => (n.to === currentUserId || currentUserId === 'admin1') && !n.read).length;

  function addNotification(data) {
    setNotifications(prev => [{ ...data, id: uid(), read: false, time: new Date().toLocaleString() }, ...prev]);
  }

  function markNotifRead(id) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => (n.to === currentUserId || currentUserId === 'admin1') ? { ...n, read: true } : n));
  }

  function handleDeleteGoal(id) {
    const result = deleteGoal(id);
    if (!result.success) return;
    addAudit('Goal deleted', id, `Goal deleted by ${currentUser.name}`, currentUser.name);
  }

  function handleAddGoal(formData) {
    const result = addGoal(formData, currentUserId);
    if (result.success) {
      addAudit('Goal submitted', null, `Goal '${formData.title}' submitted for approval`, currentUser.name);
      addNotification({
        type: 'approval', to: 'mgr1', toName: EMPLOYEES.mgr1.name,
        subject: 'Goal Submitted for Approval',
        body: `${currentUser.name} has submitted '${formData.title}' for your approval.`,
        channel: 'teams', deepLink: '/approvals'
      });
    }
  }

  function handleLogin(assignedRole, userId) {
    setRole(assignedRole);
    setCurrentUserId(userId);
    setPage('dashboard');
    setIsAuthenticated(true);
  }

  function handleLogout() {
    setIsAuthenticated(false);
    setRole('employee');
    setCurrentUserId('emp1');
  }

  function renderPage() {
    if (isLoading) {
      return (
        <div className="page">
          <div className="page-header">
            <div style={{ width: '100%' }}>
              <Skeleton type="title" />
              <Skeleton type="text" />
            </div>
          </div>
          <div className="stats-row" style={{ marginBottom: 20 }}>
            <Skeleton type="card" />
            <Skeleton type="card" />
            <Skeleton type="card" />
            <Skeleton type="card" />
          </div>
          <div className="grid2">
            <Skeleton type="card" />
            <Skeleton type="card" />
          </div>
        </div>
      );
    }

    // Employee
    if (role === 'employee') {
      if (page === 'dashboard') return <EmpDashboard goals={goals} empId={currentUserId} activeQ={activeQ} qKey={qKey} setPage={setPage} setModal={setModal} />;
      if (page === 'goals') return <MyGoals goals={goals} empId={currentUserId} onAdd={handleAddGoal} onDelete={handleDeleteGoal} setModal={setModal} />;
      if (page === 'checkin') return <EmpCheckin goals={goals} empId={currentUserId} activeQ={activeQ} setActiveQ={setActiveQ} updateActual={updateActual} updateQStatus={updateQStatus} windowStatuses={windowStatuses} />;
      if (page === 'notifications') return <Notifications notifications={notifications} currentUserId={currentUserId} markNotifRead={markNotifRead} markAllRead={markAllRead} />;
    }

    // Manager
    if (role === 'manager') {
      if (page === 'dashboard') return <MgrDashboard goals={goals} />;
      if (page === 'approvals') return <Approvals goals={goals} approveGoal={approveGoal} returnGoal={returnGoal} updateGoal={updateGoal} addAudit={addAudit} addNotification={addNotification} currentUser={currentUser} />;
      if (page === 'team') return <TeamGoals goals={goals} activeQ={activeQ} />;
      if (page === 'checkin') return <MgrCheckin goals={goals} activeQ={activeQ} setActiveQ={setActiveQ} checkinComments={checkinComments} setCheckinComments={setCheckinComments} currentUser={currentUser} />;
      if (page === 'notifications') return <Notifications notifications={notifications} currentUserId={currentUserId} markNotifRead={markNotifRead} markAllRead={markAllRead} />;
    }

    // Admin
    if (role === 'admin') {
      if (page === 'dashboard') return <AdminDashboard goals={goals} auditLog={auditLog} />;
      if (page === 'cycle') return <CycleMgmt cycleOpen={cycleOpen} setCycleOpen={setCycleOpen} windowStatuses={windowStatuses} setWindowStatuses={setWindowStatuses} addAudit={addAudit} currentUser={currentUser} />;
      if (page === 'allgoals') return <AllGoals goals={goals} unlockGoal={unlockGoal} addAudit={addAudit} currentUser={currentUser} />;
      if (page === 'audit') return <AuditLog auditLog={auditLog} />;
      if (page === 'reports') return <Reports goals={goals} />;
      if (page === 'escalations') return <Escalations escalationRules={escalationRules} setEscalationRules={setEscalationRules} escalations={escalations} setEscalations={setEscalations} addAudit={addAudit} currentUser={currentUser} />;
      if (page === 'analytics') return <Analytics goals={goals} checkinComments={checkinComments} />;
      if (page === 'notifications') return <Notifications notifications={notifications} currentUserId={currentUserId} markNotifRead={markNotifRead} markAllRead={markAllRead} />;
      if (page === 'sso') return <SSOLogin />;
    }

    return <EmpDashboard goals={goals} empId={currentUserId} activeQ={activeQ} qKey={qKey} setPage={setPage} setModal={setModal} />;
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Sidebar
        role={role} page={page} setPage={setPage} setRole={setRole}
        pendingApprovals={pendingApprovals} unreadNotifs={unreadNotifs}
        currentUser={currentUser} isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
      />
      <div className="main">
        <div className="mobile-header">
          <div className="font-bold" style={{ fontSize: 16 }}>⚛ AtomQuest</div>
          <button className="mobile-menu-btn" onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">☰</button>
        </div>
        {renderPage()}
      </div>

      {modal?.type === 'addGoal' && (
        <AddGoalModal
          currentWeight={goals.filter(g => g.emp === currentUserId).reduce((s, g) => s + g.weightage, 0)}
          goalCount={goals.filter(g => g.emp === currentUserId).length}
          onAdd={handleAddGoal}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === 'viewGoal' && (
        <ViewGoalModal goal={modal.data} activeQ={activeQ} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
