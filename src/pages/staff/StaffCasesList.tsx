import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Shield, Clock } from "lucide-react";

const statusColors: Record<string, string> = {
  "submitted": "bg-muted text-muted-foreground",
  "under-review": "bg-accent/20 text-accent-foreground",
  "in-progress": "bg-primary/10 text-primary",
  "resolved": "bg-success/10 text-success",
  "closed": "bg-muted text-muted-foreground",
  "sealed": "bg-destructive/10 text-destructive",
};

export default function StaffCasesList() {
  const { cases } = useDemo();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h1 className="font-heading text-2xl font-bold">All Cases</h1>
      <div className="space-y-2">
        {cases.map(c => {
          const daysRemaining = c.statutoryDeadline
            ? Math.max(0, Math.ceil((new Date(c.statutoryDeadline).getTime() - Date.now()) / 86400000))
            : null;
          return (
            <Link key={c.id} to={`/staff/cases/${c.id}`}>
              <Card className="hover:shadow-sm transition-all cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">{c.reference}</span>
                      <Badge variant="outline" className="text-[10px] capitalize">{c.type}</Badge>
                      {c.isSensitive && <Shield className="h-3 w-3 text-destructive" />}
                    </div>
                    <p className="text-sm font-medium truncate">{c.isSensitive ? "Sensitive — restricted" : c.subject}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-muted-foreground">{new Date(c.updatedAt).toLocaleDateString("en-AU", { dateStyle: "medium" })}</span>
                      {daysRemaining !== null && (
                        <span className={cn("text-[10px] flex items-center gap-0.5", daysRemaining < 5 ? "text-destructive" : "text-muted-foreground")}>
                          <Clock className="h-3 w-3" /> {daysRemaining}d remaining
                        </span>
                      )}
                    </div>
                  </div>
                  <Badge className={cn("ml-3 text-xs shrink-0", statusColors[c.status] || "")}>{c.status.replace("-", " ")}</Badge>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
