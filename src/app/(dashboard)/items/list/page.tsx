"use client"

// import { columns, Item } from "./list/columns" // Import columns and type
import { columns, Item } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as React from "react"
import { Plus, RefreshCcw, SlidersHorizontal, ArrowUpDown, Maximize2, ChevronDown } from "lucide-react"
import Link from "next/link"

const data: Item[] = [
    {
        id: "1",
        name: "AC Repairing",
        category: "Electronic",
        subCategory: "Accessories",
        sku: "",
        type: "Service",
        stockQty: 0.00,
        taxRate: 5,
        price: 12005,
    },
    {
        id: "2",
        name: "Laptop",
        category: "Electronic",
        subCategory: "Laptop",
        sku: "SKULap12123",
        type: "Product",
        stockQty: 12.00,
        taxRate: 5,
        price: 1223,
    },
    {
        id: "3",
        name: "Key Board",
        category: "Electronic",
        subCategory: "Accessories",
        sku: "KEY234243",
        type: "Product",
        stockQty: 36.00,
        taxRate: 12,
        price: 0,
    },
    {
        id: "4",
        name: "Washing Machine",
        category: "Electronic",
        subCategory: "Accessories",
        sku: "WM34343",
        type: "Product",
        stockQty: 6.00,
        taxRate: 5,
        price: 0,
    },
    {
        id: "5",
        name: "New Item2",
        category: "Food",
        subCategory: "Refreshment",
        sku: "SKU123",
        type: "Product",
        stockQty: 1.00,
        taxRate: undefined, // Example of missing tax rate
        price: 1200,
    },
    {
        id: "6",
        name: "Bubble Wrap",
        category: "Domestic",
        subCategory: "Essentials",
        sku: "SKU000011",
        type: "Packaging",
        stockQty: 1001.00,
        taxRate: 5,
        price: 2,
    },
    {
        id: "7",
        name: "Chimney Repair",
        category: "Domestic",
        subCategory: "Repair",
        sku: "SKU000010",
        type: "Service",
        stockQty: 2.00,
        taxRate: 5,
        price: 1500,
    },
    {
        id: "8",
        name: "Refined Oil",
        category: "Domestic",
        subCategory: "Essentials",
        sku: "SKU000009",
        type: "Raw Material",
        stockQty: 2.00,
        taxRate: 5,
        price: 90,
    },
    {
        id: "9",
        name: "Wheat Flour",
        category: "Domestic",
        subCategory: "Essentials",
        sku: "SKU000008",
        type: "Raw Material",
        stockQty: 0.00,
        taxRate: 5,
        price: 40,
    },
    {
        id: "10",
        name: "Cream Buscuits",
        category: "Food",
        subCategory: "Refreshment",
        sku: "SKU00007",
        type: "Product",
        stockQty: 92.00,
        taxRate: 5,
        price: 6,
    },
    {
        id: "11",
        name: "Monitor",
        category: "Electronic",
        subCategory: "Accessories",
        sku: "MON001",
        type: "Product",
        stockQty: 15.00,
        taxRate: 18,
        price: 8000,
    },
    {
        id: "12",
        name: "Mouse",
        category: "Electronic",
        subCategory: "Accessories",
        sku: "MOU001",
        type: "Product",
        stockQty: 50.00,
        taxRate: 12,
        price: 500,
    },
    {
        id: "13",
        name: "USB Cable",
        category: "Electronic",
        subCategory: "Accessories",
        sku: "USB001",
        type: "Product",
        stockQty: 100.00,
        taxRate: 12,
        price: 200,
    },
    {
        id: "14",
        name: "External Hard Drive",
        category: "Electronic",
        subCategory: "Accessories",
        sku: "HDD001",
        type: "Product",
        stockQty: 10.00,
        taxRate: 18,
        price: 4500,
    },
    {
        id: "15",
        name: "Graphics Card",
        category: "Electronic",
        subCategory: "PC Components",
        sku: "GPU001",
        type: "Product",
        stockQty: 5.00,
        taxRate: 18,
        price: 35000,
    },
]

export default function ItemsPage() {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [showSort, setShowSort] = React.useState(false)
    const [showFilter, setShowFilter] = React.useState(false)

    return (
        <div className="flex-1 flex flex-col space-y-4 pt-6 w-full h-full overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-8 shrink-0">

                {/* Left Section: Title and Stats */}
                <div className="flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded-md transition-colors group">
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">All Items</h2>
                        <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                    <div className="h-6 w-px bg-border" /> {/* Separator */}
                    <span className="text-sm text-muted-foreground font-medium">
                        {data.length} Records
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <RefreshCcw className="h-4 w-4" />
                    </Button>

                    {/* Middle Section: Search Bar */}
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


                {/* Right Section: Actions */}
                <div className="flex items-center space-x-2 shrink-0">
                    {/* Sort Dropdown */}
                    <div className="relative">
                        {/* <Button
                            variant="outline"
                            size="sm"
                            className="hidden h-8 lg:flex bg-muted/50 border-muted-foreground/20 hover:bg-muted"
                            onClick={() => setShowSort(!showSort)}
                        >
                            <ArrowUpDown className="mr-2 h-4 w-4" />
                            Sort
                        </Button> */}
                        {showSort && (
                            <div className="absolute top-9 right-0 w-48 rounded-md border bg-popover text-popover-foreground shadow-md z-50 p-1">
                                <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                                    Sort By
                                </div>
                                <div className="space-y-1">
                                    <Button variant="ghost" size="sm" className="w-full justify-start h-8 px-2 font-normal">Normal</Button>
                                    <Button variant="ghost" size="sm" className="w-full justify-start h-8 px-2 font-normal">Name</Button>
                                    <Button variant="ghost" size="sm" className="w-full justify-start h-8 px-2 font-normal text-purple-600 bg-purple-50">
                                        <div className="w-full flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                                            Price
                                        </div>
                                    </Button>
                                    <div className="border-t my-1"></div>
                                    <div className="flex items-center px-2 py-1.5 gap-2 hover:bg-muted rounded-sm cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                        <span className="text-sm">Ascending</span>
                                    </div>
                                    <div className="flex items-center px-2 py-1.5 gap-2 hover:bg-muted rounded-sm cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                        <span className="text-sm">Descending</span>
                                    </div>
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
                                    <Button className="w-full h-8 bg-indigo-600 hover:bg-indigo-700 text-white">Apply Filter</Button>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link href="/items/new">
                        <Button
                            size="sm"
                            className="h-8 text-white hover:opacity-90 transition-opacity shadow-sm bg-[lab(44.0605%_29.0279_-86.0352)] dark:bg-indigo-600"
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
                <DataTable columns={columns} data={data} searchKey="name" searchValue={searchQuery} />
            </div>
        </div >
    )
}
