import { NextRequest, NextResponse } from 'next/server';

// Define the protected routes
const protectedRoutes = [
    '/profile',
    '/saved-group',
    '/review',
    '/change-password',
    '/remove-account',
    '/reviews',
    '/compare',
];

export function middleware(req) {
    const { pathname } = req.nextUrl;

    // Check if the route is protected
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        const token = req.cookies.get('auth_token')?.value;
        if (!token) {
            // Redirect to login if no token is found
            const loginUrl = new URL('/signin', req.nextUrl.origin);
            // loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Continue with the request
    return NextResponse.next();
}

// Apply the middleware only to certain paths
export const config = {
    matcher: [
        '/profile/:path*',
        '/saved-group/:path*',
        '/review/:path*',
        '/change-password/:path*',
        '/remove-account/:path*',
        '/reviews/:path*',
        '/compare/:path*',
    ],
};