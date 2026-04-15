'use server'

import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getDashboardStats() {
    const [sermonsCount, eventsCount, ministriesCount, staffCount] = await Promise.all([
        prisma.sermon.count(),
        prisma.event.count(),
        prisma.ministry.count(),
        prisma.staff.count(),
    ])

    // Upcoming events
    const upcomingEvents = await prisma.event.count({
        where: { startTime: { gte: new Date() } }
    })

    // Most recent sermon
    const latestSermon = await prisma.sermon.findFirst({
        orderBy: { date: 'desc' },
        select: { title: true, speaker: true, date: true }
    })

    return {
        sermonsCount,
        eventsCount,
        ministriesCount,
        staffCount,
        upcomingEvents,
        latestSermon,
    }
}

export async function getUsers() {
    try {
        const supabase = await createClient()
        const { data: { users }, error } = await supabase.auth.admin.listUsers()
        if (error) return { error: error.message }

        // Get DB roles for these users
        const dbUsers = await prisma.user.findMany({
            include: { roles: { include: { role: true } } }
        })
        type DbUser = (typeof dbUsers)[number]
        type DbUserRole = DbUser['roles'][number]
        const roleMap = new Map(dbUsers.map((u: DbUser) => [u.email, u.roles.map((r: DbUserRole) => r.role.name)]))

        return {
            users: users.map(u => ({
                id: u.id,
                email: u.email ?? '',
                createdAt: u.created_at,
                roles: roleMap.get(u.email ?? '') ?? [],
            }))
        }
    } catch {
        return { error: 'Failed to load users' }
    }
}

export async function assignRole(email: string, roleName: 'ADMIN' | 'STAFF') {
    try {
        const role = await prisma.role.findFirst({ where: { name: roleName } })
        if (!role) {
            // Create the role if it doesn't exist
            const newRole = await prisma.role.create({ data: { name: roleName } })
            const user = await prisma.user.findUnique({ where: { email } })
            if (!user) {
                // Create the user record
                const u = await prisma.user.create({ data: { name: email, email, password: '' } })
                await prisma.userRole.create({ data: { userId: u.id, roleId: newRole.id } })
            } else {
                await prisma.userRole.upsert({
                    where: { userId_roleId: { userId: user.id, roleId: newRole.id } },
                    create: { userId: user.id, roleId: newRole.id },
                    update: {}
                })
            }
        } else {
            let user = await prisma.user.findUnique({ where: { email } })
            if (!user) {
                user = await prisma.user.create({ data: { name: email, email, password: '' } })
            }
            await prisma.userRole.upsert({
                where: { userId_roleId: { userId: user.id, roleId: role.id } },
                create: { userId: user.id, roleId: role.id },
                update: {}
            })
        }
        revalidatePath('/admin/users')
        return { success: true }
    } catch (error) {
        console.error('Failed to assign role', error)
        return { error: 'Failed to assign role' }
    }
}

export async function removeRole(email: string, roleName: 'ADMIN' | 'STAFF') {
    try {
        const user = await prisma.user.findUnique({ where: { email } })
        const role = await prisma.role.findFirst({ where: { name: roleName } })
        if (!user || !role) return { error: 'User or role not found' }
        await prisma.userRole.deleteMany({ where: { userId: user.id, roleId: role.id } })
        revalidatePath('/admin/users')
        return { success: true }
    } catch {
        return { error: 'Failed to remove role' }
    }
}
