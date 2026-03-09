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

  const isHomePage = location.pathname === "/";

  // Notification count based on persona
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
      {/* Skip link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Header */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-colors duration-300",
          isHomePage
            ? "absolute w-full bg-transparent"
            : "border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
        )}
        role="banner"
      >
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={unswLogo} alt="UNSW College" className="h-10 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isHomePage
                    ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    : "hover:bg-muted",
                  !isHomePage && location.pathname === link.href
                    ? "text-primary bg-primary/5"
                    : !isHomePage
                    ? "text-muted-foreground"
                    : "",
                  isHomePage && location.pathname === link.href
                    ? "text-primary-foreground font-semibold"
                    : ""
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={cn(
                "p-2 rounded-md transition-colors",
                isHomePage
                  ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  : "text-muted-foreground hover:bg-muted"
              )}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {isLoggedIn ? (
              <>
                <Link to="/dashboard/inbox" className="relative hidden md:flex">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={cn(
                      "relative",
                      isHomePage && "text-primary-foreground hover:bg-primary-foreground/10"
                    )}
                  >
                    <Bell className="h-4 w-4" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button
                    size="sm"
                    variant="outline"
                    className={cn(
                      "hidden md:flex",
                      isHomePage && "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                    )}
                  >
                    <span className="mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                      {currentPersona.avatar}
                    </span>
                    Dashboard
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "hidden md:flex",
                    isHomePage ? "text-primary-foreground/70 hover:bg-primary-foreground/10" : "text-muted-foreground"
                  )}
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    size="sm"
                    className={cn(
                      "hidden md:flex",
                      isHomePage && "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    )}
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className={cn(
                      "hidden md:flex bg-accent text-accent-foreground hover:bg-accent/90"
                    )}
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              className={cn(
                "md:hidden p-2",
                isHomePage ? "text-primary-foreground" : ""
              )}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Search bar dropdown */}
        {searchOpen && (
          <div className={cn(
            "border-t px-4 py-3",
            isHomePage ? "bg-primary/90 backdrop-blur border-primary-foreground/20" : "bg-card border-border"
          )}>
            <div className="container">
              <div className="relative max-w-xl">
                <Search className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4",
                  isHomePage ? "text-primary-foreground/60" : "text-muted-foreground"
                )} />
                <input
                  type="search"
                  placeholder="Search courses, support topics..."
                  autoFocus
                  className={cn(
                    "w-full pl-10 pr-4 py-2 rounded-md text-sm outline-none",
                    isHomePage
                      ? "bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50 border border-primary-foreground/20 focus:border-primary-foreground/40"
                      : "bg-muted text-foreground placeholder:text-muted-foreground border border-input focus:border-ring"
                  )}
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
                  location.pathname === link.href ? "text-primary bg-primary/5" : "text-muted-foreground"
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
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-primary">
                  Log in
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm font-medium text-accent-foreground">
                  Register
                </Link>
              </>
            )}
          </nav>
        )}
      </header>

      {/* Main content */}
      <main id="main-content" className="flex-1" role="main" aria-live="polite">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-primary text-primary-foreground" role="contentinfo">
        <div className="container py-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h4 className="font-heading text-sm font-semibold mb-2">UNSW College</h4>
              <p className="text-xs opacity-80">Part of UNSW Sydney. Providing pathways to world-class education since 1989.</p>
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1 text-xs opacity-80">
                <li><Link to="/courses" className="hover:opacity-100 transition-opacity">Courses</Link></li>
                <li><Link to="/support" className="hover:opacity-100 transition-opacity">Support</Link></li>
                <li><Link to="/enquire" className="hover:opacity-100 transition-opacity">Make an Enquiry</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold mb-2">Contact</h4>
              <p className="text-xs opacity-80">
                Kensington, NSW 2052<br />
                +61 2 9385 5555<br />
                studentservices@unswcollege.edu.au
              </p>
            </div>
          </div>
          <div className="mt-6 border-t border-primary-foreground/20 pt-4 text-center text-xs opacity-60">
            © {new Date().getFullYear()} UNSW College. Demo prototype — not a live system.
          </div>
        </div>
      </footer>
    </div>
  );
}
