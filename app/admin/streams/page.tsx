import Link from 'next/link'
import { redirect } from 'next/navigation'

import { deleteStream, getStreams } from './actions'
import { requireAdminAccess } from '@/lib/admin-auth'
import {
  STREAM_STATUS_BADGE_STYLES,
  STREAM_STATUS_LABELS,
} from '@/lib/streaming/status'

export const dynamic = 'force-dynamic'

export default async function StreamsPage() {
  const access = await requireAdminAccess()

  if (!access.ok) {
    redirect(access.reason === 'unauthenticated' ? '/admin/login' : '/admin')
  }

  const { streams, error } = await getStreams()

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col gap-4 space-y-2 md:flex-row md:items-start md:justify-between md:space-y-0">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Manage Streams</h2>
          <p className="max-w-2xl text-muted-foreground">
            Control the public embed, platform links, and which stream is active on the live page.
          </p>
        </div>
        <Link
          href="/admin/streams/create"
          className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-900/90"
        >
          Add New Stream
        </Link>
      </div>

      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b bg-slate-50/50">
              <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Stream</th>
              <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Status</th>
              <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Scheduled</th>
              <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Active</th>
              <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Updated</th>
              <th className="h-12 px-4 text-right font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {streams?.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  No streams found.
                </td>
              </tr>
            ) : (
              streams?.map((stream) => (
                <tr
                  key={stream.id}
                  className={`border-b transition-colors hover:bg-slate-50/50 ${
                    stream.isActive ? 'bg-red-50/30' : ''
                  }`}
                >
                  <td className="p-4 align-top">
                    <div className="space-y-1">
                      <p className="font-medium text-slate-900">{stream.title}</p>
                      {stream.description ? (
                        <p className="max-w-xl text-xs text-muted-foreground">{stream.description}</p>
                      ) : (
                        <p className="text-xs text-muted-foreground italic">No description provided.</p>
                      )}
                    </div>
                  </td>
                  <td className="p-4 align-top">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        STREAM_STATUS_BADGE_STYLES[stream.status]
                      }`}
                    >
                      {STREAM_STATUS_LABELS[stream.status]}
                    </span>
                  </td>
                  <td className="p-4 align-top text-muted-foreground">
                    {stream.scheduledAt
                      ? new Date(stream.scheduledAt).toLocaleString()
                      : '—'}
                  </td>
                  <td className="p-4 align-top">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${
                        stream.isActive
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-slate-100 text-slate-600'
                      }`}
                    >
                      {stream.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 align-top text-muted-foreground">
                    {new Date(stream.updatedAt).toLocaleString()}
                  </td>
                  <td className="p-4 align-top text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/streams/${stream.id}/edit`} className="text-blue-600 hover:underline">
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          'use server'
                          await deleteStream(stream.id)
                        }}
                        className="inline"
                      >
                        <button type="submit" className="text-red-600 hover:underline">
                          Delete
                        </button>
                      </form>
                    </div>
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
