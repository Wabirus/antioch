export type StreamPlatform = 'youtube' | 'facebook' | 'tiktok'

const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'm.youtube.com',
  'youtu.be',
  'youtube-nocookie.com',
  'www.youtube.com',
  'www.youtube-nocookie.com',
])

const FACEBOOK_HOSTS = new Set([
  'facebook.com',
  'm.facebook.com',
  'fb.watch',
  'www.facebook.com',
])

const TIKTOK_HOSTS = new Set([
  'tiktok.com',
  'www.tiktok.com',
  'm.tiktok.com',
  'vm.tiktok.com',
  'player.tiktok.com',
])

const PLATFORM_HOSTS: Record<StreamPlatform, Set<string>> = {
  youtube: YOUTUBE_HOSTS,
  facebook: FACEBOOK_HOSTS,
  tiktok: TIKTOK_HOSTS,
}

function normalizeHostname(hostname: string): string {
  return hostname.toLowerCase().replace(/^www\./, '')
}

function parseHttpsUrl(rawUrl: string): URL | null {
  const trimmed = rawUrl.trim()

  if (!trimmed) {
    return null
  }

  try {
    const url = new URL(trimmed)

    if (url.protocol !== 'https:') {
      return null
    }

    return url
  } catch {
    return null
  }
}

function isAllowedPlatformHost(url: URL, platform: StreamPlatform): boolean {
  return PLATFORM_HOSTS[platform].has(normalizeHostname(url.hostname))
}

function canonicalizeYoutubePublicUrl(url: URL): string {
  const host = normalizeHostname(url.hostname)

  if (host === 'youtu.be') {
    const videoId = url.pathname.replace(/^\/+/, '')
    if (videoId) {
      return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`
    }
  }

  if (host === 'm.youtube.com') {
    url.hostname = 'www.youtube.com'
  }

  if (host === 'youtube-nocookie.com') {
    url.hostname = 'www.youtube-nocookie.com'
  }

  if (host === 'youtube.com' && url.hostname !== 'www.youtube.com') {
    url.hostname = 'www.youtube.com'
  }

  return url.toString()
}

function extractYoutubeVideoId(url: URL): string | null {
  const host = normalizeHostname(url.hostname)
  const segments = url.pathname.split('/').filter(Boolean)

  if (host === 'youtu.be') {
    return segments[0] ?? null
  }

  if (segments[0] === 'watch') {
    return url.searchParams.get('v')
  }

  if (segments[0] === 'shorts' || segments[0] === 'live') {
    return segments[1] ?? null
  }

  return url.searchParams.get('v')
}

function canonicalizeFacebookEmbedUrl(url: URL): string | null {
  const host = normalizeHostname(url.hostname)
  const pathname = url.pathname

  if (pathname.startsWith('/plugins/video.php') || pathname.startsWith('/plugins/post.php')) {
    if (host === 'm.facebook.com') {
      url.hostname = 'www.facebook.com'
    }

    if (!url.searchParams.get('show_text')) {
      url.searchParams.set('show_text', 'false')
    }

    return url.toString()
  }

  if (
    pathname.startsWith('/watch') ||
    pathname.includes('/videos/') ||
    host === 'fb.watch' ||
    url.searchParams.has('v') ||
    url.searchParams.has('href')
  ) {
    const embedUrl = new URL('https://www.facebook.com/plugins/video.php')
    embedUrl.searchParams.set('href', url.toString())
    embedUrl.searchParams.set('show_text', 'false')
    return embedUrl.toString()
  }

  return null
}

function canonicalizeTikTokEmbedUrl(url: URL): string | null {
  const host = normalizeHostname(url.hostname)
  const pathname = url.pathname

  if (pathname.startsWith('/embed/') || pathname.startsWith('/player/')) {
    if (host === 'm.tiktok.com') {
      url.hostname = 'www.tiktok.com'
    }

    return url.toString()
  }

  const match =
    pathname.match(/^\/@[^/]+\/video\/(\d+)/) ??
    pathname.match(/^\/video\/(\d+)/)

  if (match?.[1]) {
    return `https://www.tiktok.com/embed/v2/${match[1]}`
  }

  return null
}

export function normalizePlatformUrl(rawUrl: string, platform: StreamPlatform): string | null {
  const url = parseHttpsUrl(rawUrl)

  if (!url || !isAllowedPlatformHost(url, platform)) {
    return null
  }

  if (platform === 'youtube') {
    return canonicalizeYoutubePublicUrl(url)
  }

  if (platform === 'facebook') {
    if (normalizeHostname(url.hostname) === 'm.facebook.com') {
      url.hostname = 'www.facebook.com'
    }

    return url.toString()
  }

  if (platform === 'tiktok') {
    const host = normalizeHostname(url.hostname)

    if (host === 'm.tiktok.com') {
      url.hostname = 'www.tiktok.com'
    }

    return url.toString()
  }

  return null
}

export function normalizeStreamEmbedUrl(rawUrl: string): string | null {
  const url = parseHttpsUrl(rawUrl)

  if (!url) {
    return null
  }

  const host = normalizeHostname(url.hostname)

  if (YOUTUBE_HOSTS.has(host)) {
    if (url.pathname.startsWith('/embed/')) {
      if (host === 'youtube.com' || host === 'youtube-nocookie.com' || host === 'm.youtube.com') {
        url.hostname = 'www.youtube.com'
      }

      return url.toString()
    }

    if (url.pathname === '/live_stream' && url.searchParams.get('channel')) {
      const embedUrl = new URL('https://www.youtube.com/embed/live_stream')
      embedUrl.search = url.search
      return embedUrl.toString()
    }

    const videoId = extractYoutubeVideoId(url)

    if (!videoId) {
      return null
    }

    return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`
  }

  if (FACEBOOK_HOSTS.has(host)) {
    return canonicalizeFacebookEmbedUrl(url)
  }

  if (TIKTOK_HOSTS.has(host)) {
    return canonicalizeTikTokEmbedUrl(url)
  }

  return null
}
