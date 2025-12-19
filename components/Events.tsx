'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

export default function Events() {
    const events = [
        {
            title: "Family Fun Day",
            date: "March 15, 2025",
            img: "https://source.unsplash.com/random/600x400/?family,kenya",
            desc: "Join us for a day filled with fun activities, games, and fellowship. Bring your family and enjoy a wonderful time together!",
            action: "Details"
        },
        {
            title: "Youth Camp 2025",
            date: "April 10-14, 2025",
            img: "https://source.unsplash.com/random/600x400/?youth,kenya",
            desc: "Sign up for our annual youth camp where young hearts can grow in faith and friendship through engaging activities and teachings.",
            action: "Sign Up"
        },
        {
            title: "Community Service Day",
            date: "May 1, 2025",
            img: "https://source.unsplash.com/random/600x400/?service,kenya",
            desc: "Join us as we reach out to vulnerable families in our community, providing assistance and support to those in need.",
            action: "Volunteer"
        }
    ];

    return (
        <section id="events" className="py-20">
            <div className="container">
                <div className="section-title">
                    <h2>Upcoming Events</h2>
                    <p>Join us for exciting and meaningful gatherings that strengthen our faith community</p>
                </div>
                <div className="events-grid">
                    {events.map((evt, idx) => (
                        <Card key={idx} className="event-card group overflow-hidden border-none shadow-soft hover:shadow-large transition-all duration-300">
                            <div className="event-image-wrapper relative h-[220px] overflow-hidden">
                                <img
                                    src={evt.img}
                                    alt={evt.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-medium">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span className="font-semibold text-sm text-secondary">{evt.date}</span>
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="mb-3 text-xl font-semibold group-hover:text-primary transition-colors">{evt.title}</h3>
                                <p className="mb-5 text-muted-foreground leading-relaxed">{evt.desc}</p>
                                <Button className="w-full shadow-soft hover:shadow-medium transition-smooth" asChild>
                                    <a href="#" onClick={(e) => e.preventDefault()}>{evt.action}</a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
