"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import {
    Box,
    Wrench,
    Receipt,
    Truck,
    Coins,
    Calculator,
    Layers,
    Hash,
    Barcode,
    DollarSign,
    Percent,
    FileText,
    User,
    Check,
    ChevronRight,
    ShoppingBag,
    Warehouse,
    Tag
} from "lucide-react"

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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

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
    salesPrice: z.coerce.number().min(0, { message: "Sales price must be positive" }),
    salesAccount: z.string().optional(),
    salesDescription: z.string().optional(),
    isSale: z.boolean(),
    isPurchase: z.boolean(),
    purchasePrice: z.coerce.number().optional(),
    purchaseAccount: z.string().optional(),
    purchaseDescription: z.string().optional(),
    vendor: z.string().optional(),
    tags: z.string().optional(),
    sku: z.string().optional(),
    unit: z.string().optional(),
    hsnCode: z.string().optional(),
    openingStock: z.coerce.number().optional(),
    warehouse: z.string().optional(),
    barcodeValue: z.string().optional(),
    sacCode: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

// --- Animation Variants ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    }
}

export function CreateItems() {
    const [itemType, setItemType] = useState<"Product" | "Service">("Product")

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
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
        <ScrollArea className="h-full bg-background/50">
            <div className="flex-1 p-8 pt-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col space-y-1 mb-8"
                >
                    <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">Create New Item</h2>
                    <p className="text-muted-foreground">Add products or services to your inventory system.</p>
                </motion.div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-20">

                        {/* 1. Item Type Selector - Premium Cards */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <FormField
                                control={form.control}
                                name="itemType"
                                render={({ field }) => (
                                    <>
                                        <TypeSelectionCard
                                            active={field.value === "Product"}
                                            onClick={() => field.onChange("Product")}
                                            icon={Box}
                                            title="Product"
                                            description="Inventory items, goods, or materials that you stock and sell."
                                            color="emerald"
                                        />
                                        <TypeSelectionCard
                                            active={field.value === "Service"}
                                            onClick={() => field.onChange("Service")}
                                            icon={Wrench}
                                            title="Service"
                                            description="Non-inventory services, consulting, or labor charges."
                                            color="blue"
                                        />
                                    </>
                                )}
                            />
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={itemType}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={containerVariants}
                                className="space-y-8"
                            >
                                {/* 2. Basic Information */}
                                <SectionWrapper title="Basic Information" icon={ShoppingBag}>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <CustomInput
                                            control={form.control}
                                            name="name"
                                            label="Item Name"
                                            placeholder="e.g. Wireless Mouse"
                                            icon={Tag}
                                            required
                                        />
                                        <CustomInput
                                            control={form.control}
                                            name="code"
                                            label="Item Code"
                                            placeholder="Auto-generated"
                                            icon={Hash}
                                            required
                                        />

                                        {itemType === "Product" && (
                                            <>
                                                <CustomInput
                                                    control={form.control}
                                                    name="sku"
                                                    label="SKU"
                                                    placeholder="Stock Keeping Unit"
                                                    icon={Barcode}
                                                    required
                                                />
                                                <div className="space-y-2">
                                                    <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Unit (UOM) *</FormLabel>
                                                    <FormField
                                                        control={form.control}
                                                        name="unit"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20 transition-all">
                                                                            <div className="flex items-center gap-2">
                                                                                <Layers className="size-4 text-muted-foreground" />
                                                                                <SelectValue placeholder="Select Unit" />
                                                                            </div>
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                                                                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                                                        <SelectItem value="box">Box</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </>
                                        )}

                                        <CustomInput
                                            control={form.control}
                                            name={itemType === "Product" ? "hsnCode" : "sacCode"}
                                            label={itemType === "Product" ? "HSN Code" : "SAC Code"}
                                            placeholder="Tax Classification Code"
                                            icon={FileText}
                                            required={itemType === "Product"}
                                        />

                                        <CustomInput
                                            control={form.control}
                                            name="category"
                                            label="Category"
                                            placeholder="Select Category"
                                            icon={Layers}
                                        />
                                    </div>
                                </SectionWrapper>

                                {/* 3. Sales Information */}
                                <SectionWrapper title="Sales Information" icon={Coins}>
                                    <div className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="isSale"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 bg-background/40 p-4 shadow-sm backdrop-blur-sm">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base font-medium">Available for Sale</FormLabel>
                                                        <FormDescription>Enable if this item is sold directly to customers.</FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        {/* Animated Reveal for Sales Fields */}
                                        <AnimatePresence>
                                            {form.watch("isSale") && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="grid gap-6 md:grid-cols-2 overflow-hidden pt-2"
                                                >
                                                    <CustomInput
                                                        control={form.control}
                                                        name="salesPrice"
                                                        label="Sales Price"
                                                        type="number"
                                                        icon={DollarSign}
                                                        required
                                                    />
                                                    <CustomInput
                                                        control={form.control}
                                                        name="salesAccount"
                                                        label="Sales Account"
                                                        placeholder="General Sales"
                                                        icon={Receipt}
                                                    />
                                                    <div className="col-span-2">
                                                        <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Description</FormLabel>
                                                        <FormField
                                                            control={form.control}
                                                            name="salesDescription"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            placeholder="Description for sales orders..."
                                                                            className="resize-none bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20 transition-all min-h-[100px]"
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </SectionWrapper>

                                {/* 4. Purchase Information (Product Only) */}
                                {itemType === "Product" && (
                                    <SectionWrapper title="Purchase Information" icon={Truck}>
                                        <div className="space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="isPurchase"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border/50 bg-background/40 p-4 shadow-sm backdrop-blur-sm">
                                                        <div className="space-y-0.5">
                                                            <FormLabel className="text-base font-medium">Available for Purchase</FormLabel>
                                                            <FormDescription>Enable if this item is procured from vendors.</FormDescription>
                                                        </div>
                                                        <FormControl>
                                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />

                                            <AnimatePresence>
                                                {form.watch("isPurchase") && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="grid gap-6 md:grid-cols-2 overflow-hidden pt-2"
                                                    >
                                                        <CustomInput
                                                            control={form.control}
                                                            name="purchasePrice"
                                                            label="Purchase Price"
                                                            type="number"
                                                            icon={DollarSign}
                                                        />
                                                        <CustomInput
                                                            control={form.control}
                                                            name="purchaseAccount"
                                                            label="Purchase Account"
                                                            placeholder="Cost of Goods Sold"
                                                            icon={Receipt}
                                                        />
                                                        <CustomInput
                                                            control={form.control}
                                                            name="vendor"
                                                            label="Preferred Vendor"
                                                            placeholder="Select Vendor"
                                                            icon={User}
                                                        />
                                                        <div className="col-span-2">
                                                            <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Description</FormLabel>
                                                            <FormField
                                                                control={form.control}
                                                                name="purchaseDescription"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <Textarea
                                                                                placeholder="Description for purchase orders..."
                                                                                className="resize-none bg-background/50 border-input/50 focus:border-primary focus:ring-primary/20 transition-all min-h-[100px]"
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </SectionWrapper>
                                )}

                                {/* 5. Inventory (Product Only) */}
                                {itemType === "Product" && (
                                    <SectionWrapper title="Inventory Tracking" icon={Warehouse}>
                                        <div className="grid gap-6 md:grid-cols-2">
                                            <CustomInput
                                                control={form.control}
                                                name="openingStock"
                                                label="Opening Stock"
                                                type="number"
                                                icon={Box}
                                            />
                                            <CustomInput
                                                control={form.control}
                                                name="warehouse"
                                                label="Default Warehouse"
                                                placeholder="Main Warehouse"
                                                icon={Warehouse}
                                            />
                                        </div>
                                    </SectionWrapper>
                                )}

                            </motion.div>
                        </AnimatePresence>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex justify-end gap-4 sticky bottom-6 z-10"
                        >
                            <div className="glass-adaptive rounded-full p-2 flex gap-4 shadow-2xl">
                                <Button variant="ghost" type="button" className="rounded-full px-6 hover:bg-destructive/10 hover:text-destructive">Cancel</Button>
                                <Button type="submit" className="rounded-full px-8 bg-primary shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                                    Save {itemType}
                                </Button>
                            </div>
                        </motion.div>
                    </form>
                </Form>
            </div>
        </ScrollArea>
    )
}

// --- Helper Components ---

function TypeSelectionCard({ active, onClick, icon: Icon, title, description, color }: {
    active: boolean, onClick: () => void, icon: any, title: string, description: string, color: string
}) {
    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "cursor-pointer relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300",
                active
                    ? `bg-primary/5 border-primary shadow-lg shadow-primary/25`
                    : "bg-background/40 border-border/50 hover:border-primary/30 hover:bg-accent/20"
            )}
        >
            <div className="flex items-start gap-4">
                <div className={cn(
                    "rounded-xl p-3 bg-linear-to-br transition-all duration-300",
                    active ? "from-primary/20 to-primary/10 text-primary" : "from-muted to-muted/50 text-muted-foreground"
                )}>
                    <Icon className="size-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                    <h3 className={cn("font-bold text-lg transition-colors", active ? "text-primary" : "text-foreground")}>
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
            {active && (
                <motion.div
                    layoutId="type-check"
                    className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-1"
                >
                    <Check className="size-4" />
                </motion.div>
            )}
        </motion.div>
    )
}

function SectionWrapper({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) {
    return (
        <motion.div
            variants={itemVariants}
            className="group relative rounded-2xl border border-border/50 bg-background/40 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden"
        >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-border/30">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" />
                    </div>
                    <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
                </div>
                {children}
            </div>
        </motion.div>
    )
}

function CustomInput({ control, name, label, placeholder, icon: Icon, required, type = "text" }: any) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-2 group">
                    <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1 flex items-center gap-1.5 transition-colors group-focus-within:text-primary">
                        {label} {required && <span className="text-destructive">*</span>}
                    </FormLabel>
                    <FormControl>
                        <div className="relative transition-all duration-300">
                            <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/70 transition-colors group-focus-within:text-primary" />
                            <Input
                                {...field}
                                type={type}
                                placeholder={placeholder}
                                className="pl-10 h-11 bg-background/50 border-input/50 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all rounded-lg"
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
