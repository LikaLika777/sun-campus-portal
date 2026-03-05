import type { PersonaRole } from "./personas";

export type ChannelType = "web" | "email" | "phone" | "chat" | "in-person";
export type CaseStatus = "submitted" | "under-review" | "in-progress" | "awaiting-response" | "resolved" | "closed" | "sealed";
export type EnquiryStatus = "open" | "in-progress" | "awaiting-response" | "resolved" | "closed";
export type Priority = "low" | "medium" | "high" | "urgent";

export interface TimelineEvent {
  id: string;
  timestamp: string;
  type: "submitted" | "assigned" | "status-change" | "message" | "note" | "evidence" | "merged" | "escalated" | "sealed";
  description: string;
  actor: string;
  channel?: ChannelType;
  isInternal?: boolean;
}

export interface Enquiry {
  id: string;
  reference: string;
  personaId: string;
  subject: string;
  category: string;
  status: EnquiryStatus;
  priority: Priority;
  channel: ChannelType;
  createdAt: string;
  updatedAt: string;
  timeline: TimelineEvent[];
}

export interface Case {
  id: string;
  reference: string;
  personaId: string;
  type: "complaint" | "appeal" | "wellbeing" | "safety" | "disclosure";
  subject: string;
  status: CaseStatus;
  priority: Priority;
  isSensitive: boolean;
  createdAt: string;
  updatedAt: string;
  statutoryDeadline?: string;
  timeline: TimelineEvent[];
}

export interface AnonymousReport {
  id: string;
  referenceCode: string;
  type: "anonymous" | "disclosure";
  subject: string;
  status: CaseStatus;
  createdAt: string;
  optionalContactEmail?: string;
  timeline: TimelineEvent[];
}

export const enquiries: Enquiry[] = [
  {
    id: "enq-1", reference: "ENQ-2026-0001", personaId: "jane",
    subject: "Question about Foundation Studies entry requirements",
    category: "Admissions", status: "in-progress", priority: "medium", channel: "web",
    createdAt: "2026-02-15T09:30:00Z", updatedAt: "2026-02-18T14:20:00Z",
    timeline: [
      { id: "t1", timestamp: "2026-02-15T09:30:00Z", type: "submitted", description: "Enquiry submitted via web form", actor: "Jane Chen", channel: "web" },
      { id: "t2", timestamp: "2026-02-15T11:00:00Z", type: "assigned", description: "Assigned to Student Services", actor: "System" },
      { id: "t3", timestamp: "2026-02-16T10:15:00Z", type: "message", description: "Hi Jane, thanks for reaching out. Your IELTS score of 5.5 meets the minimum requirement. Could you also confirm your Year 11 completion?", actor: "Sarah Thompson", channel: "email" },
      { id: "t4", timestamp: "2026-02-18T14:20:00Z", type: "message", description: "Thank you! I've attached my transcript. Is there anything else needed?", actor: "Jane Chen", channel: "web" },
    ],
  },
  {
    id: "enq-2", reference: "ENQ-2026-0002", personaId: "marcus",
    subject: "Fee payment plan request",
    category: "Fees", status: "resolved", priority: "low", channel: "phone",
    createdAt: "2026-01-20T13:00:00Z", updatedAt: "2026-01-25T16:00:00Z",
    timeline: [
      { id: "t5", timestamp: "2026-01-20T13:00:00Z", type: "submitted", description: "Enquiry logged from phone call", actor: "Sarah Thompson", channel: "phone" },
      { id: "t6", timestamp: "2026-01-22T09:00:00Z", type: "message", description: "Payment plan approved: 3 instalments. First due Feb 15.", actor: "Sarah Thompson", channel: "email" },
      { id: "t7", timestamp: "2026-01-25T16:00:00Z", type: "status-change", description: "Enquiry resolved", actor: "System" },
    ],
  },
  {
    id: "enq-3", reference: "ENQ-2026-0003", personaId: "marcus",
    subject: "Request for course credit assessment",
    category: "Academic", status: "open", priority: "medium", channel: "chat",
    createdAt: "2026-03-01T08:45:00Z", updatedAt: "2026-03-01T08:45:00Z",
    timeline: [
      { id: "t8", timestamp: "2026-03-01T08:45:00Z", type: "submitted", description: "Enquiry submitted via live chat", actor: "Marcus Williams", channel: "chat" },
    ],
  },
];

