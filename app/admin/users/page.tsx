import { getUsers, assignRole, removeRole } from '../actions'
import { RoleName } from '@prisma/client'

export default async function UsersPage() {
    const result = await getUsers()

    return (
        <div className="flex-1 space-y-6 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
                    <p className="text-muted-foreground mt-1">View registered users and manage their dashboard roles.</p>
                </div>
            </div>

            {'error' in result ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-600">
                    <p className="font-semibold">Error loading users</p>
                    <p className="text-sm mt-1">{result.error}</p>
                    <p className="text-xs mt-2 text-red-400">Make sure your Supabase service role key is configured in your environment.</p>
                </div>
            ) : (
                <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
                    <table className="w-full caption-bottom text-sm">
                        <thead>
                            <tr className="border-b bg-slate-50/50">
                                <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Email</th>
                                <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Joined</th>
                                <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Roles</th>
                                <th className="h-12 px-4 text-right font-semibold text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {result.users?.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-muted-foreground">No users found.</td>
                                </tr>
                            ) : (
                                result.users?.map((user) => (
                                    <tr key={user.id} className="border-b transition-colors hover:bg-slate-50/50">
                                        <td className="p-4 font-medium">{user.email}</td>
                                        <td className="p-4 text-muted-foreground">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-1.5 flex-wrap">
                                                {user.roles.length === 0 ? (
                                                    <span className="text-xs text-muted-foreground italic">No roles</span>
                                                ) : (
                                                    user.roles.map(role => (
                                                        <span key={role} className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${role === 'ADMIN' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                                            {role}
                                                        </span>
                                                    ))
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {!user.roles.includes('STAFF') && (
                                                    <form action={async () => {
                                                        'use server'
                                                        await assignRole(user.email, 'STAFF')
                                                    }}>
                                                        <button type="submit" className="text-xs px-2.5 py-1.5 rounded border border-blue-200 text-blue-600 hover:bg-blue-50 transition font-medium">
                                                            + Staff
                                                        </button>
                                                    </form>
                                                )}
                                                {!user.roles.includes('ADMIN') && (
                                                    <form action={async () => {
                                                        'use server'
                                                        await assignRole(user.email, 'ADMIN')
                                                    }}>
                                                        <button type="submit" className="text-xs px-2.5 py-1.5 rounded border border-red-200 text-red-600 hover:bg-red-50 transition font-medium">
                                                            + Admin
                                                        </button>
                                                    </form>
                                                )}
                                                {user.roles.includes('STAFF') && (
                                                    <form action={async () => {
                                                        'use server'
                                                        await removeRole(user.email, 'STAFF')
                                                    }}>
                                                        <button type="submit" className="text-xs px-2.5 py-1.5 rounded text-muted-foreground hover:text-red-500 transition">
                                                            Remove Staff
                                                        </button>
                                                    </form>
                                                )}
                                                {user.roles.includes('ADMIN') && (
                                                    <form action={async () => {
                                                        'use server'
                                                        await removeRole(user.email, 'ADMIN')
                                                    }}>
                                                        <button type="submit" className="text-xs px-2.5 py-1.5 rounded text-muted-foreground hover:text-red-500 transition">
                                                            Remove Admin
                                                        </button>
                                                    </form>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
