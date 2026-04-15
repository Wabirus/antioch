import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllMinistries } from "@/lib/data/ministries";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ministries",
  description:
    "Explore ministries for discipleship, service, children, and community at Antioch.",
};

export default async function MinistriesPage() {
  const ministries = await getAllMinistries();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/60">
      <PageHero
        title="Ministries"
        description="Find a place to belong, grow in faith, and serve others in the life of the church."
        gradient="blue"
      />

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {ministries.map((ministry) => (
              <Card key={ministry.id} className="overflow-hidden border-slate-200 shadow-soft">
                <div className="relative h-56 bg-slate-100">
                  <Image
                    src={ministry.image || "/images/antioch.jpeg"}
                    alt={ministry.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <CardHeader>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    {ministry.category}
                  </p>
                  <CardTitle className="text-2xl">{ministry.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-slate-600">{ministry.description}</p>
                  <div className="mt-5 space-y-2 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span>{ministry.leader}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{ministry.meetingSchedule}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/contact">Get Involved</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
