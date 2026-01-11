import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if path starts with /admin
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // allow login page
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next()
        }

        // Check for auth cookie
        const authCookie = request.cookies.get('admin_session')

        if (!authCookie || authCookie.value !== 'authenticated') {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
