import { EventForm } from "@/components/admin/events/event-form";

export default function NewEventPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Event</h1>
                <p className="text-muted-foreground">Add a new event to the calendar.</p>
            </div>
            <div className="bg-card border rounded-lg p-6">
                <EventForm />
            </div>
        </div>
    );
}
