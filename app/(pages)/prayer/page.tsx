"use client";

import { useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Assuming we have this
import { Send, Lock, Heart } from "lucide-react";

export default function PrayerPage() {
    const [submitted, setSubmitted] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, we would send this data to an API
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <PageHero
                title="Prayer Requests"
                description="We believe in the power of prayer. How can we pray for you today?"
                gradient="gold"
            />

            <section className="py-20">
                <div className="container max-w-4xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Sidebar / Info */}
                        <div className="md:col-span-1 space-y-6">
                            <Card className="bg-white border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Lock className="w-5 h-5 text-primary" />
                                        Confidentiality
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    <p className="mb-4">
                                        Your privacy is important to us. You can choose to share your request with our prayer team or keep it confidential with the pastoral staff only.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-primary text-white border-none shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-lg text-white">Scripture</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-blue-100 italic">
                                    "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
                                    <br /><br />
                                    <span className="font-semibold not-italic">- Philippians 4:6</span>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Form Section */}
                        <div className="md:col-span-2">
                            <Card className="border-none shadow-md">
                                <CardHeader>
                                    <CardTitle>Submit a Request</CardTitle>
                                    <CardDescription>
                                        Fill out the form below. We recount it a privilege to stand with you in prayer.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {submitted ? (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Heart className="w-8 h-8 fill-current" />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-2">Request Received</h3>
                                            <p className="text-muted-foreground mb-6">
                                                Thank you for sharing your request. Our team will be praying for you.
                                            </p>
                                            <Button onClick={() => setSubmitted(false)} variant="outline">
                                                Send Another Request
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label htmlFor="firstName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">First Name</label>
                                                    <Input id="firstName" placeholder="Jane" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="lastName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Last Name</label>
                                                    <Input id="lastName" placeholder="Doe" required />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email (Optional)</label>
                                                <Input id="email" type="email" placeholder="jane.doe@example.com" />
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="request" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Your Prayer Request</label>
                                                <textarea
                                                    id="request"
                                                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                    placeholder="How can we pray for you?"
                                                    required
                                                />
                                            </div>

                                            <div className="flex items-start gap-3 pt-2">
                                                <input
                                                    type="checkbox"
                                                    id="private"
                                                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                    checked={isPrivate}
                                                    onChange={(e) => setIsPrivate(e.target.checked)}
                                                />
                                                <div className="grid gap-1.5 leading-none">
                                                    <label
                                                        htmlFor="private"
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        Keep confidential (Staff only)
                                                    </label>
                                                    <p className="text-sm text-muted-foreground">
                                                        If checked, this request will not be shared with the wider prayer team.
                                                    </p>
                                                </div>
                                            </div>

                                            <Button type="submit" className="w-full">
                                                <Send className="w-4 h-4 mr-2" /> Send Request
                                            </Button>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
