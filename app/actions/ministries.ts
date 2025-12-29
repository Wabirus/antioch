"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface MinistryData {
    name: string;
    description: string;
    leader: string;
    meetingSchedule: string;
    image: string;
    category: string;
    featured?: boolean;
}

export async function getMinistries() {
    try {
        const ministries = await db.ministry.findMany({
            orderBy: { name: "asc" },
        });
        return { success: true, data: ministries };
    } catch (error) {
        console.error("Failed to fetch ministries:", error);
        return { success: false, error: "Failed to fetch ministries" };
    }
}

export async function getMinistry(id: string) {
    try {
        const ministry = await db.ministry.findUnique({
            where: { id },
        });
        if (!ministry) return { success: false, error: "Ministry not found" };
        return { success: true, data: ministry };
    } catch (error) {
        console.error("Failed to fetch ministry:", error);
        return { success: false, error: "Failed to fetch ministry" };
    }
}

export async function createMinistry(data: MinistryData) {
    try {
        await db.ministry.create({
            data: {
                ...data,
                featured: data.featured || false,
            },
        });
        revalidatePath("/admin/ministries");
        return { success: true };
    } catch (error) {
        console.error("Failed to create ministry:", error);
        return { success: false, error: "Failed to create ministry" };
    }
}

export async function updateMinistry(id: string, data: MinistryData) {
    try {
        await db.ministry.update({
            where: { id },
            data: {
                ...data,
                featured: data.featured || false,
            },
        });
        revalidatePath("/admin/ministries");
        return { success: true };
    } catch (error) {
        console.error("Failed to update ministry:", error);
        return { success: false, error: "Failed to update ministry" };
    }
}

export async function deleteMinistry(id: string) {
    try {
        await db.ministry.delete({
            where: { id },
        });
        revalidatePath("/admin/ministries");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete ministry:", error);
        return { success: false, error: "Failed to delete ministry" };
    }
}
