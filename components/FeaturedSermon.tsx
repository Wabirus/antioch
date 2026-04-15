import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteSection } from "@/components/site/SiteSection";
import { getFeaturedSermon } from "@/lib/data/sermons";

export default async function FeaturedSermon() {
  const featuredSermon = await getFeaturedSermon();

  if (!featuredSermon) {
    return null;
  }

  return (
    <SiteSection
      id="sermons"
      title="Recent teaching from Antioch"
      description="A featured sermon on the homepage gives visitors a quick way to hear the church’s voice before they ever visit."
      className="bg-slate-50"
      contentClassName="mx-auto max-w-5xl"
    >
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-medium">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-[linear-gradient(135deg,#15355f_0%,#15a4e2_100%)] p-8 text-white md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
              <PlayCircle className="h-4 w-4" />
              Featured Sermon
            </div>
            <h3 className="mt-6 text-3xl font-semibold md:text-4xl">
              {featuredSermon.title}
            </h3>
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-sky-100">
              {featuredSermon.speaker}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-sky-50/90">
              {featuredSermon.description}
            </p>
            <Button className="mt-8 bg-white text-slate-950 hover:bg-slate-100" asChild>
              <Link href="/sermons">Browse Sermons</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center bg-slate-950 p-8">
            <iframe
              src={featuredSermon.videoUrl}
              title={featuredSermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </SiteSection>
  );
}
