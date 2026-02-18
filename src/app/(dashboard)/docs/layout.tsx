"use client"

import { PageContainer } from "@/components/layout/page-container"
import {
    Map,
    FolderTree,
} from "lucide-react"

const docsNavItems = [
    { title: "Architecture Map", href: "/docs/architecture", icon: Map },
    { title: "Module Directory", href: "/docs/modules", icon: FolderTree },
]

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <PageContainer
            title="Documentation"
            description="System documentation and architecture overview."
            navItems={docsNavItems}
        >
            {children}
        </PageContainer>
    )
}
