import { MinistryForm } from "@/components/admin/ministries/ministry-form";
import { getMinistry } from "@/app/actions/ministries";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditMinistryPage({ params }: PageProps) {
    const { id } = await params;
    const result = await getMinistry(id);

    if (!result.success || !result.data) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Edit Ministry</h1>
                <p className="text-muted-foreground">Update ministry details.</p>
            </div>
            <div className="bg-card border rounded-lg p-6">
                <MinistryForm initialData={result.data} />
            </div>
        </div>
    );
}
