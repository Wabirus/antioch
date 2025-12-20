'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    Menu, X, Search, User, Heart, Users, Calendar,
    MapPin, Video, HandHeart, Sparkles, BookOpen, ShoppingBag, Info
} from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const sidebarItems = {
        involved: [
            { label: 'Visit Antioch', sub: 'Find a location near you', icon: MapPin, href: '/new-here' },
            { label: 'Live Streams', sub: 'Join us from anywhere', icon: Video, href: '/#live' },
            { label: 'Ministries', sub: 'Relationships to grow your faith', icon: Users, href: '/ministries' },
            { label: 'Giving', sub: 'Generosity in action', icon: Heart, href: '/give' },
            { label: 'Volunteer', sub: 'Serve at your local campus', icon: HandHeart, href: '/ministries' }, // Using ministries as proxy for volunteer
            { label: 'Events', sub: 'Meaningful experiences', icon: Calendar, href: '/events' },
            { label: 'Need Prayer?', sub: 'Support through faith', icon: Sparkles, href: '/prayer' },
        ],
        discover: [
            { label: 'Sermons', icon: BookOpen, href: '/sermons' },
            { label: 'Leadership', icon: Info, href: '/leadership' },
        ]
    };

    return (
        <>
            <header className={cn(
                "fixed w-full top-0 z-[100] transition-all duration-300 border-b",
                isScrolled || isOpen
                    ? "bg-white py-2 shadow-sm border-gray-100"
                    : "bg-white py-3 border-gray-100"
            )}>
                {/* Centered Container - max-w-7xl matches standard Tailwind container or custom variable */}
                <div className="mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between h-12 md:h-14">

                    {/* LEFT: Hamburger + Logo */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="p-1 text-slate-700 hover:text-black transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>

                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-8 h-8 md:w-10 md:h-10">
                                <Image
                                    src="/images/antioch-logo.png"
                                    alt="Antioch Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="font-bold text-lg md:text-xl tracking-tighter text-slate-900 hidden md:block">
                                ANTIOCH
                            </span>
                        </Link>
                    </div>

                    {/* CENTER: Search Bar (Hidden on small mobile) */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-medium text-slate-600 placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    {/* RIGHT: Navigation Links + User */}
                    <div className="flex items-center gap-6">
                        {/* Desktop Links */}
                        <nav className="hidden lg:flex items-center gap-6 font-semibold text-sm text-slate-700">
                            <Link href="/give" className="hover:text-black transition-colors">Give</Link>
                            <Link href="/ministries" className="hover:text-black transition-colors">Groups</Link>
                            <Link href="/ministries" className="hover:text-black transition-colors">Serve</Link>
                            <Link href="/events" className="hover:text-black transition-colors">Events</Link>
                            <Link href="/leadership" className="hover:text-black transition-colors">About</Link>
                        </nav>

                        {/* Mobile Search Trigger (visible only on small screens) */}
                        <button className="md:hidden text-slate-700">
                            <Search size={20} />
                        </button>

                        {/* User Profile Icon */}
                        <button className="text-slate-500 hover:text-slate-900 transition-colors bg-slate-100 p-2 rounded-full">
                            <User size={20} className="fill-slate-300" />
                        </button>
                    </div>
                </div>
            </header>

            {/* SIDEBAR DRAWER (Left Slide-out) */}
            {/* Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-[150] transition-opacity duration-300 backdrop-blur-sm",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div className={cn(
                "fixed left-0 top-0 h-full w-[300px] sm:w-[350px] bg-white z-[160] shadow-2xl transition-transform duration-300 ease-out overflow-y-auto",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="p-6">
                    {/* Header of Drawer */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Get Involved</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X size={20} className="text-slate-500" />
                        </button>
                    </div>

                    {/* Navigation Groups */}
                    <div className="space-y-8">
                        {/* Get Involved Section */}
                        <div className="space-y-4">
                            {sidebarItems.involved.map((item, idx) => (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-start gap-4 p-2 rounded-lg hover:bg-slate-50 group transition-colors"
                                >
                                    <item.icon className="w-5 h-5 text-slate-400 group-hover:text-primary mt-1 transition-colors" />
                                    <div>
                                        <div className="font-semibold text-slate-800 text-sm group-hover:text-black">{item.label}</div>
                                        <div className="text-xs text-slate-500 font-medium">{item.sub}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="h-px bg-slate-100 w-full" />

                        {/* Discover Section */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4 px-2">Discover</h3>
                            <div className="space-y-2">
                                {sidebarItems.discover.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-50 group transition-colors"
                                    >
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                                        <div className="font-semibold text-slate-800 text-sm">{item.label}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
