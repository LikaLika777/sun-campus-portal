import { Link, Outlet, useLocation } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Inbox, FileSearch, GitMerge, Shield, ClipboardList, LogOut } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import unswLogo from "@/assets/unsw-college-logo.png";

const staffItems = [
  { title: "Inbox", url: "/staff/inbox", icon: Inbox },
  { title: "Cases", url: "/staff/cases", icon: FileSearch },
  { title: "Identity Merge", url: "/staff/merge", icon: GitMerge },
  { title: "Disclosures", url: "/staff/disclosures", icon: Shield },
  { title: "Audit Trail", url: "/staff/audit", icon: ClipboardList },
];

export function StaffLayout() {
  const { currentPersona } = useDemo();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Skip link */}
        <a href="#main-content" className="skip-link">Skip to main content</a>

        <Sidebar collapsible="icon">
          <div className="p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <GraduationCap className="h-4 w-4 text-sidebar-primary-foreground" />
              </div>
              <span className="font-heading text-xs font-bold text-sidebar-foreground">Staff Portal</span>
            </Link>
          </div>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Staff Tools</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {staffItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className="hover:bg-sidebar-accent/50"
                          activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <div className="mt-auto border-t border-sidebar-border p-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
                {currentPersona.avatar}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-sidebar-foreground truncate">{currentPersona.name}</p>
                <p className="text-[10px] text-sidebar-foreground/60 truncate">{currentPersona.title}</p>
              </div>
            </div>
          </div>
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
          <main id="main-content" className="flex-1 overflow-auto" role="main" aria-live="polite">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
