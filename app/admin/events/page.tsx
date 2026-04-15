import Link from 'next/link'
import { getEvents, deleteEvent } from './actions'
import type { Event } from '@/lib/data/events'

export default async function EventsList() {
    const { events, error } = await getEvents()

    if (error) {
        return <div className="p-8 text-red-500">Error loading events.</div>
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Manage Events</h2>
                <div className="flex items-center space-x-2">
                    <Link href="/admin/events/create" className="bg-slate-900 text-white hover:bg-slate-900/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors">
                        Add New Event
                    </Link>
                </div>
            </div>

            <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b pr-4">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-[300px]">Title</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Start Time</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Location</th>
                            <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                        {events?.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-muted-foreground">No events found.</td>
                            </tr>
                        ) : (
                            events?.map((event: Event) => (
                                <tr key={event.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{event.title}</td>
                                    <td className="p-4 align-middle">{event.category}</td>
                                    <td className="p-4 align-middle">{new Date(event.startTime).toLocaleString()}</td>
                                    <td className="p-4 align-middle">{event.location}</td>
                                    <td className="p-4 align-middle text-right space-x-2">
                                        <Link href={`/admin/events/${event.id}/edit`} className="text-blue-500 hover:underline">Edit</Link>
                                        <form action={async () => {
                                            'use server'
                                            await deleteEvent(event.id)
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
