import { MinistryForm } from "@/components/admin/ministries/ministry-form";

export default function NewMinistryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Ministry</h1>
                <p className="text-muted-foreground">Add a new ministry group.</p>
            </div>
            <div className="bg-card border rounded-lg p-6">
                <MinistryForm />
            </div>
        </div>
    );
}
