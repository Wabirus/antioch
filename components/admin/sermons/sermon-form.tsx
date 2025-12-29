"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSermon, updateSermon, SermonData } from "@/app/actions/sermons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SermonFormProps {
    initialData?: SermonData & { id: string };
}

export function SermonForm({ initialData }: SermonFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const data: SermonData = {
            title: formData.get("title") as string,
            speaker: formData.get("speaker") as string,
            date: new Date(formData.get("date") as string),
            videoUrl: formData.get("videoUrl") as string,
            thumbnail: formData.get("thumbnail") as string,
            series: formData.get("series") as string,
            description: formData.get("description") as string,
            shortDescription: formData.get("shortDescription") as string,
            featured: formData.get("featured") === "on",
            topic: formData.get("topic") as string,
            scripture: formData.get("scripture") as string,
            duration: parseInt(formData.get("duration") as string),
        };

        try {
            if (initialData) {
                const result = await updateSermon(initialData.id, data);
                if (!result.success) throw new Error(result.error);
            } else {
                const result = await createSermon(data);
                if (!result.success) throw new Error(result.error);
            }
            router.push("/admin/sermons");
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
                    <Label htmlFor="title">Sermon Title</Label>
                    <Input id="title" name="title" required defaultValue={initialData?.title} placeholder="e.g. The Power of Faith" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="speaker">Speaker</Label>
                    <Input id="speaker" name="speaker" required defaultValue={initialData?.speaker} placeholder="e.g. Pastor John Doe" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="date">Date Preached</Label>
                    <Input
                        id="date"
                        name="date"
                        type="date"
                        required
                        defaultValue={initialData?.date ? new Date(initialData.date).toISOString().slice(0, 10) : ""}
                    />
                </div>

                <div className="space-y-2 col-span-2">
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Input id="shortDescription" name="shortDescription" required defaultValue={initialData?.shortDescription} placeholder="Brief summary..." />
                </div>

                <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Full Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        required
                        defaultValue={initialData?.description}
                        placeholder="Detailed sermon notes..."
                        rows={5}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="videoUrl">Video URL</Label>
                    <Input id="videoUrl" name="videoUrl" required defaultValue={initialData?.videoUrl} placeholder="https://youtube.com/..." />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail URL</Label>
                    <Input id="thumbnail" name="thumbnail" required defaultValue={initialData?.thumbnail} placeholder="https://..." />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="series">Series (Optional)</Label>
                    <Input id="series" name="series" defaultValue={initialData?.series || ""} placeholder="e.g. Book of Romans" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input id="topic" name="topic" required defaultValue={initialData?.topic} placeholder="e.g. Faith" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="scripture">Scripture Reference</Label>
                    <Input id="scripture" name="scripture" required defaultValue={initialData?.scripture} placeholder="e.g. Romans 8:28" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input id="duration" name="duration" type="number" required defaultValue={initialData?.duration} placeholder="45" />
                </div>

                <div className="flex items-center space-x-2 col-span-2">
                    <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked={initialData?.featured}
                    />
                    <Label htmlFor="featured">Feature this sermon</Label>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : initialData ? "Update Sermon" : "Create Sermon"}
                </Button>
            </div>
        </form>
    );
}
