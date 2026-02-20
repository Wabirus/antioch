import { PageHero } from "@/components/ui/PageHero";
import LiveStreamPlayer from "@/components/streaming/LiveStreamPlayer";

export const metadata = {
  title: "LiveStream | Antioch Independent Baptist Churches of Kenya",
  description:
    "Join our live YouTube stream and worship with Antioch from anywhere.",
};

export default function LiveStreamPage() {
  const embedUrl =
    process.env.LIVE_STREAM_EMBED_URL ??
    process.env.NEXT_PUBLIC_LIVE_STREAM_EMBED_URL ??
    "";

  return (
    <div className="bg-gradient-to-b from-white to-slate-50/50 min-h-screen">
      <PageHero
        title="LiveStream"
        description="Join our service live from anywhere."
        gradient="blue"
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-5xl">
          <LiveStreamPlayer embedUrl={embedUrl} />
          <p className="mt-4 text-sm text-muted-foreground">
            Configure the stream URL with{" "}
            <code className="font-mono">LIVE_STREAM_EMBED_URL</code> (or{" "}
            <code className="font-mono">NEXT_PUBLIC_LIVE_STREAM_EMBED_URL</code>
            ).
          </p>
        </div>
      </section>
    </div>
  );
}
