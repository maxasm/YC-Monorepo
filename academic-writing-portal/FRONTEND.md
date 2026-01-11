

# 🎓 Academic Writing & Research Support Platform

## Frontend

> **Audience:** GitHub Copilot AI Agent
> **Role:** Autonomous Frontend Engineer
> **Goal:** Build a production-ready frontend aligned exactly with the PRD
> **Constraint:** Follow instructions strictly. Do not invent features, flows, or schemas.

---

## 0️⃣ Operating Instructions for AI Agent (Read First)

You are building **only the frontend**.

### You MUST:

* Treat the **PRD as the single source of truth**
* Assume the backend exists and exposes REST APIs
* Build clean, typed, componentized UI
* Prefer clarity over cleverness
* Use deterministic layouts and predictable state handling

### You MUST NOT:

* Invent new features, roles, or flows
* Implement backend logic
* Bypass admin approval flows
* Hardcode business rules that belong to backend
* Add open bidding or writer self-selection logic

---

## 1️⃣ Tech Stack (Fixed — Do Not Change)

Use the following unless explicitly instructed otherwise:

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State:** React Context + Server Actions (no Redux)
* **Forms:** React Hook Form + Zod
* **Charts:** Recharts (Admin analytics)
* **Auth Handling:** Token-based (assume JWT via HTTP-only cookies)
* **File Upload UI:** Dropzone-style component (frontend only)

---

## 2️⃣ Project Structure (Enforced)

Create the following structure exactly:

```
academic-writing-portal/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── student/
│   │   ├── dashboard/
│   │   ├── submit-task/
│   │   └── messages/
│   ├── writer/
│   │   ├── dashboard/
│   │   └── workspace/
│   ├── admin/
│   │   ├── dashboard/
│   │   ├── tasks/
│   │   └── analytics/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── common/
│   ├── forms/
│   ├── dashboards/
│   └── charts/
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   └── constants.ts
├── types/
│   └── index.ts
└── README.md
```

---

## 3️⃣ User Roles & Access Rules (Strict)

The UI must reflect **role-based access**:

| Role    | Accessible Areas                              |
| ------- | --------------------------------------------- |
| Student | Student dashboard, task submission, messaging |
| Writer  | Assigned tasks only, workspace, earnings      |
| Admin   | All dashboards, pricing review, allocation    |

🚫 Writers **cannot** browse or bid on tasks
🚫 Students **cannot** choose writers
🚫 Pricing **must be shown as AI-estimated + admin-approved**

---

## 4️⃣ Core Pages & Responsibilities

### 4.1 Student Dashboard

**Purpose:** Transparency & tracking

Components to build:

* New Task CTA
* Active Tasks List
* AI Price Breakdown (read-only)
* Task Status Timeline
* Completed Tasks Archive
* Ratings & Feedback Form (post-completion)

---

### 4.2 Task Submission Flow (Student)

Form fields (exact mapping to PRD):

* Task type
* Academic level
* Subject
* Word count
* Deadline
* Citation style
* Instructions (text)
* File uploads

Flow:

1. Submit form
2. Display AI price estimate (breakdown view)
3. Await admin approval
4. Redirect to payment escrow UI

---

### 4.3 Writer Workspace

**Purpose:** Execution only

Components:

* Assigned Tasks List
* Deadline Countdown Timer
* Task Instructions Viewer
* Draft Upload
* Revision Tracker
* Earnings Summary

⚠️ Writer **cannot** see pricing logic or student identity beyond name.

---

### 4.4 Admin Dashboard

**Purpose:** Control & enforcement

Components:

* Pending Tasks Queue
* AI Price vs Final Price Comparison
* Manual Override Controls
* Writer Matching Suggestions (display only)
* Dispute Resolution Panel
* Revenue Analytics Charts

Admin actions must require **explicit confirmation modals**.

---

## 5️⃣ API Consumption Rules

Assume REST endpoints like:

```
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
POST   /api/payments
POST   /api/allocations
GET    /api/analytics
```

### API Rules:

* No hardcoded mock data
* All API calls go through `/lib/api.ts`
* Use async server actions where possible
* Handle loading, empty, error states explicitly

---

## 6️⃣ State & Data Handling

* Global auth state via Context
* Per-page data via server components
* Mutations via server actions
* Optimistic UI only where safe (e.g. messaging)

---

## 7️⃣ UI / UX Principles (Non-Negotiable)

* Academic, neutral, professional tone
* No gamification
* No dark patterns
* Clear pricing transparency
* Status clarity over aesthetics

Color guidance:

* Primary: Blue / Indigo
* Warnings: Amber
* Errors: Red
* Success: Green

---

## 8️⃣ Validation & Quality Gates

Before considering the frontend “complete”, ensure:

* [ ] All PRD features represented in UI
* [ ] No role leakage between dashboards
* [ ] Pricing is always read-only for students & writers
* [ ] Admin actions are gated and explicit
* [ ] Forms use schema validation
* [ ] Empty & error states exist everywhere

---

## 9️⃣ What Success Looks Like

A human developer should be able to:

* Clone the repo
* Run the frontend
* Plug in a backend
* Immediately understand:

  * User flows
  * Role boundaries
  * Pricing transparency
  * Ethical constraints

If anything feels ambiguous → **default to the PRD**.

---

## 🔒 Final Instruction to AI Agent

> Build **exactly what is specified**.
> Do not optimize prematurely.
> Do not invent product decisions.
> This platform prioritizes **control, trust, and ethics** over speed.


