import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarController } from "@/components/layout/sidebar-controller"
import { SearchCommand } from "@/components/layout/search-command"
import { Button } from "@/components/ui/button"
import { Bell, ChevronLeft, ChevronRight, History as HistoryIcon, Landmark, Search as SearchIcon } from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserNav } from "@/components/layout/user-nav"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <div className="flex flex-col h-screen w-full overflow-hidden">
                {/* FULL WIDTH HEADER */}
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6 bg-background z-50">
                    <div className="flex items-center gap-6">
                        {/* Branding */}
                        <div className="flex items-center gap-4">
                            <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                <Landmark className="size-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[15px] font-bold tracking-tight text-foreground leading-none">Quantum</span>
                                <span className="text-[10px] font-medium text-primary tracking-[0.15em] uppercase mt-1">Accounting</span>
                            </div>
                        </div>

                        <Separator orientation="vertical" className="h-6 opacity-20" />

                        {/* Pill Navigation */}
                        <div className="flex items-center gap-0.5 bg-accent/40 p-1 rounded-full border border-border/50">
                            <SidebarTrigger className="size-7 rounded-full hover:bg-accent transition-colors cursor-pointer" />
                            <Separator orientation="vertical" className="h-4 mx-1 opacity-20" />
                            <Button variant="ghost" size="icon" className="size-7 rounded-full text-muted-foreground/60 hover:text-foreground hover:bg-accent transition-all cursor-pointer">
                                <ChevronLeft className="size-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="size-7 rounded-full text-muted-foreground/60 hover:text-foreground hover:bg-accent transition-all cursor-pointer">
                                <ChevronRight className="size-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="size-7 rounded-full text-muted-foreground/60 hover:text-foreground hover:bg-accent transition-all cursor-pointer">
                                <HistoryIcon className="size-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Old Search Bar Restored */}
                        <SearchCommand />

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="size-9 rounded-xl text-muted-foreground/60 hover:text-foreground hover:bg-accent transition-all cursor-pointer">
                                <Bell className="size-5" />
                            </Button>
                            <Separator orientation="vertical" className="h-6 mx-2 border-border" />
                            <UserNav />
                        </div>
                    </div>
                </header>

                <div className="flex flex-1 overflow-hidden">
                    {/* SIDEBAR STARTS BELOW HEADER – Tight Refinement */}
                    <AppSidebar
                        className="border-r border-border"
                        style={{ "--sidebar-width": "16.5rem" } as React.CSSProperties}
                    />
                    <main className="flex-1 overflow-hidden flex flex-col relative bg-background">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}
