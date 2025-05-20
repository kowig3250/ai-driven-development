import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const publicRoutes = ["/", "/api/webhook"];
const ignoredRoutes = ["/api/webhook"];

const isPublic = createRouteMatcher(publicRoutes);
const isIgnored = createRouteMatcher(ignoredRoutes);

export default clerkMiddleware((auth, req: NextRequest) => {
  if (isPublic(req) || isIgnored(req)) {
    return;
  }
  auth.protect();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};