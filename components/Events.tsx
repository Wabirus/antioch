import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteSection } from "@/components/site/SiteSection";
import { getUpcomingEvents } from "@/lib/data/events";

export default async function Events() {
  const events = await getUpcomingEvents(3);

  return (
    <SiteSection
      id="events"
      title="Upcoming events worth planning around"
      description="Featured events help the homepage stay useful and current instead of turning into a static flyer."
      className="bg-white"
      contentClassName="grid gap-6 lg:grid-cols-3"
    >
      {events.map((event) => (
        <Card
          key={event.id}
          className="group overflow-hidden border-slate-200 shadow-soft transition hover:-translate-y-1 hover:shadow-medium"
        >
          <div className="relative h-56 bg-slate-100">
            <Image
              src={event.image || "/images/antioch.jpeg"}
              alt={event.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Calendar className="h-4 w-4" />
              <span>{new Date(event.startTime).toLocaleDateString()}</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-slate-950">
              {event.title}
            </h3>
            <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
              {event.description}
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
            <Button className="mt-6 w-full" asChild>
              <Link href={event.actionUrl || "/events"}>
                {event.actionLabel || "View Event"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </SiteSection>
  );
}
