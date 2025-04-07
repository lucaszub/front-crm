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
  FileText,
  LayoutDashboard,
  ClipboardList,
  Notebook,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  // { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Clients", path: "/", icon: FileText },
  { title: "Rdv", path: "/rdv", icon: LayoutDashboard },
  // { title: "Palette", path: "/palette", icon: Palette },
  // { title: "Fiches clients", path: "/fiche-client", icon: Users },
  { title: "Notes", path: "/note", icon: Notebook },

  { title: "Taches", path: "/page4", icon: ClipboardList },
  // { title: "Test", path: "/test", icon: Home },
];

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader className="h-16 flex items-center  mt-5 px-4  border-b">
        <div className="flex items-center gap-2">
          {/* Remplacement du SVG par le logo */}
          <img
            src="/Logo.jpg" // Chemin relatif vers le fichier Logo.jpg
            alt="Logo CRM"
            className="h-10 rounded-lg w-auto" // Ajustez la taille selon vos besoins
          />
          <span className="font-semibold text-lg">CapRelation </span>
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
