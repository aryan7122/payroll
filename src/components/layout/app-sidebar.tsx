"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard,
    Package,
    ReceiptText,
    ShoppingCart,
    CreditCard,
    BarChart3,
    Landmark,
    Settings,
    BookOpen,
    LogOut,
    ChevronRight,
    ChevronsUpDown,
    Briefcase,
    Warehouse,
    ShieldCheck,
    Users,
    FileBadge,
    Calculator,
    CloudUpload,
    HelpCircle,
    Boxes,
    Circle,
    ClipboardList,
    Tags,
    PlusCircle,
    Ruler,
    FileText,
    FileSignature,
    ShoppingCart as CartIcon,
    History,
    CreditCard as PaymentIcon,
    Truck,
    BarChart,
    PieChart,
    ArrowUpRight,
    ArrowDownLeft
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
import { cn } from "@/lib/utils"

// Navigation Data matching the "OS-Style" Requirements
const data = {
    user: {
        name: "Codesquarry",
        email: "admin@codesquarry.com",
        avatar: "/avatars/cs-logo.png",
    },
    company: {
        name: "Accounting system",
        logo: Landmark,
        plan: "Enterprise",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "Items",
            url: "/items",
            icon: Package,
            items: [
                { title: "Item List", url: "/items/list", icon: ClipboardList },
                { title: "Categories", url: "/items/categories", icon: Tags },
                { title: "New Item", url: "/items/new", icon: PlusCircle },
            ],
        },
        {
            title: "Sales",
            url: "/sales",
            icon: ReceiptText,
            items: [
                { title: "Invoices", url: "/sales/invoices", icon: FileText },
                { title: "Customers", url: "/sales/customers", icon: Users },
                { title: "Quotations", url: "/sales/quotes", icon: FileSignature },
                { title: "Sales Orders", url: "/sales/orders", icon: CartIcon },
                { title: "Payments Received", url: "/sales/payments", icon: PaymentIcon },
            ],
        },
        {
            title: "Purchases",
            url: "/purchases",
            icon: CartIcon,
            items: [
                { title: "Bills", url: "/purchases/bills", icon: FileText },
                { title: "Vendors", url: "/purchases/vendors", icon: Users },
                { title: "Expenses", url: "/purchases/expenses", icon: CreditCard },
                { title: "Purchase Orders", url: "/purchases/orders", icon: CartIcon },
            ],
        },
        {
            title: "Warehouse",
            url: "/warehouse",
            icon: Warehouse,
            items: [
                { title: "All Warehouses", url: "/warehouse/all", icon: Landmark },
                { title: "Stock Tracking", url: "/warehouse/stock", icon: History },
            ],
        },
        {
            title: "Accountant",
            url: "/accountant",
            icon: Calculator,
            items: [
                { title: "Chart of Accounts", url: "/accountant/coa", icon: ClipboardList },
                { title: "Journal Entries", url: "/accountant/journals", icon: FileSignature },
            ],
        },
        {
            title: "Reports",
            url: "/reports",
            icon: BarChart3,
            items: [
                { title: "Profit & Loss", url: "/reports/p-and-l", icon: PieChart },
                { title: "Balance Sheet", url: "/reports/balance-sheet", icon: BarChart },
                { title: "All Reports", url: "/reports", icon: BarChart3 },
            ],
        },
    ],
    navUtility: [
        {
            title: "Upload Documents",
            url: "/upload",
            icon: CloudUpload,
        },
        {
            title: "Help",
            url: "/help",
            icon: HelpCircle,
        },
        {
            title: "Masters",
            url: "/masters",
            icon: Boxes,
            items: [
                { title: "Units", url: "/masters/units", icon: Ruler },
                { title: "Brands", url: "/masters/brands", icon: Tags },
            ],
        }
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
    const [openGroup, setOpenGroup] = React.useState<string | null>(null)

    // Sync open group with current pathname on mount or path change
    React.useEffect(() => {
        const currentGroup = data.navMain.find(item => pathname.startsWith(item.url))?.title
        if (currentGroup) setOpenGroup(currentGroup)
    }, [pathname])

    return (
        <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar group overflow-hidden" {...props}>
            <SidebarHeader className="h-16 flex items-center justify-center px-4 overflow-hidden bg-sidebar">
                <div className="flex items-center gap-3 w-full group-data-[state=collapsed]:justify-center">
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--brand-primary),0.3)] shrink-0 cursor-pointer"
                    >
                        <Landmark className="size-6 transition-transform duration-500" />
                    </motion.div>
                    <div className="flex flex-col truncate group-data-[state=collapsed]:hidden animate-in fade-in slide-in-from-left-4 duration-500">
                        <span className="text-[15px] font-bold tracking-tight text-sidebar-foreground leading-none">Quantum</span>
                        <span className="text-[10px] font-medium text-emerald-500/60 tracking-[0.15em] uppercase mt-1">Accounting</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="px-2 py-4 gap-4 no-scrollbar overflow-y-auto">
                <SidebarGroup className="p-0">
                    <SidebarMenu className="gap-1">
                        {data.navMain.map((item) => {
                            const hasSubItems = item.items && item.items.length > 0;
                            const isActive = pathname.startsWith(item.url);

                            return (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    open={openGroup === item.title}
                                    onOpenChange={(val) => setOpenGroup(val ? item.title : null)}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                isActive={isActive || openGroup === item.title}
                                                className={cn(
                                                    "relative transition-all duration-200 rounded-md h-11 px-4 overflow-hidden cursor-pointer selection-none group/btn hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                                    (isActive || openGroup === item.title)
                                                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm"
                                                        : "text-sidebar-foreground/70"
                                                )}
                                            >
                                                {/* Active Indicator Bar - Sharp & Minimal */}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="active-pill"
                                                        className="absolute left-0 w-1 h-5 bg-primary rounded-r-full"
                                                        transition={{ type: "spring", stiffness: 400, damping: 40 }}
                                                    />
                                                )}

                                                <item.icon className={cn(
                                                    "size-5 transition-colors duration-200",
                                                    isActive ? "text-primary" : "group-hover/btn:text-primary"
                                                )} />

                                                {!isCollapsed && (
                                                    <motion.span
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="ml-1 text-[14px] tracking-tight flex-1 truncate font-medium"
                                                    >
                                                        {item.title}
                                                    </motion.span>
                                                )}

                                                {!isCollapsed && hasSubItems && (
                                                    <ChevronRight className={cn(
                                                        "ml-auto size-3.5 transition-all duration-300 group-data-[state=open]/collapsible:rotate-90",
                                                        "opacity-0 group-hover/btn:opacity-60 group-data-[state=open]/collapsible:opacity-100"
                                                    )} />
                                                )}
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>

                                        {!isCollapsed && hasSubItems && (
                                            <AnimatePresence initial={false}>
                                                {openGroup === item.title && (
                                                    <CollapsibleContent forceMount asChild>
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ type: "spring", duration: 0.4, bounce: 0, opacity: { duration: 0.2 } }}
                                                            className="overflow-hidden"
                                                        >
                                                            <SidebarMenuSub className="relative ml-[26px] w-[calc(100%-26px)] mt-1 pl-0 py-0 gap-0">
                                                                {item.items?.map((subItem, index) => {
                                                                    const isSubActive = pathname === subItem.url;
                                                                    const isLast = item.items && index === item.items.length - 1;

                                                                    // Active Path Logic: Highlight lines leading to the active sub-item
                                                                    const isPathActive = item.items?.slice(index).some(si => pathname === si.url);

                                                                    return (
                                                                        <SidebarMenuSubItem key={subItem.title} className="relative">
                                                                            {/* Vertical Line Segment - Precise SPLIT for Indigo Termination */}
                                                                            <div className="absolute -left-1 w-px top-0 h-full">
                                                                                {/* TOP HALF: Indigo if this or any below is active */}
                                                                                <div className={cn(
                                                                                    "absolute top-0 left-0 w-full h-1/2 transition-colors duration-300",
                                                                                    isPathActive ? "bg-primary/60 shadow-[0_0_8px_var(--sidebar-ring)]" : "bg-sidebar-border/30"
                                                                                )} />
                                                                                {/* BOTTOM HALF: Indigo ONLY if someone BELOW is active */}
                                                                                {!isLast && (
                                                                                    <div className={cn(
                                                                                        "absolute top-1/2 left-0 w-full h-1/2 transition-colors duration-300",
                                                                                        item.items?.slice(index + 1).some(si => pathname === si.url)
                                                                                            ? "bg-primary/60 shadow-[0_0_8px_var(--sidebar-ring)]"
                                                                                            : "bg-sidebar-border/30"
                                                                                    )} />
                                                                                )}
                                                                            </div>

                                                                            {/* Tree Line Tick - Highlight only if sub-item is active */}
                                                                            <div className={cn(
                                                                                "absolute -left-1 top-1/2 -translate-y-1/2 w-4 h-px transition-colors duration-300",
                                                                                isSubActive ? "bg-primary/80 shadow-[0_0_8px_var(--sidebar-ring)]" : "bg-sidebar-border/30"
                                                                            )} />

                                                                            <SidebarMenuSubButton asChild className={cn(
                                                                                "h-10 p-2 rounded-lg my-[2px] mx-3 transition-all duration-200 cursor-pointer group/sub",
                                                                                isSubActive ? "bg-primary/10 text-primary font-bold shadow-sm" : "text-sidebar-foreground/60 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
                                                                            )}>
                                                                                <Link href={subItem.url} className="w-full h-full flex items-center text-[14px] gap-2.5">
                                                                                    {subItem.icon && <subItem.icon className={cn(
                                                                                        "size-4 shrink-0 transition-colors duration-200",
                                                                                        isSubActive ? "text-primary" : "text-sidebar-foreground/50 group-hover/sub:text-primary"
                                                                                    )} />}
                                                                                    <span className="truncate">{subItem.title}</span>
                                                                                </Link>
                                                                            </SidebarMenuSubButton>
                                                                        </SidebarMenuSubItem>
                                                                    )
                                                                })}
                                                            </SidebarMenuSub>
                                                        </motion.div>
                                                    </CollapsibleContent>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </SidebarMenuItem>
                                </Collapsible>
                            )
                        })}

                        {/* Separator for utility section */}
                        <div className="my-4 border-t border-sidebar-border/40 mx-3" />

                        {data.navUtility.map((item) => {
                            const hasSubItems = item.items && item.items.length > 0;
                            const isActive = pathname.startsWith(item.url);

                            return (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    open={openGroup === item.title}
                                    onOpenChange={(val) => setOpenGroup(val ? item.title : null)}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                className={cn(
                                                    "relative transition-all duration-200 rounded-lg h-11 px-4 overflow-hidden cursor-pointer selection-none group/btn hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                                    (isActive || openGroup === item.title)
                                                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm"
                                                        : "text-sidebar-foreground/70"
                                                )}
                                            >
                                                <item.icon className="size-5 transition-colors duration-200 group-hover/btn:text-primary" />
                                                {!isCollapsed && (
                                                    <motion.span
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="ml-3.5 text-[14px] tracking-tight font-medium flex-1 truncate"
                                                    >
                                                        {item.title}
                                                    </motion.span>
                                                )}
                                                {!isCollapsed && hasSubItems && (
                                                    <ChevronRight className={cn(
                                                        "ml-auto size-3.5 transition-all duration-300 group-data-[state=open]/collapsible:rotate-90",
                                                        "opacity-0 group-hover/btn:opacity-60 group-data-[state=open]/collapsible:opacity-100"
                                                    )} />
                                                )}
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        {!isCollapsed && hasSubItems && (
                                            <AnimatePresence initial={false}>
                                                {openGroup === item.title && (
                                                    <CollapsibleContent forceMount asChild>
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ type: "spring", duration: 0.4, bounce: 0, opacity: { duration: 0.2 } }}
                                                            className="overflow-hidden"
                                                        >
                                                            <SidebarMenuSub className="relative ml-4 mr-2 w-[calc(100%-24px)] mt-1 pl-0 py-0 gap-0">
                                                                {item.items?.map((subItem, index) => {
                                                                    const isSubActive = pathname === subItem.url;
                                                                    const isLast = item.items && index === item.items.length - 1;

                                                                    // Active Path Logic: Highlight lines leading to the active sub-item
                                                                    const isPathActive = item.items?.slice(index).some(si => pathname === si.url);

                                                                    return (
                                                                        <SidebarMenuSubItem key={subItem.title} className="relative">
                                                                            {/* Vertical Line Segment - Precise SPLIT for Indigo Termination */}
                                                                            <div className="absolute -left-1 w-px top-0 h-full">
                                                                                {/* TOP HALF: Indigo if this or any below is active */}
                                                                                <div className={cn(
                                                                                    "absolute top-0 left-0 w-full h-1/2 transition-colors duration-300",
                                                                                    isPathActive ? "bg-primary/60 shadow-[0_0_8px_var(--sidebar-ring)]" : "bg-sidebar-border/30"
                                                                                )} />
                                                                                {/* BOTTOM HALF: Indigo ONLY if someone BELOW is active */}
                                                                                {!isLast && (
                                                                                    <div className={cn(
                                                                                        "absolute top-1/2 left-0 w-full h-1/2 transition-colors duration-300",
                                                                                        item.items?.slice(index + 1).some(si => pathname === si.url)
                                                                                            ? "bg-primary/60 shadow-[0_0_8px_var(--sidebar-ring)]"
                                                                                            : "bg-sidebar-border/30"
                                                                                    )} />
                                                                                )}
                                                                            </div>

                                                                            {/* Tree Line Tick - Highlight only if sub-item is active */}
                                                                            <div className={cn(
                                                                                "absolute -left-1 top-1/2 -translate-y-1/2 w-4 h-px transition-colors duration-300",
                                                                                isSubActive ? "bg-primary/80 shadow-[0_0_8px_var(--sidebar-ring)]" : "bg-sidebar-border/30"
                                                                            )} />

                                                                            <SidebarMenuSubButton asChild className={cn(
                                                                                "h-10 rounded-lg transition-all duration-200 cursor-pointer group/sub",
                                                                                isSubActive ? "bg-primary/10 text-primary font-bold shadow-sm" : "text-sidebar-foreground/60 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
                                                                            )}>
                                                                                <Link href={subItem.url} className="w-full h-full flex items-center text-[14px] gap-2.5">
                                                                                    {subItem.icon ? (
                                                                                        <subItem.icon className={cn(
                                                                                            "size-4 shrink-0 transition-colors duration-200",
                                                                                            isSubActive ? "text-primary" : "text-sidebar-foreground/50 group-hover/sub:text-primary"
                                                                                        )} />
                                                                                    ) : (
                                                                                        <div className={cn(
                                                                                            "size-1.5 shrink-0 ml-1 transition-colors duration-200 rounded-full",
                                                                                            isSubActive ? "bg-indigo-400 shadow-[0_0_5px_rgba(129,140,248,0.5)]" : "bg-zinc-600 group-hover/sub:bg-white"
                                                                                        )} />
                                                                                    )}
                                                                                    <span className="truncate">{subItem.title}</span>
                                                                                </Link>
                                                                            </SidebarMenuSubButton>
                                                                        </SidebarMenuSubItem>
                                                                    );
                                                                })}
                                                            </SidebarMenuSub>
                                                        </motion.div>
                                                    </CollapsibleContent>
                                                )}
                                            </AnimatePresence>
                                        )}
                                    </SidebarMenuItem>
                                </Collapsible>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    )
}
