import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { getUpcomingEvents } from "@/lib/data/events";
import Link from "next/link";

export default async function Events() {
    const events = await getUpcomingEvents(3);

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
                                    src={evt.image || '/placeholder.jpg'}
                                    alt={evt.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-medium">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span className="font-semibold text-sm text-secondary">{new Date(evt.startTime).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <CardContent className="p-6 flex flex-col items-start h-full pb-10">
                                <h3 className="mb-3 text-xl font-semibold group-hover:text-primary transition-colors">{evt.title}</h3>
                                <p className="mb-5 text-muted-foreground leading-relaxed line-clamp-2">{evt.description}</p>
                                <Button className="w-full shadow-soft hover:shadow-medium transition-smooth mt-auto" asChild>
                                    <Link href={evt.actionUrl || "/events"}>{evt.actionLabel || "Details"}</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
