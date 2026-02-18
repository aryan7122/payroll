"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import * as React from "react"

export function QueryProvider({ children }: { children: React.ReactNode }) {
    // We create the QueryClient inside a state to ensure it's stable across re-renders
    // but unique per request on the server (if using SSR, though this is a client component).
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // Stale time: Data is considered fresh for 1 minute.
                // It won't refetch immediately if you switch tabs and come back.
                staleTime: 60 * 1000,
                // Retry failed requests 1 time before showing error
                retry: 1,
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* DevTools for debugging queries - only shows in dev mode */}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
