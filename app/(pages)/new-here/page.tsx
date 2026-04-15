import Link from "next/link";
import { Accessibility, Baby, Clock, MapPin, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

const visitHighlights = [
  {
    title: "Warm Welcome",
    description:
      "Greeters and ministry volunteers are available to help you find seating, children check-in, and key locations.",
    icon: Users,
  },
  {
    title: "Clear Service Times",
    description:
      "You should be able to plan your arrival confidently, whether you are coming for Sunday worship or a midweek prayer gathering.",
    icon: Clock,
  },
  {
    title: "Accessible Space",
    description:
      "We want families, older members, and guests with mobility needs to feel considered before they even arrive.",
    icon: Accessibility,
  },
];

export const metadata = {
  title: "Plan a Visit",
  description:
    "Know what to expect when visiting Antioch, including service times, children ministry, and practical details.",
};

export default function NewHerePage() {
  return (
    <div className="bg-gradient-to-b from-white to-slate-50/60">
      <PageHero
        title="Plan Your Visit"
        description="We want your first Sunday to feel clear, calm, and welcoming from the moment you arrive."
      >
        <Button
          size="lg"
          variant="outline"
          className="border-white bg-white/10 text-white hover:bg-white hover:text-primary"
          asChild
        >
          <Link href="/contact">Let Us Know You&apos;re Coming</Link>
        </Button>
      </PageHero>

      <section className="py-16 md:py-20">
        <div className="container grid gap-6 md:grid-cols-3">
          {visitHighlights.map((item) => (
            <Card key={item.title} className="border-slate-200 shadow-soft">
              <CardContent className="p-6">
                <item.icon className="h-10 w-10 text-primary" />
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-4 leading-7 text-slate-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-slate-200 shadow-soft">
            <CardContent className="p-8">
              <MapPin className="h-10 w-10 text-primary" />
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                Where to find us
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                {siteConfig.name}
                <br />
                {siteConfig.location}
              </p>
              <p className="mt-4 leading-7 text-slate-600">
                Contact our team ahead of time if you need directions, accessibility
                assistance, or help connecting your family on arrival.
              </p>
              <Button className="mt-6" asChild>
                <Link href="/contact">Contact the Welcome Team</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-soft">
            <CardContent className="p-8">
              <Baby className="h-10 w-10 text-primary" />
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">
                Families and children
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Children ministry begins at 9:00 AM with a focus on safe, clear
                check-in and age-appropriate Bible teaching.
              </p>
              <ul className="mt-6 space-y-3 text-slate-600">
                <li>Nursery, preschool, and elementary care pathways are clearly signposted.</li>
                <li>First-time families can ask questions before arrival to reduce stress.</li>
                <li>Volunteers help direct guests from parking to the right room quickly.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
