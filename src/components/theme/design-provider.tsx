"use client"

import * as React from "react"
import { designConfig } from "@/lib/design-config"

type DesignContextType = {
    brandColor: string
    fontFamily: string
    setBrandColor: (color: string) => void
    setFontFamily: (font: string) => void
}

const DesignContext = React.createContext<DesignContextType | undefined>(undefined)

export function DesignProvider({ children }: { children: React.ReactNode }) {
    const [brandColor, setBrandColorState] = React.useState("Indigo")
    const [fontFamily, setFontFamilyState] = React.useState("Geist")

    // Load from localStorage on mount
    React.useEffect(() => {
        const savedColor = localStorage.getItem("brand-color")
        const savedFont = localStorage.getItem("font-family")
        if (savedColor) setBrandColorState(savedColor)
        if (savedFont) setFontFamilyState(savedFont)
    }, [])

    const setBrandColor = (color: string) => {
        setBrandColorState(color)
        localStorage.setItem("brand-color", color)
        updateCssVariables(color, fontFamily)
    }

    const setFontFamily = (font: string) => {
        setFontFamilyState(font)
        localStorage.setItem("font-family", font)
        updateCssVariables(brandColor, font)
    }

    const updateCssVariables = (colorName: string, fontName: string) => {
        const root = document.documentElement
        const color = designConfig.brandColors.find(c => c.name === colorName)?.value
        const font = designConfig.fontFamilies.find(f => f.name === fontName)?.variable

        if (color) {
            root.style.setProperty("--brand-primary", color)
        }
        if (font) {
            root.style.setProperty("--font-primary", font)
            // Also set on body as secondary target
            document.body.style.setProperty("--font-primary", font)
        }
    }

    // Initial injection
    React.useEffect(() => {
        updateCssVariables(brandColor, fontFamily)
    }, [brandColor, fontFamily])

    return (
        <DesignContext.Provider value={{ brandColor, fontFamily, setBrandColor, setFontFamily }}>
            {children}
        </DesignContext.Provider>
    )
}

export const useDesign = () => {
    const context = React.useContext(DesignContext)
    if (!context) throw new Error("useDesign must be used within a DesignProvider")
    return context
}
