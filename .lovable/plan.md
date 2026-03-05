
# UNSW College Student Experience Portal — Implementation Plan

## Overview
A modern, responsive, WCAG 2.1 AA compliant demo prototype covering 6 demo scenarios: Identity Lifecycle, Complaints/Appeals, Wellbeing/Safety, Anonymous Reporting, Protected Disclosures, and Cross-channel Enquiry Handling. All data is mocked with simulated latency. A demo mode toggle allows switching between 8 personas (students, staff, officers).

---

## Phase 1: Foundation & Design System
- **Brand theming**: UNSW colours (#002664 primary, #FFB800 accent, #E63946 alert, #38A169 success), typography (Plus Jakarta Sans headings, Source Sans 3 body), spacing/shadows system
- **Layouts**: PublicLayout (sticky header with logo, nav, login), DashboardLayout (sidebar + main), StaffLayout (split panel)
- **Reusable components**: StepWizard, StatusTimeline, KnowledgeDeflectionPanel, EvidenceUpload, SkeletonLoaders, EmptyStates, Toast notifications
- **Mock data layer**: `/src/mocks/` with courses (9), KB articles (12), pre-seeded demo stories (Jane, Marcus, Aisha, anonymous reports), simulated 300-800ms latency
- **Demo mode toggle**: Floating pill (bottom-right) with persona selector (8 personas), student/staff view switch, reset data

## Phase 2: Public Pages
- **Home page** (`/`): Hero with navy background, 3 CTAs, icon feature cards, 3×3 course grid with hover effects, yellow support banner, branded footer
- **Course catalogue** (`/courses`): Filter chips (Foundation, Diploma, Transition, English), 3×3 responsive grid, skeleton loading
- **Course detail** (`/courses/:slug`): Hero, tabbed content (Overview, Entry Requirements, Study Plan), sticky sidebar with quick info, dual CTAs (Enquire / Apply)
- **Login** (`/login`) & **Register** (`/register`): Simulated SSO, identity linking banner when anonymous email matches

## Phase 3: Enquiry & Support Forms
- **General enquiry** (`/enquire`): 3-step wizard — Your Details (contact preference, progressive disclosure) → Your Question (knowledge deflection panel with debounced suggestions, file upload) → Review & Submit → Confirmation with reference number
- **Support hub** (`/support`): 6 service tiles (Academic, Fees, Wellbeing, Complaints, Report Concern, General) with warm icons and descriptions
- **Complaint/Appeal** (`/support/complaint`): Pre-form knowledge deflection, 3-step wizard (About You → Complaint/Appeal details with type cards → Review), evidence upload, confirmation
- **Wellbeing & Safety** (`/support/wellbeing`): Trauma-informed design, split hero (urgent help card + request support card), gentle short form with "I'm not ready to share" option, safe contact times, crisis numbers
- **Anonymous report** (`/support/report`): Shield icon, anonymity reassurance, optional contact toggle with identity warning, reference code on confirmation
- **Protected disclosure** (`/support/disclosure`): Entry screen with anonymity guarantees, 3-step wizard (Anonymity toggle ON by default removing identity fields from DOM, Report details with metadata warning, Review), secure reference code

## Phase 4: Tracking & Student Dashboard
- **Track request** (`/track`): 3 tabs (Enquiry/Complaint with OTP, Anonymous Report with code, Protected Disclosure with secure code), vertical status timeline, message thread, supplementary evidence upload
- **Student dashboard** (`/dashboard`): Alert zone, welcome greeting, stat cards (open enquiries, active cases, unread notifications), action items, activity feed, quick actions
- **Profile** (`/dashboard/profile`): Read-only student info, editable contact preferences, unified interaction history timeline
- **My Enquiries** (`/dashboard/enquiries`, `/:id`): List with status badges, detail view with threaded conversation across channels
- **My Cases** (`/dashboard/cases`, `/:id`): Milestone timeline, safe view for sensitive cases (no details exposed)
- **Inbox & Updates** (`/dashboard/inbox`, `/dashboard/updates`): Filter chips, notification list with deep links, broadcast acknowledgement

## Phase 5: Staff Demo Views
- **Staff inbox** (`/staff/inbox`): Split panel — queue list with SLA indicators, channel tags, assignment; detail panel with unified cross-channel timeline, response composer with template picker and channel selector
- **Case intake & workspace** (`/staff/intake/:id`, `/staff/cases/:id`): Validity assessment panel, one-click convert to case, stage timeline, statutory clock, immutable evidence chain, approved communication templates, restricted fields for sensitive cases
- **Access denied** (`/staff/access-denied`): Clean non-revealing restriction screen, logged attempt
- **Identity merge** (`/staff/merge`): Side-by-side comparison cards, match confidence, conflict resolution, mandatory reason codes, audit confirmation
- **Audit trail** (`/staff/audit/:id`): Filterable vertical timeline of all events (submissions, merges, access attempts, sealed closures)

## Phase 6: Polish & Accessibility
- Skip navigation links on every page
- Visible 3px yellow focus rings on all interactive elements
- Keyboard-only navigation audit (no traps in modals, wizards, uploads)
- ARIA live regions for dynamic content, proper heading hierarchy, semantic HTML
- Form error handling with focus-managed error summaries
- Responsive testing at 320px, 768px, 1024px, 1440px
- Micro-interactions: card hover lifts, staggered fade-ins, skeleton shimmers, success animations

---

**Note:** All data is client-side mocked — no backend/Supabase needed. The demo toggle and persona switching drive the entire experience using React state and pre-seeded mock data.
