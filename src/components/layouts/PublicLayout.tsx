import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Bell, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import unswLogo from "@/assets/unsw-college-logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/support", label: "Support" },
  { href: "/track", label: "Track Request" },
];

export function PublicLayout() {
  const { isLoggedIn, currentPersona, setPersona, enquiries, cases } = useDemo();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const notificationCount = useMemo(() => {
    if (!isLoggedIn) return 0;
    const personaEnquiries = enquiries.filter((e) => e.personaId === currentPersona.id);
    const personaCases = cases.filter((c) => c.personaId === currentPersona.id);
    return personaEnquiries.filter((e) => e.status !== "closed").length + personaCases.filter((c) => c.status !== "closed").length;
  }, [isLoggedIn, currentPersona, enquiries, cases]);

  const handleLogout = () => {
    setPersona("anonymous");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Header — white bar, matching reference site */}
      <header className="sticky top-0 z-40 bg-card border-b border-border" role="banner">
        <div className="container flex h-14 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src={unswLogo} alt="UNSW College" className="h-9 w-auto" />
          </Link>

          {/* Desktop nav — centered links */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors hover:text-foreground",
                  location.pathname === link.href
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-1.5">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard/inbox" className="relative hidden md:flex">
                  <Button size="sm" variant="ghost" className="relative h-9 w-9 p-0">
                    <Bell className="h-4 w-4" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="sm" variant="ghost" className="hidden md:flex text-sm font-medium">
                    <span className="mr-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                      {currentPersona.avatar}
                    </span>
                    My Portal
                  </Button>
                </Link>
                <Button size="sm" variant="ghost" className="hidden md:flex text-muted-foreground h-9 w-9 p-0" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="sm" variant="ghost" className="hidden md:flex text-sm font-medium">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="hidden md:flex bg-accent text-accent-foreground hover:bg-accent/90 text-sm font-medium">Register</Button>
                </Link>
              </>
            )}

            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="h-9 w-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            {/* Mobile menu */}
            <button
              className="md:hidden h-9 w-9 flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div className="border-t bg-card px-4 py-3">
            <div className="container">
              <div className="relative max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search courses, support topics..."
                  autoFocus
                  className="w-full pl-10 pr-4 py-2 rounded-md text-sm bg-muted text-foreground placeholder:text-muted-foreground border border-input focus:border-ring outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t bg-card p-4 space-y-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === link.href ? "text-foreground font-semibold bg-muted" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-3 py-2 text-sm font-medium text-primary">
                  Dashboard
                  {notificationCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                      {notificationCount}
                    </span>
                  )}
                </Link>
                <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="block w-full text-left px-3 py-2 text-sm font-medium text-destructive">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-primary">Log in</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-accent-foreground">Register</Link>
              </>
            )}
          </nav>
        )}
      </header>

      <main id="main-content" className="flex-1" role="main" aria-live="polite">
        <Outlet />
      </main>

      {/* Footer — black background matching reference */}
      <footer className="bg-[hsl(0,0%,10%)] text-[hsl(0,0%,70%)]" role="contentinfo">
        <div className="container py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Column 1 — Branding */}
            <div>
              <img src={unswLogo} alt="UNSW College" className="h-8 w-auto brightness-0 invert mb-4" />
              <p className="text-xs leading-relaxed">
                UNSW College Pty Ltd<br />
                High St, UNSW Kensington Campus<br />
                Sydney, NSW 2052<br />
                <a href="tel:+61293855555" className="hover:text-white transition-colors">+61 2 9385 5555</a><br />
                <a href="mailto:studentservices@unswcollege.edu.au" className="hover:text-white transition-colors">studentservices@unswcollege.edu.au</a>
              </p>
            </div>

            {/* Column 2 — Connect */}
            <div>
              <h4 className="text-white font-heading text-sm font-semibold mb-3">Connect</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/enquire" className="hover:text-white transition-colors">Make an Enquiry</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors">Support Hub</Link></li>
                <li><Link to="/track" className="hover:text-white transition-colors">Track a Request</Link></li>
              </ul>
            </div>

            {/* Column 3 — Study */}
            <div>
              <h4 className="text-white font-heading text-sm font-semibold mb-3">Study</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/courses" className="hover:text-white transition-colors">Course Catalogue</Link></li>
                <li><Link to="/support/complaint" className="hover:text-white transition-colors">Complaints & Appeals</Link></li>
                <li><Link to="/support/wellbeing" className="hover:text-white transition-colors">Wellbeing & Safety</Link></li>
              </ul>
            </div>

            {/* Column 4 — Our Portal */}
            <div>
              <h4 className="text-white font-heading text-sm font-semibold mb-3">Our Portal</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/login" className="hover:text-white transition-colors">Student Login</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
                <li><Link to="/support/disclosure" className="hover:text-white transition-colors">Protected Disclosure</Link></li>
              </ul>
            </div>
          </div>

          {/* Divider + bottom row */}
          <div className="mt-8 pt-6 border-t border-[hsl(0,0%,20%)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[hsl(0,0%,50%)]">
            <span>© {new Date().getFullYear()} UNSW College Pty Ltd. Demo prototype — not a live system.</span>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Accessibility</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
