import { EventForm } from "@/components/admin/events/event-form";
import { getEvent } from "@/app/actions/events";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: PageProps) {
    const { id } = await params;
    const result = await getEvent(id);

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Event</h1>
                <p className="text-muted-foreground">Update event details.</p>
            </div>
            <div className="bg-card border rounded-lg p-6">
                <EventForm initialData={result.data} />
            </div>
        </div>
    );
}
