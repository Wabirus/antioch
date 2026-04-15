"use client";

import { useState } from "react";
import { Heart, Lock, Send } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function PrayerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        title="Prayer Requests"
        description="We believe prayer matters deeply. Share a request and our team will stand with you."
        gradient="gold"
      />

      <section className="py-16 md:py-20">
        <div className="container max-w-5xl">
          <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-6">
              <Card className="border-none shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lock className="h-5 w-5 text-primary" />
                    Confidentiality
                  </CardTitle>
                </CardHeader>
                <CardContent className="leading-7 text-slate-600">
                  Your privacy matters. You can indicate whether your request should
                  remain with church staff only.
                </CardContent>
              </Card>

              <Card className="border-none bg-primary text-white shadow-soft">
                <CardHeader>
                  <CardTitle>Scripture</CardTitle>
                </CardHeader>
                <CardContent className="leading-7 text-sky-50">
                  “Do not be anxious about anything, but in every situation, by
                  prayer and petition, with thanksgiving, present your requests to
                  God.”
                  <p className="mt-4 font-semibold text-white">Philippians 4:6</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-medium">
              <CardHeader>
                <CardTitle>Submit a Request</CardTitle>
                <CardDescription>
                  Share as much or as little as you are comfortable with.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Heart className="h-8 w-8 fill-current" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-950">
                      Request Received
                    </h3>
                    <p className="mt-3 text-slate-600">
                      Thank you for sharing. Our team will be praying for you.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="mt-6"
                    >
                      Send Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input id="firstName" placeholder="First name" required />
                      <Input id="lastName" placeholder="Last name" required />
                    </div>
                    <Input id="email" type="email" placeholder="Email address" />
                    <Textarea
                      id="request"
                      placeholder="How can we pray for you?"
                      className="min-h-36"
                      required
                    />
                    <label className="flex items-start gap-3 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={isPrivate}
                        onChange={(event) => setIsPrivate(event.target.checked)}
                      />
                      <span>
                        Keep this request confidential with church staff only.
                        {isPrivate ? " This request will not be shared more broadly." : ""}
                      </span>
                    </label>
                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Send Request
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
