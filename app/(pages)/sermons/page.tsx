import { PageHero } from "@/components/ui/PageHero";
import SermonList from "@/components/SermonList";
import {
  getAllSermons,
  getUniqueSeries,
  getUniqueSpeakers,
  getUniqueTopics,
} from "@/lib/data/sermons";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Sermons",
  description:
    "Listen to recent teaching and browse the sermon library by series, topic, or speaker.",
};

export default async function SermonsPage() {
  const [allSermons, seriesList, topicsList, speakersList] = await Promise.all([
    getAllSermons(),
    getUniqueSeries(),
    getUniqueTopics(),
    getUniqueSpeakers(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/60">
      <PageHero
        title="Sermons Library"
        description="Browse teaching by topic, speaker, or series and hear the heart of Antioch through biblical preaching."
        gradient="blue"
      />
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
