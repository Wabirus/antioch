"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent, EventData } from "@/app/actions/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; // Need to ensure this exists or use standard input
// import { DatePicker } from "@/components/ui/date-picker"; // Might need to just use input type="datetime-local" for speed

interface EventFormProps {
    initialData?: EventData & { id: string };
}

export function EventForm({ initialData }: EventFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const data: EventData = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            image: formData.get("image") as string,
            startTime: new Date(formData.get("startTime") as string),
            endTime: formData.get("endTime") ? new Date(formData.get("endTime") as string) : null,
            location: formData.get("location") as string,
            category: formData.get("category") as string,
            actionLabel: formData.get("actionLabel") as string,
            actionUrl: formData.get("actionUrl") as string,
            featured: formData.get("featured") === "on",
        };

        try {
            if (initialData) {
                const result = await updateEvent(initialData.id, data);
                if (!result.success) throw new Error(result.error);
            } else {
                const result = await createEvent(data);
                if (!result.success) throw new Error(result.error);
            }
            router.push("/admin/events");
            router.refresh();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-6 max-w-2xl">
            {error && (
                <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">
                    {error}
                </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 col-span-2">
                    <Label htmlFor="title">Event Title</Label>
                    <Input id="title" name="title" required defaultValue={initialData?.title} placeholder="e.g. Sunday Service" />
                </div>

                <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        required
                        defaultValue={initialData?.description}
                        placeholder="Event details..."
                        rows={5}
                    />
                </div>

                <div className="space-y-2 col-span-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" name="image" required defaultValue={initialData?.image} placeholder="https://..." />
                    <p className="text-xs text-muted-foreground">Enter a URL for the event image.</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                        id="startTime"
                        name="startTime"
                        type="datetime-local"
                        required
                        defaultValue={initialData?.startTime ? new Date(initialData.startTime).toISOString().slice(0, 16) : ""}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="endTime">End Time (Optional)</Label>
                    <Input
                        id="endTime"
                        name="endTime"
                        type="datetime-local"
                        defaultValue={initialData?.endTime ? new Date(initialData.endTime).toISOString().slice(0, 16) : ""}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" required defaultValue={initialData?.location} placeholder="e.g. Main Sanctuary" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" required defaultValue={initialData?.category} placeholder="e.g. Worship, Youth" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="actionLabel">Action Label (Optional)</Label>
                    <Input id="actionLabel" name="actionLabel" defaultValue={initialData?.actionLabel || ""} placeholder="e.g. Register Now" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="actionUrl">Action URL (Optional)</Label>
                    <Input id="actionUrl" name="actionUrl" defaultValue={initialData?.actionUrl || ""} placeholder="https://..." />
                </div>

                <div className="flex items-center space-x-2 col-span-2"> // Corrected checkbox implementation
                    <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked={initialData?.featured}
                    />
                    <Label htmlFor="featured">Feature this event on home page</Label>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : initialData ? "Update Event" : "Create Event"}
                </Button>
            </div>
        </form>
    );
}
