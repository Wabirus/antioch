import prisma from '@/lib/prisma';

export interface Sermon {
    id: string;
    title: string;
    speaker: string;
    date: Date;
    videoUrl: string;
    thumbnail?: string | null;
    series?: string | null;
    description: string;
    shortDescription?: string | null;
    featured?: boolean;
    topic?: string | null;
    scripture?: string | null;
    duration?: number | null;
}

export async function getFeaturedSermon(): Promise<Sermon | undefined> {
    const featured = await prisma.sermon.findFirst({
        where: { featured: true },
        orderBy: { date: 'desc' }
    });
    return featured || undefined;
}

export async function getAllSermons(): Promise<Sermon[]> {
    return await prisma.sermon.findMany({
        orderBy: { date: 'desc' }
    });
}

export async function searchSermons(query: string): Promise<Sermon[]> {
    const lowerQuery = query.toLowerCase();
    const all = await prisma.sermon.findMany({
        orderBy: { date: 'desc' }
    });
    return all.filter((sermon: Sermon) =>
        sermon.title.toLowerCase().includes(lowerQuery) ||
        sermon.description.toLowerCase().includes(lowerQuery) ||
        sermon.speaker.toLowerCase().includes(lowerQuery) ||
        (sermon.series && sermon.series.toLowerCase().includes(lowerQuery)) ||
        (sermon.topic && sermon.topic.toLowerCase().includes(lowerQuery))
    );
}

export async function getUniqueSeries(): Promise<string[]> {
    const all = await prisma.sermon.findMany({
        select: { series: true }
    });
    const series = all.map((s: { series: string | null }) => s.series).filter((s): s is string => !!s);
    return Array.from(new Set(series));
}

export async function getUniqueTopics(): Promise<string[]> {
    const all = await prisma.sermon.findMany({
        select: { topic: true }
    });
    const topics = all.map((s: { topic: string | null }) => s.topic).filter((s): s is string => !!s);
    return Array.from(new Set(topics));
}

export async function getUniqueSpeakers(): Promise<string[]> {
    const all = await prisma.sermon.findMany({
        select: { speaker: true }
    });
    const speakers = all.map((s: { speaker: string }) => s.speaker).filter((s): s is string => !!s);
    return Array.from(new Set(speakers));
}
