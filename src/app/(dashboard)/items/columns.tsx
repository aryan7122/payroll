"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Calendar, Tag, Box, Layers, Percent, DollarSign, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Item = {
    id: string
    name: string
    category: string
    subCategory: string
    sku: string
    type: "Product" | "Service" | "Packaging" | "Raw Material"
    stockQty: number
    taxRate?: number
    price: number
}

// ... (imports remain the same)

export const columns: ColumnDef<Item>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="border-muted-foreground/40 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="border-muted-foreground/40 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground pl-0"
                >
                    <Calendar className="mr-2 h-4 w-4" />
                    NAME
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="font-medium text-sm text-blue-600 hover:underline cursor-pointer">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "category", // Virtual accessor for combined display
        header: () => (
            <div className="flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Layers className="mr-2 h-4 w-4" />
                CATEGORY/SUB-CATEGORY
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex flex-col">
                    <span className="text-sm text-foreground">{row.original.category} <span className="text-muted-foreground mx-1">/</span> {row.original.subCategory}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "sku",
        header: () => (
            <div className="flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Settings className="mr-2 h-4 w-4" />
                SKU
            </div>
        ),
        cell: ({ row }) => <div className="text-sm text-muted-foreground font-normal">{row.getValue("sku") || "-"}</div>,
    },
    {
        accessorKey: "type",
        header: () => (
            <div className="flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <DollarSign className="mr-2 h-4 w-4" />
                TYPE
            </div>
        ),
        cell: ({ row }) => {
            const type = row.getValue("type") as string
            let variant: "default" | "secondary" | "outline" | "destructive" = "outline"
            let className = "text-muted-foreground"

            if (type === "Product") {
                className = "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
            } else if (type === "Service") {
                className = "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800"
            } else if (type === "Packaging") {
                className = "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
            } else if (type === "Raw Material") {
                className = "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
            }

            return <Badge variant="outline" className={className}>{type}</Badge>
        }
    },
    {
        accessorKey: "stockQty",
        header: () => (
            <div className="flex items-center justify-end text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Box className="mr-2 h-4 w-4" />
                STOCK QTY
            </div>
        ),
        cell: ({ row }) => {
            const qty = parseFloat(row.getValue("stockQty"))
            return <div className="text-right font-medium text-sm text-foreground">{qty.toFixed(2)}</div>
        }
    },
    {
        accessorKey: "taxRate",
        header: () => (
            <div className="flex items-center justify-end text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Percent className="mr-2 h-4 w-4" />
                TAX RATE
            </div>
        ),
        cell: ({ row }) => {
            const rate = row.getValue("taxRate")
            if (rate === undefined || rate === null) return <div className="text-right">-</div>
            return <div className="text-right text-sm text-foreground">{rate} %</div>
        }
    },
    {
        accessorKey: "price",
        header: () => (
            <div className="flex items-center justify-end text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span className="mr-2">(₹)</span>
                PRICE
            </div>
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-IN", {
                style: "decimal",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }).format(amount)

            return <div className="text-right font-semibold text-sm text-foreground">{formatted}</div>
        },
    },
]
