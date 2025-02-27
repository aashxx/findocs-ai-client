import { ChevronRight } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../../ui/sidebar";
import { Link, useLocation } from "react-router-dom";

export const NavMain = ({ items }) => {
  const location = useLocation(); 
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        Administration
      </SidebarGroupLabel>
      <SidebarMenu>
        {
          items.map((item) => {
            const isActive = location.pathname.startsWith(item.url);
            return (
              <SidebarMenuItem key={item.url}>
                <Link to={item.url}>
                  <SidebarMenuButton size="lg" className={`group flex items-center justify-between w-full rounded-md transition-all ${isActive && "bg-black text-white hover:bg-black hover:text-white" }`}>
                    <div className="flex items-center space-x-3">
                      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        {item.icon && <item.icon size={18} />}
                      </div>
                      <h5 className="text-md">
                        {item.title}
                      </h5>
                    </div>
                    {isActive && <ChevronRight className="size-5" />}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })
        }
      </SidebarMenu>
    </SidebarGroup>
  );
};
