import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import StreamForm from '@/components/admin/StreamForm'
import { requireAdminAccess } from '@/lib/admin-auth'
import { getStreamById } from '../../actions'

export const dynamic = 'force-dynamic'

export default async function EditStreamPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const access = await requireAdminAccess()

  if (!access.ok) {
    redirect(access.reason === 'unauthenticated' ? '/admin/login' : '/admin')
  }

  const result = await getStreamById(id)

  if ('error' in result || !result.stream) {
    notFound()
  }

  const stream = result.stream

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-8 pt-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/streams" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back
        </Link>
        <h1 className="text-2xl font-bold">Edit Stream</h1>
      </div>

      <StreamForm
        mode="edit"
        streamId={stream.id}
        initialValues={{
          title: stream.title,
          description: stream.description ?? '',
          youtubeUrl: stream.youtubeUrl ?? '',
          facebookUrl: stream.facebookUrl ?? '',
          tiktokUrl: stream.tiktokUrl ?? '',
          embedUrl: stream.embedUrl ?? '',
          status: stream.status,
          scheduledAt: stream.scheduledAt ? stream.scheduledAt.toISOString() : '',
          isActive: stream.isActive,
        }}
      />
    </div>
  )
}
