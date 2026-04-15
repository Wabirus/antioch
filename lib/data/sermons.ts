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
    const normalizedQuery = query.trim();
    if (!normalizedQuery) {
        return getAllSermons();
    }

    return prisma.sermon.findMany({
        where: {
            OR: [
                { title: { contains: normalizedQuery, mode: 'insensitive' } },
                { description: { contains: normalizedQuery, mode: 'insensitive' } },
                { speaker: { contains: normalizedQuery, mode: 'insensitive' } },
                { series: { contains: normalizedQuery, mode: 'insensitive' } },
                { topic: { contains: normalizedQuery, mode: 'insensitive' } },
            ]
        },
        orderBy: { date: 'desc' }
    });
}

export async function getUniqueSeries(): Promise<string[]> {
    const all = await prisma.sermon.findMany({
        where: { series: { not: null } },
        select: { series: true },
        distinct: ['series'],
        orderBy: { series: 'asc' }
    });
    return all
        .map((s: { series: string | null }) => s.series)
        .filter((s): s is string => Boolean(s));
}

export async function getUniqueTopics(): Promise<string[]> {
    const all = await prisma.sermon.findMany({
        select: { topic: true },
        distinct: ['topic'],
        orderBy: { topic: 'asc' }
    });
    return all
        .map((s: { topic: string | null }) => s.topic)
        .filter((s): s is string => Boolean(s));
}

export async function getUniqueSpeakers(): Promise<string[]> {
    const all = await prisma.sermon.findMany({
        select: { speaker: true },
        distinct: ['speaker'],
        orderBy: { speaker: 'asc' }
    });
    return all
        .map((s: { speaker: string }) => s.speaker)
        .filter((s): s is string => Boolean(s));
}
