import prisma from '@/lib/prisma';

export interface StaffMember {
    id: string;
    name: string;
    position: string;
    bio: string;
    image: string;
    email?: string | null;
    category: string;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function getAllStaff(): Promise<StaffMember[]> {
    return await prisma.staff.findMany({
        orderBy: { displayOrder: 'asc' }
    });
}

export async function getStaffByCategory(category: string): Promise<StaffMember[]> {
    return await prisma.staff.findMany({
        where: { category },
        orderBy: { displayOrder: 'asc' }
    });
}
