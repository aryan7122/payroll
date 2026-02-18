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
    Sparkles,
    Languages
} from "lucide-react"
import { changeLanguage } from "@/components/theme/google-translator"

export default function AppearancePage() {
    const { theme, setTheme } = useTheme()
    const { brandColor, setBrandColor, fontFamily, setFontFamily } = useDesign()
    const [mounted, setMounted] = React.useState(false)
    const [currentLang, setCurrentLang] = React.useState("en")

    // Wait until mounted on client to prevent hydration mismatch
    React.useEffect(() => {
        setMounted(true)
        // Parse Google Translate cookie to get current language
        // Cookie format is typically '/auto/en' or '/en/hi'
        import("cookies-next").then(({ getCookie }) => {
            const cookie = getCookie("googtrans")
            if (cookie && typeof cookie === "string") {
                const parts = cookie.split("/")
                // effectively gets the last part which is the language code
                const langCode = parts[parts.length - 1]
                if (langCode) {
                    setCurrentLang(langCode)
                }
            }
        })
    }, [])

    if (!mounted) return null

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Theme Selection */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-foreground">
                    <Sparkles className="size-5 text-primary" />
                    <h2 className="text-xl font-bold tracking-tight">Theme Mode</h2>
                </div>
                <p className="text-muted-foreground text-sm">Choose how you want the application to look.</p>

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
                                "relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 group overflow-hidden glass-adaptive",
                                theme === item.id
                                    ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]"
                                    : "border-border/50 hover:border-primary/20 hover:bg-accent/40"
                            )}
                        >
                            <item.icon className={cn(
                                "size-8 mb-3 transition-transform duration-500 group-hover:scale-110",
                                theme === item.id ? "text-primary" : "text-muted-foreground"
                            )} />
                            <span className={cn(
                                "text-sm font-bold tracking-tight",
                                theme === item.id ? "text-foreground" : "text-muted-foreground"
                            )}>{item.label}</span>

                            {theme === item.id && (
                                <div className="absolute top-3 right-3">
                                    <div className="bg-primary rounded-full p-1 shadow-lg shadow-primary/20">
                                        <Check className="size-3 text-primary-foreground stroke-[3px]" />
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Brand Colors */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-foreground">
                    <Palette className="size-5 text-primary" />
                    <h2 className="text-xl font-bold tracking-tight">Brand Identity</h2>
                </div>
                <p className="text-muted-foreground text-sm">Select your organization's primary accent color.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-4">
                    {designConfig.brandColors.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => setBrandColor(color.name)}
                            className={cn(
                                "relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 group glass-adaptive",
                                brandColor === color.name
                                    ? "bg-accent/40 border-primary/50"
                                    : "border-border/50 hover:border-primary/20"
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
                                    <Check className="size-3 text-primary" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Font Families */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-foreground">
                    <Type className="size-5 text-primary" />
                    <h2 className="text-xl font-bold tracking-tight">Typography</h2>
                </div>
                <p className="text-muted-foreground text-sm">Define the typeface used across the system.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {designConfig.fontFamilies.map((font) => (
                        <button
                            key={font.name}
                            onClick={() => setFontFamily(font.name)}
                            className={cn(
                                "flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 group glass-adaptive",
                                fontFamily === font.name
                                    ? "bg-accent/40 border-primary/50"
                                    : "border-border/50 hover:border-primary/20"
                            )}
                            style={{ fontFamily: font.variable }}
                        >
                            <div className="flex flex-col items-start">
                                <span className={cn(
                                    "text-base font-bold tracking-tight",
                                    fontFamily === font.name ? "text-foreground" : "text-muted-foreground"
                                )}>{font.name}</span>
                                <span className="text-[10px] text-muted-foreground tracking-wide uppercase">The quick brown fox jumps over the lazy dog</span>
                            </div>
                            {fontFamily === font.name && (
                                <div className="bg-primary rounded-full p-1">
                                    <Check className="size-3 text-primary-foreground" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Language Selection */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 text-foreground">
                    <Languages className="size-5 text-primary" />
                    <h2 className="text-xl font-bold tracking-tight">Language</h2>
                </div>
                <p className="text-muted-foreground text-sm">Select your preferred language.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4 notranslate">
                    {[
                        { code: "en", name: "English", native: "English" },
                        { code: "hi", name: "Hindi", native: "हिन्दी" },
                        { code: "fr", name: "French", native: "Français" },
                        { code: "es", name: "Spanish", native: "Español" },
                        { code: "de", name: "German", native: "Deutsch" },
                        { code: "ja", name: "Japanese", native: "日本語" },
                        { code: "zh-CN", name: "Chinese", native: "中文" },
                        { code: "ar", name: "Arabic", native: "العربية" },
                    ].map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 group glass-adaptive relative",
                                currentLang === lang.code
                                    ? "bg-accent/40 border-primary/50"
                                    : "border-border/50 hover:border-primary/20 hover:bg-accent/40"
                            )}
                        >
                            <span className={cn(
                                "text-sm font-bold tracking-tight",
                                currentLang === lang.code ? "text-foreground" : "text-muted-foreground"
                            )}>{lang.native}</span>
                            <span className="text-xs text-muted-foreground mt-1">{lang.name}</span>

                            {currentLang === lang.code && (
                                <div className="absolute top-2 right-2">
                                    <Check className="size-3 text-primary" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Live Preview / Note */}
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Sparkles className="size-5 text-primary" />
                </div>
                <div>
                    <h4 className="text-foreground font-bold text-sm tracking-tight">Global Changes Applied</h4>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                        These settings directly influence CSS variables (`--brand-primary`, `--font-primary`).
                        All system components will automatically sync with your brand identity.
                    </p>
                </div>
            </div>
        </div>
    )
}
