import Link from "next/link";
import { getEvents, deleteEvent } from "@/app/actions/events";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import DeleteButton from "./_components/delete-button"; // We might need a client component for delete confirmation

export default async function EventsPage() {
    const result = await getEvents();
    const events = result.success ? result.data : [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Events</h1>
                    <p className="text-muted-foreground">
                        Manage upcoming church events.
                    </p>
                </div>
                <Link href="/admin/events/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Event
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events?.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        No events found. Create one to get started.
                    </div>
                ) : (
                    events?.map((event: any) => (
                        <Card key={event.id}>
                            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={event.image || "/placeholder.jpg"}
                                    alt={event.title}
                                    className="object-cover w-full h-full"
                                />
                                {event.featured && (
                                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded-full">
                                        Featured
                                    </div>
                                )}
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                                <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(event.startTime).toLocaleDateString()}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <MapPin className="h-3 w-3" />
                                    {event.location}
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 flex justify-end gap-2">
                                <Link href={`/admin/events/${event.id}`}>
                                    <Button variant="outline" size="sm">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <form action={async () => {
                                    "use server"
                                    await deleteEvent(event.id)
                                }}>
                                    <Button variant="destructive" size="sm" type="submit">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
