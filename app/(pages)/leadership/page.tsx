import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllStaff } from "@/lib/data/staff";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Leadership",
  description:
    "Meet the pastors and ministry leaders serving the Antioch church family.",
};

export default async function LeadershipPage() {
  const staff = await getAllStaff();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/60">
      <PageHero
        title="Leadership & Staff"
        description="Meet the team helping shepherd, organize, and serve our church community."
        gradient="blue"
      />

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {staff.map((member) => (
              <Card key={member.id} className="overflow-hidden border-slate-200 shadow-soft">
                <div className="relative aspect-[4/5] bg-slate-100">
                  <Image
                    src={member.image || "/images/antioch.jpeg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <CardContent className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    {member.position}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                    {member.name}
                  </h2>
                  <p className="mt-4 leading-7 text-slate-600">{member.bio}</p>
                  {member.email ? (
                    <a
                      href={`mailto:${member.email}`}
                      className="mt-6 inline-flex items-center gap-2 font-medium text-primary transition hover:text-secondary"
                    >
                      <Mail className="h-4 w-4" />
                      {member.email}
                    </a>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-16 rounded-[1.75rem] bg-slate-950 p-8 text-white md:p-10">
            <h2 className="text-3xl font-semibold">Looking for a conversation?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Whether you are new to church, exploring faith, or looking for a place
              to serve, our team would be glad to connect with you.
            </p>
            <Button className="mt-8 bg-white text-slate-950 hover:bg-slate-100" asChild>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
