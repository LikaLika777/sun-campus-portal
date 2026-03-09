import { Link, Outlet } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Home, FileText, Briefcase, Inbox, Bell, UserCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import unswLogo from "@/assets/unsw-college-logo.png";

const sidebarItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Enquiries", url: "/dashboard/enquiries", icon: FileText },
  { title: "My Cases", url: "/dashboard/cases", icon: Briefcase },
  { title: "Inbox", url: "/dashboard/inbox", icon: Inbox },
  { title: "Updates", url: "/dashboard/updates", icon: Bell },
  { title: "Profile", url: "/dashboard/profile", icon: UserCircle },
];

function DashboardSidebarContent() {
  const { currentPersona } = useDemo();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <>
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-white p-1">
            <img src={unswLogo} alt="UNSW College" className="h-full w-auto" />
          </div>
          {!collapsed && (
            <span className="font-heading text-xs font-bold text-sidebar-foreground">UNSW College</span>
          )}
        </Link>
      </div>

      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Student Portal</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User info at bottom */}
      <div className="mt-auto border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
            {currentPersona.avatar}
          </span>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-sidebar-foreground truncate">{currentPersona.name}</p>
              <p className="text-[10px] text-sidebar-foreground/60 truncate">{currentPersona.studentId}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Skip link */}
        <a href="#main-content" className="skip-link">Skip to main content</a>

        <Sidebar collapsible="icon">
          <DashboardSidebarContent />
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b bg-card px-4 gap-3" role="banner">
            <SidebarTrigger aria-label="Toggle sidebar" />
            <div className="flex items-center gap-2 ml-auto">
              <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <LogOut className="h-3 w-3" /> Exit to Website
              </Link>
            </div>
          </header>
          <main id="main-content" className="flex-1 p-4 md:p-6 overflow-auto" role="main" aria-live="polite">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
