export type PersonaRole = "student" | "staff" | "officer";

export interface Persona {
  id: string;
  name: string;
  role: PersonaRole;
  title: string;
  description: string;
  email: string;
  studentId?: string;
  avatar: string; // initials
}

export const personas: Persona[] = [
  {
    id: "jane",
    name: "Jane Chen",
    role: "student",
    title: "Foundation Student",
    description: "First-time international student with an open enquiry and a complaint in progress.",
    email: "jane.chen@student.unsw.edu.au",
    studentId: "z5412345",
    avatar: "JC",
  },
  {
    id: "marcus",
    name: "Marcus Williams",
    role: "student",
    title: "Diploma Student",
    description: "Continuing student with a wellbeing case and cross-channel enquiry history.",
    email: "m.williams@student.unsw.edu.au",
    studentId: "z5398712",
    avatar: "MW",
  },
  {
    id: "aisha",
    name: "Aisha Patel",
    role: "student",
    title: "Transition Student",
    description: "Student who made an anonymous report and later linked her identity.",
    email: "a.patel@student.unsw.edu.au",
    studentId: "z5423890",
    avatar: "AP",
  },
  {
    id: "anonymous",
    name: "Anonymous User",
    role: "student",
    title: "Pre-registration Visitor",
    description: "Unauthenticated user browsing courses and submitting an anonymous report.",
    email: "",
    avatar: "?",
  },
  {
    id: "sarah",
    name: "Sarah Thompson",
    role: "staff",
    title: "Student Services Officer",
    description: "Frontline staff handling enquiries and triaging complaints across channels.",
    email: "s.thompson@unswcollege.edu.au",
    avatar: "ST",
  },
  {
    id: "david",
    name: "David Nguyen",
    role: "staff",
    title: "Complaints Officer",
    description: "Senior staff managing formal complaints and appeals with statutory timelines.",
    email: "d.nguyen@unswcollege.edu.au",
    avatar: "DN",
  },
  {
    id: "emma",
    name: "Emma Richards",
    role: "officer",
    title: "Wellbeing & Safety Officer",
    description: "Specialised officer handling sensitive wellbeing cases and safety reports.",
    email: "e.richards@unswcollege.edu.au",
    avatar: "ER",
  },
  {
    id: "james",
    name: "James Morton",
    role: "officer",
    title: "Protected Disclosure Officer",
    description: "Authorised officer for protected disclosures with elevated access.",
    email: "j.morton@unswcollege.edu.au",
    avatar: "JM",
  },
];
