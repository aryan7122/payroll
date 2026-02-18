"use client"

import {
    Building2,
    FileText,
    CreditCard,
    Users,
    Settings,
    ShieldAlert,
    CalendarClock
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const sidebarItems = [
    {
        title: "Organization",
        items: [
            {
                title: "Company Profile",
                href: "/settings/company",
                icon: Building2
            },
            {
                title: "Departments & Roles",
                href: "/settings/departments",
                icon: Users
            },
        ],
    },
    {
        title: "Payroll & Finance",
        items: [
            {
                title: "Salary Components",
                href: "/settings/salary-components",
                icon: CreditCard
            },
            {
                title: "Statutory (PF/ESI)",
                href: "/settings/statutory",
                icon: ShieldAlert
            },
            {
                title: "Taxes & Deductions",
                href: "/settings/taxes",
                icon: FileText
            },
        ],
    },
    {
        title: "Time & Attendance",
        items: [
            {
                title: "Leave Policies",
                href: "/settings/leaves",
                icon: CalendarClock
            },
            {
                title: "Shift Schedule",
                href: "/settings/shifts",
                icon: Settings
            },
        ],
    },
]

export function SettingsSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 shrink-0 border-r bg-muted/30 hidden md:block">
            <div className="flex h-14 items-center px-4 border-b bg-background">
                <h2 className="font-semibold text-sm">Settings</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="flex flex-col gap-6 p-4">
                    {sidebarItems.map((group) => (
                        <div key={group.title} className="flex flex-col gap-2">
                            <h3 className="text-xs font-semibold text-muted-foreground px-2">
                                {group.title}
                            </h3>
                            <div className="grid gap-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                                                isActive
                                                    ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            <item.icon className="h-4 w-4" />
                                            {item.title}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    )
}
