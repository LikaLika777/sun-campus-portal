import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useDemo } from "@/contexts/DemoContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ClipboardList, Filter } from "lucide-react";
import { format } from "date-fns";
import type { TimelineEvent } from "@/mocks/demo-stories";

const typeLabels: Record<string, string> = {
  submitted: "Submission",
  assigned: "Assignment",
  "status-change": "Status Change",
  message: "Message",
  note: "Note",
  evidence: "Evidence",
  merged: "Identity Merge",
  escalated: "Escalation",
  sealed: "Sealed",
};

const typeColors: Record<string, string> = {
  submitted: "bg-muted text-muted-foreground",
  assigned: "bg-primary/10 text-primary",
  "status-change": "bg-accent/20 text-accent-foreground",
  message: "bg-primary/10 text-primary",
  note: "bg-muted text-muted-foreground",
  evidence: "bg-success/10 text-success",
  merged: "bg-accent/20 text-accent-foreground",
  escalated: "bg-destructive/10 text-destructive",
  sealed: "bg-destructive/10 text-destructive",
};

export default function AuditTrail() {
  const { id } = useParams<{ id: string }>();
  const { enquiries, cases, anonymousReports } = useDemo();
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Find the item across all collections
  const enquiry = enquiries.find(e => e.id === id);
  const caseItem = cases.find(c => c.id === id);
  const anonReport = anonymousReports.find(r => r.id === id);
  const item = enquiry || caseItem || anonReport;

  if (!item) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">Record not found.</p>
        <Link to="/staff/inbox"><Button variant="outline" className="mt-4"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
      </div>
    );
  }

  const ref = "reference" in item ? item.reference : "referenceCode" in item ? (item as any).referenceCode : "Unknown";
  const allEvents: (TimelineEvent & { source?: string })[] = [
    ...item.timeline,
    // Add mock audit-only events
    { id: "audit-access-1", timestamp: item.createdAt, type: "note" as const, description: "Record accessed by Sarah Thompson", actor: "System", isInternal: true },
  ];

  const eventTypes = Array.from(new Set(allEvents.map(e => e.type)));
  const filtered = typeFilter === "all" ? allEvents : allEvents.filter(e => e.type === typeFilter);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <Link to="/staff/inbox" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Inbox
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-primary" /> Audit Trail
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Complete event log for <span className="font-mono">{ref}</span>
          </p>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter events">
        <button
          onClick={() => setTypeFilter("all")}
          className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-colors",
            typeFilter === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"
          )}
        >
          All ({allEvents.length})
        </button>
        {eventTypes.map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={cn("px-3 py-1 rounded-full text-xs font-medium border transition-colors",
              typeFilter === t ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"
            )}
          >
            {typeLabels[t] || t} ({allEvents.filter(e => e.type === t).length})
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
        <ol className="space-y-3">
          {filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(event => (
            <li key={event.id} className="relative pl-10">
              <span className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-card border border-border">
                <span className={cn("h-2 w-2 rounded-full", typeColors[event.type]?.includes("destructive") ? "bg-destructive" : typeColors[event.type]?.includes("success") ? "bg-success" : typeColors[event.type]?.includes("primary") ? "bg-primary" : "bg-muted-foreground")} />
              </span>
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge className={cn("text-[9px]", typeColors[event.type] || "")}>{typeLabels[event.type] || event.type}</Badge>
                        {event.isInternal && <Badge variant="outline" className="text-[9px]">Internal</Badge>}
                        {event.channel && <Badge variant="secondary" className="text-[9px]">{event.channel}</Badge>}
                      </div>
                      <p className="text-sm">{event.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-muted-foreground">{format(new Date(event.timestamp), "dd MMM yyyy")}</p>
                      <p className="text-[10px] text-muted-foreground">{format(new Date(event.timestamp), "HH:mm")}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">Actor: {event.actor}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
