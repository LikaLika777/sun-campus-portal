import { useState } from "react";
import { useDemo } from "@/contexts/DemoContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inbox as InboxIcon, Check, Mail, Bell } from "lucide-react";
import { EmptyState } from "@/components/EmptyState";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  body: string;
  type: "message" | "update" | "alert";
  read: boolean;
  date: string;
  link?: string;
}

const mockNotifications: Notification[] = [
  { id: "n1", title: "Response to your enquiry", body: "Sarah Thompson replied to ENQ-2026-0001", type: "message", read: false, date: "2026-03-04T10:00:00Z", link: "/dashboard/enquiries/enq-1" },
  { id: "n2", title: "Case status updated", body: "CMP-2026-0001 has been updated to 'In Progress'", type: "update", read: false, date: "2026-03-03T14:00:00Z", link: "/dashboard/cases/case-1" },
  { id: "n3", title: "New message from Wellbeing team", body: "Emma Richards sent you a message regarding your wellbeing case", type: "message", read: true, date: "2026-03-01T09:00:00Z" },
];

const typeIcons = { message: Mail, update: Bell, alert: Bell };

export default function DashboardInbox() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const filtered = filter === "unread" ? notifications.filter(n => !n.read) : notifications;

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  if (notifications.length === 0) {
    return <EmptyState icon={InboxIcon} title="Inbox is empty" description="You're all caught up!" />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Inbox</h1>
        <div className="flex gap-2">
          {(["all", "unread"] as const).map(f => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="capitalize text-xs">
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(n => {
          const Icon = typeIcons[n.type];
          return (
            <Card key={n.id} className={cn("transition-all cursor-pointer hover:shadow-sm", !n.read && "border-l-4 border-l-primary")}>
              <CardContent className="p-4 flex items-start gap-3">
                <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", !n.read ? "text-primary" : "text-muted-foreground")} />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm", !n.read ? "font-semibold" : "font-medium")}>{n.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.body}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{new Date(n.date).toLocaleDateString("en-AU", { dateStyle: "medium" })}</p>
                </div>
                {!n.read && (
                  <Button size="sm" variant="ghost" className="shrink-0 text-xs" onClick={(e) => { e.stopPropagation(); markRead(n.id); }}>
                    <Check className="h-3 w-3 mr-1" /> Mark read
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
