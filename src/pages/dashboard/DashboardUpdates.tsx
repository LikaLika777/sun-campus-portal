import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Check, Megaphone } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { cn } from "@/lib/utils";

interface Update {
  id: string;
  title: string;
  body: string;
  type: "broadcast" | "system";
  acknowledged: boolean;
  date: string;
}

const mockUpdates: Update[] = [
  { id: "u1", title: "Term 2 enrolment now open", body: "Enrolment for Term 2 2026 is now open. Visit the student portal to confirm your subjects.", type: "broadcast", acknowledged: false, date: "2026-03-01T08:00:00Z" },
  { id: "u2", title: "System maintenance — March 8", body: "The student portal will be unavailable from 2am–6am AEDT on March 8 for scheduled maintenance.", type: "system", acknowledged: false, date: "2026-02-28T12:00:00Z" },
  { id: "u3", title: "Wellbeing Week — March 10–14", body: "Join workshops, yoga sessions, and free counselling drop-ins during Wellbeing Week.", type: "broadcast", acknowledged: true, date: "2026-02-25T09:00:00Z" },
];

export default function DashboardUpdates() {
  const [updates, setUpdates] = useState(mockUpdates);
  const [filter, setFilter] = useState<"all" | "unacknowledged">("all");

  const filtered = filter === "unacknowledged" ? updates.filter(u => !u.acknowledged) : updates;

  const acknowledge = (id: string) => {
    setUpdates(prev => prev.map(u => u.id === id ? { ...u, acknowledged: true } : u));
  };

  if (updates.length === 0) {
    return <EmptyState icon={Bell} title="No updates" description="No announcements or system updates right now." />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Updates</h1>
        <div className="flex gap-2">
          {(["all", "unacknowledged"] as const).map(f => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="capitalize text-xs">
              {f === "unacknowledged" ? "New" : f}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(u => (
          <Card key={u.id} className={cn("transition-all", !u.acknowledged && "border-l-4 border-l-accent")}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Megaphone className={cn("h-4 w-4 mt-0.5 shrink-0", u.type === "broadcast" ? "text-accent" : "text-muted-foreground")} />
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold">{u.title}</p>
                      <Badge variant="outline" className="text-[10px] capitalize">{u.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{u.body}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{new Date(u.date).toLocaleDateString("en-AU", { dateStyle: "medium" })}</p>
                  </div>
                </div>
                {!u.acknowledged && (
                  <Button size="sm" variant="outline" className="shrink-0 text-xs" onClick={() => acknowledge(u.id)}>
                    <Check className="h-3 w-3 mr-1" /> Acknowledge
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
