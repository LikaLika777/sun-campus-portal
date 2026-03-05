import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const { setPersona, allPersonas } = useDemo();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const jane = allPersonas.find((p) => p.id === "jane-chen");
      if (jane) setPersona(jane.id);
      toast({ title: "Account created!", description: "Demo registration — signed in as Jane Chen" });
      navigate("/dashboard");
      setLoading(false);
    }, 800);
  };

  const handleSSO = () => {
    setLoading(true);
    setTimeout(() => {
      const jane = allPersonas.find((p) => p.id === "jane-chen");
      if (jane) setPersona(jane.id);
      toast({ title: "SSO Registration", description: "Registered via UNSW SSO as Jane Chen" });
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
          <h1 className="font-heading text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join UNSW College Student Portal</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Button onClick={handleSSO} disabled={loading} variant="outline" className="w-full mb-4 h-11 font-medium">
              <img src="https://www.unsw.edu.au/etc.clientlibs/unsw/clientlibs/unsw-common/resources/images/UNSWlogo.svg" alt="" className="h-4 mr-2 invert dark:invert-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              Register with UNSW SSO
            </Button>

            <div className="relative my-5">
              <Separator />
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                or use email
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="Jane" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Chen" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input id="reg-email" type="email" placeholder="you@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input id="reg-password" type="password" placeholder="Min 8 characters" required minLength={8} />
              </div>

              <Button type="submit" disabled={loading} className="w-full font-semibold">
                {loading ? "Creating account…" : "Create account"} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          This is a demo prototype. No real account is created.
        </p>
      </motion.div>
    </div>
  );
}
