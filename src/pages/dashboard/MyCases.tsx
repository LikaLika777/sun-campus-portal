import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/EmptyState";
import { Briefcase, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  "submitted": "bg-muted text-muted-foreground",
  "under-review": "bg-accent/20 text-accent-foreground",
  "in-progress": "bg-primary/10 text-primary",
  "awaiting-response": "bg-accent/20 text-accent-foreground",
  "resolved": "bg-success/10 text-success",
  "closed": "bg-muted text-muted-foreground",
  "sealed": "bg-destructive/10 text-destructive",
};

export default function MyCases() {
  const { currentPersona, cases } = useDemo();
  const myCases = cases.filter(c => c.personaId === currentPersona.id);

  if (myCases.length === 0) {
    return <EmptyState icon={Briefcase} title="No cases" description="You don't have any active cases." />;
  }

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">My Cases</h1>
      <div className="space-y-2">
        {myCases.map(c => (
          <Link key={c.id} to={`/dashboard/cases/${c.id}`}>
            <Card className="hover:shadow-sm transition-all cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{c.reference}</span>
                    <Badge variant="outline" className="text-[10px] capitalize">{c.type}</Badge>
                    {c.isSensitive && <Shield className="h-3 w-3 text-destructive" />}
                  </div>
                  {c.isSensitive ? (
                    <p className="text-sm font-medium text-muted-foreground italic">Sensitive — details restricted</p>
                  ) : (
                    <p className="text-sm font-medium truncate">{c.subject}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-0.5">{new Date(c.updatedAt).toLocaleDateString("en-AU", { dateStyle: "medium" })}</p>
                </div>
                <Badge className={cn("ml-3 text-xs shrink-0", statusColors[c.status] || "")}>{c.status.replace("-", " ")}</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
