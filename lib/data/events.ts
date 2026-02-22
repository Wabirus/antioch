import prisma from '@/lib/prisma';

export interface Event {
    id: string;
    title: string;
    description: string;
    image: string;
    startTime: Date;
    endTime?: Date | null;
    location: string;
    category: string;
    actionLabel?: string | null;
    actionUrl?: string | null;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function getAllEvents(): Promise<Event[]> {
    return await prisma.event.findMany({
        orderBy: { startTime: 'asc' }
    });
}

export async function getUpcomingEvents(limit: number = 3): Promise<Event[]> {
    return await prisma.event.findMany({
        where: { startTime: { gte: new Date() } },
        orderBy: { startTime: 'asc' },
        take: limit
    });
}
