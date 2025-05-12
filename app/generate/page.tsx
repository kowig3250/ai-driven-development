'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 목업 데이터: 3초 후에 이미지 생성 완료로 가정
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin" />
            <h2 className="text-xl font-semibold">이미지를 생성하고 있습니다...</h2>
            <p className="text-gray-500">잠시만 기다려주세요.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="w-full aspect-square bg-gray-100 rounded-lg">
              {/* TODO: 생성된 이미지 표시 */}
            </div>
            <div className="flex gap-4">
              <Button onClick={() => router.push('/')}>
                다시 생성하기
              </Button>
              <Button variant="outline" onClick={() => router.push('/')}>
                홈으로 돌아가기
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 