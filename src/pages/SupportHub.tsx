import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, DollarSign, Heart, AlertTriangle, Shield, HelpCircle } from "lucide-react";

const tiles = [
  { icon: BookOpen, title: "Academic Support", description: "Tutoring, study skills, special consideration and course advice.", href: "/support", color: "text-primary" },
  { icon: DollarSign, title: "Fees & Payments", description: "Payment plans, refunds, and fee-related questions.", href: "/support", color: "text-primary" },
  { icon: Heart, title: "Wellbeing & Safety", description: "Confidential support, counselling, and crisis resources.", href: "/support/wellbeing", color: "text-success" },
  { icon: AlertTriangle, title: "Complaints & Appeals", description: "Formal complaints, academic appeals, and grievance processes.", href: "/support/complaint", color: "text-accent" },
  { icon: Shield, title: "Report a Concern", description: "Anonymous reporting for safety, misconduct, or wrongdoing.", href: "/support/report", color: "text-destructive" },
  { icon: HelpCircle, title: "General Enquiry", description: "Any other question — we'll make sure it reaches the right team.", href: "/enquire", color: "text-primary" },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

export default function SupportHub() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold mb-2">How can we help?</h1>
          <p className="text-primary-foreground/80 max-w-xl">
            Choose a category below or make a general enquiry. Our team is here to support you.
          </p>
        </div>
      </section>

      <div className="container py-10">
        <motion.div variants={container} initial="hidden" animate="visible" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((t) => (
            <motion.div key={t.title} variants={item}>
              <Link to={t.href}>
                <Card className="h-full hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-lg bg-muted mb-4 ${t.color}`}>
                      <t.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                      {t.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{t.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
