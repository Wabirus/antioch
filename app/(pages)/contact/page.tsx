import { PageHero } from "@/components/ui/PageHero";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Reach Antioch for general questions, prayer requests, or help planning your visit.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/60">
      <PageHero
        title="Contact Antioch"
        description="Questions, prayer needs, and first-visit planning all belong in one clear place."
        gradient="gold"
      />

      <section className="py-16 md:py-20">
        <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4 rounded-[1.75rem] bg-slate-950 p-8 text-white shadow-soft">
            <h2 className="text-3xl font-semibold">Reach our team</h2>
            <p className="leading-7 text-slate-300">
              If you are looking for service details, prayer support, or help
              connecting to a ministry, we would be glad to hear from you.
            </p>
            <div className="pt-4 text-slate-200">
              <p>{siteConfig.location}</p>
              <p className="mt-2">{siteConfig.email}</p>
              <p className="mt-2">{siteConfig.phone}</p>
            </div>
          </div>
          <div className="rounded-[1.75rem] bg-white p-2 shadow-soft">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
