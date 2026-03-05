import { useState } from "react";
import { useDemo } from "@/contexts/DemoContext";
import { StatusTimeline } from "@/components/StatusTimeline";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Clock, Send, Mail, Phone, MessageSquare, Globe, User, AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Enquiry, Case, ChannelType } from "@/mocks/demo-stories";

const channelIcons: Record<ChannelType, React.ElementType> = {
  web: Globe, email: Mail, phone: Phone, chat: MessageSquare, "in-person": User,
};

const statusColors: Record<string, string> = {
  "open": "bg-muted text-muted-foreground",
  "in-progress": "bg-primary/10 text-primary",
  "awaiting-response": "bg-accent/20 text-accent-foreground",
  "resolved": "bg-success/10 text-success",
  "closed": "bg-muted text-muted-foreground",
  "submitted": "bg-muted text-muted-foreground",
  "under-review": "bg-accent/20 text-accent-foreground",
  "sealed": "bg-destructive/10 text-destructive",
};

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-accent/20 text-accent-foreground",
  high: "bg-destructive/10 text-destructive",
  urgent: "bg-destructive text-destructive-foreground",
};

const responseTemplates = [
  { id: "ack", label: "Acknowledge receipt", body: "Thank you for contacting UNSW College. We've received your enquiry and will respond within 2 business days." },
  { id: "info", label: "Request more info", body: "To assist you further, could you please provide additional details regarding your enquiry?" },
  { id: "resolved", label: "Mark resolved", body: "We're pleased to confirm your enquiry has been resolved. Please don't hesitate to reach out if you need further assistance." },
];

function getSlaHours(priority: string): number {
  return priority === "urgent" ? 4 : priority === "high" ? 8 : priority === "medium" ? 24 : 48;
}

function getSlaStatus(createdAt: string, priority: string): { label: string; color: string; overdue: boolean } {
  const hours = (Date.now() - new Date(createdAt).getTime()) / 3600000;
  const sla = getSlaHours(priority);
  if (hours > sla) return { label: `Overdue by ${Math.round(hours - sla)}h`, color: "text-destructive", overdue: true };
  const remaining = Math.round(sla - hours);
  return { label: `${remaining}h remaining`, color: remaining < sla * 0.25 ? "text-accent" : "text-success", overdue: false };
}

export default function StaffInbox() {
  const { enquiries, cases, currentPersona } = useDemo();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyChannel, setReplyChannel] = useState<string>("email");
  const [template, setTemplate] = useState("");

  // Combine enquiries + cases into one queue
  type QueueItem = (Enquiry | Case) & { itemType: "enquiry" | "case" };
  const queue: QueueItem[] = [
    ...enquiries.map(e => ({ ...e, itemType: "enquiry" as const })),
    ...cases.map(c => ({ ...c, itemType: "case" as const, channel: c.timeline[0]?.channel || ("web" as ChannelType), category: c.type, priority: c.priority })),
  ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const selected = queue.find(q => q.id === selectedId);

  const handleTemplateSelect = (tplId: string) => {
    setTemplate(tplId);
    const t = responseTemplates.find(r => r.id === tplId);
    if (t) setReplyText(t.body);
  };

  return (
    <div className="flex h-[calc(100vh-3rem)]">
      {/* Left panel — queue list */}
      <div className="w-80 lg:w-96 border-r flex flex-col bg-card">
        <div className="p-3 border-b">
          <h2 className="font-heading text-sm font-semibold">Queue</h2>
          <p className="text-[10px] text-muted-foreground">{queue.length} items · Logged in as {currentPersona.name}</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {queue.map(item => {
            const sla = getSlaStatus(item.createdAt, item.priority);
            const ChIcon = channelIcons[(item as any).channel || "web"];
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={cn(
                  "w-full text-left p-3 border-b transition-colors hover:bg-muted/50",
                  selectedId === item.id && "bg-primary/5 border-l-2 border-l-primary"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-muted-foreground">{item.reference}</span>
                  <div className="flex items-center gap-1">
                    <ChIcon className="h-3 w-3 text-muted-foreground" />
                    <Badge className={cn("text-[9px] px-1.5 py-0", priorityColors[item.priority])}>{item.priority}</Badge>
                  </div>
                </div>
                <p className="text-sm font-medium truncate">{item.subject}</p>
                <div className="flex items-center justify-between mt-1">
                  <Badge className={cn("text-[9px]", statusColors[item.status])}>{item.status.replace("-", " ")}</Badge>
                  <span className={cn("text-[10px] flex items-center gap-0.5", sla.color)}>
                    <Clock className="h-3 w-3" /> {sla.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right panel — detail */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {!selected ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
            Select an item from the queue
          </div>
        ) : (
          <motion.div key={selected.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b bg-card">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{selected.reference}</span>
                    <Badge variant="outline" className="text-[10px] capitalize">{selected.itemType}</Badge>
                    <Badge className={cn("text-[10px]", priorityColors[selected.priority])}>{selected.priority}</Badge>
                  </div>
                  <h2 className="font-heading text-lg font-semibold">{selected.subject}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    From persona: {selected.personaId} · {new Date(selected.createdAt).toLocaleDateString("en-AU", { dateStyle: "medium" })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline"><User className="h-3.5 w-3.5 mr-1" /> Assign</Button>
                  {selected.itemType === "enquiry" && (
                    <Button size="sm" variant="outline"><AlertTriangle className="h-3.5 w-3.5 mr-1" /> Escalate to Case</Button>
                  )}
                </div>
              </div>
            </div>

            {/* Timeline + conversation */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="font-heading text-sm font-semibold mb-3">Cross-channel Timeline</h3>
              <StatusTimeline events={selected.timeline} showInternal={true} />
            </div>

            {/* Response composer */}
            <div className="border-t bg-card p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Select value={template} onValueChange={handleTemplateSelect}>
                  <SelectTrigger className="w-48 h-8 text-xs"><SelectValue placeholder="Use template…" /></SelectTrigger>
                  <SelectContent>
                    {responseTemplates.map(t => (
                      <SelectItem key={t.id} value={t.id} className="text-xs">{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={replyChannel} onValueChange={setReplyChannel}>
                  <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="chat">Chat</SelectItem>
                    <SelectItem value="web">Portal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} rows={3} placeholder="Type your response…" maxLength={2000} />
              <div className="flex justify-end">
                <Button size="sm" disabled={!replyText.trim()}>
                  <Send className="h-3.5 w-3.5 mr-1" /> Send via {replyChannel}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
