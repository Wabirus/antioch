'use client';

import Link from 'next/link'
import { Radio } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { siteConfig } from '@/lib/site'

export default function LiveStreams() {
    return (
        <section className="live-streams" id="live">
            <div className="container">
                <div className="section-title">
                    <h2>Live Stream</h2>
                    <p>Watch the current service when Antioch is live.</p>
                </div>

                <Card className="overflow-hidden border-none shadow-medium">
                    <CardHeader className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-6 text-white">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                                <Radio className="h-5 w-5" />
                            </span>
                            <div>
                                <CardTitle className="text-2xl font-semibold text-white">
                                    Watch Live
                                </CardTitle>
                                <CardDescription className="text-slate-300">
                                    The active stream appears on the live page only when the service is live.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <p className="mb-5 text-muted-foreground leading-relaxed">
                            Join the service from anywhere. The dashboard selects the current stream and renders it on the public live page.
                        </p>
                        <Button className="w-full shadow-soft hover:shadow-medium transition-smooth" asChild>
                            <Link href={siteConfig.livestreamPath}>Watch Live</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
