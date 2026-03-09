import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EvidenceUpload } from "@/components/EvidenceUpload";
import { useToast } from "@/hooks/use-toast";
import { generateSecureCode } from "@/mocks/utils";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, AlertCircle, Eye } from "lucide-react";

export default function AnonymousReport() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState("");

  const [category, setCategory] = useState("");
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [wantContact, setWantContact] = useState(false);
  const [contactEmail, setContactEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;
    const code = generateSecureCode("AR");
    setRefCode(code);
    setSubmitted(true);
    toast({ title: "Report submitted anonymously", description: `Code: ${code}` });
  };

  if (submitted) {
    return (
      <div className="container py-16 max-w-lg text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="font-heading text-2xl font-bold mb-2">Report Submitted</h1>
          <p className="text-muted-foreground mb-1">Your anonymous reference code:</p>
          <p className="font-heading text-xl font-bold text-primary mb-2 font-mono tracking-wider">{refCode}</p>
          <p className="text-sm text-destructive font-medium mb-6">Save this code — it's the only way to track your report.</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/support")}>Back to Support</Button>
            <Button onClick={() => navigate("/track")}>Track Report</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-slate-800 text-primary-foreground py-10">
        <div className="container flex items-center gap-3">
          <Shield className="h-7 w-7 text-accent" />
          <div>
            <h1 className="font-heading text-3xl font-extrabold">Report a Concern</h1>
            <p className="text-primary-foreground/80">Your identity is protected. Report anonymously.</p>
          </div>
        </div>
      </section>

      <div className="container py-8 max-w-xl">
        {/* Anonymity reassurance */}
        <Card className="border-success/30 bg-success/5 mb-6">
          <CardContent className="p-4 flex items-start gap-3">
            <Eye className="h-5 w-5 text-success mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Your anonymity is protected</p>
              <p className="text-muted-foreground mt-1">
                No identifying information is collected unless you choose to provide contact details. Reports are handled by trained officers.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="What is this about?" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety">Safety concern</SelectItem>
                    <SelectItem value="misconduct">Staff/student misconduct</SelectItem>
                    <SelectItem value="discrimination">Discrimination or harassment</SelectItem>
                    <SelectItem value="academic">Academic integrity</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ar-details">What happened? *</Label>
                <Textarea id="ar-details" value={details} onChange={(e) => setDetails(e.target.value)} rows={5} required maxLength={3000} placeholder="Describe the concern. Include dates, locations, and people involved if possible." />
              </div>

              <div className="space-y-2">
                <Label>Evidence (optional)</Label>
                <EvidenceUpload files={files} onChange={setFiles} />
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="want-contact" className="text-sm cursor-pointer">I'd like to be contactable (optional)</Label>
                  <Switch id="want-contact" checked={wantContact} onCheckedChange={setWantContact} />
                </div>

                {wantContact && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3">
                    <div className="flex items-start gap-2 bg-accent/10 border border-accent/30 rounded-lg p-3 text-sm">
                      <AlertCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-muted-foreground">Providing contact info means your report is no longer fully anonymous. Only authorised officers will see this.</p>
                    </div>
                    <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} type="email" placeholder="Optional email address" maxLength={255} />
                  </motion.div>
                )}
              </div>

              <Button type="submit" className="w-full font-semibold" disabled={!details.trim()}>
                Submit Anonymous Report <Shield className="h-4 w-4 ml-1" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
