'use client';

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function Footer() {
    return (
        <footer className="footer-enhanced">
            <div className="footer-divider" />
            <div className="container py-16">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3 className="text-white mb-5 text-2xl">{siteConfig.shortName}</h3>
                        <p className="text-white/90 leading-relaxed mb-6">
                            {siteConfig.description}
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()} className="social-icon">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="Twitter" onClick={(e) => e.preventDefault()} className="social-icon">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="YouTube" onClick={(e) => e.preventDefault()} className="social-icon">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()} className="social-icon">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div className="footer-column">
                        <h3 className="text-white mb-5 text-xl">Quick Links</h3>
                        <ul className="space-y-3">
                            {siteConfig.primaryNav.concat(siteConfig.secondaryNav).map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="hover:text-white transition-colors">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3 className="text-white mb-5 text-xl">Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-white/80">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                                <span>{siteConfig.location}</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/80">
                                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                                <span>{siteConfig.phone}</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/80">
                                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                                <span>{siteConfig.email}</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/80">
                                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                                <span>Sunday Service: 10:00 AM</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2026 {siteConfig.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
