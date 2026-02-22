import { signup } from './actions'

export default function SignupPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50">
            <div className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm">
                <div className="flex flex-col space-y-1.5 pb-6">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">Staff Signup</h3>
                    <p className="text-sm text-slate-500">
                        Create an account to access the admin dashboard. Admins will verify your role.
                    </p>
                </div>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="email"
                            name="email"
                            type="email"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="password"
                            >
                                Password
                            </label>
                        </div>
                        <input
                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                    </div>
                    <button
                        className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 shadow hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        formAction={signup}
                    >
                        Sign up
                    </button>
                </form>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <a href="/admin/login" className="underline">
                        Log in
                    </a>
                </div>
            </div>
        </div>
    )
}
