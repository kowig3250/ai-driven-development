'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function PromptInput() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  const handleGenerateImage = () => {
    if (!prompt.trim()) {
      alert('프롬프트를 입력해 주세요');
      return;
    }
    // URL 인코딩된 프롬프트를 쿼리 파라미터로 전달
    const encodedPrompt = encodeURIComponent(prompt.trim());
    router.push(`/generate?prompt=${encodedPrompt}`);
  };

  // 프롬프트 길이에 따른 배경색 계산
  const getButtonStyle = () => {
    const length = prompt.length;
    if (length === 0) return 'bg-gray-400 hover:bg-gray-500';
    if (length < 10) return 'bg-gray-500 hover:bg-gray-600';
    if (length < 20) return 'bg-gray-600 hover:bg-gray-700';
    if (length < 30) return 'bg-gray-700 hover:bg-gray-800';
    return 'bg-gray-800 hover:bg-gray-900';
  };

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <Input
        placeholder="이미지를 생성할 프롬프트를 입력하세요"
        value={prompt}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            handleGenerateImage();
          }
        }}
        className="mb-4"
      />
      <Button 
        onClick={handleGenerateImage}
        disabled={!prompt.trim()}
        className={cn(
          "w-full transition-colors duration-200 text-white font-medium",
          getButtonStyle()
        )}
      >
        이미지 생성하기
      </Button>
    </div>
  );
} 