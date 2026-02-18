"use client"

import React, { useEffect, useState } from "react"
import mermaid from "mermaid"
import { useTheme } from "next-themes"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { ZoomIn, ZoomOut, Maximize, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MermaidView({ chart }: { chart: string }) {
    const { theme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [svg, setSvg] = useState<string>("")

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        const currentTheme = theme === "system" ? systemTheme : theme
        const mermaidTheme = currentTheme === "dark" ? "dark" : "base"

        mermaid.initialize({
            startOnLoad: false,
            theme: mermaidTheme,
            securityLevel: "loose",
            fontFamily: "inherit",
            darkMode: currentTheme === "dark",
            themeVariables: {
                fontFamily: "var(--font-sans)",
                fontSize: "18px",
                primaryColor: currentTheme === "dark" ? "#1e293b" : "#e2e8f0",
                primaryTextColor: currentTheme === "dark" ? "#f8fafc" : "#0f172a",
                secondaryColor: currentTheme === "dark" ? "#1e293b" : "#f1f5f9",
                tertiaryColor: currentTheme === "dark" ? "#1e293b" : "#cbd5e1",
                mainBkg: currentTheme === "dark" ? "#020817" : "#ffffff", // Dark background instead of transparent
                nodeBorder: currentTheme === "dark" ? "#334155" : "#0f172a",
                lineColor: currentTheme === "dark" ? "#64748b" : "#334155",
                clusterBkg: currentTheme === "dark" ? "rgba(255,255,255,0.02)" : "#ffffff",
            }
        })

        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`

        mermaid.render(id, chart).then(({ svg }) => {
            setSvg(svg)
        }).catch((error) => {
            console.error("Mermaid Failed:", error)
            setSvg(`<div class="text-red-500 p-4">Failed to render graph. Syntax error in code.</div>`)
        })

    }, [chart, theme, systemTheme, mounted])

    if (!mounted) {
        return <div className="h-full h-[60vh] border border-amber-50 w-full animate-pulse bg-muted" />
    }

    return (
        <div className="w-full h-full relative overflow-hidden bg-background">
            <TransformWrapper
                initialScale={1.35} // Started bigger to fill space
                minScale={0.4}
                maxScale={4}
                centerOnInit={true}
                limitToBounds={false}
                wheel={{ step: 0.1 }}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 bg-background/80 backdrop-blur p-2 rounded-lg border shadow-sm">
                            <Button variant="outline" size="icon" onClick={() => zoomIn()}>
                                <ZoomIn className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => zoomOut()}>
                                <ZoomOut className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => resetTransform()}>
                                <RefreshCcw className="h-4 w-4" />
                            </Button>
                        </div>

                        <TransformComponent
                            wrapperClass="w-full h-full"
                            contentClass="w-full h-full"
                            wrapperStyle={{ overflow: "visible" }} // Fix for cutoff issue
                        >
                            <div className="w-full h-full min-h-[600px] flex items-center justify-center">
                                <div
                                    dangerouslySetInnerHTML={{ __html: svg }}
                                    className="mermaid-svg-container"
                                    style={{ width: '100%', height: '100%', minWidth: '100%' }}
                                />
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    )
}
