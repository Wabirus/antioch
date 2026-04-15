'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getEvents() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { startTime: 'desc' },
        })
        return { events }
    } catch {
        return { error: 'Failed to fetch events' }
    }
}

export async function createEvent(formData: FormData) {
    try {
        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const image = formData.get('image') as string
        const startTime = formData.get('startTime') as string
        const endTime = formData.get('endTime') as string
        const location = formData.get('location') as string
        const category = formData.get('category') as string
        const actionLabel = formData.get('actionLabel') as string
        const actionUrl = formData.get('actionUrl') as string
        const featured = formData.get('featured') === 'true'

        // Basic validation
        if (!title || !description || !image || !startTime || !location || !category) {
            return { error: 'Missing required fields' }
        }

        await prisma.event.create({
            data: {
                title,
                description,
                image,
                startTime: new Date(startTime),
                endTime: endTime ? new Date(endTime) : null,
                location,
                category,
                actionLabel: actionLabel || null,
                actionUrl: actionUrl || null,
                featured
            }
        })

        revalidatePath('/admin/events')
        return { success: true }
    } catch (error) {
        console.error('Failed to create event', error)
        return { error: 'Failed to create event in database' }
    }
}

export async function deleteEvent(id: string) {
    try {
        await prisma.event.delete({
            where: { id }
        })
        revalidatePath('/admin/events')
        return { success: true }
    } catch {
        return { error: 'Failed to delete event' }
    }
}

export async function getEventById(id: string) {
    try {
        const event = await prisma.event.findUnique({ where: { id } })
        if (!event) return { error: 'Event not found' }
        return { event }
    } catch {
        return { error: 'Failed to fetch event' }
    }
}

export async function updateEvent(id: string, formData: FormData) {
    try {
        const title = formData.get('title') as string
        const description = formData.get('description') as string
        const image = formData.get('image') as string
        const startTime = formData.get('startTime') as string
        const endTime = formData.get('endTime') as string
        const location = formData.get('location') as string
        const category = formData.get('category') as string
        const actionLabel = formData.get('actionLabel') as string
        const actionUrl = formData.get('actionUrl') as string
        const featured = formData.get('featured') === 'true'

        if (!title || !description || !startTime || !location || !category) {
            return { error: 'Missing required fields' }
        }

        await prisma.event.update({
            where: { id },
            data: {
                title, description, image: image || '',
                startTime: new Date(startTime),
                endTime: endTime ? new Date(endTime) : null,
                location, category,
                actionLabel: actionLabel || null,
                actionUrl: actionUrl || null,
                featured,
            }
        })
        revalidatePath('/admin/events')
        return { success: true }
    } catch (error) {
        console.error('Failed to update event', error)
        return { error: 'Failed to update event' }
    }
}
