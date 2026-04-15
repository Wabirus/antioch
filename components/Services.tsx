'use client';

import Link from "next/link";
import { ArrowRight, Baby, Church, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteSection } from "@/components/site/SiteSection";
import { siteConfig } from "@/lib/site";

const icons = [Church, Users, Baby];

export default function Services() {
  return (
    <SiteSection
      id="services"
      title="Weekly rhythms that help people worship, pray, and belong"
      description="Clear service information is one of the fastest ways to reduce friction for first-time guests and returning members."
      className="bg-slate-50"
      contentClassName="grid gap-6 md:grid-cols-3"
    >
      {siteConfig.serviceTimes.map((service, index) => {
        const Icon = icons[index] ?? Church;

        return (
          <Card key={service.name} className="service-card group border-none shadow-soft">
            <CardContent className="p-8">
              <Icon className="mb-6 h-12 w-12 text-primary" strokeWidth={1.5} />
              <h3 className="mb-2 text-2xl font-semibold">{service.name}</h3>
              <p className="mb-4 text-3xl font-bold text-secondary">{service.time}</p>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                {service.detail}
              </p>
              <Button
                variant="outline"
                className="w-full hover:bg-primary hover:text-white"
                asChild
              >
                <Link href="/new-here">
                  Plan Your Visit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </SiteSection>
  );
}
