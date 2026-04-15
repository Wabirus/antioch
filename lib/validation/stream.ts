import { z } from 'zod'

import { STREAM_STATUSES, type StreamStatus } from '@/lib/streaming/status'
import {
  normalizePlatformUrl,
  normalizeStreamEmbedUrl,
  type StreamPlatform,
} from '@/lib/streaming/urls'

const optionalTextSchema = z.string().trim().max(5000).optional().or(z.literal(''))
const optionalUrlSchema = z.string().trim().optional().or(z.literal(''))

const streamFormSchema = z.object({
  title: z.string().trim().min(2, 'Enter a stream title.').max(120, 'Use a shorter title.'),
  description: optionalTextSchema,
  youtubeUrl: optionalUrlSchema,
  facebookUrl: optionalUrlSchema,
  tiktokUrl: optionalUrlSchema,
  embedUrl: optionalUrlSchema,
  status: z.enum(STREAM_STATUSES),
  scheduledAt: optionalUrlSchema,
  isActive: z.boolean(),
})

export type StreamFieldName =
  | 'title'
  | 'description'
  | 'youtubeUrl'
  | 'facebookUrl'
  | 'tiktokUrl'
  | 'embedUrl'
  | 'status'
  | 'scheduledAt'

export type StreamFieldErrors = Partial<Record<StreamFieldName, string>>

export type StreamInput = {
  title: string
  description: string | null
  youtubeUrl: string | null
  facebookUrl: string | null
  tiktokUrl: string | null
  embedUrl: string | null
  status: StreamStatus
  scheduledAt: Date | null
  isActive: boolean
}

export type StreamParseResult =
  | { success: true; data: StreamInput }
  | { success: false; fieldErrors: StreamFieldErrors; formError?: string }

function getString(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value : ''
}

function mapZodErrors(error: z.ZodError): StreamFieldErrors {
  const flattened = error.flatten()
  const fieldErrors: StreamFieldErrors = {}

  for (const [key, messages] of Object.entries(flattened.fieldErrors)) {
    const message = messages?.[0]

    if (message && key in streamFieldKeys) {
      fieldErrors[key as StreamFieldName] = message
    }
  }

  return fieldErrors
}

const streamFieldKeys: Record<StreamFieldName, true> = {
  title: true,
  description: true,
  youtubeUrl: true,
  facebookUrl: true,
  tiktokUrl: true,
  embedUrl: true,
  status: true,
  scheduledAt: true,
}

function setFieldError(
  fieldErrors: StreamFieldErrors,
  field: StreamFieldName,
  message: string
) {
  if (!fieldErrors[field]) {
    fieldErrors[field] = message
  }
}

function normalizeOptional(value: string): string | null {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function parseScheduledAt(value: string): Date | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  const parsed = new Date(trimmed)

  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return parsed
}

export function parseStreamFormData(formData: FormData): StreamParseResult {
  const rawInput = {
    title: getString(formData, 'title'),
    description: getString(formData, 'description'),
    youtubeUrl: getString(formData, 'youtubeUrl'),
    facebookUrl: getString(formData, 'facebookUrl'),
    tiktokUrl: getString(formData, 'tiktokUrl'),
    embedUrl: getString(formData, 'embedUrl'),
    status: getString(formData, 'status'),
    scheduledAt: getString(formData, 'scheduledAt'),
    isActive: formData.get('isActive') === 'true',
  }

  const parsed = streamFormSchema.safeParse(rawInput)

  if (!parsed.success) {
    return {
      success: false,
      fieldErrors: mapZodErrors(parsed.error),
      formError: 'Please fix the highlighted fields.',
    }
  }

  const fieldErrors: StreamFieldErrors = {}

  const description = normalizeOptional(parsed.data.description)
  const youtubeUrl = parsed.data.youtubeUrl
    ? normalizePlatformUrl(parsed.data.youtubeUrl, 'youtube')
    : null
  const facebookUrl = parsed.data.facebookUrl
    ? normalizePlatformUrl(parsed.data.facebookUrl, 'facebook')
    : null
  const tiktokUrl = parsed.data.tiktokUrl
    ? normalizePlatformUrl(parsed.data.tiktokUrl, 'tiktok')
    : null
  const embedUrl = parsed.data.embedUrl
    ? normalizeStreamEmbedUrl(parsed.data.embedUrl)
    : null
  const scheduledAt =
    parsed.data.status === 'scheduled'
      ? parseScheduledAt(parsed.data.scheduledAt)
      : null

  if (parsed.data.youtubeUrl && !youtubeUrl) {
    setFieldError(fieldErrors, 'youtubeUrl', 'Paste a valid YouTube link.')
  }

  if (parsed.data.facebookUrl && !facebookUrl) {
    setFieldError(fieldErrors, 'facebookUrl', 'Paste a valid Facebook link.')
  }

  if (parsed.data.tiktokUrl && !tiktokUrl) {
    setFieldError(fieldErrors, 'tiktokUrl', 'Paste a valid TikTok link.')
  }

  if (parsed.data.embedUrl && !embedUrl) {
    setFieldError(
      fieldErrors,
      'embedUrl',
      'Paste a trusted embed URL from YouTube, Facebook, or TikTok.'
    )
  }

  if (parsed.data.isActive && !embedUrl) {
    setFieldError(fieldErrors, 'embedUrl', 'An active stream needs a valid embed URL.')
  }

  if (parsed.data.status === 'scheduled' && !scheduledAt) {
    setFieldError(fieldErrors, 'scheduledAt', 'Set the scheduled date and time.')
  }

  if (parsed.data.isActive && parsed.data.status === 'offline') {
    setFieldError(fieldErrors, 'status', 'Active streams cannot be offline.')
  }

  if (scheduledAt && Number.isNaN(scheduledAt.getTime())) {
    setFieldError(fieldErrors, 'scheduledAt', 'Enter a valid date and time.')
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
      formError: 'Please fix the highlighted fields.',
    }
  }

  return {
    success: true,
    data: {
      title: parsed.data.title,
      description,
      youtubeUrl,
      facebookUrl,
      tiktokUrl,
      embedUrl,
      status: parsed.data.status,
      scheduledAt,
      isActive: parsed.data.isActive,
    },
  }
}

export type StreamPlatformUrlInput = Partial<Record<StreamPlatform, string>>
