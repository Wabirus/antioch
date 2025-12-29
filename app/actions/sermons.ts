"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface SermonData {
    title: string;
    speaker: string;
    date: Date;
    videoUrl: string;
    thumbnail: string;
    series?: string | null;
    description: string;
    shortDescription: string;
    featured?: boolean;
    topic: string;
    scripture: string;
    duration: number;
}

export async function getSermons() {
    try {
        const sermons = await db.sermon.findMany({
            orderBy: { date: "desc" },
        });
        return { success: true, data: sermons };
    } catch (error) {
        console.error("Failed to fetch sermons:", error);
        return { success: false, error: "Failed to fetch sermons" };
    }
}

export async function getSermon(id: string) {
    try {
        const sermon = await db.sermon.findUnique({
            where: { id },
        });
        if (!sermon) return { success: false, error: "Sermon not found" };
        return { success: true, data: sermon };
    } catch (error) {
        console.error("Failed to fetch sermon:", error);
        return { success: false, error: "Failed to fetch sermon" };
    }
}

export async function createSermon(data: SermonData) {
    try {
        await db.sermon.create({
            data: {
                ...data,
                featured: data.featured || false,
            },
        });
        revalidatePath("/admin/sermons");
        return { success: true };
    } catch (error) {
        console.error("Failed to create sermon:", error);
        return { success: false, error: "Failed to create sermon" };
    }
}

export async function updateSermon(id: string, data: SermonData) {
    try {
        await db.sermon.update({
            where: { id },
            data: {
                ...data,
                featured: data.featured || false,
            },
        });
        revalidatePath("/admin/sermons");
        return { success: true };
    } catch (error) {
        console.error("Failed to update sermon:", error);
        return { success: false, error: "Failed to update sermon" };
    }
}

export async function deleteSermon(id: string) {
    try {
        await db.sermon.delete({
            where: { id },
        });
        revalidatePath("/admin/sermons");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete sermon:", error);
        return { success: false, error: "Failed to delete sermon" };
    }
}
