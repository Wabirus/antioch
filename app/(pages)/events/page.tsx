import { PageHero } from "@/components/ui/PageHero";
import { getEvents } from "@/app/actions/events";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, ArrowRight, Calendar as CalendarIcon } from "lucide-react";

export const metadata = {
    title: "Events | Antioch Independent Baptist Churches of Kenya",
    description: "Stay up to date with what's happening at Antioch. Join us for upcoming services, conferences, and community events.",
};

export default async function EventsPage() {
    const result = await getEvents();
    const dbEvents = result.success ? result.data : [];

    // Map DB events to UI structure and Group by month
    const eventsByMonth = (dbEvents || []).reduce((acc, event) => {
        const date = new Date(event.startTime);
        const month = date.toLocaleString('default', { month: 'long' }); // e.g., "March"

        // Enhance event object for UI display
        const uiEvent = {
            ...event,
            img: event.image,
            desc: event.description,
            action: event.actionLabel || "Details",
            displayDate: date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
            displayTime: event.startTime ? new Date(event.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : undefined,
            displayDay: date.getDate(),
            shortMonth: date.toLocaleString('default', { month: 'short' }),
        };

        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(uiEvent);
        return acc;
    }, {} as Record<string, any[]>);

    const months = Object.keys(eventsByMonth);

    return (
        <div className="bg-gradient-to-b from-white to-slate-50/50 min-h-screen">
            {/* Hero Section */}
            <PageHero
                title="Events Calendar"
                description="Connect, grow, and serve with us. See what's coming up in the life of our church."
                gradient="blue"
            />

            {/* Main Content */}
            <section className="py-20">
                <div className="container max-w-5xl mx-auto">

                    {months.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-xl border">
                            <h3 className="text-lg font-medium text-muted-foreground">No upcoming events scheduled at this time.</h3>
                        </div>
                    ) : (
                        months.map((month) => (
                            <div key={month} className="mb-16 last:mb-0">
                                <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
                                    <span className="bg-primary/10 text-primary px-4 py-2 rounded-lg">{month}</span>
                                    <span className="h-px flex-1 bg-border bg-slate-200"></span>
                                </h2>

                                <div className="space-y-6">
                                    {eventsByMonth[month].map((event) => (
                                        <div key={event.id} className="group bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
                                            {/* Date Block (Desktop) */}
                                            <div className="hidden md:flex flex-col items-center justify-center w-32 bg-slate-50 border-r border-slate-100 p-6 text-center">
                                                <span className="text-sm font-bold text-muted-foreground uppercase">{event.shortMonth}</span>
                                                <span className="text-3xl font-bold text-secondary my-1">{event.displayDay}</span>
                                            </div>

                                            {/* Image (Mobile) / Thumbnail (Desktop) */}
                                            <div className="md:w-64 h-48 md:h-auto relative">
                                                <img
                                                    src={event.img || "/placeholder.jpg"}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute top-2 right-2 md:hidden">
                                                    <span className="bg-white/90 text-primary text-xs font-bold px-2 py-1 rounded shadow-sm">
                                                        {event.displayDate}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 p-6 flex flex-col justify-center">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <span className="inline-block text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                                                            {event.category || "General"}
                                                        </span>
                                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{event.title}</h3>
                                                    </div>
                                                </div>

                                                <p className="text-muted-foreground mb-4 line-clamp-2">
                                                    {event.desc}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-auto">
                                                    {event.displayTime && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-4 h-4" />
                                                            <span>{event.displayTime}</span>
                                                        </div>
                                                    )}
                                                    {event.location && (
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin className="w-4 h-4" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-slate-100">
                                                <Button variant="ghost" className="group-hover:translate-x-1 transition-transform" asChild>
                                                    <a href={event.actionUrl || "#"}>
                                                        {event.action} <ArrowRight className="ml-2 w-4 h-4" />
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )))}

                </div>
            </section>

            {/* Calendar Subscription */}
            <section className="py-16 bg-slate-900 text-white">
                <div className="container text-center">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-6 text-accent opacity-80" />
                    <h2 className="text-3xl font-bold mb-4">Never Miss an Event</h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                        Subscribe to our digital calendar to get reminders for all upcoming services and events directly on your phone.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100">
                            Add to Google Calendar
                        </Button>
                        <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                            Add to Apple Calendar
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
