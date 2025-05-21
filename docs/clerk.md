# Next.js와 Clerk 인증 연동 가이드

## 1. 프로젝트 설정

### 1.1 Clerk 계정 생성 및 설정
1. [Clerk Dashboard](https://dashboard.clerk.dev/)에서 계정을 생성합니다.
2. 새 애플리케이션을 생성하고 이름을 지정합니다.
3. 환경 변수를 복사하여 준비합니다.

### 1.2 Next.js 프로젝트에 Clerk 설치
```bash
npm install @clerk/nextjs
```

## 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 추가합니다:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_****
CLERK_SECRET_KEY=sk_test_****
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## 3. 미들웨어 설정

`middleware.ts` 파일을 프로젝트 루트에 생성합니다:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 공개 라우트 설정
const publicRoutes = ["/", "/sign-in(.*)", "/sign-up(.*)"];
// 인증 검사에서 제외할 라우트
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
```

## 4. Clerk Provider 설정

`app/layout.tsx` 파일에 ClerkProvider를 추가합니다:

```typescript
import { ClerkProvider } from '@clerk/nextjs'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

## 5. 인증 컴포넌트 구현

### 5.1 인증 버튼 컴포넌트 생성
`app/components/AuthButtons.tsx` 파일을 생성합니다:

```typescript
'use client';
 
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
 
export default function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
```

### 5.2 메인 페이지 구현
`app/page.tsx` 파일에 인증 상태에 따른 UI를 구현합니다:

```typescript
'use client';
 
import { useUser } from "@clerk/nextjs";
import AuthButtons from "./components/AuthButtons";
import { SignUpButton } from "@clerk/nextjs";
 
export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
 
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
          <AuthButtons />
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          {!isLoaded ? (
            <div className="text-lg">로딩중...</div>
          ) : isSignedIn ? (
            <div className="text-2xl font-bold">
              {user.firstName}님 환영합니다.
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="text-2xl font-bold">
                로그인 해주세요
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">회원이 아니신가요? 회원가입 해주세요.</span>
                <SignUpButton mode="modal">
                  <button className="px-4 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
```

## 6. 주요 기능 설명

### 6.1 인증 상태 관리
- `useUser()` 훅을 사용하여 사용자의 인증 상태를 확인할 수 있습니다.
- `isLoaded`: 인증 상태 로딩 여부
- `isSignedIn`: 로그인 상태
- `user`: 로그인한 사용자 정보

### 6.2 인증 컴포넌트
- `SignInButton`: 로그인 버튼
- `SignUpButton`: 회원가입 버튼
- `UserButton`: 사용자 프로필 및 로그아웃 버튼
- `SignedIn`: 로그인 상태일 때만 렌더링
- `SignedOut`: 비로그인 상태일 때만 렌더링

## 7. 보안 설정

### 7.1 API 라우트 보호
API 라우트에서 인증된 사용자만 접근할 수 있도록 설정:

```typescript
import { auth } from "@clerk/nextjs";
 
export default async function handler(req, res) {
  const { userId } = auth();
  
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  // API 로직 구현
}
```

## 8. 배포 시 주의사항

1. 환경 변수가 올바르게 설정되어 있는지 확인
2. Clerk 대시보드에서 배포 도메인 추가
3. 프로덕션 환경의 환경 변수 업데이트

## 9. 문제 해결

### 9.1 일반적인 문제
- 환경 변수가 제대로 설정되지 않은 경우
- 미들웨어 설정 오류
- CORS 설정 문제

### 9.2 디버깅 방법
1. 브라우저 콘솔에서 에러 메시지 확인
2. Clerk 대시보드의 로그 확인
3. 환경 변수 로깅을 통한 설정 확인

## 10. 미들웨어 마이그레이션 가이드

### 10.1 기존 authMiddleware에서 clerkMiddleware로 마이그레이션
기존의 `authMiddleware`는 더 이상 권장되지 않으며, `clerkMiddleware`로 마이그레이션하는 것이 좋습니다.

```typescript
// 이전 방식 (권장하지 않음)
import { authMiddleware } from "@clerk/nextjs/server";
export default authMiddleware({
  publicRoutes: ["/", "/api/webhook"]
});

// 새로운 방식 (권장)
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});
```

### 10.2 주요 변경사항
1. `createRouteMatcher`를 사용한 라우트 매칭
2. 비동기 처리 (`async/await`)
3. 더 세밀한 라우트 보호 제어
4. 향상된 타입 안정성

### 10.3 마이그레이션 시 주의사항
1. 기존 publicRoutes를 `createRouteMatcher`로 변환
2. 비동기 처리를 위한 `async/await` 추가
3. matcher 패턴 업데이트
4. 타입 정의 확인 