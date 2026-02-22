import { notFound, redirect } from 'next/navigation'
import { getMinistryById, updateMinistry } from '../../actions'
import Link from 'next/link'

export default async function EditMinistryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const result = await getMinistryById(id)

    if ('error' in result || !result.ministry) notFound()
    const ministry = result.ministry

    async function handleUpdate(formData: FormData) {
        'use server'
        const res = await updateMinistry(id, formData)
        if (res.success) redirect('/admin/ministries')
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/ministries" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
                <h1 className="text-2xl font-bold">Edit Ministry</h1>
            </div>
            <form action={handleUpdate} className="space-y-5 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Name *</label>
                        <input name="name" defaultValue={ministry.name} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Leader *</label>
                        <input name="leader" defaultValue={ministry.leader} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category *</label>
                        <select name="category" defaultValue={ministry.category} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition">
                            <option value="">Select...</option>
                            {['Kids & Youth', 'Adults', 'Service', 'Outreach'].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Meeting Schedule *</label>
                        <input name="meetingSchedule" defaultValue={ministry.meetingSchedule} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input name="image" defaultValue={ministry.image} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Description *</label>
                        <textarea name="description" defaultValue={ministry.description} rows={4} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none" />
                    </div>
                    <div className="flex items-center gap-2">
                        <input name="featured" type="checkbox" value="true" defaultChecked={ministry.featured} className="h-4 w-4 rounded border-gray-300" />
                        <label className="text-sm font-medium">Featured ministry</label>
                    </div>
                </div>
                <div className="flex gap-3 pt-2">
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition">Save Changes</button>
                    <Link href="/admin/ministries" className="px-6 py-2 rounded-lg text-sm font-medium border hover:bg-slate-50 transition">Cancel</Link>
                </div>
            </form>
        </div>
    )
}
