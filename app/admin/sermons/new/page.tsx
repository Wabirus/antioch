import { SermonForm } from "@/components/admin/sermons/sermon-form";

export default function NewSermonPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Create Sermon</h1>
                <p className="text-muted-foreground">Add a new sermon recording.</p>
            </div>
            <div className="bg-card border rounded-lg p-6">
                <SermonForm />
            </div>
        </div>
    );
}
