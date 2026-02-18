"use client"

import { useEffect, useState } from "react"
import { getCookie, setCookie } from "cookies-next"

/**
 * Google Translator Component
 * Automatically injects the Google Translate script and manages language switching via cookies.
 */
export function GoogleTranslator() {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false)

    // Wait until mounted on client to prevent hydration mismatch
    useEffect(() => {
        // Prevent duplicate script injection
        // @ts-ignore
        if (window.google?.translate?.TranslateElement) {
            setIsScriptLoaded(true)
            return
        }

        // Add Google Translate Script
        const addScript = document.createElement("script")
        addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        addScript.async = true
        document.body.appendChild(addScript)

        // Initialize Google Translate
        // @ts-ignore
        window.googleTranslateElementInit = () => {
            // @ts-ignore
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    includedLanguages: "en,hi,fr,es,de,ja,zh-CN,ar,ru,pt",
                    autoDisplay: false,
                },
                "google_translate_element"
            )
            setIsScriptLoaded(true)
        }

        // MutationObserver to remove top spacing added by Google
        const observer = new MutationObserver(() => {
            if (document.body.style.top) {
                document.body.style.top = "0px"
            }
            if (document.body.style.position === "relative") {
                document.body.style.position = "static"
            }
            // @ts-ignore
            if (document.body.style.marginTop) {
                // @ts-ignore
                document.body.style.marginTop = "0px"
            }
        })

        observer.observe(document.body, { attributes: true, attributeFilter: ["style"] })

        // Aggressive interval to hide the banner iframe
        const intervalId = setInterval(() => {
            const banner = document.querySelector(".goog-te-banner-frame")
            if (banner) {
                // @ts-ignore
                banner.style.display = "none"
                // @ts-ignore
                banner.style.visibility = "hidden"
                // @ts-ignore
                banner.style.height = "0px"
                // @ts-ignore
                banner.style.opacity = "0"
            }

            const skiptranslate = document.querySelector(".skiptranslate")
            if (skiptranslate && skiptranslate.tagName === "IFRAME") {
                // @ts-ignore
                skiptranslate.style.display = "none"
                // @ts-ignore
                skiptranslate.style.visibility = "hidden"
                // @ts-ignore
                skiptranslate.style.height = "0px"
                // @ts-ignore
                skiptranslate.style.opacity = "0"
            }

            // Specific iframe identified by user
            const userIdentifiedFrame = document.getElementById(":1.container")
            if (userIdentifiedFrame) {
                // @ts-ignore
                userIdentifiedFrame.style.display = "none"
                // @ts-ignore
                userIdentifiedFrame.style.visibility = "hidden"
                // @ts-ignore
                userIdentifiedFrame.style.height = "0px"
                // @ts-ignore
                userIdentifiedFrame.style.opacity = "0"
            }

            if (document.body.style.top && document.body.style.top !== "0px") {
                document.body.style.top = "0px"
            }
        }, 1000)

        return () => {
            observer.disconnect()
            clearInterval(intervalId)
        }
    }, [])

    return (
        <>
            <div id="google_translate_element" className="hidden" style={{ visibility: "hidden" }} />
            <style jsx global>{`
                .goog-te-banner-frame.skiptranslate {
                    display: none !important;
                }
                iframe.goog-te-banner-frame {
                    visibility: hidden !important;
                    display: none !important;
                    height: 0 !important;
                }
                iframe#\\:1\\.container {
                    visibility: hidden !important;
                    display: none !important;
                    height: 0 !important;
                }
                .VIpgJd-ZVi9od-ORHb-OEVmcd {
                    visibility: hidden !important;
                    display: none !important;
                    height: 0 !important;
                }
                body {
                    top: 0px !important;
                }
                .goog-te-gadget {
                    display: none !important;
                }
                .goog-text-highlight {
                    background-color: transparent !important;
                    box-shadow: none !important;
                }
                #goog-gt-tt {
                    display: none !important;
                    visibility: hidden !important;
                }
            `}</style>
        </>
    )
}

// Helper to switch language
export const changeLanguage = (langCode: string) => {
    // Google Translate uses a specific cookie format: /en/hi
    const cookieValue = `/auto/${langCode}`
    setCookie("googtrans", cookieValue)
    setCookie("googtrans", cookieValue, { domain: window.location.hostname }) // Set for subdomains if needed

    // Force reload to apply translation
    window.location.reload()
}
