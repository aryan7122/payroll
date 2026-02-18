"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    BookOpen,
    Bot,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal,
    User,
    Building2,
    Users,
    FileText,
    IndianRupee,
    LayoutDashboard,
    Settings,
    Briefcase,
    FileBadge,
    ShieldCheck,
    Wallet
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, ChevronsUpDown, LogOut, Copyright } from "lucide-react"

// Navigation Data matching the Screenshot Logic
const data = {
    user: {
        name: "Codesquarry",
        email: "admin@codesquarry.com",
        avatar: "/avatars/cs-logo.png", // Placeholder
    },
    company: {
        name: "Payroll",
        logo: Wallet,
        plan: "Pay Service",
    },
    navMain: [
        {
            title: "Home",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
            items: [], // Single item, no children for Home usually, but keeping structure flexible
        },
        {
            title: "Employee",
            url: "/employees",
            icon: Users,
            items: [
                { title: "Item", url: "/items" },
                { title: "Onboarding", url: "/employees/onboarding" },
            ],
        },
        {
            title: "Payslips",
            url: "/payslips",
            icon: FileText,
            items: [
                { title: "Generate", url: "/payslips/generate" },
                { title: "History", url: "/payslips/history" },
            ],
        },
        {
            title: "Approvals",
            url: "/approvals",
            icon: ShieldCheck,
            items: [
                { title: "Leave Requests", url: "/approvals/leaves" },
                { title: "Reimbursements", url: "/approvals/claims" },
            ],
        },
        {
            title: "Form 16",
            url: "/compliance/form16",
            icon: FileBadge,
            items: [],
        },
        {
            title: "Pay Runs",
            url: "/payroll/run",
            icon: IndianRupee,
            items: [],
        },
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
        },
        {
            title: "Documentation",
            url: "/docs",
            icon: BookOpen,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const { state, setOpen } = useSidebar()
    const isCollapsed = state === "collapsed"
    return (
        <Sidebar collapsible="icon" className="border-r" {...props}>
            <SidebarHeader className="p-0">
                <SidebarMenu>
                    <SidebarMenuItem>
                        {isCollapsed ? (
                            <SidebarMenuButton
                                size="lg"
                                onClick={() => setOpen(true)}
                                tooltip="Expand Sidebar"
                                className="data-[state=open]:bg-sidebar-accent m-2 data-[state=open]:text-sidebar-accent-foreground rounded-none h-14 justify-center"
                            >
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
                                    <data.company.logo className="size-4" />
                                </div>
                            </SidebarMenuButton>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-none h-14"
                                    >
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                            <data.company.logo className="size-4" />
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold text-base">
                                                {data.company.name}
                                            </span>
                                            <span className="truncate text-xs text-muted-foreground">{data.company.plan}</span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    align="start"
                                    side="bottom"
                                    sideOffset={4}
                                >
                                    <DropdownMenuItem className="gap-2 p-2">
                                        <div className="flex size-6 items-center justify-center rounded-sm border">
                                            <Briefcase className="size-4 shrink-0" />
                                        </div>
                                        Create New Organization
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="p-0">
                <SidebarGroup>
                    <SidebarMenu>
                        {data.navMain.map((item) => {
                            const hasSubItems = item.items && item.items.length > 0;
                            // Active Logic: Check if current path starts with item's URL
                            // Strict match for root "/", prefix match for others
                            const isActive = item.url === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.url)

                            if (!hasSubItems) {
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            tooltip={item.title}
                                            isActive={isActive}
                                            className="font-medium text-muted-foreground hover:text-foreground rounded-none h-10 px-4"
                                        >
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            }

                            // If collapsed, show Dropdown/Hover behavior (The "Overlay" Request)
                            if (isCollapsed) {
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <SidebarMenuButton
                                                    tooltip={item.title}
                                                    isActive={isActive}
                                                    className="font-medium text-muted-foreground hover:text-foreground rounded-none h-10 px-4"
                                                >
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                    <ChevronRight className="ml-auto size-4" />
                                                </SidebarMenuButton>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side="right" align="start" className="w-48 rounded-lg">
                                                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                                                    {item.title}
                                                </div>
                                                {item.items?.map((subItem) => (
                                                    <DropdownMenuItem key={subItem.title} asChild>
                                                        <Link href={subItem.url} className="cursor-pointer">
                                                            {subItem.title}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </SidebarMenuItem>
                                )
                            }

                            // Expanded State: Standard Collapsible
                            return (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.isActive} // Keep default open logic if static, OR overwrite with dynamic? Let's rely on item.isActive for initial state or open if child active? For now keep static item.isActive for open state, but button highlight is dynamic.
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                isActive={isActive}
                                                className="font-medium text-muted-foreground hover:text-foreground rounded-none h-10 px-4"
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link href={subItem.url}>
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup className="mt-auto pl-2">
                    <SidebarGroupLabel className="px-4">Support</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navSecondary.map((item) => {
                            const isActive = item.url === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.url)
                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        size="sm"
                                        isActive={isActive}
                                        className="rounded-none px-4"
                                    >
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="pl-2 ">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent  data-[state=open]:text-sidebar-accent-foreground rounded-none h-14"
                                >
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted text-sidebar-primary-foreground">
                                        <span className="text-foreground font-bold text-xs">C</span>
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{data.user.name}</span>
                                        <span className="truncate text-xs">v1.0.0</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar >
    )
}
