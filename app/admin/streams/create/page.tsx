import Link from 'next/link'
import { redirect } from 'next/navigation'

import { requireAdminAccess } from '@/lib/admin-auth'
import StreamForm from '@/components/admin/StreamForm'

export const dynamic = 'force-dynamic'

export default async function CreateStreamPage() {
  const access = await requireAdminAccess()

  if (!access.ok) {
    redirect(access.reason === 'unauthenticated' ? '/admin/login' : '/admin')
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Link href="/admin/streams" className="text-sm font-medium text-muted-foreground hover:text-slate-900">
        &larr; Back to Streams
      </Link>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Add New Stream</h2>
        <p className="max-w-2xl text-muted-foreground">
          Store the public links and embed URL here. RTMP details and stream keys stay outside the app.
        </p>
      </div>

      <StreamForm mode="create" />
    </div>
  )
}
