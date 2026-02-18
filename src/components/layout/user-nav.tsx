"use client"

import {
    LogOut,
    Settings,
    BookOpen,
    Moon,
    Sun,
    Monitor,
    Check,
    Palette,
    Bell
} from "lucide-react"
import { useTheme } from "next-themes"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function UserNav() {
    const { theme, setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-11 w-11 rounded-full ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/10 hover:ring-indigo-500/40 transition-all p-0 cursor-pointer">
                    <Avatar className="h-11 w-11 border-2 border-zinc-950">
                        <AvatarImage src="/avatars/cs-logo.png" alt="Codesquarry" />
                        <AvatarFallback className="bg-indigo-600/10 text-indigo-400 font-bold text-sm">CQ</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 border-2 border-zinc-950 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 mt-2 bg-popover/80 backdrop-blur-xl border-border p-2 shadow-2xl" align="end" forceMount>
                <DropdownMenuLabel className="font-normal p-2">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage src="" alt="@aryan" />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">CQ</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-0.5">
                            <p className="text-sm font-bold tracking-tight text-foreground">Codesquarry</p>
                            <p className="text-[10px] font-medium text-primary tracking-widest uppercase">Administrator</p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuGroup className="p-1">
                    <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary cursor-pointer rounded-md h-9 px-2 gap-3 transition-colors duration-200">
                        <Settings className="size-4 opacity-70" />
                        <span className="text-[13px] font-medium">Settings</span>
                        <DropdownMenuShortcut className="text-[10px] opacity-50 font-mono">⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-primary/10 focus:text-primary cursor-pointer rounded-md h-9 px-2 gap-3 transition-colors duration-200">
                        <BookOpen className="size-4 opacity-70" />
                        <span className="text-[13px] font-medium">Documentation</span>
                        <DropdownMenuShortcut className="text-[10px] opacity-50 font-mono">⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger className="focus:bg-primary/10 focus:text-primary cursor-pointer rounded-md h-9 px-2 gap-3 data-[state=open]:bg-primary/10 transition-colors duration-200">
                            <Palette className="size-4 opacity-70" />
                            <span className="text-[13px] font-medium">Appearance</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className="bg-popover/80 backdrop-blur-xl border-border p-1.5 shadow-2xl ml-1">
                                <DropdownMenuItem
                                    onClick={() => setTheme("light")}
                                    className="focus:bg-primary/10 focus:text-primary cursor-pointer rounded-md h-8 px-2 flex items-center justify-between"
                                >
                                    <div className="flex items-center">
                                        <Sun className="mr-2 h-3.5 w-3.5" />
                                        <span className="text-[12px]">Light</span>
                                    </div>
                                    {theme === "light" && <Check className="h-3.5 w-3.5 text-indigo-400" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setTheme("dark")}
                                    className="focus:bg-white/10 focus:text-white cursor-pointer rounded-md h-8 px-2 flex items-center justify-between"
                                >
                                    <div className="flex items-center">
                                        <Moon className="mr-2 h-3.5 w-3.5" />
                                        <span className="text-[12px]">Dark</span>
                                    </div>
                                    {theme === "dark" && <Check className="h-3.5 w-3.5 text-indigo-400" />}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setTheme("system")}
                                    className="focus:bg-white/10 focus:text-white cursor-pointer rounded-md h-8 px-2 flex items-center justify-between"
                                >
                                    <div className="flex items-center">
                                        <Monitor className="mr-2 h-3.5 w-3.5" />
                                        <span className="text-[12px]">System</span>
                                    </div>
                                    {theme === "system" && <Check className="h-3.5 w-3.5 text-indigo-400" />}
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-white/5 my-2" />
                <DropdownMenuItem className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer group text-red-400/80 rounded-lg h-9 px-3">
                    <LogOut className="mr-2 h-4 w-4 transition-colors" />
                    <span className="text-[13px] font-semibold">Log out</span>
                    <DropdownMenuShortcut className="text-[10px] opacity-40">⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
