import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  Home,
  Users,
  FileText,
  LayoutDashboard,
  Palette,
  Notebook,
} from "lucide-react";
import path from "path";
import { Link } from "react-router-dom";

const navItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Palette", path: "/palette", icon: Palette },
  { title: "Fiches clients", path: "/fiche-client", icon: Users },
  { title: "Notes", path: "/note", icon: Notebook },
  { title: "Clients", path: "/acceuil", icon: FileText },
  { title: "Task Page", path: "/page4", icon: Home },
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="h-16 flex items-center px-4 border-b">
        <div className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              d="M10.6667 5.33333C7.72 5.33333 5.33333 7.72 5.33333 10.6667V21.3333C5.33333 24.28 7.72 26.6667 10.6667 26.6667H21.3333C24.28 26.6667 26.6667 24.28 26.6667 21.3333V10.6667C26.6667 7.72 24.28 5.33333 21.3333 5.33333H10.6667Z"
              fill="currentColor"
            />
            <path
              d="M13.3333 13.3333C13.3333 12.2287 14.2287 11.3333 15.3333 11.3333H16.6667C17.7713 11.3333 18.6667 12.2287 18.6667 13.3333V18.6667C18.6667 19.7713 17.7713 20.6667 16.6667 20.6667H15.3333C14.2287 20.6667 13.3333 19.7713 13.3333 18.6667V13.3333Z"
              fill="white"
            />
          </svg>
          <span className="font-semibold text-lg">CRM Pro</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
