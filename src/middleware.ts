import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  console.log(`Middleware running for: ${req.url}`);

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  await auth.protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
