export interface KBArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  tags: string[];
}

export const kbArticles: KBArticle[] = [
  {
    id: "kb-1", title: "How to apply for a course",
    category: "Admissions",
    summary: "Step-by-step guide to submitting your application.",
    content: "Visit the UNSW College website, select your desired program, click 'Apply Now', fill in your personal and academic details, upload supporting documents, and submit. You'll receive a confirmation email within 48 hours.",
    tags: ["apply", "admission", "enrolment", "application"]
  },
  {
    id: "kb-2", title: "English language requirements",
    category: "Admissions",
    summary: "Minimum English scores for each pathway program.",
    content: "Foundation Studies requires IELTS 5.5 (min 5.0 per band). Diploma programs require IELTS 6.0 (min 5.5 writing). Transition programs require IELTS 6.0 overall.",
    tags: ["ielts", "english", "language", "requirements", "score"]
  },
  {
    id: "kb-3", title: "Fee payment options and deadlines",
    category: "Fees",
    summary: "Available payment methods and key due dates.",
    content: "Fees can be paid via bank transfer, credit card, or approved payment plans. The first instalment is due 4 weeks before term start. Late payments incur a $250 administrative fee.",
    tags: ["fees", "payment", "cost", "deadline", "tuition"]
  },
  {
    id: "kb-4", title: "Refund policy",
    category: "Fees",
    summary: "Eligibility and process for requesting a refund.",
    content: "Full refunds are available if withdrawal occurs before the census date. After census, a pro-rata refund may apply. Visa refusal refunds require documentary evidence.",
    tags: ["refund", "withdrawal", "money", "cancel"]
  },
  {
    id: "kb-5", title: "Academic support services",
    category: "Academic",
    summary: "Free tutoring, workshops, and study resources.",
    content: "UNSW College offers free peer tutoring, academic writing workshops, mathematics drop-in sessions, and online study resources through Moodle.",
    tags: ["academic", "support", "tutoring", "help", "study"]
  },
  {
    id: "kb-6", title: "How to lodge a complaint",
    category: "Complaints",
    summary: "Formal process for raising a complaint or appeal.",
    content: "Complaints can be submitted via the Student Experience Portal, by email, or in person. All complaints are acknowledged within 2 business days and resolved within 20 business days where possible.",
    tags: ["complaint", "appeal", "grievance", "issue", "problem"]
  },
  {
    id: "kb-7", title: "Wellbeing and counselling services",
    category: "Wellbeing",
    summary: "Free confidential counselling for current students.",
    content: "UNSW College provides free, confidential counselling services. Book appointments online or call the Student Services team. Crisis support is available 24/7 via Lifeline (13 11 14).",
    tags: ["wellbeing", "counselling", "mental health", "support", "crisis"]
  },
  {
    id: "kb-8", title: "Accommodation options",
    category: "Student Life",
    summary: "On-campus and off-campus housing information.",
    content: "UNSW College partners with several accommodation providers near campus. Options include homestay, student apartments, and shared housing. Apply early as spaces fill quickly.",
    tags: ["accommodation", "housing", "living", "campus"]
  },
  {
    id: "kb-9", title: "Visa and immigration support",
    category: "International",
    summary: "Help with student visa applications and compliance.",
    content: "Our international student advisors can help with CoE issuance, visa condition compliance, Overseas Student Health Cover (OSHC), and extensions.",
    tags: ["visa", "immigration", "international", "coe", "oshc"]
  },
  {
    id: "kb-10", title: "How to request special consideration",
    category: "Academic",
    summary: "Process for applying when illness or misadventure affects assessment.",
    content: "If illness, injury, or misadventure impacts your ability to complete an assessment, apply for special consideration within 3 business days. Supporting documentation is required.",
    tags: ["special consideration", "illness", "extension", "assessment"]
  },
  {
    id: "kb-11", title: "How to make a protected disclosure",
    category: "Compliance",
    summary: "Information about the protected disclosure process.",
    content: "Protected disclosures allow individuals to report suspected wrongdoing with legal protections against reprisal. Reports can be made anonymously. All disclosures are handled by authorised officers.",
    tags: ["disclosure", "whistleblower", "protected", "wrongdoing"]
  },
  {
    id: "kb-12", title: "Course credit and RPL",
    category: "Academic",
    summary: "Applying for recognition of prior learning.",
    content: "If you have completed equivalent studies elsewhere, you may be eligible for course credit. Submit an RPL application with certified transcripts and subject outlines within 2 weeks of enrolment.",
    tags: ["credit", "rpl", "recognition", "transfer", "prior learning"]
  },
];
