import Link from "next/link";
import { getSermons, deleteSermon } from "@/app/actions/sermons";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SermonsPage() {
    const result = await getSermons();
    const sermons = result.success ? result.data : [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Sermons</h1>
                    <p className="text-muted-foreground">
                        Manage sermon recordings and details.
                    </p>
                </div>
                <Link href="/admin/sermons/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Sermon
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sermons?.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        No sermons found. Upload one to get started.
                    </div>
                ) : (
                    sermons?.map((sermon) => (
                        <Card key={sermon.id}>
                            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={sermon.thumbnail || "/placeholder.jpg"}
                                    alt={sermon.title}
                                    className="object-cover w-full h-full"
                                />
                                {sermon.featured && (
                                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded-full">
                                        Featured
                                    </div>
                                )}
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle className="line-clamp-1">{sermon.title}</CardTitle>
                                <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
                                    <User className="h-3 w-3" />
                                    {sermon.speaker}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(sermon.date).toLocaleDateString()}
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 flex justify-end gap-2">
                                <Link href={`/admin/sermons/${sermon.id}`}>
                                    <Button variant="outline" size="sm">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <form action={async () => {
                                    "use server"
                                    await deleteSermon(sermon.id)
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
