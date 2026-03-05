import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useDemo } from "@/contexts/DemoContext";
import { StatusTimeline } from "@/components/StatusTimeline";
import { EvidenceUpload } from "@/components/EvidenceUpload";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ArrowLeft, CheckCircle2, XCircle, Clock, Shield, ArrowRight, FileText, Lock } from "lucide-react";

const statusColors: Record<string, string> = {
  "submitted": "bg-muted text-muted-foreground",
  "under-review": "bg-accent/20 text-accent-foreground",
  "in-progress": "bg-primary/10 text-primary",
  "resolved": "bg-success/10 text-success",
  "closed": "bg-muted text-muted-foreground",
  "sealed": "bg-destructive/10 text-destructive",
};

const responseTemplates = [
  { id: "validity-confirmed", label: "Validity confirmed", body: "After initial review, this complaint/appeal has been assessed as valid and a formal investigation will commence." },
  { id: "validity-denied", label: "Validity not established", body: "After review, the complaint does not meet the threshold for formal investigation. The complainant has been advised of alternative resolution options." },
  { id: "update", label: "Progress update", body: "Investigation is progressing. Key findings have been documented and the matter is expected to be resolved within the statutory timeframe." },
];

export default function CaseIntake() {
  const { id } = useParams<{ id: string }>();
  const { cases, enquiries } = useDemo();
  const { toast } = useToast();

  // Look in both cases and enquiries for intake
  const caseItem = cases.find(c => c.id === id);
  const enquiryItem = !caseItem ? enquiries.find(e => e.id === id) : null;
  const item = caseItem || enquiryItem;

  const [validityAssessment, setValidityAssessment] = useState<"valid" | "invalid" | "">(caseItem ? "valid" : "");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [template, setTemplate] = useState("");

  if (!item) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Item not found.</p>
        <Link to="/staff/inbox"><Button variant="outline" className="mt-4"><ArrowLeft className="h-4 w-4 mr-1" /> Back to Inbox</Button></Link>
      </div>
    );
  }

  const isCase = !!caseItem;
  const daysRemaining = caseItem?.statutoryDeadline
    ? Math.max(0, Math.ceil((new Date(caseItem.statutoryDeadline).getTime() - Date.now()) / 86400000))
    : null;

  const handleTemplateSelect = (tplId: string) => {
    setTemplate(tplId);
    const t = responseTemplates.find(r => r.id === tplId);
    if (t) setNotes(t.body);
  };

  const handleConvertToCase = () => {
    toast({ title: "Converted to case", description: `${item.reference} has been escalated to a formal case.` });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Link to="/staff/inbox" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Inbox
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground">{item.reference}</span>
            <Badge variant="outline" className="text-[10px] capitalize">{isCase ? caseItem!.type : "enquiry"}</Badge>
            {isCase && caseItem!.isSensitive && (
              <Badge className="bg-destructive/10 text-destructive text-[10px] gap-1"><Shield className="h-3 w-3" /> Sensitive</Badge>
            )}
          </div>
          <h1 className="font-heading text-xl font-bold">{isCase && caseItem!.isSensitive ? "Details restricted" : item.subject}</h1>
        </div>
        <Badge className={cn("text-xs", statusColors[item.status] || "")}>{item.status.replace("-", " ")}</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Statutory clock */}
          {daysRemaining !== null && (
            <Card className={cn("border-l-4", daysRemaining < 5 ? "border-l-destructive" : "border-l-accent")}>
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className={cn("h-5 w-5", daysRemaining < 5 ? "text-destructive" : "text-accent")} />
                <div>
                  <p className="text-sm font-medium">Statutory Deadline</p>
                  <p className="text-xs text-muted-foreground">{daysRemaining} days remaining · Due {new Date(caseItem!.statutoryDeadline!).toLocaleDateString("en-AU", { dateStyle: "long" })}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stage timeline */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-heading text-sm font-semibold mb-3">Case Timeline</h3>
              <StatusTimeline events={item.timeline} showInternal={true} />
            </CardContent>
          </Card>

          {/* Evidence chain */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-heading text-sm font-semibold mb-3 flex items-center gap-2">
                <Lock className="h-4 w-4" /> Evidence Chain (Immutable)
              </h3>
              <div className="space-y-2">
                {item.timeline.filter(t => t.type === "evidence").length === 0 ? (
                  <p className="text-sm text-muted-foreground">No evidence uploaded yet.</p>
                ) : (
                  item.timeline.filter(t => t.type === "evidence").map(t => (
                    <div key={t.id} className="flex items-center gap-2 bg-muted/50 rounded-md px-3 py-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{t.description}</span>
                      <span className="text-[10px] text-muted-foreground ml-auto">{new Date(t.timestamp).toLocaleDateString("en-AU")}</span>
                    </div>
                  ))
                )}
                <EvidenceUpload files={files} onChange={setFiles} maxFiles={5} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar — actions */}
        <div className="space-y-4">
          {/* Validity assessment */}
          {!isCase && (
            <Card>
              <CardContent className="p-5 space-y-3">
                <h3 className="font-heading text-sm font-semibold">Validity Assessment</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setValidityAssessment("valid")}
                    className={cn("w-full flex items-center gap-2 p-3 rounded-lg border-2 transition-all text-sm", validityAssessment === "valid" ? "border-success bg-success/5" : "border-border")}
                  >
                    <CheckCircle2 className={cn("h-4 w-4", validityAssessment === "valid" ? "text-success" : "text-muted-foreground")} />
                    Valid — escalate to case
                  </button>
                  <button
                    onClick={() => setValidityAssessment("invalid")}
                    className={cn("w-full flex items-center gap-2 p-3 rounded-lg border-2 transition-all text-sm", validityAssessment === "invalid" ? "border-destructive bg-destructive/5" : "border-border")}
                  >
                    <XCircle className={cn("h-4 w-4", validityAssessment === "invalid" ? "text-destructive" : "text-muted-foreground")} />
                    Not valid — close with reason
                  </button>
                </div>
                {validityAssessment === "valid" && (
                  <Button onClick={handleConvertToCase} className="w-full bg-success hover:bg-success/90 text-success-foreground">
                    <ArrowRight className="h-4 w-4 mr-1" /> Convert to Case
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Communication */}
          <Card>
            <CardContent className="p-5 space-y-3">
              <h3 className="font-heading text-sm font-semibold">Internal Notes / Response</h3>
              <Select value={template} onValueChange={handleTemplateSelect}>
                <SelectTrigger className="h-8 text-xs"><SelectValue placeholder="Use template…" /></SelectTrigger>
                <SelectContent>
                  {responseTemplates.map(t => (
                    <SelectItem key={t.id} value={t.id} className="text-xs">{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} maxLength={2000} placeholder="Add notes…" />
              <Button size="sm" className="w-full" disabled={!notes.trim()}>Save Notes</Button>
            </CardContent>
          </Card>

          {/* Restricted fields for sensitive cases */}
          {isCase && caseItem!.isSensitive && (
            <Card className="border-destructive/30">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-destructive" />
                  <h3 className="font-heading text-sm font-semibold text-destructive">Restricted Access</h3>
                </div>
                <p className="text-xs text-muted-foreground">
                  This case contains sensitive information. Only authorised officers can view full details. Access is logged.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
