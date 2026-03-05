import { Link, Outlet, useLocation } from "react-router-dom";
import { useDemo } from "@/contexts/DemoContext";
import { Home, FileText, Briefcase, Inbox, Bell, UserCircle, GraduationCap, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";

const sidebarItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Enquiries", url: "/dashboard/enquiries", icon: FileText },
  { title: "My Cases", url: "/dashboard/cases", icon: Briefcase },
  { title: "Inbox", url: "/dashboard/inbox", icon: Inbox },
  { title: "Updates", url: "/dashboard/updates", icon: Bell },
  { title: "Profile", url: "/dashboard/profile", icon: UserCircle },
];

export function DashboardLayout() {
  const { currentPersona } = useDemo();
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar collapsible="icon">
          <div className="p-4 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <GraduationCap className="h-4 w-4 text-sidebar-primary-foreground" />
              </div>
              <span className="font-heading text-xs font-bold text-sidebar-foreground">UNSW College</span>
            </Link>
          </div>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Student Portal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          end={item.url === "/dashboard"}
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

          {/* User info at bottom */}
          <div className="mt-auto border-t border-sidebar-border p-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
                {currentPersona.avatar}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-sidebar-foreground truncate">{currentPersona.name}</p>
                <p className="text-[10px] text-sidebar-foreground/60 truncate">{currentPersona.studentId}</p>
              </div>
            </div>
          </div>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b bg-card px-4 gap-3">
            <SidebarTrigger />
            <div className="flex items-center gap-2 ml-auto">
              <Link to="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                <LogOut className="h-3 w-3" /> Exit to Website
              </Link>
            </div>
          </header>
          <main id="main-content" className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
