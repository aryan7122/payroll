"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { LayoutDashboard, Users, IndianRupee, FileText } from "lucide-react"

const modules = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        description: "Central command center for quick stats and activity overview.",
        routes: [
            { name: "Overview", path: "/dashboard/overview", desc: "Key metrics graphs." },
            { name: "Analytics", path: "/dashboard/analytics", desc: "Detailed reports." },
        ],
    },
    {
        title: "Employee Management",
        icon: Users,
        description: "Complete lifecycle management from Onboarding to Exit.",
        routes: [
            { name: "All Employees", path: "/employees", desc: "Master list with search/filter." },
            { name: "Onboarding Wizard", path: "/employees/onboarding", desc: "Step-by-step joining form." },
            { name: "Documents", path: "/employees/documents", desc: "KYC & Contracts repository." },
        ],
    },
    {
        title: "Payroll Engine",
        icon: IndianRupee,
        description: "Core calculation engine for salaries, arrears, and reimbursements.",
        routes: [
            { name: "Run Payroll", path: "/payroll/run", desc: "Monthly salary processing." },
            { name: "Salary Structure", path: "/payroll/structure", desc: "Define CTC components." },
            { name: "Arrears", path: "/payroll/arrears", desc: "Retrospective payments calculator." },
        ],
    },
    {
        title: "Compliance & Taxes",
        icon: FileText,
        description: "Automated tax filings and government report generation.",
        routes: [
            { name: "PF Challan", path: "/compliance/pf", desc: "EPFO monthly file." },
            { name: "ESI Return", path: "/compliance/esi", desc: "ESIC contribution report." },
            { name: "TDS / Form 16", path: "/compliance/tds", desc: "Tax deduction certificates." },
        ],
    },
]

export default function ModulesPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Module Directory</h1>
                <p className="text-muted-foreground">
                    Comprehensive operational reference for all system modules.
                </p>
            </div>

            <div className="grid gap-6 pb-20">
                {modules.map((module, i) => (
                    <Card key={i}>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <module.icon className="h-4 w-4" />
                                </div>
                                <CardTitle className="text-base">{module.title}</CardTitle>
                            </div>
                            <CardDescription>{module.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                {module.routes.map((route, j) => (
                                    <div key={j} className="flex items-center justify-between rounded-md border p-2 text-sm bg-muted/5">
                                        <div className="font-medium">{route.name}</div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground hidden sm:inline-block">{route.desc}</span>
                                            <Badge variant="secondary" className="font-mono text-xs">
                                                {route.path}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
