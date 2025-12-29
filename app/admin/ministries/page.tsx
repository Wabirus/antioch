import Link from "next/link";
import { getMinistries, deleteMinistry } from "@/app/actions/ministries";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Users, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function MinistriesPage() {
    const result = await getMinistries();
    const ministries = result.success ? result.data : [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Ministries</h1>
                    <p className="text-muted-foreground">
                        Manage church ministries and groups.
                    </p>
                </div>
                <Link href="/admin/ministries/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Ministry
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {ministries?.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        No ministries found. Create one to get started.
                    </div>
                ) : (
                    ministries?.map((ministry: any) => (
                        <Card key={ministry.id}>
                            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={ministry.image || "/placeholder.jpg"}
                                    alt={ministry.name}
                                    className="object-cover w-full h-full"
                                />
                                {ministry.featured && (
                                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs rounded-full">
                                        Featured
                                    </div>
                                )}
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle className="line-clamp-1">{ministry.name}</CardTitle>
                                <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
                                    <Users className="h-3 w-3" />
                                    {ministry.leader}
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <Clock className="h-3 w-3" />
                                    {ministry.meetingSchedule}
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 flex justify-end gap-2">
                                <Link href={`/admin/ministries/${ministry.id}`}>
                                    <Button variant="outline" size="sm">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <form action={async () => {
                                    "use server"
                                    await deleteMinistry(ministry.id)
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
