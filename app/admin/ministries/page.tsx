import Link from 'next/link'
import { getMinistries, deleteMinistry } from './actions'
import type { Ministry } from '@/lib/data/ministries'

export default async function MinistriesList() {
    const { ministries, error } = await getMinistries()

    if (error) {
        return <div className="p-8 text-red-500">Error loading ministries.</div>
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Manage Ministries</h2>
                <div className="flex items-center space-x-2">
                    <Link href="/admin/ministries/create" className="bg-slate-900 text-white hover:bg-slate-900/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors">
                        Add New Ministry
                    </Link>
                </div>
            </div>

            <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b pr-4">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[300px]">Name</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Leader</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {ministries?.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-4 text-center text-muted-foreground">No ministries found.</td>
                            </tr>
                        ) : (
                            ministries?.map((ministry: Ministry) => (
                                <tr key={ministry.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{ministry.name}</td>
                                    <td className="p-4 align-middle">{ministry.leader}</td>
                                    <td className="p-4 align-middle">{ministry.category}</td>
                                    <td className="p-4 align-middle text-right space-x-2">
                                        <Link href={`/admin/ministries/${ministry.id}/edit`} className="text-blue-500 hover:underline">Edit</Link>
                                        <form action={async () => {
                                            'use server'
                                            await deleteMinistry(ministry.id)
                                        }} className="inline">
                                            <button type="submit" className="text-red-500 hover:underline">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
