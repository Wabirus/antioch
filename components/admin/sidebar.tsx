"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Calendar,
    Video,
    Users,
    Briefcase,
    LogOut,
    Settings,
} from "lucide-react";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Events",
        href: "/admin/events",
        icon: Calendar,
    },
    {
        title: "Sermons",
        href: "/admin/sermons",
        icon: Video,
    },
    {
        title: "Ministries",
        href: "/admin/ministries",
        icon: Users,
    },
    {
        title: "Staff",
        href: "/admin/staff",
        icon: Briefcase,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full border-r bg-card text-card-foreground w-64">
            <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-primary">Antioch Admin</h2>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-muted font-medium text-sm",
                            pathname === item.href
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "text-muted-foreground"
                        )}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.title}
                    </Link>
                ))}
            </nav>
            <div className="p-4 border-t space-y-2">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors hover:bg-muted text-muted-foreground font-medium text-sm">
                    <Settings className="h-5 w-5" />
                    Settings
                </button>
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors hover:bg-destructive/10 text-destructive font-medium text-sm">
                    <LogOut className="h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
