import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { ReactNode } from 'react'

export default async function AdminLayout({ children }: { children: ReactNode }) {
    const supabase = await createClient()

    // Verify Supabase Session
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        // Middleware protects admin routes and excludes /admin/login + /admin/signup.
        // Returning children here avoids redirect loops when this layout wraps auth pages.
        return <>{children}</>
    }

    // Try to find the user in Prisma to check roles
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: {
            roles: {
                include: { role: true }
            }
        }
    })

    // Determine if the user has any roles yet (new signups might not)
    const isApproved = dbUser && dbUser.roles.length > 0
    type DbUserRole = NonNullable<typeof dbUser>['roles'][number]
    const isAdmin = dbUser?.roles.some((r: DbUserRole) => r.role.name === 'ADMIN')

    if (!isApproved) {
        return (
            <div className="flex h-screen items-center justify-center p-4">
                <div className="max-w-md text-center space-y-4">
                    <h1 className="text-2xl font-bold">Account Pending Approval</h1>
                    <p className="text-muted-foreground">
                        Your account ({user.email}) has been created successfully, but it needs to be approved and assigned a role by an Administrator before you can access the dashboard.
                    </p>
                    <form action={async () => {
                        'use server'
                        const supabase = await createClient()
                        await supabase.auth.signOut()
                        redirect('/admin/login')
                    }}>
                        <button type="submit" className="underline">Sign out</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-slate-50/40 hidden md:block">
                <div className="flex h-14 items-center border-b px-4 font-semibold">
                    Antioch Admin
                </div>
                <nav className="flex flex-col gap-1 p-4 text-sm font-medium">
                    <Link href="/admin" className="rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100">
                        Overview
                    </Link>
                    <Link href="/admin/sermons" className="rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100">
                        Sermons
                    </Link>
                    {isAdmin && (
                        <Link href="/admin/streams" className="rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100">
                            Streams
                        </Link>
                    )}
                    <Link href="/admin/events" className="rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100">
                        Events
                    </Link>
                    <Link href="/admin/ministries" className="rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100">
                        Ministries
                    </Link>
                    <Link href="/admin/staff" className="rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100">
                        Staff
                    </Link>

                    {isAdmin && (
                        <>
                            <div className="my-2 h-px bg-border" />
                            <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Administration
                            </div>
                            <Link href="/admin/streams" className="rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100">
                                Manage Streams
                            </Link>
                            <Link href="/admin/users" className="rounded-lg px-3 py-2 text-slate-900 transition-all hover:bg-slate-100">
                                Manage Users
                            </Link>
                        </>
                    )}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
