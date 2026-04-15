'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Menu, X, Search, User, ChevronDown } from 'lucide-react';

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

    const mainNav = siteConfig.nav.main;
    const actionNav = siteConfig.nav.actions;

    return (
        <>
            <header className={cn(
                "fixed w-full top-0 z-[100] transition-all duration-300 border-b",
                isScrolled || isOpen
                    ? "bg-white py-2 shadow-sm border-gray-100"
                    : "bg-white py-3 border-gray-100"
            )}>
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
                                    sizes="40px"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <span className="font-bold text-lg md:text-xl tracking-tighter text-slate-900 hidden md:block">
                                ANTIOCH
                            </span>
                        </Link>
                    </div>

                    {/* CENTER: Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8">
                        <div className="relative w-full group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search pages"
                                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-medium text-slate-600 placeholder:text-slate-400"
                                aria-label="Search pages"
                            />
                        </div>
                    </div>

                    {/* RIGHT: Navigation Links + Login */}
                    <div className="flex items-center gap-6">
                        {/* Desktop Links */}
                        <nav className="hidden lg:flex items-center gap-6 font-semibold text-sm text-slate-700">
                            {mainNav.slice(1).map((item) => (
                                <div key={item.label} className="relative group">
                                    <Link href={item.href} className="inline-flex items-center gap-1 hover:text-black transition-colors">
                                        {item.label}
                                        {item.children ? (
                                            <ChevronDown className="h-3 w-3 text-slate-500 transition-transform duration-200 group-hover:-rotate-180" />
                                        ) : null}
                                    </Link>

                                    {item.children ? (
                                        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-full z-50 mt-2 min-w-[220px] rounded-3xl border border-slate-200 bg-white p-2 shadow-soft transition-all duration-200">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block rounded-2xl px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </nav>

                        {/* Mobile Search Trigger */}
                        <button className="md:hidden text-slate-700">
                            <Search size={20} />
                        </button>

                        {/* Staff Login Icon — links to admin login */}
                        <Link
                            href="/admin/login"
                            className="text-slate-500 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 p-2 rounded-full"
                            title="Staff Login"
                            aria-label="Staff login"
                        >
                            <User size={20} className="fill-slate-300" />
                        </Link>
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
                <div className="p-6 flex flex-col h-full">
                    {/* Header of Drawer */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Explore Antioch</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <X size={20} className="text-slate-500" />
                        </button>
                    </div>

                    {/* Navigation Groups */}
                    <div className="space-y-8 flex-1">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4 px-2">Explore</h3>
                            <div className="space-y-2">
                                {mainNav.map((item, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                        {item.children?.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                onClick={() => setIsOpen(false)}
                                                className="block rounded-lg px-6 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-slate-100 w-full" />

                        <div>
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4 px-2">Quick Actions</h3>
                            <div className="space-y-2">
                                {actionNav.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Staff Portal — bottom of drawer */}
                    <div className="mt-8 pt-5 border-t border-slate-100">
                        <Link
                            href="/admin/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-2 py-2.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors group"
                        >
                            <User className="w-4 h-4 group-hover:text-primary transition-colors" />
                            <span className="text-sm font-medium">Staff Portal</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
