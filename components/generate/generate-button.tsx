'use client';

import { GenerateButtonProps } from '@/types';

export function GenerateButton({ prompt, isGenerating, onClick }: GenerateButtonProps) {
  return (
    <button
      className={`w-full py-3 rounded-lg font-medium ${
        prompt.length >= 10
          ? 'bg-blue-500 hover:bg-blue-600 text-white'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
      onClick={onClick}
      disabled={prompt.length < 10 || isGenerating}
    >
      {isGenerating ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          생성 중...
        </div>
      ) : (
        '이미지 생성'
      )}
    </button>
  );
} 