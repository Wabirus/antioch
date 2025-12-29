import { StaffForm } from "@/components/admin/staff/staff-form";
import { getStaffMember } from "@/app/actions/staff";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditStaffPage({ params }: PageProps) {
    const { id } = await params;
    const result = await getStaffMember(id);

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Staff</h1>
                <p className="text-muted-foreground">Update staff details.</p>
            </div>
            <div className="bg-card border rounded-lg p-6">
                <StaffForm initialData={result.data} />
            </div>
        </div>
    );
}
