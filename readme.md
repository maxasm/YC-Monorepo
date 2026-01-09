# A monorepo containing all projects we are to work on

**TODO: List down all projects we are to work on below**
Below is your **PRD converted into a clean, ordered GitHub-ready checklist**, structured so **each team member can tick items as they implement them**.



# [x] Academic Writing & Research Support Platform

## 📌 Product Requirements Checklist (PRD)

---

## 1️⃣ Product Foundation

### 1.1 Product Vision

* [ ] Define global ethical academic support marketplace
* [ ] Enforce admin-controlled task allocation
* [ ] Integrate AI-assisted task analysis
* [ ] Ensure pricing transparency and compliance
* [ ] Establish quality assurance workflows

### 1.2 Target Users

* [ ] Student personas (Undergraduate → PhD)
* [ ] Professional writer personas
* [ ] Admin / operations personas

### 1.3 Core Problems to Solve

* [ ] Eliminate inconsistent pricing
* [ ] Remove open bidding chaos
* [ ] Improve student transparency
* [ ] Enable strong admin oversight

### 1.4 Success Metrics (KPIs)

* [ ] Job completion rate > 95%
* [ ] Revision rate < 20%
* [ ] Refund rate < 5%
* [ ] Average rating > 4.5 / 5
* [ ] AI vs Admin allocation accuracy tracking

---

## 2️⃣ Functional Requirements

### 2.1 Student Features

* [ ] Account registration
* [ ] Email / identity verification
* [ ] Task submission form
* [ ] AI price estimation display
* [ ] Secure escrow payment flow
* [ ] File uploads
* [ ] Student ↔ Writer messaging
* [ ] Revision request system
* [ ] Ratings & feedback submission

### 2.2 Admin Features

* [ ] AI pricing review panel
* [ ] Manual price override controls
* [ ] Task allocation dashboard
* [ ] Writer performance analytics
* [ ] Dispute resolution tools
* [ ] Refund approval system
* [ ] Revenue & commission tracking
* [ ] Policy enforcement tools

### 2.3 Writer Features

* [ ] Assigned task inbox
* [ ] Deadline tracking & alerts
* [ ] Optional AI research assistant
* [ ] Draft upload system
* [ ] Revision handling workflow
* [ ] Earnings dashboard
* [ ] Availability status toggle

---

## 3️⃣ Database Schema Implementation

### 3.1 Users Table

* [ ] id (PK)
* [ ] role (student | writer | admin)
* [ ] full_name
* [ ] email
* [ ] password_hash
* [ ] country
* [ ] verified (boolean)
* [ ] created_at

### 3.2 Student_Profiles Table

* [ ] user_id (FK)
* [ ] academic_level
* [ ] institution (optional)

### 3.3 Writer_Profiles Table

* [ ] user_id (FK)
* [ ] expertise_areas (JSON)
* [ ] qualification_level
* [ ] rating
* [ ] completed_jobs
* [ ] availability_status

### 3.4 Tasks Table

* [ ] id (PK)
* [ ] student_id (FK)
* [ ] task_type
* [ ] academic_level
* [ ] subject
* [ ] word_count
* [ ] deadline
* [ ] citation_style
* [ ] instructions_text
* [ ] complexity_score
* [ ] status
* [ ] created_at

### 3.5 AI_Analysis Table

* [ ] task_id (FK)
* [ ] estimated_hours
* [ ] complexity_score
* [ ] urgency_multiplier
* [ ] level_multiplier
* [ ] suggested_price
* [ ] risk_flags (JSON)

### 3.6 Payments Table

* [ ] id (PK)
* [ ] task_id (FK)
* [ ] amount
* [ ] currency
* [ ] status
* [ ] escrow_release_date

### 3.7 Allocations Table

* [ ] task_id (FK)
* [ ] writer_id (FK)
* [ ] allocated_by (admin_id)
* [ ] allocated_at

### 3.8 Submissions Table

* [ ] id (PK)
* [ ] task_id (FK)
* [ ] version
* [ ] file_url
* [ ] submitted_at

### 3.9 Reviews Table

* [ ] task_id (FK)
* [ ] rating
* [ ] feedback
* [ ] created_at

---

## 4️⃣ UI / UX Wireframes (Build Targets)

### 4.1 Student Dashboard

* [ ] New Task CTA
* [ ] Active Orders panel
* [ ] AI price breakdown view
* [ ] Messaging center
* [ ] Completed work archive

### 4.2 Admin Dashboard

* [ ] Pending tasks queue
* [ ] AI price vs final price comparison
* [ ] Writer matching suggestions
* [ ] Dispute resolution panel
* [ ] Revenue analytics charts

### 4.3 Writer Workspace

* [ ] Assigned jobs list
* [ ] Deadline countdown timers
* [ ] AI research panel
* [ ] Draft upload interface
* [ ] Revision tracker

---

## 5️⃣ AI Pricing Engine

### 5.1 Input Variables

* [ ] Word count
* [ ] Academic level
* [ ] Subject complexity
* [ ] Deadline urgency
* [ ] Originality requirement

### 5.2 Pricing Formula

* [ ] Base_Price = word_count × base_rate
* [ ] Apply level multiplier
* [ ] Apply urgency multiplier
* [ ] Apply complexity multiplier

### 5.3 AI Output

* [ ] Estimated completion hours
* [ ] Price range
* [ ] Recommended writer tier
* [ ] Risk indicators
* [ ] Admin final approval enforced

---

## 6️⃣ Terms & Policies

### 6.1 Acceptable Use Policy

* [ ] Academic assistance only
* [ ] No direct submission guarantees
* [ ] Student accountability clause

### 6.2 Payment Policy

* [ ] Escrow-based payments
* [ ] Defined revision limits
* [ ] Clear refund conditions

### 6.3 Academic Integrity

* [ ] No grade guarantees
* [ ] No impersonation submissions

### 6.4 Data Privacy

* [ ] GDPR compliance
* [ ] Encrypted document storage
* [ ] Secure user data handling

---

## 7️⃣ Naming & Branding

### 7.1 Brand Values

* [ ] Integrity
* [ ] Academic excellence
* [ ] Transparency
* [ ] Ethical AI

### 7.2 Name Selection

* [ ] ScholarlyAI
* [ ] Axiom Academic
* [ ] ThesisForge
* [ ] AcademiaAssist
* [ ] CiteRight Labs

### 7.3 Tagline

* [ ] “Ethical Academic Support, Powered by AI”
* [ ] “Where Research Meets Integrity”

---

## 8️⃣ MVP Scope (Phase 1)

* [ ] Student task submission
* [ ] AI pricing engine
* [ ] Admin task allocation
* [ ] Writer delivery workflow
* [ ] Escrow payment system

### 🔮 Future Phases

* [ ] Mobile applications
* [ ] Institutional licensing
* [ ] AI tutoring modules
* [ ] Advanced plagiarism detection
* [ ] Analytics & reporting expansion

---
