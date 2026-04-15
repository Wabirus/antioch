import { normalizePlatformUrl, normalizeStreamEmbedUrl } from '@/lib/streaming/urls'
import { parseStreamFormData } from '@/lib/validation/stream'

describe('streaming validation', () => {
  it('normalizes YouTube embed URLs', () => {
    expect(
      normalizeStreamEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    ).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  })

  it('rejects non-https or unapproved embed hosts', () => {
    expect(normalizeStreamEmbedUrl('http://example.com/embed')).toBeNull()
    expect(normalizeStreamEmbedUrl('https://example.com/embed')).toBeNull()
  })

  it('normalizes public platform links', () => {
    expect(
      normalizePlatformUrl('https://youtu.be/dQw4w9WgXcQ', 'youtube')
    ).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
  })

  it('requires an embed URL for active streams', () => {
    const formData = new FormData()
    formData.set('title', 'Sunday Service')
    formData.set('status', 'live')
    formData.set('isActive', 'true')

    const result = parseStreamFormData(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.fieldErrors.embedUrl).toBe('An active stream needs a valid embed URL.')
    }
  })

  it('requires a scheduled date for scheduled streams', () => {
    const formData = new FormData()
    formData.set('title', 'Sunday Service')
    formData.set('status', 'scheduled')
    formData.set('isActive', 'false')

    const result = parseStreamFormData(formData)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.fieldErrors.scheduledAt).toBe('Set the scheduled date and time.')
    }
  })
})
