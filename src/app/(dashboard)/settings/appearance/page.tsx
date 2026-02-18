"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { useDesign } from "@/components/theme/design-provider"
import { designConfig } from "@/lib/design-config"
import { cn } from "@/lib/utils"
import {
    Sun,
    Moon,
    Monitor,
    Check,
    Palette,
    Type,
    Sparkles
} from "lucide-react"

export default function AppearancePage() {
    const { theme, setTheme } = useTheme()
    const { brandColor, setBrandColor, fontFamily, setFontFamily } = useDesign()

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Theme Selection */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-white">
                    <Sparkles className="size-5 text-indigo-400" />
                    <h2 className="text-xl font-bold tracking-tight">Theme Mode</h2>
                </div>
                <p className="text-zinc-500 text-sm">Choose how you want the application to look.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {[
                        { id: "light", icon: Sun, label: "Light Mode" },
                        { id: "dark", icon: Moon, label: "Dark Mode" },
                        { id: "system", icon: Monitor, label: "System" },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setTheme(item.id)}
                            className={cn(
                                "relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 group overflow-hidden",
                                theme === item.id
                                    ? "bg-indigo-600/10 border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.15)]"
                                    : "bg-zinc-900/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/60"
                            )}
                        >
                            <item.icon className={cn(
                                "size-8 mb-3 transition-transform duration-500 group-hover:scale-110",
                                theme === item.id ? "text-indigo-400" : "text-zinc-500"
                            )} />
                            <span className={cn(
                                "text-sm font-bold tracking-tight",
                                theme === item.id ? "text-white" : "text-zinc-400"
                            )}>{item.label}</span>

                            {theme === item.id && (
                                <div className="absolute top-3 right-3">
                                    <div className="bg-indigo-500 rounded-full p-1 shadow-lg shadow-indigo-500/20">
                                        <Check className="size-3 text-white stroke-[3px]" />
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Brand Colors */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-white">
                    <Palette className="size-5 text-indigo-400" />
                    <h2 className="text-xl font-bold tracking-tight">Brand Identity</h2>
                </div>
                <p className="text-zinc-500 text-sm">Select your organization's primary accent color.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-4">
                    {designConfig.brandColors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => setBrandColor(color.name)}
                            className={cn(
                                "relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 group",
                                brandColor === color.name
                                    ? "bg-zinc-900/60 border-indigo-500/50"
                                    : "bg-zinc-900/20 border-white/5 hover:border-white/10"
                            )}
                        >
                            <div className={cn(
                                "size-10 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110",
                                color.class
                            )} />
                            <span className={cn(
                                "text-xs font-bold tracking-tighter uppercase",
                                brandColor === color.name ? "text-white" : "text-zinc-500"
                            )}>{color.name}</span>

                            {brandColor === color.name && (
                                <div className="absolute top-2 right-2">
                                    <Check className="size-3 text-indigo-400" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Font Families */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-white">
                    <Type className="size-5 text-indigo-400" />
                    <h2 className="text-xl font-bold tracking-tight">Typography</h2>
                </div>
                <p className="text-zinc-500 text-sm">Define the typeface used across the system.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {designConfig.fontFamilies.map((font) => (
                        <button
                            key={font.name}
                            onClick={() => setFontFamily(font.name)}
                            className={cn(
                                "flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 group",
                                fontFamily === font.name
                                    ? "bg-zinc-900/60 border-indigo-500/50"
                                    : "bg-zinc-900/20 border-white/5 hover:border-white/10"
                            )}
                            style={{ fontFamily: font.variable }}
                        >
                            <div className="flex flex-col items-start">
                                <span className={cn(
                                    "text-base font-bold tracking-tight",
                                    fontFamily === font.name ? "text-white" : "text-zinc-400"
                                )}>{font.name}</span>
                                <span className="text-[10px] text-zinc-500 tracking-wide uppercase">The quick brown fox jumps over the lazy dog</span>
                            </div>
                            {fontFamily === font.name && (
                                <div className="bg-indigo-500 rounded-full p-1">
                                    <Check className="size-3 text-white" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Live Preview / Note */}
            <div className="p-6 rounded-2xl bg-indigo-600/5 border border-indigo-500/10 flex items-start gap-4">
                <div className="size-10 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                    <Sparkles className="size-5 text-indigo-400" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm tracking-tight">Global Changes Applied</h4>
                    <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                        These settings directly influence CSS variables (`--brand-primary`, `--font-primary`).
                        All system components will automatically sync with your brand identity.
                    </p>
                </div>
            </div>
        </div>
    )
}
