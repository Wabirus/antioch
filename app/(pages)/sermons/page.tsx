import { PageHero } from "@/components/ui/PageHero";
import SermonList, { UISermon } from "@/components/SermonList";
import { getSermons } from "@/app/actions/sermons";

export const metadata = {
    title: "Sermons Library | Antioch Independent Baptist Churches of Kenya",
    description: "Explore our archive of Bible-based teachings and messages that inspire and challenge our faith community.",
};

export default async function SermonsPage() {
    const result = await getSermons();
    const dbSermons = result.success && result.data ? result.data : [];

    // Transform DB data to UI format
    const uiSermons: UISermon[] = dbSermons.map(s => ({
        id: s.id,
        title: s.title,
        speaker: s.speaker,
        date: new Date(s.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        videoUrl: s.videoUrl,
        thumbnail: s.thumbnail || "", // Handle potential null
        series: s.series || null,
        description: s.description,
        shortDescription: s.shortDescription,
        featured: s.featured,
        topic: s.topic ? [s.topic] : [], // Wrap single topic in array
        scripture: s.scripture,
        duration: s.duration ? `${Math.floor(s.duration / 60)}:${(s.duration % 60).toString().padStart(2, '0')}` : "00:00" // Convert int seconds/mins to MM:SS
    }));

    // Compute unique lists for filters
    const seriesList = Array.from(new Set(uiSermons.map(s => s.series).filter((s): s is string => !!s)));
    const topicsList = Array.from(new Set(uiSermons.flatMap(s => s.topic)));
    const speakersList = Array.from(new Set(uiSermons.map(s => s.speaker)));

    return (
        <div className="bg-gradient-to-b from-white to-slate-50/50 min-h-screen">
            {/* Hero Section */}
            <PageHero
                title="Sermons Library"
                description="Explore our archive of Bible-based teachings and messages that inspire and challenge our faith community."
                gradient="blue"
            />

            {/* Main Content */}
            <section className="py-16">
                <div className="container">
                    <SermonList
                        sermons={uiSermons}
                        seriesList={seriesList}
                        topicsList={topicsList}
                        speakersList={speakersList}
                    />
                </div>
            </section>
        </div>
    );
}
