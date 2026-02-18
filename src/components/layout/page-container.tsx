"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSidebar } from "@/components/ui/sidebar"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Types for Navigation Items
interface NavItem {
    title: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
}

interface PageContainerProps {
    title: string
    description?: string
    children: React.ReactNode
    navItems?: NavItem[]
    actions?: React.ReactNode
}

export function PageContainer({
    title,
    description,
    children,
    navItems = [],
    actions,
}: PageContainerProps) {
    const pathname = usePathname()
    const { setOpen } = useSidebar()

    // Logic:
    // User requested "Double Sidebar" as the STANDARD layout for all pages with navigation.
    // We force sidebar mode if there are any items.
    const useSecondarySidebar = navItems.length > 0

    // Dynamic Title Logic: Find active item
    const activeItem = navItems.find(item => item.href === pathname)
    const displayTitle = activeItem ? activeItem.title : title
    const displayDescription = activeItem ? undefined : description

    const [isSecondaryCollapsed, setIsSecondaryCollapsed] = React.useState(false)

    // Side Effect: Auto-collapse Main Sidebar if using Secondary Sidebar
    React.useEffect(() => {
        if (useSecondarySidebar) {
            // setOpen(false) // Optional
        }
    }, [useSecondarySidebar, setOpen])

    return (
        <div className="flex h-full flex-col">
            {/* 1. Page Header (Sticky Level 2) */}
            <div className="sticky top-0 z-40 flex shrink-0 items-center justify-between border-b bg-background px-6 py-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight">{displayTitle}</h1>
                    {displayDescription && (
                        <p className="text-sm text-muted-foreground">
                            {displayDescription}
                        </p>
                    )}
                </div>
                {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>

            {/* 2. Content Body */}
            <div className="flex flex-1 overflow-hidden">
                {/* Scenario B: Secondary Sidebar (Standard) */}
                {useSecondarySidebar && (
                    <aside
                        className={cn(
                            "group shrink-0 border-r bg-muted/20 transition-all duration-300 ease-in-out hidden md:flex flex-col",
                            isSecondaryCollapsed ? "w-[50px]" : "w-64"
                        )}
                    >
                        {/* Sidebar Header with Toggle */}
                        <div className={cn("flex items-center h-12 px-2 border-b", isSecondaryCollapsed ? "justify-center" : "justify-between")}>
                            {!isSecondaryCollapsed && <span className="text-xs font-semibold text-muted-foreground pl-2 uppercase tracking-wider">Menu</span>}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                onClick={() => setIsSecondaryCollapsed(!isSecondaryCollapsed)}
                            >
                                <ChevronRight className={cn("h-4 w-4 transition-transform duration-300", !isSecondaryCollapsed && "rotate-180")} />
                            </Button>
                        </div>

                        {/* Navigation Items with Custom Scrollbar */}
                        <ScrollArea className="flex-1">
                            <nav className="flex flex-col gap-1 p-2">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            title={isSecondaryCollapsed ? item.title : undefined}
                                            className={cn(
                                                "flex items-center gap-2 rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors overflow-hidden whitespace-nowrap shrink-0",
                                                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                                                isSecondaryCollapsed ? "justify-center px-0" : "px-3"
                                            )}
                                        >
                                            {item.icon ? (
                                                <item.icon className="h-4 w-4 shrink-0" />
                                            ) : (
                                                /* Fallback dot if no icon */
                                                <div className="h-1.5 w-1.5 rounded-full bg-current shrink-0" />
                                            )}

                                            <span className={cn("transition-opacity duration-200", isSecondaryCollapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
                                                {item.title}
                                            </span>
                                        </Link>
                                    )
                                })}
                            </nav>
                        </ScrollArea>
                    </aside>
                )}

                <div className="flex-1 overflow-hidden flex flex-col relative">
                    <ScrollArea className="flex-1 h-full">
                        <div className="p-6">
                            {children}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}
