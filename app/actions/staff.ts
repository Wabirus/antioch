"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface StaffData {
    name: string;
    position: string;
    bio: string;
    image: string;
    email?: string | null;
    category: string;
    displayOrder: number;
}

export async function getStaffMembers() {
    try {
        const staff = await db.staff.findMany({
            orderBy: { displayOrder: "asc" },
        });
        return { success: true, data: staff };
    } catch (error) {
        console.error("Failed to fetch staff:", error);
        return { success: false, error: "Failed to fetch staff" };
    }
}

export async function getStaffMember(id: string) {
    try {
        const staff = await db.staff.findUnique({
            where: { id },
        });
        if (!staff) return { success: false, error: "Staff member not found" };
        return { success: true, data: staff };
    } catch (error) {
        console.error("Failed to fetch staff member:", error);
        return { success: false, error: "Failed to fetch staff member" };
    }
}

export async function createStaff(data: StaffData) {
    try {
        await db.staff.create({
            data,
        });
        revalidatePath("/admin/staff");
        return { success: true };
    } catch (error) {
        console.error("Failed to create staff:", error);
        return { success: false, error: "Failed to create staff" };
    }
}

export async function updateStaff(id: string, data: StaffData) {
    try {
        await db.staff.update({
            where: { id },
            data,
        });
        revalidatePath("/admin/staff");
        return { success: true };
    } catch (error) {
        console.error("Failed to update staff:", error);
        return { success: false, error: "Failed to update staff" };
    }
}

export async function deleteStaff(id: string) {
    try {
        await db.staff.delete({
            where: { id },
        });
        revalidatePath("/admin/staff");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete staff:", error);
        return { success: false, error: "Failed to delete staff" };
    }
}
