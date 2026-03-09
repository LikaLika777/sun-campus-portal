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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { generateReference } from "@/mocks/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, Phone } from "lucide-react";

const steps = ["Your Details", "Your Question", "Review & Submit"];

export default function GeneralEnquiry() {
  const { currentPersona, isLoggedIn } = useDemo();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  // Form state
  const [name, setName] = useState(isLoggedIn ? currentPersona.name : "");
  const [email, setEmail] = useState(isLoggedIn ? (currentPersona.email ?? "") : "");
  const [contactPref, setContactPref] = useState<string>("email");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const canNext = step === 0
    ? name.trim() && email.trim()
    : step === 1
    ? subject.trim() && message.trim()
    : true;

  const handleSubmit = () => {
    const ref = generateReference("ENQ");
    setRefNumber(ref);
    setSubmitted(true);
    toast({ title: "Enquiry submitted!", description: `Reference: ${ref}` });
  };

  if (submitted) {
    return (
      <div className="container py-16 max-w-lg text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="font-heading text-2xl font-bold mb-2">Enquiry Submitted</h1>
          <p className="text-muted-foreground mb-1">Your reference number is:</p>
          <p className="font-heading text-xl font-bold text-primary mb-6">{refNumber}</p>
          <p className="text-sm text-muted-foreground mb-6">We'll respond within 2 business days via your preferred contact method.</p>
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
      <section className="bg-slate-800 text-primary-foreground py-10">
        <div className="container">
          <h1 className="font-heading text-3xl font-extrabold mb-2">Make an Enquiry</h1>
          <p className="text-primary-foreground/80">We'll get your question to the right team.</p>
        </div>
      </section>

      <div className="container py-8 max-w-2xl">
        <StepWizard steps={steps} currentStep={step} className="mb-8" />

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {step === 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-heading text-lg font-semibold">Your Details</h2>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name *</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred contact method</Label>
                    <div className="flex gap-3">
                      <Button type="button" size="sm" variant={contactPref === "email" ? "default" : "outline"} onClick={() => setContactPref("email")}>
                        <Mail className="h-4 w-4 mr-1" /> Email
                      </Button>
                      <Button type="button" size="sm" variant={contactPref === "phone" ? "default" : "outline"} onClick={() => setContactPref("phone")}>
                        <Phone className="h-4 w-4 mr-1" /> Phone
                      </Button>
                    </div>
                  </div>
                  {contactPref === "phone" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+61 4XX XXX XXX" />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            )}

            {step === 1 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-heading text-lg font-semibold">Your Question</h2>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admissions">Admissions</SelectItem>
                        <SelectItem value="fees">Fees & Payments</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="accommodation">Accommodation</SelectItem>
                        <SelectItem value="visa">Visa & Immigration</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief summary of your question" required maxLength={200} />
                  </div>

                  <KnowledgeDeflectionPanel query={subject} />

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Provide more detail…" required maxLength={2000} />
                  </div>

                  <div className="space-y-2">
                    <Label>Attachments (optional)</Label>
                    <EvidenceUpload files={files} onChange={setFiles} />
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-heading text-lg font-semibold">Review & Submit</h2>
                  <dl className="space-y-3 text-sm">
                    <div><dt className="font-medium text-muted-foreground">Name</dt><dd>{name}</dd></div>
                    <div><dt className="font-medium text-muted-foreground">Email</dt><dd>{email}</dd></div>
                    {phone && <div><dt className="font-medium text-muted-foreground">Phone</dt><dd>{phone}</dd></div>}
                    <div><dt className="font-medium text-muted-foreground">Category</dt><dd>{category || "—"}</dd></div>
                    <div><dt className="font-medium text-muted-foreground">Subject</dt><dd>{subject}</dd></div>
                    <div><dt className="font-medium text-muted-foreground">Message</dt><dd className="whitespace-pre-wrap">{message}</dd></div>
                    {files.length > 0 && <div><dt className="font-medium text-muted-foreground">Attachments</dt><dd>{files.map((f) => f.name).join(", ")}</dd></div>}
                  </dl>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
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
              Submit Enquiry <CheckCircle2 className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
