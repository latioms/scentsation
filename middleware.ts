import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/session';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Routes admin qui nécessitent une authentification
  if (path.startsWith('/admin') && path !== '/admin/login' && path !== '/admin') {
    try {
      const session = await getSession();
      
      if (!session || !session.user) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }

      // Vérifier si l'utilisateur est l'admin
      const adminEmail = process.env.ADMIN_EMAIL_ID;
      if (session.user.email !== adminEmail) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
