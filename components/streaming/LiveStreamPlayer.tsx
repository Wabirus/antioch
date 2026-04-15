import type { StreamStatus } from '@/lib/streaming/status'
import { STREAM_STATUS_LABELS } from '@/lib/streaming/status'
import {
  normalizePlatformUrl,
  normalizeStreamEmbedUrl,
} from '@/lib/streaming/urls'

import styles from './LiveStreamPlayer.module.css'

interface LiveStreamPlayerProps {
  embedUrl?: string | null
  title?: string | null
  status?: StreamStatus | null
  youtubeUrl?: string | null
  facebookUrl?: string | null
  tiktokUrl?: string | null
}

type PlatformLink = {
  label: string
  href: string
}

const STATUS_CLASS_BY_VALUE: Record<StreamStatus, string> = {
  offline: styles.statusOffline,
  live: styles.statusLive,
  scheduled: styles.statusScheduled,
}

function buildPlatformLinks(props: Pick<LiveStreamPlayerProps, 'youtubeUrl' | 'facebookUrl' | 'tiktokUrl'>) {
  const links: PlatformLink[] = []

  const youtubeUrl = props.youtubeUrl ? normalizePlatformUrl(props.youtubeUrl, 'youtube') : null
  const facebookUrl = props.facebookUrl ? normalizePlatformUrl(props.facebookUrl, 'facebook') : null
  const tiktokUrl = props.tiktokUrl ? normalizePlatformUrl(props.tiktokUrl, 'tiktok') : null

  if (youtubeUrl) {
    links.push({ label: 'Watch on YouTube', href: youtubeUrl })
  }

  if (facebookUrl) {
    links.push({ label: 'Watch on Facebook', href: facebookUrl })
  }

  if (tiktokUrl) {
    links.push({ label: 'Watch on TikTok', href: tiktokUrl })
  }

  return links
}

export default function LiveStreamPlayer({
  embedUrl,
  title,
  status,
  youtubeUrl,
  facebookUrl,
  tiktokUrl,
}: LiveStreamPlayerProps) {
  const safeEmbedUrl = embedUrl ? normalizeStreamEmbedUrl(embedUrl) : null
  const platformLinks = buildPlatformLinks({ youtubeUrl, facebookUrl, tiktokUrl })

  if (!safeEmbedUrl) {
    return (
      <div className={styles.fallback}>
        <p>No live stream is currently available. Please check back later.</p>
      </div>
    )
  }

  return (
    <div className={styles.playerShell}>
      {(title || status || platformLinks.length > 0) ? (
        <div className={styles.playerHeader}>
          <div className={styles.playerMeta}>
            {title ? <h2 className={styles.playerTitle}>{title}</h2> : null}
            {status ? (
              <span
                className={`${styles.statusBadge} ${STATUS_CLASS_BY_VALUE[status]}`}
              >
                {STREAM_STATUS_LABELS[status]}
              </span>
            ) : null}
          </div>

          {platformLinks.length > 0 ? (
            <div className={styles.platformLinks}>
              {platformLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.platformLink}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className={styles.videoWrap}>
        <iframe
          src={safeEmbedUrl}
          title={title ? `${title} live stream` : 'Live stream'}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  )
}
