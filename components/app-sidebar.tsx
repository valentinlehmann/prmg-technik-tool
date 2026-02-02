"use client"

import * as React from "react"
import {
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {useUser} from "@/hooks/use-user";
import {Skeleton} from "@/components/ui/skeleton";
import Image from "next/image";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Verwaltung",
            url: "#",
            icon: Settings2,
            isActive: true,
            items: [
                {
                    title: "Gast-WLAN",
                    url: "/protected/hotspot",
                },
            ],
        },
    ],
    navSecondary: [
        {
            title: "Support",
            url: "#",
            icon: LifeBuoy,
        },
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const {data: user, isLoading: userLoading} = useUser();

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/protected">
                                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Image
                                        src={"/icon.png"}
                                        alt="PRMG-Technik Logo"
                                        width={32}
                                        height={32}
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">PRMG-Technik</span>
                                    <span className="truncate text-xs">Technik-Tool</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                {
                    (!userLoading || !user) ? <NavUser user={{
                        name: user?.user_metadata.preffered_username || user?.user_metadata.full_name || "Unknown User",
                        email: user?.email || "",
                        avatar: user?.user_metadata.picture
                    }} /> : <Skeleton className={"h-12 w-52 rounded"} />
                }
            </SidebarFooter>
        </Sidebar>
    )
}
