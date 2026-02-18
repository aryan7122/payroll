import { ScrollArea } from "@/components/ui/scroll-area"
import { CreateItems } from "@/components/modules/items/CreateItems"

export default function Page() {
    return (
        <ScrollArea className="h-full">
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50 p-4 flex items-center justify-center text-muted-foreground font-medium">
                        Total Employees: 150
                    </div>
                    <div className="aspect-video rounded-xl bg-muted/50 p-4 flex items-center justify-center text-muted-foreground font-medium">
                        Pending Payroll: Jan 2026
                    </div>
                    <div className="aspect-video rounded-xl bg-muted/50 p-4 flex items-center justify-center text-muted-foreground font-medium">
                        Compliance Due: 15th Feb
                    </div>
                </div>
            </div>
        </ScrollArea >
    )
}
