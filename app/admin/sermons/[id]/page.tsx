import { SermonForm } from "@/components/admin/sermons/sermon-form";
import { getSermon } from "@/app/actions/sermons";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditSermonPage({ params }: PageProps) {
    const { id } = await params;
    const result = await getSermon(id);

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Sermon</h1>
                <p className="text-muted-foreground">Update sermon details.</p>
            </div>
            <div className="bg-card border rounded-lg p-6">
                <SermonForm initialData={result.data} />
            </div>
        </div>
    );
}
