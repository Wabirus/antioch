import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Only run Supabase session check for admin routes (protected)
    // Login page bypasses this entirely - no session needed for unauthenticated users
    if (pathname.startsWith("/admin")) {
        try {
            return await updateSession(request);
        } catch (error) {
            console.error("Supabase middleware error:", error);
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // For all other routes (including login), continue without session check
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
