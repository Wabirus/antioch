import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#15355f_45%,#15a4e2_100%)] pt-32 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_35%)]" />
      <div className="container relative z-10 pb-20 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-sky-100">
              Welcome to Antioch
            </p>
            <h1 className="text-balance text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Bible-centered worship, prayer, and community for every season of life.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-sky-50/90 md:text-xl">
              {siteConfig.description} Join us in person in {siteConfig.location} or
              online for worship, discipleship, and compassionate service.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-slate-950 hover:bg-slate-100"
                asChild
              >
                <Link href="/new-here">Plan Your Visit</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/60 bg-white/10 text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link href={siteConfig.livestreamPath}>Watch Live</Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur">
            {siteConfig.serviceTimes.map((service) => (
              <div
                key={service.name}
                className="rounded-2xl border border-white/10 bg-slate-950/20 p-5"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-sky-100/80">
                  {service.name}
                </p>
                <p className="mt-2 text-2xl font-semibold">{service.time}</p>
                <p className="mt-2 text-sm leading-6 text-sky-50/80">
                  {service.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
