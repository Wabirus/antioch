import { login } from "./actions";
import { Suspense } from "react";

function LoginForm() {
    return (
        <form action={login} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    Sign in
                </button>
            </div>
        </form>
    )
}

function ErrorMessage({ error }: { error: string }) {
    if (!error) return null;
    return (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm text-center">
            {decodeURIComponent(error)}
        </div>
    )
}

function PageContent({ searchParams }: { searchParams: { error?: string } }) {
    // In Next.js 15+, searchParams is a Promise, but in 14 it's an object. 
    // The user has Next 16.1.0 in package.json, so searchParams is async.
    // However, I can't easily wait for it in a component prop without wrapping.
    // For simplicity with Next 16, we access it as props but it might be a promise.

    // Actually, in Next.js 15/16, we should use `useSearchParams` client hook or await props.
    // But since this is a server component, I'll assume standard processing.
    // Wait, with pure server components I can await searchParams.

    // Let's keep it simple: Just render the form. Handling error from URL requires 'use client'
    // in Next 15+ if accessing via hooks, OR awaiting params.

    return (
        <>
            {/* We can client-side fetch the error param or just use a client component wrapper */}
            <LoginForm />
        </>
    )
}

export default async function LoginPage(props: { searchParams?: Promise<{ error?: string }> }) {
    const searchParams = await props.searchParams;
    const error = searchParams?.error;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to admin dashboard
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Use your Supabase credentials
                    </p>
                </div>
                {error && <ErrorMessage error={error} />}
                <LoginForm />
            </div>
        </div>
    );
}
