import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { login } from './actions'
import Link from 'next/link'

export default async function LoginPage() {
    // If already logged in, go straight to the dashboard
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) redirect('/admin')

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="w-full max-w-sm">
                {/* Logo / Brand */}
                <div className="text-center mb-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/antioch-logo.png" alt="Antioch" className="h-12 w-12 mx-auto mb-3 object-contain" />
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Staff Portal</h1>
                    <p className="text-sm text-slate-500 mt-1">Sign in to access the dashboard</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
                    <form className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-700" htmlFor="email">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                            />
                        </div>

                        <button
                            formAction={login}
                            className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-lg transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-5 text-center text-sm text-slate-500">
                        Don&apos;t have an account?{' '}
                        <Link href="/admin/signup" className="text-primary font-medium hover:underline">
                            Request access
                        </Link>
                    </p>
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    <Link href="/" className="hover:text-slate-600 transition-colors">← Back to website</Link>
                </p>
            </div>
        </div>
    )
}
