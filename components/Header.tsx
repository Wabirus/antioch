'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeHash, setActiveHash] = useState('home');

    useEffect(() => {
        // Header scroll effect
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Active link highlight using IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHash(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px 0px 0px',
                threshold: 0.2,
            }
        );

        const sections = document.querySelectorAll('section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            setIsOpen(false);
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'ministries', label: 'Ministries' },
        { id: 'events', label: 'Events' },
        { id: 'sermons', label: 'Sermons' },
        { id: 'live', label: 'Live Streams' },
        { id: 'contact', label: 'Contact' },
    ];

    return (
        <header className={cn(
            "bg-white/95 backdrop-blur-md fixed w-full top-0 z-[1000] transition-all duration-300 border-b",
            isScrolled
                ? "py-3 shadow-medium border-border/40"
                : "py-4 shadow-soft border-transparent"
        )}>
            <div className="container header-container">
                <div className="logo">
                    <div className="logo-container">
                        <Image
                            src="/images/antioch-logo.png"
                            alt="Antioch Baptist Church Logo"
                            width={80}
                            height={80}
                            className="logo-img"
                            priority
                        />
                        <div className="logo-text">
                            <h1 className="church-name">Antioch Independent Baptist Churches of Kenya</h1>
                        </div>
                    </div>
                </div>

                {/* Mobile toggle button */}
                <button
                    className="nav-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Navigation */}
                <nav>
                    <ul id="navMenu" className={isOpen ? 'show' : ''}>
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={cn(
                                        "nav-link transition-smooth",
                                        activeHash === item.id && "nav-link-active"
                                    )}
                                    onClick={(e) => scrollToSection(e, item.id)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        <li className="nav-donate-item">
                            <Button variant="default" size="sm" className="shadow-soft hover:shadow-medium transition-smooth" asChild>
                                <a href="#donate" onClick={(e) => e.preventDefault()}>Giving</a>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
