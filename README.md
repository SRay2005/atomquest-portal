# ⚛ AtomQuest — In-House Goal Setting & Tracking Portal

> **Submission for AtomQuest Hackathon 1.0**

Organizations that rely on manual or fragmented goal-tracking methods often struggle with alignment, visibility, and accountability. The **AtomQuest Portal** is a structured, digital SPA (Single Page Application) that eliminates these pain points. It supports the full lifecycle of employee goals—from creation and alignment to quarterly check-ins and performance visibility—while being intuitive, reliable, and audit-ready.

---

## 🎯 Key Features

### Phase 1: Goal Creation & Approval
- **Intuitive Goal Creation:** Employees can define goals, select Thrust Areas, and assign varying Units of Measurement (Numeric, %, Timeline, Zero-based).
- **Strict Validation Rules:** System-enforced validation ensures a maximum of 8 goals, a minimum of 10% weightage per goal, and a strict requirement that total weightage must equal exactly 100%.
- **Manager Workflows:** L1 Managers can review, approve (with inline edits to targets/weightages), or return goals for rework with structured feedback.
- **Shared Goals Sync:** Departmental KPIs pushed to multiple employees sync automatically when the primary owner logs progress.

### Phase 2: Achievement Tracking
- **Quarterly Check-ins:** Employees log their actual achievements across dynamically enforced quarterly windows.
- **Real-Time Scoring:** The embedded scoring engine computes progress mathematically based on the specific Unit of Measurement.
- **Manager Feedback:** Managers review planned vs. actual achievements and append structured check-in comments.

### 🚀 Bonus Features Implemented
1. **SSO / Microsoft Entra ID Simulation:** Org hierarchies and Role assignments are dynamically mapped from Azure AD attributes.
2. **Notification Engine:** Simulated Email & Microsoft Teams adaptive cards with deep links to goal sheets.
3. **Escalations Module:** Admin-configurable rules (triggers, delays, chains) for overdue actions with an active resolution log.
4. **Analytics Dashboard:** Visualizations powered by `recharts` featuring QoQ trends, heatmaps, and a manager effectiveness leaderboard.

---

## 🏗 Architecture & Tech Stack

- **Frontend Framework:** React 18
- **Styling:** Vanilla CSS with custom property tokens (No heavy CSS frameworks to ensure ultra-fast load times and strict UI control).
- **Charting:** Recharts
- **State Management:** Lifted local state via custom Hooks (`useGoals`, `useAudit`) to eliminate boilerplate and ensure memory efficiency (0 dependency on heavy state libraries like Redux).
- **Cost Optimization:** Architected as a pure static SPA, eliminating expensive backend compute costs during demo and staging phases.

---

## 🚦 Suggested Demo Journey for Judges

For the best evaluation experience, we highly recommend walking through the application in the following order using the **Role Switcher** located at the bottom of the left sidebar:

1. **Employee Goal Creation:** Click **Emp** in the sidebar. Go to **My Goals**. Click "+ Add Goal", fill out the form, and submit. Test the validation errors by trying to exceed 100% total weightage.
2. **Manager Review:** Switch role to **Mgr**. Go to **Approvals**. You will see the goal you just created. Edit the target/weight inline, then click **Approve**.
3. **Employee Check-in:** Switch back to **Emp**. Go to **Check-in**. Enter actual achievements for Q1 to observe the live, color-coded score computation engine.
4. **Manager Check-in:** Switch to **Mgr**. Go to **Check-in**. Toggle between different employees and log a check-in comment.
5. **Admin Reporting & Export:** Switch to **Admin**. Go to **Reports** and click **Export CSV** to demonstrate the offline data export capability.
6. **Bonus Modules:** While still on the **Admin** role, browse through **Escalations** to view the rule configurator, **Analytics** for data visualizations, and **SSO / Entra ID** to preview the authentication flow.

---

## 🛠 Local Setup Instructions

To run this project locally:

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd atomquest-portal
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The application will automatically open in your default browser at `http://localhost:3000`.


