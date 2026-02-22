"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Admin Error Boundary Caught:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
            <h2 className="text-xl font-bold text-destructive">Something went wrong!</h2>
            <div className="p-4 bg-muted rounded-md text-sm text-muted-foreground w-full max-w-lg overflow-auto">
                <p><strong>Message:</strong> {error.message}</p>
                {error.digest && <p><strong>Digest:</strong> {error.digest}</p>}
                <pre className="mt-2 text-xs">{error.stack}</pre>
            </div>
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    );
}
