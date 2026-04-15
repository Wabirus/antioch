import ContactForm from "@/components/ContactForm";
import Events from "@/components/Events";
import FeaturedSermon from "@/components/FeaturedSermon";
import Hero from "@/components/Hero";
import LiveStreams from "@/components/LiveStreams";
import Mission from "@/components/Mission";
import Services from "@/components/Services";
import { SiteSection } from "@/components/site/SiteSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <Mission />
        <Services />
        <Events />
        <FeaturedSermon />
        <LiveStreams />
        <SiteSection
          id="contact"
          title="Questions, prayer needs, or help planning a visit?"
          description="We want it to be easy for guests, members, and families to get in touch without digging through the site."
          className="bg-white"
          contentClassName="mx-auto max-w-3xl"
        >
          <ContactForm />
        </SiteSection>
      </main>
    </>
  );
}
