export const STREAM_STATUSES = ['offline', 'live', 'scheduled'] as const

export type StreamStatus = (typeof STREAM_STATUSES)[number]

export const STREAM_STATUS_LABELS: Record<StreamStatus, string> = {
  offline: 'Offline',
  live: 'LIVE',
  scheduled: 'Scheduled',
}

export const STREAM_STATUS_BADGE_STYLES: Record<StreamStatus, string> = {
  offline: 'border-slate-200 bg-slate-100 text-slate-700',
  live: 'border-red-200 bg-red-50 text-red-700',
  scheduled: 'border-amber-200 bg-amber-50 text-amber-700',
}

export function isStreamStatus(value: string): value is StreamStatus {
  return (STREAM_STATUSES as readonly string[]).includes(value)
}
