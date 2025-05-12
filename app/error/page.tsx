'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">죄송합니다</h1>
        <p className="text-gray-600 mb-8">
          현재 이미지 생성 서비스가 준비 중입니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </p>
        <Button
          onClick={() => router.push('/')}
          className="w-full"
        >
          메인으로 돌아가기
        </Button>
      </div>
    </main>
  );
} 