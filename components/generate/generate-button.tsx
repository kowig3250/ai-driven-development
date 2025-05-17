'use client';

import { GenerateButtonProps } from '@/types';

export function GenerateButton({ prompt, isGenerating, onClickAction }: GenerateButtonProps) {
  const isDisabled = !prompt.trim() || isGenerating;

  return (
    <button
      onClick={onClickAction}
      disabled={isDisabled}
      className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all duration-200
        ${isDisabled 
          ? 'bg-gray-400 cursor-not-allowed opacity-70' 
          : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 shadow-md hover:shadow-lg'
        }`}
      aria-busy={isGenerating}
    >
      {isGenerating ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          <span>이미지 생성 중...</span>
        </div>
      ) : (
        <span>이미지 생성하기</span>
      )}
    </button>
  );
} 