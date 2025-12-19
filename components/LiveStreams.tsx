'use client';

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Youtube, Facebook, Radio } from "lucide-react";

export default function LiveStreams() {
    return (
        <section className="live-streams" id="live">
            <div className="container">
                <div className="section-title">
                    <h2>Live Streams</h2>
                    <p>Join our worship services from anywhere through our live streaming platforms</p>
                </div>
                <div className="streams-container">
                    <Card className="live-stream-card overflow-hidden shadow-medium hover:shadow-large border-none transition-all duration-300">
                        <CardHeader className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-6 px-6">
                            <div className="flex items-center justify-center gap-3">
                                <Facebook className="w-6 h-6" />
                                <CardTitle className="text-2xl font-semibold">Facebook Live</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="live-placeholder bg-gradient-to-br from-slate-100 to-slate-50 h-[220px] flex flex-col items-center justify-center mb-6 rounded-lg border-2 border-dashed border-slate-300 transition-all hover:border-primary">
                                <Radio className="w-12 h-12 text-slate-400 mb-3" />
                                <p className="text-slate-600 font-medium">Stream starts on Sunday at 10:00 AM</p>
                            </div>
                            <p className="mb-5 text-muted-foreground leading-relaxed text-center">
                                Experience our worship services in real-time through Facebook Live. Interact with our community through live comments.
                            </p>
                            <Button className="w-full shadow-soft hover:shadow-medium transition-smooth" asChild>
                                <a href="#" onClick={(e) => e.preventDefault()}>Watch on Facebook</a>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="live-stream-card overflow-hidden shadow-medium hover:shadow-large border-none transition-all duration-300">
                        <CardHeader className="bg-gradient-to-br from-red-600 to-red-700 text-white py-6 px-6">
                            <div className="flex items-center justify-center gap-3">
                                <Youtube className="w-6 h-6" />
                                <CardTitle className="text-2xl font-semibold">YouTube Live</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="live-placeholder bg-gradient-to-br from-slate-100 to-slate-50 h-[220px] flex flex-col items-center justify-center mb-6 rounded-lg border-2 border-dashed border-slate-300 transition-all hover:border-primary">
                                <Radio className="w-12 h-12 text-slate-400 mb-3" />
                                <p className="text-slate-600 font-medium">Stream starts on Sunday at 10:00 AM</p>
                            </div>
                            <p className="mb-5 text-muted-foreground leading-relaxed text-center">
                                Access our services from any device through YouTube Live. Enjoy high-quality streaming and engage with fellow viewers.
                            </p>
                            <Button className="w-full shadow-soft hover:shadow-medium transition-smooth" asChild>
                                <a href="#" onClick={(e) => e.preventDefault()}>Watch on YouTube</a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
