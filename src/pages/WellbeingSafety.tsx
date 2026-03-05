import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { generateReference } from "@/mocks/utils";
import { motion } from "framer-motion";
import { Heart, Phone, AlertTriangle, CheckCircle2, Shield, Clock } from "lucide-react";

const crisisNumbers = [
  { label: "Lifeline", number: "13 11 14", available: "24/7" },
  { label: "Beyond Blue", number: "1300 22 4636", available: "24/7" },
  { label: "UNSW Security", number: "9385 6666", available: "24/7" },
];

export default function WellbeingSafety() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [safeContact, setSafeContact] = useState(true);
  const [safeTime, setSafeTime] = useState("");
  const [notReady, setNotReady] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = generateReference("WB");
    setRefNumber(ref);
    setSubmitted(true);
    toast({ title: "Support request received", description: `Reference: ${ref}` });
  };

  if (submitted) {
    return (
      <div className="container py-16 max-w-lg text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="font-heading text-2xl font-bold mb-2">We've received your request</h1>
          <p className="text-muted-foreground mb-1">Reference: <strong className="text-primary">{refNumber}</strong></p>
          <p className="text-sm text-muted-foreground mb-6">A wellbeing advisor will reach out at your preferred time. If you're in crisis, please call the numbers below.</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate("/support")}>Back to Support</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      {/* Gentle hero — trauma-informed tone */}
      <section className="bg-gradient-to-br from-success/10 via-background to-background py-12">
        <div className="container">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-success" />
            <h1 className="font-heading text-3xl font-extrabold">Wellbeing & Safety</h1>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Your safety and wellbeing matter. This is a safe space — you can share as much or as little as you're comfortable with.
          </p>
        </div>
      </section>

      <div className="container py-8 grid lg:grid-cols-2 gap-8 max-w-5xl">
        {/* Left — Urgent + Support cards */}
        <div className="space-y-4">
          {/* Urgent help card */}
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h2 className="font-heading text-base font-semibold text-destructive">Need urgent help?</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                If you or someone you know is in immediate danger, call <strong>000</strong>. For crisis support:
              </p>
              <ul className="space-y-2">
                {crisisNumbers.map((c) => (
                  <li key={c.label} className="flex items-center justify-between bg-card rounded-md px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium">{c.label}</span>
                    </div>
                    <div className="text-right">
                      <a href={`tel:${c.number.replace(/\s/g, "")}`} className="text-sm font-semibold text-primary hover:underline">{c.number}</a>
                      <p className="text-[10px] text-muted-foreground">{c.available}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Support info card */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-success" />
                <h3 className="font-heading text-sm font-semibold">Confidential support</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Our wellbeing team provides free, confidential support for all students. You can also book face-to-face or online counselling sessions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right — Form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="font-heading text-lg font-semibold mb-4">Request Support</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wb-name">Your name (optional)</Label>
                <Input id="wb-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wb-email">Email (optional)</Label>
                <Input id="wb-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="not-ready" className="text-sm cursor-pointer">I'm not ready to share details yet</Label>
                <Switch id="not-ready" checked={notReady} onCheckedChange={setNotReady} />
              </div>

              {!notReady && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wb-msg">What's going on? (share only what you're comfortable with)</Label>
                    <Textarea id="wb-msg" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} maxLength={2000} placeholder="You can describe your situation here…" />
                  </div>
                </motion.div>
              )}

              <div className="space-y-3 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="safe-contact" className="text-sm cursor-pointer">I have a safe time to be contacted</Label>
                  </div>
                  <Switch id="safe-contact" checked={safeContact} onCheckedChange={setSafeContact} />
                </div>
                {safeContact && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Input value={safeTime} onChange={(e) => setSafeTime(e.target.value)} placeholder="e.g. Weekdays 10am–2pm" maxLength={100} />
                  </motion.div>
                )}
              </div>

              <Button type="submit" className="w-full bg-success hover:bg-success/90 text-success-foreground font-semibold">
                Send Request <Heart className="h-4 w-4 ml-1" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
