/**
 * Seed Data — AtomQuest Goal Portal
 * All constants, initial state, and demo data.
 */

/* ─── Thrust Areas ─── */
export const THRUST_AREAS = [
  'Sales & Revenue', 'Operations', 'Product & Tech',
  'Customer Experience', 'HR & Culture', 'Finance', 'Safety & Compliance',
];

/* ─── Units of Measurement ─── */
export const UOM_TYPES = [
  'Min (Numeric)', 'Min (%)', 'Max (Numeric)', 'Max (%)', 'Timeline', 'Zero-based',
];

/* ─── Q-Status Options ─── */
export const STATUS_OPTIONS = ['Not Started', 'On Track', 'Completed'];

/* ─── Quarters ─── */
export const QUARTERS = ['Q1 (Jul)', 'Q2 (Oct)', 'Q3 (Jan)', 'Q4 (Mar)'];

export const QUARTER_KEY_MAP = {
  'Q1 (Jul)': 'q1Actual',
  'Q2 (Oct)': 'q2Actual',
  'Q3 (Jan)': 'q3Actual',
  'Q4 (Mar)': 'q4Actual',
};

/* ─── Employees ─── */
export const EMPLOYEES = {
  emp1:  { name: 'Priya Sharma', dept: 'Sales',      role: 'employee', manager: 'mgr1',  email: 'priya.sharma@atomberg.com',  azureGroup: 'Sales-Team'  },
  emp2:  { name: 'Arjun Mehta',  dept: 'Operations',  role: 'employee', manager: 'mgr1',  email: 'arjun.mehta@atomberg.com',   azureGroup: 'Ops-Team'    },
  mgr1:  { name: 'Neha Kapoor',  dept: 'All Teams',   role: 'manager',                    email: 'neha.kapoor@atomberg.com',   azureGroup: 'L1-Managers' },
  admin1:{ name: 'Rahul Singh',  dept: 'HR',          role: 'admin',                      email: 'rahul.singh@atomberg.com',   azureGroup: 'HR-Admins'   },
};

/* ─── Initial Goals ─── */
export const INITIAL_GOALS = [
  {
    id: 'g1', emp: 'emp1', title: 'Increase Sales Revenue',
    thrust: 'Sales & Revenue', uom: 'Min (%)', target: 20, weightage: 30,
    status: 'approved', qStatus: 'On Track',
    q1Actual: 12, q2Actual: 0, q3Actual: 0, q4Actual: 0,
    desc: 'Grow sales by 20% YoY through new channel expansion',
    shared: false, primaryOwner: 'emp1',
  },
  {
    id: 'g2', emp: 'emp1', title: 'Reduce Delivery TAT',
    thrust: 'Operations', uom: 'Max (%)', target: 15, weightage: 25,
    status: 'approved', qStatus: 'On Track',
    q1Actual: 8, q2Actual: 0, q3Actual: 0, q4Actual: 0,
    desc: 'Reduce delivery turn-around time by 15%',
    shared: false, primaryOwner: 'emp1',
  },
  {
    id: 'g3', emp: 'emp1', title: 'Zero Safety Incidents',
    thrust: 'Safety & Compliance', uom: 'Zero-based', target: 0, weightage: 20,
    status: 'approved', qStatus: 'On Track',
    q1Actual: 0, q2Actual: 0, q3Actual: 0, q4Actual: 0,
    desc: 'Achieve zero safety incidents across all touchpoints',
    shared: true, primaryOwner: 'emp1',
  },
  {
    id: 'g4', emp: 'emp1', title: 'Product Launch Q2',
    thrust: 'Product & Tech', uom: 'Timeline', target: '2025-10-01', weightage: 15,
    status: 'pending', qStatus: 'Not Started',
    q1Actual: 0, q2Actual: 0, q3Actual: 0, q4Actual: 0,
    desc: 'Launch new fan product line by Q2 deadline',
    shared: false, primaryOwner: 'emp1',
  },
  {
    id: 'g5', emp: 'emp1', title: 'Training Completion Rate',
    thrust: 'HR & Culture', uom: 'Min (%)', target: 90, weightage: 10,
    status: 'approved', qStatus: 'Completed',
    q1Actual: 90, q2Actual: 0, q3Actual: 0, q4Actual: 0,
    desc: '90% team training completion for FY cycle',
    shared: false, primaryOwner: 'emp1',
  },
  {
    id: 'g6', emp: 'emp2', title: 'Customer NPS Score',
    thrust: 'Customer Experience', uom: 'Min (Numeric)', target: 50, weightage: 40,
    status: 'approved', qStatus: 'On Track',
    q1Actual: 38, q2Actual: 0, q3Actual: 0, q4Actual: 0,
    desc: 'Achieve Net Promoter Score of 50',
    shared: false, primaryOwner: 'emp2',
  },
  {
    id: 'g7', emp: 'emp2', title: 'Cost Reduction Initiative',
    thrust: 'Finance', uom: 'Max (%)', target: 10, weightage: 30,
    status: 'approved', qStatus: 'Not Started',
    q1Actual: 0, q2Actual: 0, q3Actual: 0, q4Actual: 0,
    desc: 'Reduce OPEX by 10% through process improvement',
    shared: false, primaryOwner: 'emp2',
  },
  {
    id: 'g8', emp: 'emp2', title: 'Zero Safety Incidents',
    thrust: 'Safety & Compliance', uom: 'Zero-based', target: 0, weightage: 15,
    status: 'approved', qStatus: 'On Track',
    q1Actual: 0, q2Actual: 0, q3Actual: 0, q4Actual: 0,
    desc: 'Achieve zero safety incidents',
    shared: true, primaryOwner: 'emp1',
  },
  {
    id: 'g9', emp: 'emp2', title: 'Hiring Target',
    thrust: 'HR & Culture', uom: 'Min (Numeric)', target: 20, weightage: 15,
    status: 'rework', qStatus: 'Not Started',
    q1Actual: 0, q2Actual: 0, q3Actual: 0, q4Actual: 0,
    desc: 'Hire 20 engineers for the product team',
    shared: false, primaryOwner: 'emp2',
  },
];

