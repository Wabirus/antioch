import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/data/events";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events",
  description:
    "Stay up to date with worship gatherings, prayer meetings, and community events at Antioch.",
};

export default async function EventsPage() {
  const events = await getAllEvents();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/60">
      <PageHero
        title="Events Calendar"
        description="Plan ahead for church gatherings, discipleship opportunities, and community events."
        gradient="blue"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-5xl space-y-6">
          {events.map((event) => (
            <article
              key={event.id}
              className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft md:grid md:grid-cols-[260px_1fr]"
            >
              <div className="relative min-h-64 bg-slate-100">
                <Image
                  src={event.image || "/images/antioch.jpeg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 260px, 100vw"
                />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                  {event.category || "Church Event"}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  {event.title}
                </h2>
                <p className="mt-4 leading-7 text-slate-600">{event.description}</p>
                <div className="mt-6 grid gap-3 text-sm text-slate-500 md:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{new Date(event.startTime).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>
                      {new Date(event.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <Button className="mt-8" asChild>
                  <Link href={event.actionUrl || "/contact"}>
                    {event.actionLabel || "Ask About This Event"}
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
