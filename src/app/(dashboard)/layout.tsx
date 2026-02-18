import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarController } from "@/components/layout/sidebar-controller"
import { SearchCommand } from "@/components/layout/search-command"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
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
import { ModeToggle } from "@/components/layout/mode-toggle"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <SidebarController />
            <AppSidebar />
            <SidebarInset className="h-screen overflow-hidden flex flex-col">
                {/* FIXED HEADER */}
                <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 bg-background z-10">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Overview</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <div className="flex items-center gap-4">
                        <SearchCommand />
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <Bell className="size-5" />
                        </Button>
                        <ModeToggle />
                    </div>
                </header>

                {/* CONTENT AREA - No Global Scroll, Page controls it */}
                <main className="flex-1 overflow-hidden flex flex-col relative">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
