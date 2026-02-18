"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarController() {
    const pathname = usePathname()
    const { setOpen, isMobile } = useSidebar()

    // Configuration: Routes that trigger "Focus Mode" (Collapsed Sidebar)
    const focusModeRoutes = ["/docs", "/settings"]

    React.useEffect(() => {
        if (isMobile) return

        const shouldCollapse = focusModeRoutes.some(route => pathname.startsWith(route))

        if (shouldCollapse) {
            setOpen(false)
        } else {
            setOpen(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, isMobile])

    return null
}
