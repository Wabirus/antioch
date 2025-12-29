"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStaff, updateStaff, StaffData } from "@/app/actions/staff";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface StaffFormProps {
    initialData?: StaffData & { id: string };
}

export function StaffForm({ initialData }: StaffFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const data: StaffData = {
            name: formData.get("name") as string,
            position: formData.get("position") as string,
            bio: formData.get("bio") as string,
            image: formData.get("image") as string,
            email: formData.get("email") as string,
            category: formData.get("category") as string,
            displayOrder: parseInt(formData.get("displayOrder") as string),
        };

        try {
            if (initialData) {
                const result = await updateStaff(initialData.id, data);
                if (!result.success) throw new Error(result.error);
            } else {
                const result = await createStaff(data);
                if (!result.success) throw new Error(result.error);
            }
            router.push("/admin/staff");
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
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" required defaultValue={initialData?.name} placeholder="e.g. Rev. John Smith" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="position">Position/Role</Label>
                    <Input id="position" name="position" required defaultValue={initialData?.position} placeholder="e.g. Senior Pastor" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue={initialData?.email || ""} placeholder="john@example.com" />
                </div>

                <div className="space-y-2 col-span-2">
                    <Label htmlFor="bio">Biography</Label>
                    <Textarea
                        id="bio"
                        name="bio"
                        required
                        defaultValue={initialData?.bio}
                        placeholder="Staff bio..."
                        rows={5}
                    />
                </div>

                <div className="space-y-2 col-span-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input id="image" name="image" required defaultValue={initialData?.image} placeholder="https://..." />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" required defaultValue={initialData?.category} placeholder="e.g. Leadership, Admin" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="displayOrder">Display Order</Label>
                    <Input id="displayOrder" name="displayOrder" type="number" required defaultValue={initialData?.displayOrder || 1} placeholder="1" />
                    <p className="text-xs text-muted-foreground">Lower numbers appear first.</p>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : initialData ? "Update Staff" : "Create Staff"}
                </Button>
            </div>
        </form>
    );
}
