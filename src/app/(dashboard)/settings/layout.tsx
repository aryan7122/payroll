"use client"

import { PageContainer } from "@/components/layout/page-container"
import {
    Building2,
    FileText,
    CreditCard,
    Users,
    ShieldAlert,
    CalendarClock,
    Settings
} from "lucide-react"

const settingsNavItems = [
    { title: "Company Profile", href: "/settings/company", icon: Building2 },
    { title: "Departments & Roles", href: "/settings/departments", icon: Users },
    { title: "Salary Components", href: "/settings/salary-components", icon: CreditCard },
    { title: "Statutory (PF/ESI)", href: "/settings/statutory", icon: ShieldAlert },
    { title: "Taxes & Deductions", href: "/settings/taxes", icon: FileText },
    { title: "Leave Policies", href: "/settings/leaves", icon: CalendarClock },
    { title: "Appearance", href: "/settings/appearance", icon: Settings },
]

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <PageContainer
            title="Settings"
            description="Manage your organization configuration and preferences."
            navItems={settingsNavItems}
        >
            {children}
        </PageContainer>
    )
}
