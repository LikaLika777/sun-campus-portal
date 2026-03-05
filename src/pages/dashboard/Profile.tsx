import { useDemo } from "@/contexts/DemoContext";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { StatusTimeline } from "@/components/StatusTimeline";
import { Separator } from "@/components/ui/separator";
import { UserCircle, Mail, Phone, GraduationCap } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const { currentPersona, enquiries, cases } = useDemo();
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);

  const allTimeline = [
    ...enquiries.filter(e => e.personaId === currentPersona.id).flatMap(e => e.timeline.map(t => ({ ...t, ref: e.reference }))),
    ...cases.filter(c => c.personaId === currentPersona.id).flatMap(c => c.timeline.filter(t => !t.isInternal).map(t => ({ ...t, ref: c.reference }))),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 10);

  return (
    <div className="space-y-6 max-w-3xl w-full">
      <h1 className="font-heading text-2xl font-bold">My Profile</h1>

      {/* Read-only student info */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
              {currentPersona.avatar}
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold">{currentPersona.name}</h2>
              <p className="text-sm text-muted-foreground">{currentPersona.title}</p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{currentPersona.email || "—"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span>{currentPersona.studentId || "—"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editable contact preferences */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="font-heading text-base font-semibold">Contact Preferences</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notif" className="cursor-pointer">Email notifications</Label>
            <Switch id="email-notif" checked={emailNotif} onCheckedChange={setEmailNotif} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="sms-notif" className="cursor-pointer">SMS notifications</Label>
            <Switch id="sms-notif" checked={smsNotif} onCheckedChange={setSmsNotif} />
          </div>
        </CardContent>
      </Card>

      {/* Unified interaction history */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-heading text-base font-semibold mb-4">Interaction History</h3>
          {allTimeline.length === 0 ? (
            <p className="text-sm text-muted-foreground">No interactions yet.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {allTimeline.map((t, i) => (
                <div key={t.id + i} className="flex gap-3 text-sm">
                  <div className="text-[10px] text-muted-foreground w-20 shrink-0 pt-0.5">
                    {new Date(t.timestamp).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">{t.ref}</Badge>
                      {t.channel && <Badge variant="secondary" className="text-[10px]">{t.channel}</Badge>}
                    </div>
                    <p className="text-muted-foreground mt-0.5">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
