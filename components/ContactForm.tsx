'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Send } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    if (status === 'success') {
        return (
            <div className="max-w-[600px] mx-auto text-center p-10 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-medium">
                <div className="flex justify-center mb-4">
                    <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="text-green-700 mb-3 text-2xl font-bold">Thank You!</h3>
                <p className="text-green-700 mb-6 text-lg">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                </p>
                <Button
                    onClick={() => setStatus('idle')}
                    size="lg"
                    variant="outline"
                    className="hover:bg-green-600 hover:text-white hover:border-green-600 transition-smooth"
                >
                    Send Another Message
                </Button>
            </div>
        );
    }

    return (
        <div className="contact-form max-w-[650px] mx-auto bg-white p-8 rounded-xl shadow-medium">
            <form id="contactForm" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold text-secondary">Name *</Label>
                    <Input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="h-12 text-base focus-visible:ring-primary"
                        placeholder="Your full name"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold text-secondary">Email *</Label>
                    <Input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="h-12 text-base focus-visible:ring-primary"
                        placeholder="your@email.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-semibold text-secondary">Phone</Label>
                    <Input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-12 text-base focus-visible:ring-primary"
                        placeholder="+254 700 000 000"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-semibold text-secondary">Message *</Label>
                    <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-[160px] text-base focus-visible:ring-primary resize-none"
                        placeholder="How can we help you?"
                    />
                </div>
                <Button
                    type="submit"
                    disabled={status === 'submitting'}
                    size="lg"
                    className="w-full text-base shadow-medium hover:shadow-large transition-smooth"
                >
                    {status === 'submitting' ? (
                        <>Sending...</>
                    ) : (
                        <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                        </>
                    )}
                </Button>
                {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-700 font-semibold text-center">
                            Failed to send message. Please try again or contact us directly.
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
}
