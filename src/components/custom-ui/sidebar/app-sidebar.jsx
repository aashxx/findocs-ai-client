import React, { useContext } from "react";
import { CloudUpload, Files, LayoutDashboard, ScanSearch, Settings, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "../../ui/sidebar";
import { CustomSidebarTrigger } from "./sidebar-trigger";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { AuthContext } from "@/contexts/AuthContext";

export function AppSidebar({ ...props }) {

  const { user } = useContext(AuthContext);

  const navItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Upload", url: "/upload", icon: CloudUpload },
    { title: "AI Search", url: "/ai-search", icon: ScanSearch },
    { title: "Documents", url: "/view-docs", icon: Files },
    { title: "Manage Users", url: "/manage-users", icon: Users },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (user?.role === "Admin") return true; 
    if (user?.role === "Accountant" && ["Manage Users", "AI Search"].includes(item.title)) return false;
    if (user?.role === "Auditor" && ["Manage Users", "Upload"].includes(item.title)) return false;
    return true;
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CustomSidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}