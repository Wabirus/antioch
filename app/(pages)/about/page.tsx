import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const values = [
  {
    title: "Biblical Faithfulness",
    body: "We want preaching, teaching, and ministry decisions to stay anchored in Scripture rather than trends.",
  },
  {
    title: "Welcoming Community",
    body: "Guests should encounter a church that is warm, organized, and clear about how to take a next step.",
  },
  {
    title: "Generous Service",
    body: "Our life together includes care for families, outreach, prayer, and practical acts of compassion.",
  },
];

export const metadata = {
  title: "About",
  description:
    "Learn about Antioch’s mission, values, and commitment to Bible-centered ministry in Kenya.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/60">
      <PageHero
        title="About Antioch"
        description="We are a Christ-centered church family committed to faithful teaching, prayer, and compassionate ministry in Kenya."
        gradient="blue"
      />

      <section className="py-16 md:py-20">
        <div className="container grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[1.75rem] bg-white p-8 shadow-soft md:p-10">
            <h2 className="text-3xl font-semibold text-slate-950">
              A church website should make the mission visible.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Antioch exists to help people know Christ, grow through Scripture,
              belong in community, and serve others faithfully. The public-facing
              experience should communicate that mission clearly on every page.
            </p>
            <p className="mt-4 leading-7 text-slate-600">
              This refactored structure centers the core questions guests usually
              have first: who you are, when to come, what is happening, and how to
              get in touch.
            </p>
            <Button className="mt-8" asChild>
              <Link href="/leadership">Meet the Leadership Team</Link>
            </Button>
          </div>

          <div className="grid gap-4">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-soft"
              >
                <h2 className="text-2xl font-semibold text-slate-950">{value.title}</h2>
                <p className="mt-3 leading-7 text-slate-600">{value.body}</p>
              </article>
            ))}
            <article className="rounded-[1.5rem] bg-slate-950 p-6 text-white shadow-soft">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-200">
                Contact
              </p>
              <p className="mt-4 leading-7 text-slate-300">
                {siteConfig.location}
                <br />
                {siteConfig.email}
                <br />
                {siteConfig.phone}
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