export const cases: Case[] = [
  {
    id: "case-1", reference: "CMP-2026-0001", personaId: "jane",
    type: "complaint", subject: "Unfair grade in Mathematics assessment",
    status: "in-progress", priority: "high", isSensitive: false,
    createdAt: "2026-02-20T10:00:00Z", updatedAt: "2026-03-01T11:00:00Z",
    statutoryDeadline: "2026-03-20T10:00:00Z",
    timeline: [
      { id: "c1", timestamp: "2026-02-20T10:00:00Z", type: "submitted", description: "Complaint submitted via portal", actor: "Jane Chen", channel: "web" },
      { id: "c2", timestamp: "2026-02-20T12:00:00Z", type: "assigned", description: "Assigned to Complaints Officer David Nguyen", actor: "System" },
      { id: "c3", timestamp: "2026-02-22T09:30:00Z", type: "status-change", description: "Complaint validity confirmed — formal investigation commenced", actor: "David Nguyen" },
      { id: "c4", timestamp: "2026-02-28T14:00:00Z", type: "note", description: "Reviewed marking rubric and student submission. Discrepancy identified in Q3 scoring.", actor: "David Nguyen", isInternal: true },
      { id: "c5", timestamp: "2026-03-01T11:00:00Z", type: "message", description: "Dear Jane, we've identified a marking discrepancy. The assessment is being re-marked.", actor: "David Nguyen", channel: "email" },
    ],
  },
  {
    id: "case-2", reference: "WB-2026-0001", personaId: "marcus",
    type: "wellbeing", subject: "Ongoing anxiety affecting studies",
    status: "in-progress", priority: "high", isSensitive: true,
    createdAt: "2026-02-10T14:00:00Z", updatedAt: "2026-02-28T10:00:00Z",
    timeline: [
      { id: "c6", timestamp: "2026-02-10T14:00:00Z", type: "submitted", description: "Wellbeing referral received", actor: "Marcus Williams", channel: "web" },
      { id: "c7", timestamp: "2026-02-10T15:30:00Z", type: "assigned", description: "Assigned to Wellbeing Officer Emma Richards", actor: "System" },
      { id: "c8", timestamp: "2026-02-12T10:00:00Z", type: "message", description: "Hi Marcus, I'd like to schedule a confidential check-in. Would Wednesday 2pm work?", actor: "Emma Richards", channel: "email" },
      { id: "c9", timestamp: "2026-02-28T10:00:00Z", type: "note", description: "Follow-up session completed. Student engaging well with counselling services.", actor: "Emma Richards", isInternal: true },
    ],
  },
];

export const anonymousReports: AnonymousReport[] = [
  {
    id: "anon-1", referenceCode: "ANON-7X9K2M",
    type: "anonymous", subject: "Witnessed bullying in common area",
    status: "under-review", createdAt: "2026-02-25T16:00:00Z",
    timeline: [
      { id: "a1", timestamp: "2026-02-25T16:00:00Z", type: "submitted", description: "Anonymous report submitted", actor: "Anonymous" },
      { id: "a2", timestamp: "2026-02-26T09:00:00Z", type: "assigned", description: "Assigned to Safety team for review", actor: "System" },
    ],
  },
  {
    id: "anon-2", referenceCode: "PD-SEC-4R8W1N",
    type: "disclosure", subject: "Suspected financial irregularities in department",
    status: "under-review", createdAt: "2026-02-28T11:00:00Z",
    timeline: [
      { id: "a3", timestamp: "2026-02-28T11:00:00Z", type: "submitted", description: "Protected disclosure submitted anonymously", actor: "Anonymous" },
      { id: "a4", timestamp: "2026-02-28T14:00:00Z", type: "assigned", description: "Assigned to Protected Disclosure Officer James Morton", actor: "System" },
    ],
  },
];
