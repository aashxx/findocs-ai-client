import React from "react";
import { CloudUpload, Files, LayoutDashboard, ScanSearch, Settings, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "../../ui/sidebar";
import { CustomSidebarTrigger } from "./sidebar-trigger";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true
    },
    {
      title: "Upload",
      url: "/upload",
      icon: CloudUpload,
      isActive: true,
    },
    {
      title: "AI Search",
      url: "/ai-search",
      icon: ScanSearch,
      isActive: true,
    },
    {
      title: "Documents",
      url: "/view-docs",
      icon: Files,
    },
    {
      title: "Manage Users",
      url: "/manage-users",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ]
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CustomSidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
