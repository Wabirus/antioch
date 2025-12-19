'use client';

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export default function FeaturedSermon() {
    return (
        <section id="sermons" className="bg-gradient-to-b from-white to-slate-50/50 py-20">
            <div className="container">
                <div className="section-title">
                    <h2>Featured Sermon</h2>
                    <p>Dive into our latest sermon that inspires and challenges our faith community</p>
                </div>
                <div className="sermon-container max-w-6xl mx-auto">
                    <div className="sermon-video-wrapper">
                        <div className="sermon-video">
                            <iframe
                                src="https://www.youtube.com/embed/G0BppDtl3_Q"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full aspect-video rounded-xl"
                            ></iframe>
                        </div>
                    </div>
                    <div className="sermon-content mt-10 text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <PlayCircle className="w-5 h-5 text-primary" />
                            <span className="text-sm font-semibold text-primary uppercase tracking-wide">Latest Message</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl mb-4">The Power of Prayer</h3>
                        <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                            In this sermon, we explore how prayer transforms our spiritual lives and draws us closer to God.
                        </p>
                        <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                            Discover practical insights on developing a consistent prayer life and experiencing God's presence in your daily walk.
                        </p>
                        <Button size="lg" className="shadow-medium hover:shadow-large transition-smooth" asChild>
                            <a href="#" onClick={(e) => e.preventDefault()}>View All Sermons</a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
