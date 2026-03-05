import { ShieldOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 mx-auto mb-4">
            <ShieldOff className="h-7 w-7 text-destructive" />
          </div>
          <h1 className="font-heading text-xl font-bold mb-2">Access Restricted</h1>
          <p className="text-sm text-muted-foreground mb-6">
            You do not have permission to view this resource. This access attempt has been logged.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/staff/inbox"><Button variant="outline">Back to Inbox</Button></Link>
            <Link to="/"><Button>Go to Home</Button></Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
