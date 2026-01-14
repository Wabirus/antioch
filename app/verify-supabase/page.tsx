import { createClient } from "@/utils/supabase/server";

export default async function VerifySupabasePage() {
    const supabase = await createClient();

    // Try to fetch something generic, e.g., list of tables is hard with RLS, 
    // so we'll just check if we can get the current user session (should be null but no error)
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    // Also try to query a table that might exist or just check connection
    // We'll try to select from 'Sermon' if it exists in Supabase (from previous db push attempts if any succeeded)
    // or 'todos' as per user example, but 'todos' likely doesn't exist.
    // Let's safe query a system table or just show the status.

    return (
        <div className="p-10 space-y-4">
            <h1 className="text-2xl font-bold">Supabase Connection Verification</h1>

            <div className="border p-4 rounded-md">
                <h2 className="font-semibold mb-2">Auth Status</h2>
                <pre className="bg-muted p-2 rounded text-sm overflow-auto">
                    {authError ? `Error: ${authError.message}` : `User: ${user?.email || 'Not logged in'}`}
                </pre>
            </div>

            <div className="border p-4 rounded-md">
                <h2 className="font-semibold mb-2">Environment Check</h2>
                <ul className="list-disc list-inside">
                    <li>
                        URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}
                    </li>
                    <li>
                        Key: {process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ? "✅ Set" : "❌ Missing"}
                    </li>
                </ul>
            </div>

            <p className="text-muted-foreground">
                If "Auth Status" shows "Not logged in" or a user email, the Supabase Client is successfully initialised!
            </p>
        </div>
    );
}
