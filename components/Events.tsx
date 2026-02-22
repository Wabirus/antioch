import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { getUpcomingEvents } from "@/lib/data/events";
import Link from "next/link";

export default async function Events() {
    const events = await getUpcomingEvents(3);

    return (
        <section id="events" className="py-20">
            <div className="container">
                <div className="section-title">
                    <h2>Upcoming Events</h2>
                    <p>Join us for exciting and meaningful gatherings that strengthen our faith community</p>
                </div>
                <div className="events-grid">
                    {events.map((evt, idx) => (
                        <Card key={evt.id} className="event-card group overflow-hidden border-none shadow-soft hover:shadow-large transition-all duration-300">
                            <div className="event-image-wrapper relative h-[220px] overflow-hidden">
                                <img
                                    src={evt.image || '/placeholder.jpg'}
                                    alt={evt.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
