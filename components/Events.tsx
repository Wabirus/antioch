'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { getUpcomingEvents } from "@/lib/data/events";

export default function Events() {
    const events = getUpcomingEvents();

    return (
        <section id="events" className="py-16 md:py-20 lg:py-24 px-4 md:px-0">
            <div className="container mx-auto max-w-7xl">
                <div className="section-title mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">Upcoming Events</h2>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl">Join us for exciting and meaningful gatherings that strengthen our faith community</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {events.map((evt) => (
                        <Card 
                            key={evt.id} 
                            className="event-card group flex flex-col overflow-hidden border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-lg"
                        >
                            {/* Image Container - Responsive Height */}
                            <div className="relative overflow-hidden bg-gray-100 h-48 md:h-56 lg:h-64">
                                <img
                                    src={evt.img}
                                    alt={evt.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* Date Badge - Minimalistic */}
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-md shadow-sm">
                                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                                    <span className="text-xs md:text-sm font-medium text-gray-900">{evt.date}</span>
                                </div>
                            </div>

                            {/* Content Container */}
                            <CardContent className="flex-1 flex flex-col p-5 md:p-6">
                                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                    {evt.title}
                                </h3>
                                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 flex-grow line-clamp-2 md:line-clamp-3">
                                    {evt.desc}
                                </p>
                                <Button 
                                    className="w-full text-sm md:text-base py-2 md:py-2.5 transition-all" 
                                    asChild
                                >
                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                        {evt.action}
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
