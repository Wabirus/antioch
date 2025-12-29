"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface EventData {
    title: string;
    description: string;
    image: string;
    startTime: Date;
    endTime?: Date | null;
    location: string;
    category: string;
    actionLabel?: string | null;
    actionUrl?: string | null;
    featured?: boolean;
}

export async function getEvents() {
    try {
        const events = await db.event.findMany({
            orderBy: { startTime: "asc" },
        });
        return { success: true, data: events };
    } catch (error) {
        console.error("Failed to fetch events:", error);
        return { success: false, error: "Failed to fetch events" };
    }
}

export async function getEvent(id: string) {
    try {
        const event = await db.event.findUnique({
            where: { id },
        });
        if (!event) return { success: false, error: "Event not found" };
        return { success: true, data: event };
    } catch (error) {
        console.error("Failed to fetch event:", error);
        return { success: false, error: "Failed to fetch event" };
    }
}

export async function createEvent(data: EventData) {
    try {
        await db.event.create({
            data: {
                ...data,
                featured: data.featured || false,
            },
        });
        revalidatePath("/admin/events");
        revalidatePath("/"); // Update home if featured events are shown there
        return { success: true };
    } catch (error) {
        console.error("Failed to create event:", error);
        return { success: false, error: "Failed to create event" };
    }
}

export async function updateEvent(id: string, data: EventData) {
    try {
        await db.event.update({
            where: { id },
            data: {
                ...data,
                featured: data.featured || false,
            },
        });
        revalidatePath("/admin/events");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to update event:", error);
        return { success: false, error: "Failed to update event" };
    }
}

export async function deleteEvent(id: string) {
    try {
        await db.event.delete({
            where: { id },
        });
        revalidatePath("/admin/events");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete event:", error);
        return { success: false, error: "Failed to delete event" };
    }
}
