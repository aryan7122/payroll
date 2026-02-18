"use client"

import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as React from "react"
import { Plus, RefreshCcw, SlidersHorizontal, Maximize2, ChevronDown, Loader2 } from "lucide-react"
import Link from "next/link"
import { RefreshButton } from "@/components/common/refresh-button"
import { useItems } from "@/hooks/use-items"

export default function ItemsPage() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [showSort, setShowSort] = React.useState(false)
    const [showFilter, setShowFilter] = React.useState(false)

    // Fetch items using custom hook
    const { data, isLoading, isError } = useItems()
    const items = data?.item || []

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-full w-full text-destructive">
                Failed to load items. Please try again later.
            </div>
        )
    }

    return (
        <div className="flex-1 flex flex-col space-y-4 pt-6 w-full h-full overflow-hidden">

            <div className="flex items-center justify-between gap-4 px-8 shrink-0">

                {/* Title and Record Count */}
                <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded-md transition-colors group">
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">All Items</h2>
                        <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <div className="h-6 w-px bg-border" />
                    <span className="text-sm text-muted-foreground font-medium">
                        {items.length} Records
                    </span>
                    {/* import {RefreshButton} from "@/components/common/refresh-button"

                    // ... inside ItemsPage component ... */}

                    <RefreshButton
                        queryKey={["item"]}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    />

                    {/* Search Bar */}
                    <div className="flex-1 w-[250px]">
                        <div className="relative">
                            <Input
                                placeholder="Search In Items"
                                className="h-9 w-full bg-muted/50"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 shrink-0">

                    {/* Sort Dropdown */}
                    <div className="relative">
                        {showSort && (
                            <div className="absolute top-9 right-0 w-48 rounded-md border bg-popover text-popover-foreground shadow-md z-50 p-1">
                                <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                                    Sort By
                                </div>
                                <div className="space-y-1">
                                    <Button variant="ghost" size="sm" className="w-full justify-start h-8 px-2 font-normal">Normal</Button>
                                    <Button variant="ghost" size="sm" className="w-full justify-start h-8 px-2 font-normal">Name</Button>
                                    <Button variant="ghost" size="sm" className="w-full justify-start h-8 px-2 font-normal text-primary bg-primary/10">
                                        <div className="w-full flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                                            Price
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Filter Dropdown */}
                    <div className="relative">
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden h-8 lg:flex bg-muted/50 border-muted-foreground/20 hover:bg-muted"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                        {showFilter && (
                            <div className="absolute top-9 right-0 w-56 rounded-md border bg-popover text-popover-foreground shadow-md z-50 p-2">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none text-muted-foreground text-xs uppercase tracking-wider">Item Type</h4>
                                        <div className="grid gap-2">
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" id="products" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                                <label htmlFor="products" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Products</label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" id="services" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                                <label htmlFor="services" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Services</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t"></div>
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none text-muted-foreground text-xs uppercase tracking-wider">Status</h4>
                                        <div className="grid gap-2">
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" id="active" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                                <label htmlFor="active" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Active</label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input type="checkbox" id="inactive" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                                <label htmlFor="inactive" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Inactive</label>
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="w-full h-8 bg-primary hover:bg-primary/90 text-primary-foreground">Apply Filter</Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/items/new">
                        <Button
                            size="sm"
                            className="h-8 text-primary-foreground hover:opacity-90 transition-opacity shadow-sm bg-primary"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            New Item
                        </Button>
                    </Link>

                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Maximize2 className="h-4 w-4" />
                    </Button>
                </div>
            </div >

            <div className="hidden flex-1 flex-col md:flex overflow-y-auto">
                <DataTable columns={columns} data={items} searchKey="name" searchValue={searchQuery} />
            </div>
        </div >
    )
}
