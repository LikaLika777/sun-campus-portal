export interface Course {
  id: string;
  slug: string;
  title: string;
  category: "Foundation" | "Diploma" | "Transition" | "English";
  duration: string;
  intake: string;
  description: string;
  overview: string;
  entryRequirements: string[];
  studyPlan: string[];
  fees: string;
  campus: string;
}

export const courses: Course[] = [
  {
    id: "1", slug: "foundation-studies",
    title: "Foundation Studies",
    category: "Foundation", duration: "12 months", intake: "March, June, October",
    description: "Prepare for undergraduate study at UNSW Sydney with a comprehensive foundation program.",
    overview: "Foundation Studies provides a pathway to undergraduate degrees at UNSW Sydney. Students develop academic skills across multiple disciplines while adapting to the Australian education system.",
    entryRequirements: ["Completion of Year 11 or equivalent", "IELTS 5.5 overall (minimum 5.0 in each band)", "Academic references"],
    studyPlan: ["Term 1: Academic English, Mathematics, Critical Thinking", "Term 2: Discipline-specific subjects, Research Skills", "Term 3: Advanced subjects, Portfolio preparation"],
    fees: "$33,500 AUD", campus: "Kensington"
  },
  {
    id: "2", slug: "foundation-plus",
    title: "Foundation Studies Plus",
    category: "Foundation", duration: "15 months", intake: "March, October",
    description: "Extended foundation program with additional English language support.",
    overview: "Foundation Plus includes extra English language development alongside the standard Foundation Studies curriculum.",
    entryRequirements: ["Completion of Year 11 or equivalent", "IELTS 5.0 overall (minimum 4.5 in each band)"],
    studyPlan: ["Term 1: Intensive English", "Term 2–3: Academic English, Core subjects", "Term 4: Advanced subjects"],
    fees: "$40,200 AUD", campus: "Kensington"
  },
  {
    id: "3", slug: "diploma-engineering",
    title: "Diploma in Engineering",
    category: "Diploma", duration: "12 months", intake: "February, June",
    description: "Fast-track entry into second year of a UNSW Engineering degree.",
    overview: "This diploma covers first-year engineering subjects and guarantees entry into second year of selected UNSW Engineering degrees upon successful completion.",
    entryRequirements: ["Completion of Year 12 or equivalent", "IELTS 6.0 overall (minimum 5.5 in writing)", "Strong mathematics background"],
    studyPlan: ["Semester 1: Mathematics, Physics, Engineering Design", "Semester 2: Advanced Mathematics, Programming, Elective"],
    fees: "$39,800 AUD", campus: "Kensington"
  },
  {
    id: "4", slug: "diploma-science",
    title: "Diploma in Science",
    category: "Diploma", duration: "12 months", intake: "February, June",
    description: "Pathway to second year of a UNSW Science degree.",
    overview: "Covers first-year science subjects providing direct entry into second year of UNSW Science programs.",
    entryRequirements: ["Completion of Year 12 or equivalent", "IELTS 6.0 overall", "Science background preferred"],
    studyPlan: ["Semester 1: Chemistry, Biology or Physics, Mathematics", "Semester 2: Advanced electives, Lab skills"],
    fees: "$38,500 AUD", campus: "Kensington"
  },
  {
    id: "5", slug: "diploma-business",
    title: "Diploma in Business",
    category: "Diploma", duration: "12 months", intake: "February, June, October",
    description: "Direct pathway into second year of a UNSW Business degree.",
    overview: "Study first-year business courses and progress directly into second year of selected UNSW Business School degrees.",
    entryRequirements: ["Completion of Year 12 or equivalent", "IELTS 6.0 overall (minimum 5.5 in each band)"],
    studyPlan: ["Semester 1: Accounting, Economics, Business Law", "Semester 2: Management, Marketing, Elective"],
    fees: "$37,900 AUD", campus: "Kensington"
  },
  {
    id: "6", slug: "transition-program-engineering",
    title: "Transition Program – Engineering",
    category: "Transition", duration: "4 months", intake: "January, August",
    description: "Short intensive preparation for UNSW Engineering studies.",
    overview: "A targeted academic preparation program for students who narrowly missed direct entry into UNSW Engineering.",
    entryRequirements: ["Near-miss direct entry scores", "IELTS 6.0 overall", "Strong mathematics"],
    studyPlan: ["Mathematics Bridging, Physics Intensive, Academic Skills, Engineering Problem-Solving"],
    fees: "$14,500 AUD", campus: "Kensington"
  },
  {
    id: "7", slug: "transition-program-science",
    title: "Transition Program – Science",
    category: "Transition", duration: "4 months", intake: "January, August",
    description: "Intensive preparation for UNSW Science programs.",
    overview: "Designed for students who need a short bridging program before entering UNSW Science degrees.",
    entryRequirements: ["Near-miss direct entry scores", "IELTS 6.0 overall"],
    studyPlan: ["Science Fundamentals, Lab Methods, Academic Writing, Research Skills"],
    fees: "$14,500 AUD", campus: "Kensington"
  },
  {
    id: "8", slug: "academic-english",
    title: "UNSW College English (Academic)",
    category: "English", duration: "10–15 weeks", intake: "Multiple intakes throughout the year",
    description: "Develop the English language skills needed for academic success.",
    overview: "This course prepares students for the English proficiency required by UNSW pathway programs and direct university entry.",
    entryRequirements: ["IELTS 4.5+ or equivalent placement test", "High school completion"],
    studyPlan: ["Weeks 1–5: Reading & Listening skills", "Weeks 6–10: Writing & Speaking skills", "Weeks 11–15: Exam preparation & Academic practice"],
    fees: "$6,800–$10,200 AUD", campus: "Kensington"
  },
  {
    id: "9", slug: "english-bridging",
    title: "UNSW College English (Bridging)",
    category: "English", duration: "10 weeks", intake: "Every 5 weeks",
    description: "Bridging English course for students needing additional language support.",
    overview: "A shorter English program to help students reach the level required for UNSW College academic programs.",
    entryRequirements: ["IELTS 3.5+ or equivalent placement test"],
    studyPlan: ["Weeks 1–5: Core language skills", "Weeks 6–10: Academic language preparation"],
    fees: "$5,900 AUD", campus: "Kensington"
  },
];
