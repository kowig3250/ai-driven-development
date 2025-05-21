'use client';

import { useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function AuthCheck() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoaded && !isSignedIn && pathname !== '/') {
      // 로그인되지 않은 상태에서 보호된 페이지 접근 시 로그인 페이지로 리다이렉트
      // 현재 URL을 redirect_url 파라미터로 전달
      const redirectUrl = encodeURIComponent(pathname);
      router.push(`/sign-in?redirect_url=${redirectUrl}`);
    }
  }, [isLoaded, isSignedIn, pathname, router]);

  return null;
} 