/* ─── Initial Audit Log ─── */
export const INITIAL_AUDIT = [
  { id: 'a1', time: '2025-05-03 09:12', user: 'Neha Kapoor', action: 'Goal approved',           goalId: 'g1',  detail: "Goal 'Increase Sales Revenue' approved" },
  { id: 'a2', time: '2025-05-03 09:15', user: 'Neha Kapoor', action: 'Goal returned for rework', goalId: 'g9',  detail: 'Hiring Target sent back — revise weightage' },
  { id: 'a3', time: '2025-05-05 11:00', user: 'Admin',        action: 'Cycle opened',             goalId: null,  detail: 'Q1 Check-in window opened' },
];

/* ─── Initial Notifications ─── */
export const INITIAL_NOTIFICATIONS = [
  { id: 'n1', type: 'approval',  to: 'mgr1',   toName: 'Neha Kapoor',  subject: 'Goal Submitted for Approval',    body: "Priya Sharma has submitted 'Product Launch Q2' for your approval.",                   channel: 'teams', read: false, time: '2025-05-04 10:30', deepLink: '/approvals' },
  { id: 'n2', type: 'approved',  to: 'emp1',   toName: 'Priya Sharma', subject: 'Your Goal Was Approved ✓',        body: "Your goal 'Increase Sales Revenue' has been approved by Neha Kapoor.",                channel: 'email', read: true,  time: '2025-05-03 09:13', deepLink: '/goals'     },
  { id: 'n3', type: 'rework',    to: 'emp2',   toName: 'Arjun Mehta',  subject: 'Goal Returned for Rework',        body: "Your goal 'Hiring Target' has been returned. Please revise the weightage and resubmit.", channel: 'email', read: false, time: '2025-05-03 09:16', deepLink: '/goals'     },
  { id: 'n4', type: 'checkin',   to: 'emp1',   toName: 'Priya Sharma', subject: 'Q1 Check-in Window Now Open',     body: 'The Q1 check-in window is now open. Please log your actuals by July 31.',              channel: 'teams', read: false, time: '2025-07-01 09:00', deepLink: '/checkin'   },
  { id: 'n5', type: 'checkin',   to: 'emp2',   toName: 'Arjun Mehta',  subject: 'Q1 Check-in Reminder',            body: 'Reminder: Q1 check-in closes in 5 days. You have not logged actuals for 3 goals.',    channel: 'teams', read: false, time: '2025-07-26 09:00', deepLink: '/checkin'   },
];

