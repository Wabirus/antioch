"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMinistry, updateMinistry, MinistryData } from "@/app/actions/ministries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MinistryFormProps {
    initialData?: MinistryData & { id: string };
}

export function MinistryForm({ initialData }: MinistryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const data: MinistryData = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            leader: formData.get("leader") as string,
            meetingSchedule: formData.get("meetingSchedule") as string,
            image: formData.get("image") as string,
            category: formData.get("category") as string,
            featured: formData.get("featured") === "on",
        };

        try {
            if (initialData) {
                const result = await updateMinistry(initialData.id, data);
                if (!result.success) throw new Error(result.error);
            } else {
                const result = await createMinistry(data);
                if (!result.success) throw new Error(result.error);
            }
            router.push("/admin/ministries");
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
                    <Label htmlFor="name">Ministry Name</Label>
                    <Input id="name" name="name" required defaultValue={initialData?.name} placeholder="e.g. Worship Ministry" />
                </div>

                <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        required
                        defaultValue={initialData?.description}
                        placeholder="Ministry details..."
                        rows={5}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="leader">Leader Name</Label>
                    <Input id="leader" name="leader" required defaultValue={initialData?.leader} placeholder="e.g. Jane Doe" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="meetingSchedule">Meeting Schedule</Label>
                    <Input id="meetingSchedule" name="meetingSchedule" required defaultValue={initialData?.meetingSchedule} placeholder="e.g. Fridays 6pm" />
                </div>

                <div className="space-y-2 col-span-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" name="image" required defaultValue={initialData?.image} placeholder="https://..." />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" required defaultValue={initialData?.category} placeholder="e.g. Service, Outreach" />
                </div>

                <div className="flex items-center space-x-2 col-span-2">
                    <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked={initialData?.featured}
                    />
                    <Label htmlFor="featured">Feature this ministry</Label>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : initialData ? "Update Ministry" : "Create Ministry"}
                </Button>
            </div>
        </form>
    );
}
