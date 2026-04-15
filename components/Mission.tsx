import Link from "next/link";
import { ArrowRight, HeartHandshake, School, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteSection } from "@/components/site/SiteSection";

const pillars = [
  {
    title: "Biblical Teaching",
    body: "Faithful preaching and discipleship that help people understand Scripture and live it out.",
    icon: School,
  },
  {
    title: "Compassionate Community",
    body: "A church family that prays together, bears one another’s burdens, and welcomes new people warmly.",
    icon: Users,
  },
  {
    title: "Local Outreach",
    body: "Practical service that extends Christ’s love through missions, care, and partnership in our communities.",
    icon: HeartHandshake,
  },
];

export default function Mission() {
  return (
    <SiteSection
      id="about"
      title="A church family rooted in Scripture and open to the community"
      description="Antioch exists to help people know Christ, grow in faith, and serve others with conviction and compassion."
      className="bg-white"
      contentClassName="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
    >
      <div className="rounded-3xl bg-slate-50 p-8 shadow-soft md:p-10">
        <h3 className="text-2xl font-semibold text-slate-950 md:text-3xl">
          We are building a healthy, enduring church presence in Kenya.
        </h3>
        <p className="mt-5 text-base leading-7 text-slate-600">
          Our ministry emphasizes clear Bible teaching, meaningful worship,
          intergenerational fellowship, and care for families. We want every
          guest and member to know where they can belong, grow, and serve.
        </p>
        <p className="mt-4 text-base leading-7 text-slate-600">
          That means creating welcoming first visits, dependable weekly rhythms,
          and ministry pathways that are simple to understand on mobile and desktop.
        </p>
        <Button className="mt-8" asChild>
          <Link href="/about">
            Learn More About Antioch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {pillars.map((pillar) => (
          <article
            key={pillar.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft"
          >
            <pillar.icon className="h-10 w-10 text-primary" strokeWidth={1.7} />
            <h3 className="mt-4 text-xl font-semibold text-slate-950">
              {pillar.title}
            </h3>
            <p className="mt-3 leading-7 text-slate-600">{pillar.body}</p>
          </article>
        ))}
      </div>
    </SiteSection>
  );
}
