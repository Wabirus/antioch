import { notFound, redirect } from 'next/navigation'
import { getSermonById, updateSermon } from '../../actions'
import Link from 'next/link'

export default async function EditSermonPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const result = await getSermonById(id)

    if ('error' in result || !result.sermon) notFound()
    const sermon = result.sermon

    async function handleUpdate(formData: FormData) {
        'use server'
        const res = await updateSermon(id, formData)
        if (res.success) redirect('/admin/sermons')
    }

    const dateValue = sermon.date ? new Date(sermon.date).toISOString().split('T')[0] : ''

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/sermons" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
                <h1 className="text-2xl font-bold">Edit Sermon</h1>
            </div>
            <form action={handleUpdate} className="space-y-5 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Title *</label>
                        <input name="title" defaultValue={sermon.title} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Speaker *</label>
                        <input name="speaker" defaultValue={sermon.speaker} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Date *</label>
                        <input name="date" type="date" defaultValue={dateValue} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Video URL *</label>
                        <input name="videoUrl" defaultValue={sermon.videoUrl} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Series</label>
                        <input name="series" defaultValue={sermon.series ?? ''} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Duration (seconds)</label>
                        <input name="duration" type="number" defaultValue={sermon.duration ?? 0} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Topic</label>
                        <input name="topic" defaultValue={sermon.topic ?? ''} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Scripture Reference</label>
                        <input name="scripture" defaultValue={sermon.scripture ?? ''} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
                        <input name="thumbnail" defaultValue={sermon.thumbnail ?? ''} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Short Description</label>
                        <input name="shortDescription" defaultValue={sermon.shortDescription ?? ''} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Full Description</label>
                        <textarea name="description" defaultValue={sermon.description} rows={4} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input name="featured" type="checkbox" value="true" defaultChecked={sermon.featured} className="h-4 w-4 rounded border-gray-300" />
                        <label className="text-sm font-medium">Featured sermon</label>
                    </div>
                </div>
                <div className="flex gap-3 pt-2">
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition">Save Changes</button>
                    <Link href="/admin/sermons" className="px-6 py-2 rounded-lg text-sm font-medium border hover:bg-slate-50 transition">Cancel</Link>
                </div>
            </form>
        </div>
    )
}
