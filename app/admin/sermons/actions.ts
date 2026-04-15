'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getSermons() {
    try {
        const sermons = await prisma.sermon.findMany({
            orderBy: { date: 'desc' },
        })
        return { sermons }
    } catch {
        return { error: 'Failed to fetch sermons' }
    }
}

export async function createSermon(formData: FormData) {
    try {
        const title = formData.get('title') as string
        const speaker = formData.get('speaker') as string
        const date = formData.get('date') as string
        const videoUrl = formData.get('videoUrl') as string
        const series = formData.get('series') as string
        const thumbnail = formData.get('thumbnail') as string
        const topic = formData.get('topic') as string
        const scripture = formData.get('scripture') as string
        const duration = parseInt(formData.get('duration') as string)
        const shortDescription = formData.get('shortDescription') as string
        const description = formData.get('description') as string
        const featured = formData.get('featured') === 'true'

        // Basic validation
        if (!title || !speaker || !date || !videoUrl || !thumbnail) {
            return { error: 'Missing required fields' }
        }

        await prisma.sermon.create({
            data: {
                title,
                speaker,
                date: new Date(date),
                videoUrl,
                series: series || undefined,
                thumbnail,
                topic,
                scripture,
                duration,
                shortDescription,
                description,
                featured
            }
        })

        revalidatePath('/admin/sermons')
        return { success: true }
    } catch (error) {
        console.error('Failed to create sermon', error)
        return { error: 'Failed to create sermon in database' }
    }
}

export async function deleteSermon(id: string) {
    try {
        await prisma.sermon.delete({
            where: { id }
        })
        revalidatePath('/admin/sermons')
        return { success: true }
    } catch {
        return { error: 'Failed to delete sermon' }
    }
}

export async function getSermonById(id: string) {
    try {
        const sermon = await prisma.sermon.findUnique({ where: { id } })
        if (!sermon) return { error: 'Sermon not found' }
        return { sermon }
    } catch {
        return { error: 'Failed to fetch sermon' }
    }
}

export async function updateSermon(id: string, formData: FormData) {
    try {
        const title = formData.get('title') as string
        const speaker = formData.get('speaker') as string
        const date = formData.get('date') as string
        const videoUrl = formData.get('videoUrl') as string
        const series = formData.get('series') as string
        const thumbnail = formData.get('thumbnail') as string
        const topic = formData.get('topic') as string
        const scripture = formData.get('scripture') as string
        const duration = parseInt(formData.get('duration') as string)
        const shortDescription = formData.get('shortDescription') as string
        const description = formData.get('description') as string
        const featured = formData.get('featured') === 'true'

        if (!title || !speaker || !date || !videoUrl) {
            return { error: 'Missing required fields' }
        }

        await prisma.sermon.update({
            where: { id },
            data: {
                title, speaker,
                date: new Date(date),
                videoUrl,
                series: series || null,
                thumbnail: thumbnail || '',
                topic: topic || '',
                scripture: scripture || '',
                duration: isNaN(duration) ? 0 : duration,
                shortDescription: shortDescription || '',
                description: description || '',
                featured,
            }
        })
        revalidatePath('/admin/sermons')
        return { success: true }
    } catch (error) {
        console.error('Failed to update sermon', error)
        return { error: 'Failed to update sermon' }
    }
}
