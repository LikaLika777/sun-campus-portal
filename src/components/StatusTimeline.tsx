import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { TimelineEvent } from "@/mocks/demo-stories";
import { MessageSquare, FileText, ArrowRight, AlertCircle, UserCheck, Lock, GitMerge, ArrowUp } from "lucide-react";

const iconMap: Record<TimelineEvent["type"], React.ElementType> = {
  submitted: FileText,
  assigned: UserCheck,
  "status-change": ArrowRight,
  message: MessageSquare,
  note: FileText,
  evidence: FileText,
  merged: GitMerge,
  escalated: ArrowUp,
  sealed: Lock,
};

interface StatusTimelineProps {
  events: TimelineEvent[];
  showInternal?: boolean;
  className?: string;
}

export function StatusTimeline({ events, showInternal = false, className }: StatusTimelineProps) {
  const filtered = showInternal ? events : events.filter((e) => !e.isInternal);

  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
      <ol className="space-y-4" aria-label="Status timeline">
        {filtered.map((event) => {
          const Icon = iconMap[event.type] ?? AlertCircle;
          return (
            <li key={event.id} className="relative pl-10">
              <span className="absolute left-2 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-card border border-border">
                <Icon className="h-3 w-3 text-muted-foreground" />
              </span>
              <div>
                <p className="text-sm">{event.description}</p>
                <div className="flex flex-wrap gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{format(new Date(event.timestamp), "dd MMM yyyy, HH:mm")}</span>
                  <span>·</span>
                  <span>{event.actor}</span>
                  {event.channel && (
                    <>
                      <span>·</span>
                      <span className="capitalize">{event.channel}</span>
                    </>
                  )}
                  {event.isInternal && (
                    <span className="rounded bg-warning/20 px-1.5 text-[10px] font-medium text-warning-foreground">Internal</span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
