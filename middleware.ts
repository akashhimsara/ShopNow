import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

/**
 * Protect routes under /dashboard, /checkout, and /orders.
 * Unauthenticated users are redirected to /login.
 */
export default withAuth(
  function middleware(req) {
    // withAuth will attach a `nextauth` property to the request
    // containing a `token` when authenticated.
    // If there is no token, redirect to the login page.
    // The actual redirect is handled here to keep behavior explicit.
    // Note: this runs on the Edge runtime; avoid server-only APIs here.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    const token = req.nextauth?.token;

    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // authorized is used by withAuth to determine if the request is allowed
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/checkout/:path*', '/orders/:path*'],
};
