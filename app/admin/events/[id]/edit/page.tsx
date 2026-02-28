import { notFound, redirect } from 'next/navigation'
import { getEventById, updateEvent } from '../../actions'
import Link from 'next/link'

function toDatetimeLocal(date: Date | null | undefined) {
    if (!date) return ''
    return new Date(date).toISOString().slice(0, 16)
}

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const result = await getEventById(id)

    if ('error' in result || !result.event) notFound()
    const event = result.event

    async function handleUpdate(formData: FormData) {
        'use server'
        const res = await updateEvent(id, formData)
        if (res.success) redirect('/admin/events')
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/events" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
                <h1 className="text-2xl font-bold">Edit Event</h1>
            </div>
            <form action={handleUpdate} className="space-y-5 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Title *</label>
                        <input name="title" defaultValue={event.title} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Start Time *</label>
                        <input name="startTime" type="datetime-local" defaultValue={toDatetimeLocal(event.startTime)} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">End Time</label>
                        <input name="endTime" type="datetime-local" defaultValue={toDatetimeLocal(event.endTime)} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Location *</label>
                        <input name="location" defaultValue={event.location} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category *</label>
                        <select name="category" defaultValue={event.category} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition">
                            <option value="">Select...</option>
                            {['Family', 'Worship', 'Youth', 'Service', 'Outreach', 'Adults', 'General'].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input name="image" defaultValue={event.image ?? ''} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Action Label</label>
                        <input name="actionLabel" defaultValue={event.actionLabel ?? ''} placeholder="e.g. Register" className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Action URL</label>
                        <input name="actionUrl" defaultValue={event.actionUrl ?? ''} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Description *</label>
                        <textarea name="description" defaultValue={event.description} rows={4} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input name="featured" type="checkbox" value="true" defaultChecked={event.featured} className="h-4 w-4 rounded border-gray-300" />
                        <label className="text-sm font-medium">Featured event</label>
                    </div>
                </div>
                <div className="flex gap-3 pt-2">
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition">Save Changes</button>
                    <Link href="/admin/events" className="px-6 py-2 rounded-lg text-sm font-medium border hover:bg-slate-50 transition">Cancel</Link>
                </div>
            </form>
        </div>
    )
}
