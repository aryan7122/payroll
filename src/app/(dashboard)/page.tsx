"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import {
    Users,
    ArrowUpRight,
    CreditCard,
    DollarSign,
    Package,
    TrendingUp,
    Clock,
    ShieldCheck,
    Warehouse
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
    {
        title: "Total Revenue",
        value: "₹1,20,500",
        change: "+12.5%",
        icon: DollarSign,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    },
    {
        title: "Active Customers",
        value: "2,543",
        change: "+18%",
        icon: Users,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "Inventory Value",
        value: "₹4,85,000",
        change: "-2.4%",
        icon: Package,
        color: "text-orange-500",
        bg: "bg-orange-500/10"
    },
    {
        title: "Pending Invoices",
        value: "₹28,400",
        change: "4 Drafts",
        icon: CreditCard,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    }
]

export default function Page() {
    return (
        <ScrollArea className="h-full bg-[#09090b]">
            <div className="flex flex-1 flex-col gap-8 p-8 max-w-7xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-1"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
                    <p className="text-muted-foreground font-medium">Welcome back, here's what's happening with your accounts today.</p>
                </motion.div>

                {/* Main Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-dark rounded-3xl p-6 flex flex-col justify-between hover:border-white/20 transition-all cursor-default group"
                        >
                            <div className="flex items-center justify-between">
                                <div className={cn("p-3 rounded-2xl", stat.bg)}>
                                    <stat.icon className={cn("size-5", stat.color)} />
                                </div>
                                <div className="p-1 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="size-4 text-white" />
                                </div>
                            </div>
                            <div className="mt-6">
                                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                    <span className={cn("text-xs font-bold", stat.change.startsWith("+") ? "text-emerald-500" : "text-orange-500")}>
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Larger Bento Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-3 glass-dark rounded-3xl p-8 min-h-[400px] relative overflow-hidden group"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-xl font-bold text-white">Revenue Growth</h3>
                                <p className="text-sm text-muted-foreground">Monthly performance analysis</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 text-xs font-bold flex items-center gap-1">
                                    <TrendingUp className="size-3" />
                                    Live
                                </span>
                            </div>
                        </div>

                        {/* Placeholder for Chart */}
                        <div className="w-full h-[250px] flex items-end gap-2 px-2">
                            {[40, 70, 45, 90, 65, 80, 50, 85, 95, 75, 60, 85].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 0.5 + (i * 0.05), duration: 1 }}
                                    className="flex-1 bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-colors relative group/bar"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded transition-opacity">
                                        ₹{h}k
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="lg:col-span-1 glass-dark rounded-3xl p-8 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-white">Recent Activities</h3>
                            <p className="text-sm text-muted-foreground mt-1">Updates from your team</p>
                        </div>

                        <div className="flex flex-col gap-6 mt-8">
                            {[
                                { user: "AR", task: "Generated Invoice #842", time: "2m ago", icon: Clock },
                                { user: "JD", task: "Added new warehouse", time: "45m ago", icon: Warehouse },
                                { user: "MK", task: "Verified tax filings", time: "2h ago", icon: ShieldCheck },
                            ].map((activity, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                                        {activity.user}
                                    </div>
                                    <div className="grid gap-0.5">
                                        <p className="text-xs font-semibold text-white">{activity.task}</p>
                                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                            <activity.icon className="size-3" />
                                            {activity.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-8 py-3 rounded-2xl bg-white text-black font-bold text-sm hover:opacity-90 transition-opacity">
                            View All Logs
                        </button>
                    </motion.div>
                </div>
            </div>
        </ScrollArea>
    )
}
