import { PageHero } from '@/components/ui/PageHero'
import LiveStreamPlayer from '@/components/streaming/LiveStreamPlayer'
import { getActiveLiveStream } from '@/app/admin/streams/actions'

export const metadata = {
  title: 'Live Stream | Antioch Independent Baptist Churches of Kenya',
  description: 'Watch the current Antioch live stream from anywhere.',
}

export const dynamic = 'force-dynamic'

export default async function LiveStreamPage() {
  const { stream } = await getActiveLiveStream()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/50">
      <PageHero
        title="Live Stream"
        description="The current service appears here when a stream is active and live."
        gradient="blue"
      >
        {stream ? (
          <div className="mx-auto flex max-w-3xl flex-col gap-2 text-sm md:flex-row md:items-center md:justify-center">
            <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1 font-semibold text-red-700">
              🔴 LIVE
            </span>
            <span className="text-white/90">{stream.title}</span>
          </div>
        ) : null}
      </PageHero>

      <section className="py-12 md:py-16">
        <div className="container max-w-5xl space-y-6">
          <LiveStreamPlayer
            embedUrl={stream?.embedUrl ?? null}
            title={stream?.title ?? null}
            status={stream?.status ?? null}
            youtubeUrl={stream?.youtubeUrl ?? null}
            facebookUrl={stream?.facebookUrl ?? null}
            tiktokUrl={stream?.tiktokUrl ?? null}
          />
          {stream?.description ? (
            <p className="text-sm text-muted-foreground">{stream.description}</p>
          ) : null}
        </div>
      </section>
    </div>
  )
}
