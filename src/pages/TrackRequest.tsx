import { useState } from "react";
import { useDemo } from "@/contexts/DemoContext";
import { StatusTimeline } from "@/components/StatusTimeline";
import { EvidenceUpload } from "@/components/EvidenceUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Search, Shield, ShieldCheck, FileText, Send, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  "submitted": "bg-muted text-muted-foreground",
  "open": "bg-muted text-muted-foreground",
  "under-review": "bg-accent/20 text-accent-foreground",
  "in-progress": "bg-primary/10 text-primary",
  "awaiting-response": "bg-warning/20 text-warning-foreground",
  "resolved": "bg-success/10 text-success",
  "closed": "bg-muted text-muted-foreground",
};

export default function TrackRequest() {
  const { enquiries, cases, anonymousReports } = useDemo();

  const [enqRef, setEnqRef] = useState("");
  const [enqOtp, setEnqOtp] = useState("");
  const [enqResult, setEnqResult] = useState<any>(null);
  const [enqError, setEnqError] = useState("");

  const [anonCode, setAnonCode] = useState("");
  const [anonResult, setAnonResult] = useState<any>(null);
  const [anonError, setAnonError] = useState("");

  const [pdCode, setPdCode] = useState("");
  const [pdResult, setPdResult] = useState<any>(null);
  const [pdError, setPdError] = useState("");

  const [newMessage, setNewMessage] = useState("");
  const [suppFiles, setSuppFiles] = useState<File[]>([]);

  const lookupEnq = () => {
    setEnqError("");
    const found = enquiries.find(e => e.reference.toLowerCase() === enqRef.trim().toLowerCase())
      || cases.find(c => c.reference.toLowerCase() === enqRef.trim().toLowerCase());
    if (found) { setEnqResult(found); }
    else { setEnqError("No record found with that reference number."); setEnqResult(null); }
  };

  const lookupAnon = () => {
    setAnonError("");
    const found = anonymousReports.find(r => r.referenceCode.toLowerCase() === anonCode.trim().toLowerCase() && r.type === "anonymous");
    if (found) { setAnonResult(found); }
    else { setAnonError("No anonymous report found with that code."); setAnonResult(null); }
  };

  const lookupPd = () => {
    setPdError("");
    const found = anonymousReports.find(r => r.referenceCode.toLowerCase() === pdCode.trim().toLowerCase() && r.type === "disclosure");
    if (found) { setPdResult(found); }
    else { setPdError("No protected disclosure found with that code."); setPdResult(null); }
  };

  const renderResult = (result: any) => {
    const status = result.status;
    const timeline = result.timeline || [];
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-heading text-sm font-semibold">{result.reference || result.referenceCode}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{result.subject}</p>
              </div>
              <Badge className={cn("text-xs", statusColors[status] || "")}>{status.replace("-", " ")}</Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              Submitted {new Date(result.createdAt).toLocaleDateString("en-AU", { dateStyle: "medium" })}
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="font-heading text-sm font-semibold mb-3">Status Timeline</h3>
          <StatusTimeline events={timeline.filter((e: any) => !e.isInternal)} />
        </div>

        {/* Message thread */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-heading text-sm font-semibold mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Messages
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {timeline.filter((e: any) => e.type === "message" && !e.isInternal).map((e: any) => (
                <div key={e.id} className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{e.actor}</span>
                    <span className="text-[10px] text-muted-foreground">{new Date(e.timestamp).toLocaleDateString("en-AU")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{e.description}</p>
                  {e.channel && <Badge variant="outline" className="mt-1 text-[10px]">{e.channel}</Badge>}
                </div>
              ))}
              {timeline.filter((e: any) => e.type === "message" && !e.isInternal).length === 0 && (
                <p className="text-sm text-muted-foreground">No messages yet.</p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t space-y-3">
              <Textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Send a message…" rows={2} maxLength={1000} />
              <div className="flex items-center justify-between">
                <EvidenceUpload files={suppFiles} onChange={setSuppFiles} maxFiles={3} />
                <Button size="sm" disabled={!newMessage.trim()}>
                  <Send className="h-3.5 w-3.5 mr-1" /> Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-10">
        <div className="container">
          <h1 className="font-heading text-3xl font-extrabold mb-2">Track Your Request</h1>
          <p className="text-primary-foreground/80">Check the status of your enquiry, report, or disclosure.</p>
        </div>
      </section>

      <div className="container py-8 max-w-2xl">
        <Tabs defaultValue="enquiry">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="enquiry" className="gap-1.5"><FileText className="h-3.5 w-3.5" /> Enquiry / Complaint</TabsTrigger>
            <TabsTrigger value="anonymous" className="gap-1.5"><Shield className="h-3.5 w-3.5" /> Anonymous Report</TabsTrigger>
            <TabsTrigger value="disclosure" className="gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Protected Disclosure</TabsTrigger>
          </TabsList>

          <TabsContent value="enquiry" className="space-y-4">
            <Card>
              <CardContent className="p-5 space-y-3">
                <Label htmlFor="enq-ref">Reference number</Label>
                <div className="flex gap-2">
                  <Input id="enq-ref" value={enqRef} onChange={(e) => setEnqRef(e.target.value)} placeholder="ENQ-2026-0001 or CMP-2026-0001" maxLength={30} />
                  <Button onClick={lookupEnq} disabled={!enqRef.trim()}><Search className="h-4 w-4 mr-1" /> Look up</Button>
                </div>
                {enqError && <p className="text-sm text-destructive">{enqError}</p>}
                <p className="text-xs text-muted-foreground">Demo: try <code className="bg-muted px-1 rounded">ENQ-2026-0001</code> or <code className="bg-muted px-1 rounded">CMP-2026-0001</code></p>
              </CardContent>
            </Card>
            {enqResult && renderResult(enqResult)}
          </TabsContent>

          <TabsContent value="anonymous" className="space-y-4">
            <Card>
              <CardContent className="p-5 space-y-3">
                <Label htmlFor="anon-code">Anonymous reference code</Label>
                <div className="flex gap-2">
                  <Input id="anon-code" value={anonCode} onChange={(e) => setAnonCode(e.target.value)} placeholder="ANON-XXXXXX" maxLength={20} className="font-mono" />
                  <Button onClick={lookupAnon} disabled={!anonCode.trim()}><Search className="h-4 w-4 mr-1" /> Look up</Button>
                </div>
                {anonError && <p className="text-sm text-destructive">{anonError}</p>}
                <p className="text-xs text-muted-foreground">Demo: try <code className="bg-muted px-1 rounded font-mono">ANON-7X9K2M</code></p>
              </CardContent>
            </Card>
            {anonResult && renderResult(anonResult)}
          </TabsContent>

          <TabsContent value="disclosure" className="space-y-4">
            <Card>
              <CardContent className="p-5 space-y-3">
                <Label htmlFor="pd-code">Secure reference code</Label>
                <div className="flex gap-2">
                  <Input id="pd-code" value={pdCode} onChange={(e) => setPdCode(e.target.value)} placeholder="PD-SEC-XXXXXX" maxLength={20} className="font-mono" />
                  <Button onClick={lookupPd} disabled={!pdCode.trim()}><Search className="h-4 w-4 mr-1" /> Look up</Button>
                </div>
                {pdError && <p className="text-sm text-destructive">{pdError}</p>}
                <p className="text-xs text-muted-foreground">Demo: try <code className="bg-muted px-1 rounded font-mono">PD-SEC-4R8W1N</code></p>
              </CardContent>
            </Card>
            {pdResult && renderResult(pdResult)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
