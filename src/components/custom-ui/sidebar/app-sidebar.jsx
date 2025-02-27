import React from "react";
import { CloudUpload, Files, LayoutDashboard, ScanSearch, Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "../../ui/sidebar";
import { CustomSidebarTrigger } from "./sidebar-trigger";
import { NavMain } from "./nav-main";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
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
      url: "/documents",
      icon: Files,
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
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
