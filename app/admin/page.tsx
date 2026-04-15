import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getDashboardStats } from './actions'
import prisma from '@/lib/prisma'

export default async function AdminDashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return redirect('/admin/login')

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email ?? '' },
        include: {
            roles: {
                include: { role: true }
            }
        }
    })

    const isAdmin = dbUser?.roles.some((role) => role.role.name === 'ADMIN') ?? false
    const stats = await getDashboardStats()

    const statCards = [
        {
            label: 'Total Sermons',
            value: stats.sermonsCount,
            href: '/admin/sermons',
            icon: '🎙️',
            color: 'from-violet-500 to-purple-600',
            bg: 'bg-violet-50',
        },
        {
            label: 'Total Events',
            value: stats.eventsCount,
            sub: `${stats.upcomingEvents} upcoming`,
            href: '/admin/events',
            icon: '📅',
            color: 'from-blue-500 to-cyan-500',
            bg: 'bg-blue-50',
        },
        {
            label: 'Ministries',
            value: stats.ministriesCount,
            href: '/admin/ministries',
            icon: '✝️',
            color: 'from-emerald-500 to-green-500',
            bg: 'bg-emerald-50',
        },
        {
            label: 'Staff Members',
            value: stats.staffCount,
            href: '/admin/staff',
            icon: '👥',
            color: 'from-amber-500 to-orange-500',
            bg: 'bg-amber-50',
        },
    ]

    const quickActions = [
        { label: 'Add Sermon', href: '/admin/sermons/create', style: 'bg-violet-600 hover:bg-violet-700 text-white' },
        { label: 'Add Event', href: '/admin/events/create', style: 'bg-blue-600 hover:bg-blue-700 text-white' },
        { label: 'Add Ministry', href: '/admin/ministries/create', style: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
        { label: 'Add Staff', href: '/admin/staff/create', style: 'bg-amber-600 hover:bg-amber-700 text-white' },
        ...(isAdmin ? [{ label: 'Add Stream', href: '/admin/streams/create', style: 'bg-red-600 hover:bg-red-700 text-white' }] : []),
    ]

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground mt-1">Welcome back, <span className="font-medium text-foreground">{user.email}</span></p>
                </div>
                <form action={async () => {
                    'use server'
                    const supabase = await createClient()
                    await supabase.auth.signOut()
                    redirect('/admin/login')
                }}>
                    <button type="submit" className="text-sm px-4 py-2 rounded-lg border hover:bg-slate-100 transition">
                        Sign Out
                    </button>
                </form>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                {statCards.map(card => (
                    <Link key={card.label} href={card.href} className="group rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                        <div className={`h-1.5 w-full bg-gradient-to-r ${card.color}`} />
                        <div className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
                                    <p className="text-4xl font-bold mt-1 group-hover:text-primary transition-colors">{card.value}</p>
                                    {card.sub && <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>}
                                </div>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${card.bg}`}>
                                    {card.icon}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions + Latest Sermon */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
                {/* Quick Actions */}
                <div className="rounded-xl border bg-white shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map(action => (
                            <Link key={action.label} href={action.href} className={`flex items-center justify-center px-4 py-3 rounded-lg text-sm font-semibold transition ${action.style}`}>
                                {action.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Latest Sermon */}
                <div className="rounded-xl border bg-white shadow-sm p-6">
                    <h3 className="font-semibold text-lg mb-4">Latest Sermon</h3>
                    {stats.latestSermon ? (
                        <div className="space-y-3">
                            <div className="p-4 bg-violet-50 rounded-lg border border-violet-100">
                                <p className="font-semibold text-slate-900 line-clamp-1">{stats.latestSermon.title}</p>
                                <p className="text-sm text-muted-foreground mt-1">{stats.latestSermon.speaker}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(stats.latestSermon.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                            </div>
                            <Link href="/admin/sermons" className="flex items-center text-sm text-violet-600 hover:text-violet-700 font-medium">
                                View all sermons →
                            </Link>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            <p>No sermons yet.</p>
                            <Link href="/admin/sermons/create" className="text-sm text-violet-600 hover:underline mt-2 block">
                                Add the first one →
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Summary Links */}
            <div className="rounded-xl border bg-white shadow-sm p-6">
                <h3 className="font-semibold text-lg mb-4">Manage Content</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {[
                        { label: 'Sermons', count: stats.sermonsCount, href: '/admin/sermons' },
                        { label: 'Events', count: stats.eventsCount, href: '/admin/events' },
                        { label: 'Ministries', count: stats.ministriesCount, href: '/admin/ministries' },
                        { label: 'Staff', count: stats.staffCount, href: '/admin/staff' },
                    ].map(item => (
                        <Link key={item.label} href={item.href} className="flex flex-col items-center p-4 rounded-lg border hover:bg-slate-50 hover:border-primary/30 transition group">
                            <span className="text-2xl font-bold group-hover:text-primary transition">{item.count}</span>
                            <span className="text-muted-foreground mt-1">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
