import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true'

  const isPublicPage = pathname === '/' || pathname === '/panels'
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup')
  
  // Allow access to public pages like landing and panel selection
  if (isPublicPage) {
    return NextResponse.next()
  }
  
  // If the user is authenticated but trying to log in again (e.g., to switch to admin),
  // let them proceed to the login page. Otherwise, redirect them to their dashboard.
  if (isAuthenticated && isAuthPage) {
    const isSwitchingRole = searchParams.has('role');
    if (isSwitchingRole) {
        return NextResponse.next();
    }
    // If not switching roles and already logged in, redirect away from login.
    return NextResponse.redirect(new URL('/home', request.url))
  }

  // If the user is not authenticated and tries to access a protected page, redirect to login
  if (!isAuthenticated && !isAuthPage) {
     return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