/* ─── Escalation Rules ─── */
export const INITIAL_ESCALATION_RULES = [
  { id: 'er1', name: 'Goal Submission Overdue',  trigger: 'employee_not_submitted',  days: 7, chain: ['manager', 'hr'],            active: true },
  { id: 'er2', name: 'Approval Overdue',          trigger: 'manager_not_approved',    days: 3, chain: ['skip_level', 'hr'],         active: true },
  { id: 'er3', name: 'Check-in Overdue',          trigger: 'checkin_not_completed',   days: 5, chain: ['manager', 'hr'],            active: true },
];

/* ─── Escalation Log ─── */
export const INITIAL_ESCALATIONS = [
  { id: 'esc1', ruleId: 'er1', empId: 'emp2', empName: 'Arjun Mehta',  reason: 'Goal Hiring Target not resubmitted after rework',    raisedOn: '2025-05-06', status: 'open',     level: 1, resolvedBy: null          },
  { id: 'esc2', ruleId: 'er3', empId: 'emp1', empName: 'Priya Sharma', reason: 'Q1 check-in window open but not yet completed',       raisedOn: '2025-07-10', status: 'resolved', level: 2, resolvedBy: 'Neha Kapoor' },
];

/* ─── QoQ Analytics Data ─── */
export const QOQ_DATA = [
  { quarter: 'Q4 FY24', avgScore: 72, completed: 14, total: 18 },
  { quarter: 'Q1 FY25', avgScore: 68, completed: 11, total: 18 },
  { quarter: 'Q2 FY25', avgScore: 75, completed: 15, total: 18 },
  { quarter: 'Q3 FY25', avgScore: 81, completed: 16, total: 18 },
  { quarter: 'Q4 FY25', avgScore: 78, completed: 14, total: 18 },
  { quarter: 'Q1 FY26', avgScore: 65, completed:  9, total: 18 },
];

/* ─── Heatmap Data ─── */
export const HEATMAP_DATA = [
  { name: 'Priya Sharma', q1: 82, q2: 0, q3: 0, q4: 0 },
  { name: 'Arjun Mehta',  q1: 55, q2: 0, q3: 0, q4: 0 },
];

/* ─── Navigation Items ─── */
export const NAV_ITEMS = {
  employee: [
    { icon: '⊞', label: 'Dashboard',      key: 'dashboard'     },
    { icon: '◎', label: 'My Goals',        key: 'goals'         },
    { icon: '📊', label: 'Check-in',       key: 'checkin'       },
    { icon: '🔔', label: 'Notifications',  key: 'notifications' },
  ],
  manager: [
    { icon: '⊞', label: 'Dashboard',      key: 'dashboard'     },
    { icon: '✓',  label: 'Approvals',      key: 'approvals'     },
    { icon: '👥', label: 'Team Goals',     key: 'team'          },
    { icon: '📋', label: 'Check-in',       key: 'checkin'       },
    { icon: '🔔', label: 'Notifications',  key: 'notifications' },
  ],
  admin: [
    { icon: '⊞', label: 'Dashboard',      key: 'dashboard'     },
    { icon: '⚙',  label: 'Cycle Mgmt',    key: 'cycle'         },
    { icon: '📁', label: 'All Goals',      key: 'allgoals'      },
    { icon: '🗂',  label: 'Audit Log',     key: 'audit'         },
    { icon: '📈', label: 'Reports',        key: 'reports'       },
    { icon: '🚨', label: 'Escalations',   key: 'escalations'   },
    { icon: '📊', label: 'Analytics',      key: 'analytics'     },
    { icon: '🔔', label: 'Notifications',  key: 'notifications' },
    { icon: '🔐', label: 'SSO / Entra ID', key: 'sso'          },
  ],
};

/* ─── Initial Window Statuses ─── */
export const INITIAL_WINDOWS = [
  { id: 'w1', name: 'Phase 1 — Goal Setting', opens: '2025-05-01', status: 'closed' },
  { id: 'w2', name: 'Q1 Check-in (Jul)',      opens: '2025-07-01', status: 'open'   },
  { id: 'w3', name: 'Q2 Check-in (Oct)',      opens: '2025-10-01', status: 'closed' },
  { id: 'w4', name: 'Q3 Check-in (Jan)',      opens: '2026-01-01', status: 'closed' },
  { id: 'w5', name: 'Q4 / Annual (Mar)',      opens: '2026-03-01', status: 'closed' },
];
