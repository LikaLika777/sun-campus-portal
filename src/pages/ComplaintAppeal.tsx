import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { StepWizard } from "@/components/StepWizard";
import { KnowledgeDeflectionPanel } from "@/components/KnowledgeDeflectionPanel";
import { EvidenceUpload } from "@/components/EvidenceUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateReference } from "@/mocks/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["About You", "Details", "Review & Submit"];
const types = [
  { id: "complaint", label: "Complaint", icon: AlertTriangle, desc: "I want to raise a formal complaint about a service, process, or experience." },
  { id: "appeal", label: "Appeal", icon: Scale, desc: "I want to appeal an academic or administrative decision." },
];

export default function ComplaintAppeal() {
  const { currentPersona, isLoggedIn } = useDemo();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const [name, setName] = useState(isLoggedIn ? currentPersona.name : "");
  const [email, setEmail] = useState(isLoggedIn ? (currentPersona.email ?? "") : "");
  const [studentId, setStudentId] = useState(isLoggedIn ? (currentPersona.studentId ?? "") : "");
  const [type, setType] = useState<string>("");
  const [subject, setSubject] = useState("");
  const [details, setDetails] = useState("");
  const [outcome, setOutcome] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const canNext = step === 0
    ? name.trim() && email.trim()
    : step === 1
    ? type && subject.trim() && details.trim()
    : true;

  const handleSubmit = () => {
    const ref = generateReference(type === "appeal" ? "APL" : "CMP");
    setRefNumber(ref);
    setSubmitted(true);
    toast({ title: `${type === "appeal" ? "Appeal" : "Complaint"} submitted`, description: `Reference: ${ref}` });
  };

  if (submitted) {
    return (
      <div className="container py-16 max-w-lg text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="font-heading text-2xl font-bold mb-2">
            {type === "appeal" ? "Appeal" : "Complaint"} Submitted
          </h1>
          <p className="text-muted-foreground mb-1">Your reference number is:</p>
          <p className="font-heading text-xl font-bold text-primary mb-6">{refNumber}</p>
          <p className="text-sm text-muted-foreground mb-6">We'll acknowledge your submission within 2 business days.</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/support")}>Back to Support</Button>
            <Button onClick={() => navigate("/track")}>Track Request</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-10">
        <div className="container">
          <h1 className="font-heading text-3xl font-extrabold mb-2">Complaints & Appeals</h1>
          <p className="text-primary-foreground/80">We take your concerns seriously and will investigate thoroughly.</p>
        </div>
      </section>

      <div className="container py-8 max-w-2xl">
        {/* Pre-form KB deflection */}
        {step === 0 && (
          <div className="mb-6">
            <KnowledgeDeflectionPanel query="complaint" />
          </div>
        )}

        <StepWizard steps={steps} currentStep={step} className="mb-8" />

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {step === 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-heading text-lg font-semibold">About You</h2>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name *</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID (optional)</Label>
                    <Input id="studentId" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="z1234567" maxLength={20} />
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 1 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-heading text-lg font-semibold">What would you like to do?</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {types.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setType(t.id)}
                        className={cn(
                          "rounded-lg border-2 p-4 text-left transition-all",
                          type === t.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/40"
                        )}
                      >
                        <t.icon className={cn("h-5 w-5 mb-2", type === t.id ? "text-primary" : "text-muted-foreground")} />
                        <p className="font-heading text-sm font-semibold">{t.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="c-subject">Subject *</Label>
                    <Input id="c-subject" value={subject} onChange={(e) => setSubject(e.target.value)} required maxLength={200} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="c-details">Details *</Label>
                    <Textarea id="c-details" value={details} onChange={(e) => setDetails(e.target.value)} rows={5} required maxLength={3000} placeholder="Describe your complaint or the decision you'd like to appeal…" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="c-outcome">Desired outcome (optional)</Label>
                    <Textarea id="c-outcome" value={outcome} onChange={(e) => setOutcome(e.target.value)} rows={2} maxLength={1000} placeholder="What would you like to happen?" />
                  </div>

                  <div className="space-y-2">
                    <Label>Evidence (optional)</Label>
                    <EvidenceUpload files={files} onChange={setFiles} />
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-heading text-lg font-semibold">Review</h2>
                  <dl className="space-y-3 text-sm">
                    <div><dt className="font-medium text-muted-foreground">Name</dt><dd>{name}</dd></div>
                    <div><dt className="font-medium text-muted-foreground">Email</dt><dd>{email}</dd></div>
                    {studentId && <div><dt className="font-medium text-muted-foreground">Student ID</dt><dd>{studentId}</dd></div>}
                    <div><dt className="font-medium text-muted-foreground">Type</dt><dd className="capitalize">{type}</dd></div>
                    <div><dt className="font-medium text-muted-foreground">Subject</dt><dd>{subject}</dd></div>
                    <div><dt className="font-medium text-muted-foreground">Details</dt><dd className="whitespace-pre-wrap">{details}</dd></div>
                    {outcome && <div><dt className="font-medium text-muted-foreground">Desired outcome</dt><dd>{outcome}</dd></div>}
                    {files.length > 0 && <div><dt className="font-medium text-muted-foreground">Evidence</dt><dd>{files.map((f) => f.name).join(", ")}</dd></div>}
                  </dl>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 0}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canNext}>
              Next <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-success hover:bg-success/90 text-success-foreground">
              Submit <CheckCircle2 className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
