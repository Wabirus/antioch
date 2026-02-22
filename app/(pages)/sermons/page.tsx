import { PageHero } from "@/components/ui/PageHero";
import SermonList from "@/components/SermonList";
import { getAllSermons, getUniqueSeries, getUniqueTopics, getUniqueSpeakers } from "@/lib/data/sermons";

export const metadata = {
    title: "Sermons Library | Antioch Independent Baptist Churches of Kenya",
    description: "Explore our archive of Bible-based teachings and messages that inspire and challenge our faith community.",
};

export default async function SermonsPage() {
    const allSermons = await getAllSermons();
    const seriesList = await getUniqueSeries();
    const topicsList = await getUniqueTopics();
    const speakersList = await getUniqueSpeakers();

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
                        allSermons={allSermons}
                        seriesList={seriesList}
                        topicsList={topicsList}
                        speakersList={speakersList}
                    />
                </div>
            </section>
        </div>
    );
}
