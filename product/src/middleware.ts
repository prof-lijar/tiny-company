import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextResponse) {
  const token = await getToken({ req: request });

  if (!token) {
    const { pathname } = request.nextUrl;
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/vocabulary') || pathname.startsWith('/grammar') || pathname.startsWith('/reading') || pathname.startsWith('/writing') || pathname.startsWith('/mock-test')) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/vocabulary/:path*', '/grammar/:path*', '/reading/:path*', '/writing/:path*', '/mock-test/:path*'],
};
