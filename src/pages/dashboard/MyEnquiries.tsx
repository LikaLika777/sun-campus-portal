import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  "open": "bg-muted text-muted-foreground",
  "in-progress": "bg-primary/10 text-primary",
  "awaiting-response": "bg-accent/20 text-accent-foreground",
  "resolved": "bg-success/10 text-success",
  "closed": "bg-muted text-muted-foreground",
};

export default function MyEnquiries() {
  const { currentPersona, enquiries } = useDemo();
  const myEnquiries = enquiries.filter(e => e.personaId === currentPersona.id);

  if (myEnquiries.length === 0) {
    return <EmptyState icon={FileText} title="No enquiries" description="You haven't submitted any enquiries yet." action={<Link to="/enquire"><Button>Make an Enquiry</Button></Link>} />;
  }

  return (
    <div className="space-y-4">
      <h1 className="font-heading text-2xl font-bold">My Enquiries</h1>
      <div className="space-y-2">
        {myEnquiries.map(enq => (
          <Link key={enq.id} to={`/dashboard/enquiries/${enq.id}`}>
            <Card className="hover:shadow-sm transition-all cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">{enq.reference}</span>
                    <Badge variant="outline" className="text-[10px]">{enq.channel}</Badge>
                  </div>
                  <p className="text-sm font-medium truncate">{enq.subject}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{enq.category} · {new Date(enq.updatedAt).toLocaleDateString("en-AU", { dateStyle: "medium" })}</p>
                </div>
                <Badge className={cn("ml-3 text-xs shrink-0", statusColors[enq.status] || "")}>{enq.status.replace("-", " ")}</Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
