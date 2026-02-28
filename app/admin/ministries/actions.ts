'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getMinistries() {
    try {
        const ministries = await prisma.ministry.findMany({
            orderBy: { name: 'asc' },
        })
        return { ministries }
    } catch (error) {
        return { error: 'Failed to fetch ministries' }
    }
}

export async function createMinistry(formData: FormData) {
    try {
        const name = formData.get('name') as string
        const description = formData.get('description') as string
        const leader = formData.get('leader') as string
        const meetingSchedule = formData.get('meetingSchedule') as string
        const image = formData.get('image') as string
        const category = formData.get('category') as string
        const featured = formData.get('featured') === 'true'

        // Basic validation
        if (!name || !description || !leader || !meetingSchedule || !image || !category) {
            return { error: 'Missing required fields' }
        }

        await prisma.ministry.create({
            data: {
                name,
                description,
                leader,
                meetingSchedule,
                image,
                category,
                featured
            }
        })

        revalidatePath('/admin/ministries')
        return { success: true }
    } catch (error) {
        console.error('Failed to create ministry', error)
        return { error: 'Failed to create ministry in database' }
    }
}

export async function deleteMinistry(id: string) {
    try {
        await prisma.ministry.delete({
            where: { id }
        })
        revalidatePath('/admin/ministries')
        return { success: true }
    } catch (error) {
        return { error: 'Failed to delete ministry' }
    }
}

export async function getMinistryById(id: string) {
    try {
        const ministry = await prisma.ministry.findUnique({ where: { id } })
        if (!ministry) return { error: 'Ministry not found' }
        return { ministry }
    } catch (error) {
        return { error: 'Failed to fetch ministry' }
    }
}

export async function updateMinistry(id: string, formData: FormData) {
    try {
        const name = formData.get('name') as string
        const description = formData.get('description') as string
        const leader = formData.get('leader') as string
        const meetingSchedule = formData.get('meetingSchedule') as string
        const image = formData.get('image') as string
        const category = formData.get('category') as string
        const featured = formData.get('featured') === 'true'

        if (!name || !description || !leader || !meetingSchedule || !category) {
            return { error: 'Missing required fields' }
        }

        await prisma.ministry.update({
            where: { id },
            data: { name, description, leader, meetingSchedule, image: image || '', category, featured }
        })
        revalidatePath('/admin/ministries')
        return { success: true }
    } catch (error) {
        console.error('Failed to update ministry', error)
        return { error: 'Failed to update ministry' }
    }
}
