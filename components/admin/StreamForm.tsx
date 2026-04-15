'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createStream, updateStream } from '@/app/admin/streams/actions'
import { STREAM_STATUSES, type StreamStatus } from '@/lib/streaming/status'

type StreamFormValues = {
  title?: string
  description?: string | null
  youtubeUrl?: string | null
  facebookUrl?: string | null
  tiktokUrl?: string | null
  embedUrl?: string | null
  status?: StreamStatus
  scheduledAt?: string | null
  isActive?: boolean
}

type StreamFormProps = {
  mode: 'create' | 'edit'
  streamId?: string
  initialValues?: StreamFormValues
}

type FieldErrors = Record<string, string>

function toDatetimeLocalValue(value?: string | null): string {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  const pad = (part: number) => String(part).padStart(2, '0')

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`
}

export default function StreamForm({
  mode,
  streamId,
  initialValues,
}: StreamFormProps) {
  const router = useRouter()
  const [status, setStatus] = useState<StreamStatus>(initialValues?.status ?? 'offline')
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setFormError('')
    setFieldErrors({})

    const formData = new FormData(event.currentTarget)
    const action =
      mode === 'edit' && streamId
        ? updateStream(streamId, formData)
        : createStream(formData)
    const result = await action

    if ('success' in result && result.success) {
      router.push('/admin/streams')
      router.refresh()
      return
    }

    setFormError(result.error)
    setFieldErrors(result.fieldErrors ?? {})
    setIsSaving(false)
  }

  const titleLabel = mode === 'create' ? 'Create Stream' : 'Update Stream'
  const submitLabel = isSaving
    ? 'Saving...'
    : mode === 'create'
      ? 'Save Stream'
      : 'Save Changes'

  const currentDescription = initialValues?.description ?? ''
  const currentYoutubeUrl = initialValues?.youtubeUrl ?? ''
  const currentFacebookUrl = initialValues?.facebookUrl ?? ''
  const currentTiktokUrl = initialValues?.tiktokUrl ?? ''
  const currentEmbedUrl = initialValues?.embedUrl ?? ''
  const currentScheduledAt = toDatetimeLocalValue(initialValues?.scheduledAt ?? '')

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {formError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              required
              defaultValue={initialValues?.title ?? ''}
              placeholder="Sunday Morning Worship"
            />
            {fieldErrors.title ? <p className="text-xs text-red-600">{fieldErrors.title}</p> : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={currentDescription}
              placeholder="Brief notes for the media team or staff."
            />
            {fieldErrors.description ? (
              <p className="text-xs text-red-600">{fieldErrors.description}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtubeUrl">YouTube URL</Label>
            <Input
              id="youtubeUrl"
              name="youtubeUrl"
              type="url"
              defaultValue={currentYoutubeUrl}
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-xs text-muted-foreground">Paste your YouTube Live link.</p>
            {fieldErrors.youtubeUrl ? (
              <p className="text-xs text-red-600">{fieldErrors.youtubeUrl}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="facebookUrl">Facebook URL</Label>
            <Input
              id="facebookUrl"
              name="facebookUrl"
              type="url"
              defaultValue={currentFacebookUrl}
              placeholder="https://www.facebook.com/..."
            />
            {fieldErrors.facebookUrl ? (
              <p className="text-xs text-red-600">{fieldErrors.facebookUrl}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tiktokUrl">TikTok URL</Label>
            <Input
              id="tiktokUrl"
              name="tiktokUrl"
              type="url"
              defaultValue={currentTiktokUrl}
              placeholder="https://www.tiktok.com/@..."
            />
            {fieldErrors.tiktokUrl ? (
              <p className="text-xs text-red-600">{fieldErrors.tiktokUrl}</p>
            ) : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="embedUrl">Embed URL</Label>
            <Input
              id="embedUrl"
              name="embedUrl"
              type="url"
              defaultValue={currentEmbedUrl}
              placeholder="https://www.youtube.com/embed/live_stream?channel=..."
            />
            <p className="text-xs text-muted-foreground">
              Choose which platform to display on your website.
            </p>
            {fieldErrors.embedUrl ? (
              <p className="text-xs text-red-600">{fieldErrors.embedUrl}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(event) => setStatus(event.target.value as StreamStatus)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {STREAM_STATUSES.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
            {fieldErrors.status ? <p className="text-xs text-red-600">{fieldErrors.status}</p> : null}
          </div>

          {status === 'scheduled' ? (
            <div className="space-y-2">
              <Label htmlFor="scheduledAt">Scheduled Date and Time</Label>
              <Input
                id="scheduledAt"
                name="scheduledAt"
                type="datetime-local"
                defaultValue={currentScheduledAt}
              />
              <p className="text-xs text-muted-foreground">
                Use the local time when the stream should go live.
              </p>
              {fieldErrors.scheduledAt ? (
                <p className="text-xs text-red-600">{fieldErrors.scheduledAt}</p>
              ) : null}
            </div>
          ) : null}

          <div className="space-y-2 md:col-span-2">
            <div className="flex items-start gap-3 rounded-lg border bg-slate-50/70 px-4 py-3">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                value="true"
                defaultChecked={initialValues?.isActive ?? false}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-slate-900 focus:ring-slate-900"
              />
              <div className="space-y-1">
                <Label htmlFor="isActive">Active stream</Label>
                <p className="text-xs text-muted-foreground">
                  Only one stream can be active at a time. The live page only shows a live active stream.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-900/90 disabled:opacity-50 sm:w-auto"
          >
            {submitLabel}
          </button>
          <Link
            href="/admin/streams"
            className="inline-flex h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50 sm:w-auto"
          >
            Cancel
          </Link>
          <span className="text-xs text-muted-foreground">{titleLabel}</span>
        </div>
      </form>
    </div>
  )
}
