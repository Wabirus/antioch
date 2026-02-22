'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createMinistry } from '../actions'

export default function CreateMinistryPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError('')

        const formData = new FormData(event.currentTarget)
        const result = await createMinistry(formData)

        if (result?.error) {
            setError(result.error)
            setIsLoading(false)
        } else {
            router.push('/admin/ministries')
            router.refresh()
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center space-x-2">
                <Link href="/admin/ministries" className="text-sm font-medium text-muted-foreground hover:text-slate-900">
                    &larr; Back to Ministries
                </Link>
            </div>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Add New Ministry</h2>
            </div>
            <div className="rounded-md border p-6">
                <form onSubmit={onSubmit} className="space-y-4 max-w-2xl">
                    {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none">Ministry Name</label>
                            <input id="name" name="name" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium leading-none">Category (e.g. Adults, Youth)</label>
                            <input id="category" name="category" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="leader" className="text-sm font-medium leading-none">Ministry Leader</label>
                            <input id="leader" name="leader" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="meetingSchedule" className="text-sm font-medium leading-none">Meeting Schedule</label>
                            <input id="meetingSchedule" name="meetingSchedule" required placeholder="e.g. Sundays at 9:00 AM" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="image" className="text-sm font-medium leading-none">Cover Image URL / Hash</label>
                        <input id="image" name="image" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium leading-none">Full Description</label>
                        <textarea id="description" name="description" required rows={5} className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                    </div>

                    <div className="flex items-center space-x-2 py-2">
                        <input type="checkbox" id="featured" name="featured" value="true" className="h-4 w-4 rounded border-gray-300 text-slate-900 focus:ring-slate-900" />
                        <label htmlFor="featured" className="text-sm font-medium leading-none">Feature this ministry on the homepage?</label>
                    </div>

                    <button disabled={isLoading} type="submit" className="bg-slate-900 text-white hover:bg-slate-900/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:opacity-50 w-full md:w-auto">
                        {isLoading ? 'Saving...' : 'Save Ministry'}
                    </button>
                </form>
            </div>
        </div>
    )
}
