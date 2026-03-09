import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepWizard } from "@/components/StepWizard";
import { EvidenceUpload } from "@/components/EvidenceUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { generateSecureCode } from "@/mocks/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, AlertTriangle, Lock } from "lucide-react";

const steps = ["Anonymity", "Report Details", "Review"];

export default function ProtectedDisclosure() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(-1); // -1 = entry screen
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState("");

  const [anonymous, setAnonymous] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const canNext = step === 0
    ? true
    : step === 1
    ? details.trim().length > 0
    : true;

  const handleSubmit = () => {
    const code = generateSecureCode("PD");
    setRefCode(code);
    setSubmitted(true);
    toast({ title: "Protected disclosure submitted", description: `Secure code: ${code}` });
  };

  if (submitted) {
    return (
      <div className="container py-16 max-w-lg text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="font-heading text-2xl font-bold mb-2">Disclosure Received</h1>
          <p className="text-muted-foreground mb-1">Your secure reference code:</p>
          <p className="font-heading text-xl font-bold text-primary mb-2 font-mono tracking-wider">{refCode}</p>
          <p className="text-sm text-destructive font-medium mb-6">Store this code securely. It cannot be recovered.</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/support")}>Back to Support</Button>
            <Button onClick={() => navigate("/track")}>Track Disclosure</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Entry screen
  if (step === -1) {
    return (
      <div>
        <section className="bg-slate-800 text-primary-foreground py-10">
          <div className="container flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 text-accent" />
            <div>
              <h1 className="font-heading text-3xl font-extrabold">Protected Disclosure</h1>
              <p className="text-primary-foreground/80">Report suspected wrongdoing with legal protections.</p>
            </div>
          </div>
        </section>

        <div className="container py-10 max-w-xl">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-success">
                <Lock className="h-5 w-5" />
                <h2 className="font-heading text-lg font-semibold">Your protections</h2>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  You may report anonymously — identity fields are removed from the form.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  Legal protections against reprisal under applicable legislation.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  Handled exclusively by authorised disclosure officers.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  A secure reference code is provided for anonymous tracking.
                </li>
              </ul>
              <Button onClick={() => setStep(0)} className="w-full font-semibold mt-2">
                Begin Disclosure <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-slate-800 text-primary-foreground py-10">
        <div className="container flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-accent" />
          <div>
            <h1 className="font-heading text-3xl font-extrabold">Protected Disclosure</h1>
            <p className="text-primary-foreground/80">Step {step + 1} of {steps.length}</p>
          </div>
        </div>
      </section>

      <div className="container py-8 max-w-2xl">
        <StepWizard steps={steps} currentStep={step} className="mb-8" />

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            {step === 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-heading text-lg font-semibold">Anonymity Preference</h2>
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">Submit anonymously</p>
                      <p className="text-xs text-muted-foreground mt-1">Your identity fields will be removed from the form.</p>
                    </div>
                    <Switch checked={anonymous} onCheckedChange={setAnonymous} />
                  </div>

                  {/* Identity fields only shown when NOT anonymous */}
                  {!anonymous && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4 pt-2">
                      <div className="flex items-start gap-2 bg-accent/10 border border-accent/30 rounded-lg p-3 text-sm">
                        <AlertTriangle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                        <p className="text-muted-foreground">Your identity will be known to authorised officers only.</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pd-name">Full name</Label>
                        <Input id="pd-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pd-email">Email</Label>
                        <Input id="pd-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            )}

            {step === 1 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-heading text-lg font-semibold">Report Details</h2>

                  <div className="flex items-start gap-2 bg-accent/10 border border-accent/30 rounded-lg p-3 text-sm">
                    <AlertTriangle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      <strong>Metadata note:</strong> Document uploads may contain metadata (author, creation date). Remove this before uploading if you wish to remain anonymous.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pd-details">Describe the suspected wrongdoing *</Label>
                    <Textarea id="pd-details" value={details} onChange={(e) => setDetails(e.target.value)} rows={6} required maxLength={5000} placeholder="What happened, when, where, and who was involved?" />
                  </div>

                  <div className="space-y-2">
                    <Label>Supporting evidence (optional)</Label>
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
                    <div><dt className="font-medium text-muted-foreground">Anonymity</dt><dd>{anonymous ? "Anonymous" : "Identified"}</dd></div>
                    {!anonymous && name && <div><dt className="font-medium text-muted-foreground">Name</dt><dd>{name}</dd></div>}
                    {!anonymous && email && <div><dt className="font-medium text-muted-foreground">Email</dt><dd>{email}</dd></div>}
                    <div><dt className="font-medium text-muted-foreground">Details</dt><dd className="whitespace-pre-wrap">{details}</dd></div>
                    {files.length > 0 && <div><dt className="font-medium text-muted-foreground">Evidence</dt><dd>{files.map((f) => f.name).join(", ")}</dd></div>}
                  </dl>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)} disabled={!canNext}>
              Next <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-success hover:bg-success/90 text-success-foreground">
              Submit Disclosure <ShieldCheck className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
