import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, ArrowRight, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const { setPersona, allPersonas, currentPersona } = useDemo();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Check for identity linking: if anonymous user's email matches a known persona
  const matchedPersona = email
    ? allPersonas.find((p) => p.email?.toLowerCase() === email.toLowerCase() && p.id !== "anonymous")
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (matchedPersona) {
        setPersona(matchedPersona.id);
        toast({ title: "Welcome back!", description: `Logged in as ${matchedPersona.name}` });
        navigate(matchedPersona.role === "student" ? "/dashboard" : "/staff");
      } else {
        // Default to Jane Chen (student)
        const jane = allPersonas.find((p) => p.id === "jane-chen");
        if (jane) setPersona(jane.id);
        toast({ title: "Logged in", description: "Demo login — signed in as Jane Chen" });
        navigate("/dashboard");
      }
      setLoading(false);
    }, 800);
  };

  const handleSSO = () => {
    setLoading(true);
    setTimeout(() => {
      const jane = allPersonas.find((p) => p.id === "jane-chen");
      if (jane) setPersona(jane.id);
      toast({ title: "SSO Login", description: "Signed in via UNSW SSO as Jane Chen" });
      navigate("/dashboard");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary mb-3">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="font-heading text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your UNSW College portal</p>
        </div>

        <Card>
          <CardContent className="p-6">
            {/* SSO Button */}
            <Button onClick={handleSSO} disabled={loading} variant="outline" className="w-full mb-4 h-11 font-medium">
              <img src="https://www.unsw.edu.au/etc.clientlibs/unsw/clientlibs/unsw-common/resources/images/UNSWlogo.svg" alt="" className="h-4 mr-2 invert dark:invert-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              Sign in with UNSW SSO
            </Button>

            <div className="relative my-5">
              <Separator />
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                or use email
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Identity linking banner */}
              {matchedPersona && currentPersona.id === "anonymous" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-start gap-2 bg-accent/10 border border-accent/30 rounded-lg p-3 text-sm"
                >
                  <AlertCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Account found!</p>
                    <p className="text-muted-foreground text-xs">
                      We found an existing account for <strong>{matchedPersona.name}</strong>. Logging in will link any anonymous submissions to this account.
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full font-semibold">
                {loading ? "Signing in…" : "Sign in"} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">Create one</Link>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          This is a demo prototype. No real authentication occurs.
        </p>
      </motion.div>
    </div>
  );
}
