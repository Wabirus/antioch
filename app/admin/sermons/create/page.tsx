'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createSermon } from '../actions'

export default function CreateSermonPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError('')

        const formData = new FormData(event.currentTarget)
        const result = await createSermon(formData)

        if (result?.error) {
            setError(result.error)
            setIsLoading(false)
        } else {
            router.push('/admin/sermons')
            router.refresh()
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center space-x-2">
                <Link href="/admin/sermons" className="text-sm font-medium text-muted-foreground hover:text-slate-900">
                    &larr; Back to Sermons
                </Link>
            </div>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Add New Sermon</h2>
            </div>
            <div className="rounded-md border p-6">
                <form onSubmit={onSubmit} className="space-y-4 max-w-2xl">
                    {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium leading-none">Title</label>
                            <input id="title" name="title" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="speaker" className="text-sm font-medium leading-none">Speaker</label>
                            <input id="speaker" name="speaker" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="date" className="text-sm font-medium leading-none">Date</label>
                            <input type="date" id="date" name="date" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="series" className="text-sm font-medium leading-none">Series (Optional)</label>
                            <input id="series" name="series" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="videoUrl" className="text-sm font-medium leading-none">YouTube Video URL</label>
                        <input id="videoUrl" name="videoUrl" required placeholder="https://youtube.com/watch?v=..." className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="thumbnail" className="text-sm font-medium leading-none">Thumbnail Image Hash / URL</label>
                        <input id="thumbnail" name="thumbnail" required placeholder="v17.../thumbnail.jpg" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="topic" className="text-sm font-medium leading-none">Core Topic</label>
                            <input id="topic" name="topic" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="scripture" className="text-sm font-medium leading-none">Scripture Reference</label>
                            <input id="scripture" name="scripture" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="duration" className="text-sm font-medium leading-none">Duration (Mins)</label>
                            <input type="number" id="duration" name="duration" required defaultValue={45} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="shortDescription" className="text-sm font-medium leading-none">Short Description (Summary)</label>
                        <textarea id="shortDescription" name="shortDescription" required rows={2} className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium leading-none">Full Description</label>
                        <textarea id="description" name="description" required rows={5} className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                    </div>

                    <div className="flex items-center space-x-2 py-2">
                        <input type="checkbox" id="featured" name="featured" value="true" className="h-4 w-4 rounded border-gray-300 text-slate-900 focus:ring-slate-900" />
                        <label htmlFor="featured" className="text-sm font-medium leading-none">Feature this sermon on the homepage?</label>
                    </div>

                    <button disabled={isLoading} type="submit" className="bg-slate-900 text-white hover:bg-slate-900/90 h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:opacity-50 w-full md:w-auto">
                        {isLoading ? 'Saving...' : 'Save Sermon'}
                    </button>
                </form>
            </div>
        </div>
    )
}
