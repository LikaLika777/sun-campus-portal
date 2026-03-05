import { useState } from "react";
import { useDemo } from "@/contexts/DemoContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { GitMerge, CheckCircle2, AlertTriangle, User, Mail, GraduationCap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock merge candidates
const mergeCandidates = [
  {
    id: "merge-1",
    confidence: 92,
    records: [
      { source: "Anonymous Report", ref: "ANON-7X9K2M", email: "—", studentId: "—", name: "Anonymous", created: "2026-02-25" },
      { source: "Student Record", ref: "z5423890", email: "a.patel@student.unsw.edu.au", studentId: "z5423890", name: "Aisha Patel", created: "2026-01-15" },
    ],
    conflicts: ["Name: Anonymous vs Aisha Patel"],
  },
];

const reasonCodes = [
  { id: "identity-confirmed", label: "Identity confirmed by student" },
  { id: "email-match", label: "Email address match" },
  { id: "student-request", label: "Student-initiated link request" },
  { id: "admin-verified", label: "Admin verification of documents" },
];

export default function IdentityMerge() {
  const { toast } = useToast();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [reasonCode, setReasonCode] = useState("");
  const [notes, setNotes] = useState("");
  const [merged, setMerged] = useState<Set<string>>(new Set());

  const handleMerge = (id: string) => {
    if (!reasonCode) {
      toast({ title: "Reason required", description: "Select a reason code before merging.", variant: "destructive" });
      return;
    }
    setMerged(prev => new Set(prev).add(id));
    toast({ title: "Identity merge completed", description: "Records have been linked. Audit entry created." });
    setSelectedCandidate(null);
    setReasonCode("");
    setNotes("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
          <GitMerge className="h-6 w-6 text-primary" /> Identity Merge
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Review and link duplicate or anonymous records to verified student identities.</p>
      </div>

      {mergeCandidates.map(candidate => (
        <Card key={candidate.id} className={cn("transition-all", merged.has(candidate.id) && "opacity-50")}>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/10 text-primary text-xs">Match confidence: {candidate.confidence}%</Badge>
                {merged.has(candidate.id) && <Badge className="bg-success/10 text-success text-xs gap-1"><CheckCircle2 className="h-3 w-3" /> Merged</Badge>}
              </div>
              {!merged.has(candidate.id) && (
                <Button size="sm" variant="outline" onClick={() => setSelectedCandidate(selectedCandidate === candidate.id ? null : candidate.id)}>
                  {selectedCandidate === candidate.id ? "Cancel" : "Review & Merge"}
                </Button>
              )}
            </div>

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-2 gap-4">
              {candidate.records.map((rec, i) => (
                <Card key={i} className="bg-muted/30">
                  <CardContent className="p-4 space-y-2 text-sm">
                    <Badge variant="outline" className="text-[10px]">{rec.source}</Badge>
                    <div className="space-y-1.5 mt-2">
                      <div className="flex items-center gap-2"><User className="h-3.5 w-3.5 text-muted-foreground" /> {rec.name}</div>
                      <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-muted-foreground" /> {rec.email}</div>
                      <div className="flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5 text-muted-foreground" /> {rec.studentId}</div>
                      <div className="text-xs text-muted-foreground">Ref: {rec.ref} · Created: {rec.created}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Conflicts */}
            {candidate.conflicts.length > 0 && (
              <div className="mt-3 flex items-start gap-2 bg-accent/10 border border-accent/30 rounded-lg p-3 text-sm">
                <AlertTriangle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Conflicts to resolve:</p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                    {candidate.conflicts.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>
            )}

            {/* Merge form */}
            {selectedCandidate === candidate.id && !merged.has(candidate.id) && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 pt-4 border-t space-y-3">
                <div className="space-y-2">
                  <Label>Reason code *</Label>
                  <Select value={reasonCode} onValueChange={setReasonCode}>
                    <SelectTrigger><SelectValue placeholder="Select reason…" /></SelectTrigger>
                    <SelectContent>
                      {reasonCodes.map(r => (
                        <SelectItem key={r.id} value={r.id}>{r.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Notes (optional)</Label>
                  <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} maxLength={500} placeholder="Additional context…" />
                </div>
                <Button onClick={() => handleMerge(candidate.id)} disabled={!reasonCode} className="bg-primary">
                  <GitMerge className="h-4 w-4 mr-1" /> Confirm Merge
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
