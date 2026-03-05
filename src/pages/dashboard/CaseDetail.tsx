import { useParams, Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { StatusTimeline } from "@/components/StatusTimeline";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  "submitted": "bg-muted text-muted-foreground",
  "under-review": "bg-accent/20 text-accent-foreground",
  "in-progress": "bg-primary/10 text-primary",
  "resolved": "bg-success/10 text-success",
  "closed": "bg-muted text-muted-foreground",
  "sealed": "bg-destructive/10 text-destructive",
};

export default function CaseDetail() {
  const { id } = useParams<{ id: string }>();
  const { cases } = useDemo();
  const c = cases.find(cs => cs.id === id);

  if (!c) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Case not found.</p>
        <Link to="/dashboard/cases"><Button variant="outline" className="mt-4"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
      </div>
    );
  }

  const daysRemaining = c.statutoryDeadline
    ? Math.max(0, Math.ceil((new Date(c.statutoryDeadline).getTime() - Date.now()) / 86400000))
    : null;

  return (
    <div className="space-y-6 max-w-2xl">
      <Link to="/dashboard/cases" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Cases
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-mono text-muted-foreground">{c.reference}</p>
            <Badge variant="outline" className="text-[10px] capitalize">{c.type}</Badge>
            {c.isSensitive && (
              <Badge className="bg-destructive/10 text-destructive text-[10px] gap-1">
                <Shield className="h-3 w-3" /> Sensitive
              </Badge>
            )}
          </div>
          {c.isSensitive ? (
            <h1 className="font-heading text-xl font-bold mt-1 text-muted-foreground italic">Details restricted for safety</h1>
          ) : (
            <h1 className="font-heading text-xl font-bold mt-1">{c.subject}</h1>
          )}
          <p className="text-sm text-muted-foreground mt-1">Opened {new Date(c.createdAt).toLocaleDateString("en-AU", { dateStyle: "long" })}</p>
        </div>
        <Badge className={cn("text-xs", statusColors[c.status] || "")}>{c.status.replace("-", " ")}</Badge>
      </div>

      {/* Statutory deadline */}
      {daysRemaining !== null && (
        <Card className={cn("border-l-4", daysRemaining < 5 ? "border-l-destructive" : "border-l-accent")}>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className={cn("h-5 w-5", daysRemaining < 5 ? "text-destructive" : "text-accent")} />
            <div>
              <p className="text-sm font-medium">Statutory deadline</p>
              <p className="text-xs text-muted-foreground">{daysRemaining} days remaining · Due {new Date(c.statutoryDeadline!).toLocaleDateString("en-AU", { dateStyle: "long" })}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Milestone timeline */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-heading text-sm font-semibold mb-3">Case Timeline</h3>
          <StatusTimeline events={c.timeline.filter(t => !t.isInternal)} />
        </CardContent>
      </Card>
    </div>
  );
}
