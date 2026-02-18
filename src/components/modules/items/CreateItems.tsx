"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// --- Validation Schemas ---

const formSchema = z.object({
    itemType: z.enum(["Product", "Service"]),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    code: z.string().min(1, { message: "Item Code is required" }),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    description: z.string().optional(),
    taxPreference: z.enum(["Taxable", "Non-Taxable"]),
    taxRate: z.string().optional(),
    exemptionReason: z.string().optional(),
    salesPrice: z.number().min(0, { message: "Sales price must be positive" }),
    salesAccount: z.string().optional(),
    salesDescription: z.string().optional(),
    isSale: z.boolean(),
    isPurchase: z.boolean(),
    purchasePrice: z.number().optional(),
    purchaseAccount: z.string().optional(),
    purchaseDescription: z.string().optional(),
    vendor: z.string().optional(),
    tags: z.string().optional(),
    sku: z.string().optional(),
    unit: z.string().optional(),
    hsnCode: z.string().optional(),
    openingStock: z.number().optional(),
    warehouse: z.string().optional(),
    barcodeValue: z.string().optional(),
    sacCode: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function CreateItems() {
    const [itemType, setItemType] = useState<"Product" | "Service">("Product")

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            itemType: "Product",
            name: "",
            code: "",
            taxPreference: "Taxable",
            salesPrice: 0,
            isSale: true,
            isPurchase: true,
            sku: "",
            unit: "",
            hsnCode: "",
            openingStock: 0,
        },
    })

    // Watch itemType to conditionally render/reset
    const watchedItemType = form.watch("itemType")

    // Sync local state for UI switching if needed (or just use watch)
    if (watchedItemType !== itemType) {
        setItemType(watchedItemType)
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form Submitted:", values)
        // Submit logic here
    }

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Create New Item</h2>
                </div>
                <Separator />

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        {/* 1. Header & Type Selection */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Item Type</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="itemType"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <div className="flex items-center space-x-3 space-y-0">
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="Product" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Product (Inventory Item)
                                                            </FormLabel>
                                                        </FormItem>
                                                    </div>
                                                    <div className="flex items-center space-x-3 space-y-0">
                                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                                            <FormControl>
                                                                <RadioGroupItem value="Service" />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                Service (Non-Inventory)
                                                            </FormLabel>
                                                        </FormItem>
                                                    </div>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* 2. Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6 md:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Item Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Item Code *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Auto-generated" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Product ONLY Fields */}
                                {itemType === "Product" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="sku"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>SKU *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Stock Keeping Unit" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="unit"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Unit (UOM) *</FormLabel>
                                                    <FormControl>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Unit" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                                                                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                                                <SelectItem value="box">Box</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="hsnCode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>HSN Code *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Harmonized System Nomenclature" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}

                                {/* Service ONLY Fields (Future) */}
                                {itemType === "Service" && (
                                    <FormField
                                        control={form.control}
                                        name="sacCode"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>SAC Code</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Service Accounting Code" {...field} />
                                                </FormControl>
                                                <FormDescription>Optional for Services</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Select Category" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* 3. Sales Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Sales Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="isSale"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    Available for Sale
                                                </FormLabel>
                                                <FormDescription>
                                                    Uncheck if this item is not sold directly.
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                {form.getValues("isSale") && (
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="salesPrice"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Sales Price *</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="salesAccount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Sales Account</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Select Account" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="salesDescription"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2">
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Sales Description" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* 4. Purchase Information - Hidden for Service (As per requirement, though debatable) */}
                        {itemType === "Product" && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Purchase Information</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <FormField
                                        control={form.control}
                                        name="isPurchase"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>
                                                        Available for Purchase
                                                    </FormLabel>
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    {form.getValues("isPurchase") && (
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <FormField
                                                control={form.control}
                                                name="purchasePrice"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Purchase Price</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="purchaseAccount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Purchase Account</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Select Account" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="vendor"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Preferred Vendor</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Select Vendor" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="purchaseDescription"
                                                render={({ field }) => (
                                                    <FormItem className="col-span-2">
                                                        <FormLabel>Description</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Purchase Description" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* 5. Inventory - Product Only */}
                        {itemType === "Product" && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Inventory</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="openingStock"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Opening Stock</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="warehouse"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Warehouse</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Select Warehouse" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        )}

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" type="button">Cancel</Button>
                            <Button type="submit">Save {itemType}</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </ScrollArea>
    )
}
