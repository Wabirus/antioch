import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { getFeaturedSermon } from "@/lib/data/sermons";
import Link from "next/link";

export default async function FeaturedSermon() {
    const featuredSermon = await getFeaturedSermon();

    if (!featuredSermon) return null;

    return (
        <section id="sermons" className="bg-gradient-to-b from-white to-slate-50/50 py-20">
            <div className="container">
                <div className="section-title">
                    <h2>Featured Sermon</h2>
                    <p>Dive into our latest sermon that inspires and challenges our faith community</p>
                </div>
                <div className="sermon-container max-w-6xl mx-auto">
                    <div className="sermon-video-wrapper">
                        <div className="sermon-video">
                            <iframe
                                src={featuredSermon.videoUrl}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full aspect-video rounded-xl"
                            ></iframe>
                        </div>
                    </div>
                    <div className="sermon-content mt-10 text-center max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <PlayCircle className="w-5 h-5 text-primary" />
                            <span className="text-sm font-semibold text-primary uppercase tracking-wide">Latest Message</span>
                        </div>
                        <h3 className="text-3xl md:text-4xl mb-4">{featuredSermon.title}</h3>
                        <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                            {featuredSermon.description}
                        </p>
                        <Button size="lg" className="shadow-medium hover:shadow-large transition-smooth" asChild>
                            <Link href="/sermons">View All Sermons</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
