import { Link } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { FileText, Briefcase, Bell, MessageSquare, ArrowRight, AlertTriangle, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

export default function StudentDashboard() {
  const { currentPersona, enquiries, cases } = useDemo();

  const myEnquiries = enquiries.filter(e => e.personaId === currentPersona.id);
  const myCases = cases.filter(c => c.personaId === currentPersona.id);
  const openEnquiries = myEnquiries.filter(e => e.status !== "resolved" && e.status !== "closed");
  const activeCases = myCases.filter(c => c.status !== "resolved" && c.status !== "closed" && c.status !== "sealed");
  const unreadCount = 3; // mock

  const urgentItems = myCases.filter(c => c.status === "awaiting-response" || c.priority === "urgent");

  const activityFeed = [...myEnquiries.flatMap(e => e.timeline.slice(-1).map(t => ({ ...t, ref: e.reference, type_label: "Enquiry" }))),
    ...myCases.flatMap(c => c.timeline.filter(t => !t.isInternal).slice(-1).map(t => ({ ...t, ref: c.reference, type_label: "Case" })))]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Alert zone */}
      {urgentItems.length > 0 && (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
            <div>
              <p className="font-heading text-sm font-semibold text-destructive">Action required</p>
              <p className="text-sm text-muted-foreground mt-1">
                You have {urgentItems.length} case{urgentItems.length > 1 ? "s" : ""} awaiting your response.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Welcome */}
      <div>
        <h1 className="font-heading text-2xl font-bold">Welcome back, {currentPersona.name.split(" ")[0]}</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's an overview of your interactions with UNSW College.</p>
      </div>

      {/* Stat cards */}
      <motion.div variants={container} initial="hidden" animate="visible" className="grid gap-4 sm:grid-cols-3">
        <motion.div variants={item}>
          <Link to="/dashboard/enquiries">
            <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-heading text-2xl font-bold">{openEnquiries.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Open Enquiries</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link to="/dashboard/cases">
            <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Briefcase className="h-5 w-5 text-accent" />
                  <span className="font-heading text-2xl font-bold">{activeCases.length}</span>
                </div>
                <p className="text-sm text-muted-foreground">Active Cases</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={item}>
          <Link to="/dashboard/inbox">
            <Card className="hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Bell className="h-5 w-5 text-destructive" />
                  <span className="font-heading text-2xl font-bold">{unreadCount}</span>
                </div>
                <p className="text-sm text-muted-foreground">Unread Notifications</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </motion.div>

      {/* Activity feed + Quick actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-lg font-semibold mb-3">Recent Activity</h2>
          <div className="space-y-2">
            {activityFeed.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">No recent activity.</p>
            ) : (
              activityFeed.map((a, i) => (
                <Card key={a.id + i}>
                  <CardContent className="p-3 flex items-start gap-3">
                    <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge variant="outline" className="text-[10px]">{a.type_label}</Badge>
                        <span className="text-xs text-muted-foreground">{a.ref}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{a.description}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">{new Date(a.timestamp).toLocaleDateString("en-AU", { dateStyle: "medium" })}</p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold mb-3">Quick Actions</h2>
          <div className="space-y-2">
            <Link to="/enquire">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Plus className="h-4 w-4" /> New Enquiry
              </Button>
            </Link>
            <Link to="/support/complaint">
              <Button variant="outline" className="w-full justify-start gap-2">
                <AlertTriangle className="h-4 w-4" /> Lodge Complaint
              </Button>
            </Link>
            <Link to="/track">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" /> Track Request
              </Button>
            </Link>
            <Link to="/support">
              <Button variant="outline" className="w-full justify-start gap-2">
                <ArrowRight className="h-4 w-4" /> Support Hub
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
