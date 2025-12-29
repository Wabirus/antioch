import { StaffForm } from "@/components/admin/staff/staff-form";

export default function NewStaffPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add Staff</h1>
                <p className="text-muted-foreground">Add a new staff member to the team.</p>
            </div>
            <div className="bg-card border rounded-lg p-6">
                <StaffForm />
            </div>
        </div>
    );
}
