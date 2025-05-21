import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 메인 페이지와 로그인/회원가입 페이지는 public으로 설정
const publicRoutes = ["/", "/sign-in(.*)", "/sign-up(.*)"];
// API webhook은 인증 검사에서 제외
const ignoredRoutes = ["/api/webhook"];

const isPublic = createRouteMatcher(publicRoutes);
const isIgnored = createRouteMatcher(ignoredRoutes);

export default clerkMiddleware(async (auth, request) => {
  // public 또는 ignored 라우트인 경우 인증 검사 건너뛰기
  if (isPublic(request) || isIgnored(request)) {
    return;
  }
  
  // 그 외의 모든 라우트는 인증 필요
  await auth.protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};