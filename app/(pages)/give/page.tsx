import Link from "next/link";
import { CreditCard, Globe, Heart, RefreshCw, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const givingOptions = [
  {
    title: "One-Time Gift",
    description: "Support the general ministry fund or a specific church need.",
    icon: Heart,
  },
  {
    title: "Recurring Giving",
    description: "Set up a regular rhythm of generosity for ongoing ministry work.",
    icon: RefreshCw,
  },
  {
    title: "Missions & Projects",
    description: "Direct support toward outreach, church planting, and special initiatives.",
    icon: Globe,
  },
];

export const metadata = {
  title: "Giving",
  description:
    "Support the mission of Antioch through secure and intentional generosity.",
};

export default function GivingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/60">
      <PageHero
        title="Giving"
        description="Generosity helps sustain worship, discipleship, care, and outreach in our church community."
        gradient="gold"
      />

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            {givingOptions.map((option) => (
              <Card key={option.title} className="border-slate-200 shadow-soft">
                <CardHeader>
                  <option.icon className="h-10 w-10 text-primary" />
                  <CardTitle className="text-2xl">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <Link href="/contact">Contact the Finance Team</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 rounded-[1.75rem] border border-green-200 bg-green-50 p-8 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-700">
              <ShieldCheck className="h-4 w-4" />
              Secure Giving Guidance
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-slate-950">
              Payment methods should be introduced carefully.
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-600">
              The earlier version presented payment brand messaging without a real
              giving workflow behind it. This page now treats giving as a trust and
              compliance concern first, directing visitors to the church team until a
              verified payment integration is implemented.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-slate-500">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
                <CreditCard className="h-4 w-4" />
                Card payments
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2">
                <CreditCard className="h-4 w-4" />
                Mobile money
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
