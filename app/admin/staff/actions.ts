'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getStaff() {
    try {
        const staff = await prisma.staff.findMany({
            orderBy: { displayOrder: 'asc' },
        })
        return { staff }
    } catch (error) {
        return { error: 'Failed to fetch staff' }
    }
}

export async function createStaff(formData: FormData) {
    try {
        const name = formData.get('name') as string
        const position = formData.get('position') as string
        const bio = formData.get('bio') as string
        const image = formData.get('image') as string
        const email = formData.get('email') as string
        const category = formData.get('category') as string
        const displayOrder = parseInt(formData.get('displayOrder') as string)

        // Basic validation
        if (!name || !position || !bio || !image || !category || isNaN(displayOrder)) {
            return { error: 'Missing required fields' }
        }

        await prisma.staff.create({
            data: {
                name,
                position,
                bio,
                image,
                email: email || null,
                category,
                displayOrder
            }
        })

        revalidatePath('/admin/staff')
        return { success: true }
    } catch (error) {
        console.error('Failed to create staff', error)
        return { error: 'Failed to create staff member in database' }
    }
}

export async function deleteStaff(id: string) {
    try {
        await prisma.staff.delete({
            where: { id }
        })
        revalidatePath('/admin/staff')
        return { success: true }
    } catch (error) {
        return { error: 'Failed to delete staff member' }
    }
}

export async function getStaffById(id: string) {
    try {
        const staff = await prisma.staff.findUnique({ where: { id } })
        if (!staff) return { error: 'Staff member not found' }
        return { staff }
    } catch (error) {
        return { error: 'Failed to fetch staff member' }
    }
}

export async function updateStaff(id: string, formData: FormData) {
    try {
        const name = formData.get('name') as string
        const position = formData.get('position') as string
        const bio = formData.get('bio') as string
        const image = formData.get('image') as string
        const email = formData.get('email') as string
        const category = formData.get('category') as string
        const displayOrder = parseInt(formData.get('displayOrder') as string)

        if (!name || !position || !bio || !category || isNaN(displayOrder)) {
            return { error: 'Missing required fields' }
        }

        await prisma.staff.update({
            where: { id },
            data: {
                name, position, bio,
                image: image || '',
                email: email || null,
                category, displayOrder,
            }
        })
        revalidatePath('/admin/staff')
        return { success: true }
    } catch (error) {
        console.error('Failed to update staff', error)
        return { error: 'Failed to update staff member' }
    }
}
