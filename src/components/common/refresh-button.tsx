"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"
import { QueryKey, useIsFetching, useQueryClient } from "@tanstack/react-query"
import { cn } from "@/lib/utils"

type ButtonProps = React.ComponentProps<typeof Button>

interface RefreshButtonProps extends ButtonProps {
    queryKey: QueryKey
    onRefresh?: () => void
}

export function RefreshButton({
    queryKey,
    className,
    variant = "ghost",
    size = "icon",
    onRefresh,
    ...props
}: RefreshButtonProps) {
    const queryClient = useQueryClient()

    // Track if any query matching the key is currently fetching
    // This makes the loading state dynamic and synchronized with background fetches too
    const isFetching = useIsFetching({ queryKey }) > 0

    const handleRefresh = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        // Invalidate the query to trigger a refetch
        // exact: false allows refreshing all related queries if the key is a prefix
        await queryClient.invalidateQueries({ queryKey })

        onRefresh?.()
    }

    return (
        <Button
            variant={variant}
            size={size}
            className={cn(
                "transition-all duration-300",
                isFetching && "animate-spin-slow opacity-80 cursor-not-allowed",
                className
            )}
            onClick={handleRefresh}
            disabled={isFetching || props.disabled}
            title="Refresh Data"
            {...props}
        >
            <RefreshCcw className={cn("h-4 w-4", isFetching && "animate-spin")} />
            <span className="sr-only">Refresh</span>
        </Button>
    )
}
