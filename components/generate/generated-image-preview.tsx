'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { GeneratedImagePreviewProps } from '@/types';
import { Toast } from '@/components/ui/toast';

export function GeneratedImagePreview({ generatedImage }: GeneratedImagePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // 이미지 URL 유효성 검사
  if (!generatedImage?.imageUrl || typeof generatedImage.imageUrl !== 'string' || generatedImage.imageUrl.trim() === '') {
    return null;
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(generatedImage.imageUrl);
      if (!response.ok) throw new Error('이미지 다운로드 실패');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${Date.now()}.png`;
      
      // 비동기 작업 완료 후 정리
      setTimeout(() => {
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 0);
      
      setToast({ message: '이미지가 다운로드되었습니다.', type: 'success' });
    } catch (error) {
      console.error('다운로드 오류:', error);
      setToast({ message: '이미지 다운로드에 실패했습니다.', type: 'error' });
    }
  };

  const handleSaveToGallery = () => {
    setToast({ message: '갤러리에 저장되었습니다.', type: 'success' });
  };

  const handleShare = () => {
    setToast({ message: '커뮤니티에 공유되었습니다.', type: 'success' });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">생성된 이미지</h2>
      <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}
        <Image
          src={generatedImage.imageUrl}
          alt="Generated image"
          fill
          className={`object-cover rounded-lg ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setToast({ message: '이미지 로딩에 실패했습니다.', type: 'error' });
          }}
        />
      </div>
      <div className="flex justify-center space-x-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleDownload}
        >
          다운로드
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleSaveToGallery}
        >
          갤러리에 저장
        </button>
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={handleShare}
        >
          커뮤니티에 공유
        </button>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
} 