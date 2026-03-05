import { useParams, Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { StatusTimeline } from "@/components/StatusTimeline";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  "open": "bg-muted text-muted-foreground",
  "in-progress": "bg-primary/10 text-primary",
  "awaiting-response": "bg-accent/20 text-accent-foreground",
  "resolved": "bg-success/10 text-success",
  "closed": "bg-muted text-muted-foreground",
};

export default function EnquiryDetail() {
  const { id } = useParams<{ id: string }>();
  const { enquiries } = useDemo();
  const enq = enquiries.find(e => e.id === id);

  if (!enq) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Enquiry not found.</p>
        <Link to="/dashboard/enquiries"><Button variant="outline" className="mt-4"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Button></Link>
      </div>
    );
  }

  const messages = enq.timeline.filter(t => t.type === "message" && !t.isInternal);

  return (
    <div className="space-y-6 max-w-2xl">
      <Link to="/dashboard/enquiries" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Enquiries
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-muted-foreground">{enq.reference}</p>
          <h1 className="font-heading text-xl font-bold mt-1">{enq.subject}</h1>
          <p className="text-sm text-muted-foreground mt-1">{enq.category} · Submitted {new Date(enq.createdAt).toLocaleDateString("en-AU", { dateStyle: "long" })}</p>
        </div>
        <Badge className={cn("text-xs", statusColors[enq.status] || "")}>{enq.status.replace("-", " ")}</Badge>
      </div>

      {/* Timeline */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-heading text-sm font-semibold mb-3">Timeline</h3>
          <StatusTimeline events={enq.timeline.filter(t => !t.isInternal)} />
        </CardContent>
      </Card>

      {/* Threaded conversation */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-heading text-sm font-semibold mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Conversation
          </h3>
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground">No messages yet.</p>
          ) : (
            <div className="space-y-3">
              {messages.map(m => (
                <div key={m.id} className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{m.actor}</span>
                    <div className="flex items-center gap-2">
                      {m.channel && <Badge variant="outline" className="text-[10px]">{m.channel}</Badge>}
                      <span className="text-[10px] text-muted-foreground">{new Date(m.timestamp).toLocaleDateString("en-AU")}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{m.description}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
