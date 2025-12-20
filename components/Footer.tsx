'use client';

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="footer-enhanced">
            <div className="footer-divider" />
            <div className="container py-16">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3 className="text-white mb-5 text-2xl">Antioch Baptist</h3>
                        <p className="text-white/90 leading-relaxed mb-6">
                            A Christ-centered church network focused on Bible-based teaching, missions, and community service in Kenya.
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
                            <li><a href="/" className="footer-link">Home</a></li>
                            <li><a href="/#about" className="footer-link">About Us</a></li>
                            <li><Link href="/ministries" className="hover:text-white transition-colors">Ministries</Link></li>
                            <li><Link href="/leadership" className="hover:text-white transition-colors">Leadership</Link></li>
                            <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
                            <li><a href="/sermons" className="footer-link">Sermons</a></li>
                            <li><Link href="/prayer" className="hover:text-white transition-colors">Prayer Request</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3 className="text-white mb-5 text-xl">Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-white/80">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                                <span>Karatina, Kenya</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/80">
                                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                                <span>+254 700 000 000</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/80">
                                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                                <span>info@antiochbaptist.ke</span>
                            </li>
                            <li className="flex items-start gap-3 text-white/80">
                                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
                                <span>Sunday Service: 10:00 AM</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2025 Antioch Independent Baptist Churches of Kenya. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
