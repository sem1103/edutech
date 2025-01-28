import { NextResponse } from 'next/server';
import roles from './roles';
import { jwtDecode } from 'jwt-decode';


export function middleware(req) {
  const token = req.cookies?.get('userToken') ? req.cookies?.get('userToken')?.value : false;
  const userRole = token && jwtDecode(token)?.user.user_type

  const { pathname } = req.nextUrl;

  if (!token && pathname !== '/login' && pathname !== '/registration') {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  
  
  if (token && (pathname === '/login' || pathname === '/registration')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if(token && !roles[userRole].find(item => {
    return !pathname.includes(item.value)
  }) ){
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/registration', '/dashboard/:path*']
};
