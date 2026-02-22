import prisma from '@/lib/prisma';

export interface Ministry {
    id: string;
    name: string;
    description: string;
    leader: string;
    meetingSchedule: string;
    image: string;
    category: string;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export async function getAllMinistries(): Promise<Ministry[]> {
    return await prisma.ministry.findMany({
        orderBy: { name: 'asc' }
    });
}

export async function getMinistriesByCategory(category: string): Promise<Ministry[]> {
    return await prisma.ministry.findMany({
        where: { category },
        orderBy: { name: 'asc' }
    });
}
