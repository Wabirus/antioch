import { notFound, redirect } from 'next/navigation'
import { getStaffById, updateStaff } from '../../actions'
import Link from 'next/link'

export default async function EditStaffPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const result = await getStaffById(id)

    if ('error' in result || !result.staff) notFound()
    const member = result.staff

    async function handleUpdate(formData: FormData) {
        'use server'
        const res = await updateStaff(id, formData)
        if (res.success) redirect('/admin/staff')
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/staff" className="text-sm text-muted-foreground hover:text-foreground">← Back</Link>
                <h1 className="text-2xl font-bold">Edit Staff Member</h1>
            </div>
            <form action={handleUpdate} className="space-y-5 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name *</label>
                        <input name="name" defaultValue={member.name} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Position / Title *</label>
                        <input name="position" defaultValue={member.position} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category *</label>
                        <select name="category" defaultValue={member.category} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition">
                            <option value="">Select...</option>
                            {['Leadership', 'Pastoral', 'Support'].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Display Order *</label>
                        <input name="displayOrder" type="number" defaultValue={member.displayOrder} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input name="email" type="email" defaultValue={member.email ?? ''} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Photo URL</label>
                        <input name="image" defaultValue={member.image} className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Bio *</label>
                        <textarea name="bio" defaultValue={member.bio} rows={5} required className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition resize-none" />
                    </div>
                </div>
                <div className="flex gap-3 pt-2">
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition">Save Changes</button>
                    <Link href="/admin/staff" className="px-6 py-2 rounded-lg text-sm font-medium border hover:bg-slate-50 transition">Cancel</Link>
                </div>
            </form>
        </div>
    )
}
