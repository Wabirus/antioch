"use server";

import { revalidatePath } from "next/cache";

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
    console.log("Mock getEvents called");
    return { success: true, data: [] };
}

export async function getEvent(id: string) {
    console.log("Mock getEvent called");
    return { success: false, error: "Event not found" };
}

export async function createEvent(data: EventData) {
    console.log("Mock createEvent called");
    return { success: true };
}

export async function updateEvent(id: string, data: EventData) {
    console.log("Mock updateEvent called");
    return { success: true };
}

export async function deleteEvent(id: string) {
    console.log("Mock deleteEvent called");
    return { success: true };
}
