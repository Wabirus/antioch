import Link from "next/link";
import { getStaffMembers, deleteStaff } from "@/app/actions/staff";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Mail, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming Avatar component exists or I might need to use standard img

export default async function StaffPage() {
    const result = await getStaffMembers();
    const staffMembers = result.success ? result.data : [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
                    <p className="text-muted-foreground">
                        Manage church staff and leadership team.
                    </p>
                </div>
                <Link href="/admin/staff/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Staff
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {staffMembers?.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        No staff members found. Add one to get started.
                    </div>
                ) : (
                    staffMembers?.map((staff: any) => (
                        <Card key={staff.id}>
                            <CardHeader className="flex flex-row items-center gap-4 p-4">
                                <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={staff.image || "/placeholder-avatar.jpg"} alt={staff.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-base line-clamp-1">{staff.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground line-clamp-1">{staff.position}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <div className="flex items-center text-sm text-muted-foreground gap-2 mb-4">
                                    <Mail className="h-3 w-3" />
                                    {staff.email || "No email"}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Link href={`/admin/staff/${staff.id}`}>
                                        <Button variant="outline" size="sm">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <form action={async () => {
                                        "use server"
                                        await deleteStaff(staff.id)
                                    }}>
                                        <Button variant="destructive" size="sm" type="submit">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
