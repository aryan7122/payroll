"use client"

import { motion } from "framer-motion"
import { Construction, Rocket, Timer } from "lucide-react"

export default function ComingSoon({ title = "Coming Soon" }: { title?: string }) {
    return (
        <div className="flex flex-1 items-center justify-center p-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-dark max-w-md w-full p-12 rounded-[2.5rem] flex flex-col items-center text-center gap-6 border-white/5 shadow-2xl relative overflow-hidden group"
            >
                {/* Decorative Glow */}
                <div className="absolute -top-24 -right-24 size-48 bg-indigo-600/20 blur-[80px] rounded-full group-hover:bg-indigo-600/30 transition-colors duration-500" />
                <div className="absolute -bottom-24 -left-24 size-48 bg-emerald-600/10 blur-[80px] rounded-full group-hover:bg-emerald-600/20 transition-colors duration-500" />

                <div className="size-20 rounded-3xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 shadow-inner">
                    <Construction className="size-10 animate-bounce" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
                    <p className="text-muted-foreground text-sm font-medium px-4">
                        We're currently building this feature. It'll be ready for you very soon!
                    </p>
                </div>

                <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                        <Timer className="size-3" />
                        In Progress
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/10 text-[11px] font-bold text-emerald-500 uppercase tracking-widest">
                        <Rocket className="size-3" />
                        Phase 2
                    </div>
                </div>

                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                    <motion.div
                        initial={{ width: "30%" }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="h-full bg-indigo-600 rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    )
}
