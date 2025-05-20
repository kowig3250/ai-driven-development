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
          !prompt.trim()
            ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'
        )}
      >
        이미지 생성하기
      </Button>
    </div>
  );
} 