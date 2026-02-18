"use client"

import * as React from "react"
import {
    CreditCard,
    Settings,
    User,
    LayoutDashboard,
    Users,
    FileText,
    ShieldCheck,
    FileBadge,
    IndianRupee,
    BookOpen,
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SearchCommand() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    const navigation = [
        { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
        { title: "Employees", url: "/employees", icon: Users },
        { title: "Payslips", url: "/payslips", icon: FileText },
        { title: "Approvals", url: "/approvals", icon: ShieldCheck },
        { title: "Form 16", url: "/compliance/form16", icon: FileBadge },
        { title: "Pay Run", url: "/payroll/run", icon: IndianRupee },
        { title: "Settings", url: "/settings", icon: Settings },
        { title: "Documentation", url: "/docs", icon: BookOpen },
    ]

    return (
        <>
            <Button
                variant="outline"
                className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">Search documentation...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        {navigation.map((nav) => (
                            <CommandItem
                                key={nav.url}
                                value={nav.title}
                                onSelect={() => {
                                    runCommand(() => router.push(nav.url))
                                }}
                            >
                                <nav.icon className="mr-2 h-4 w-4" />
                                <span>{nav.title}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="System">
                        <CommandItem onSelect={() => runCommand(() => router.push("/settings/billing"))}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => router.push("/profile"))}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
