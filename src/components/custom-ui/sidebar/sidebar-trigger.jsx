import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "../../ui/sidebar";
import { ChevronsLeft, FileSearch, PanelsTopLeft } from "lucide-react";
import { useRef } from "react";

export function CustomSidebarTrigger() {
    const triggerRef = useRef(null);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size={'lg'} className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground my-5">
                    <div className="flex items-center justify-center gap-2">
                        <FileSearch />
                        <span className="text-lg text-center">FinDocx AI</span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem onClick={() => triggerRef.current?.click()}>
                <SidebarMenuButton size={'lg'} className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    <aside className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                        <PanelsTopLeft size={18} />
                    </aside>
                    <article className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                            Menu
                        </span>
                        <span className="truncate text-xs">
                            FinDocs AI
                        </span>
                    </article>
                    <ChevronsLeft className="ml-auto" />
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarTrigger className="hidden" ref={triggerRef} />
        </SidebarMenu>
    );
}