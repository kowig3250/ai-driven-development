'use client';

import Image from 'next/image';
import { useState } from 'react';
import { mockGeneratedImage } from '@/lib/mock-data';
import { Toast } from '@/components/ui/toast';
import { GeneratedImagePreviewProps } from '@/types';

export function GeneratedImagePreview({ generatedImage }: GeneratedImagePreviewProps) {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleDownload = async () => {
    try {
      // 이미지 URL에서 실제 이미지 데이터를 가져옵니다
      const response = await fetch(generatedImage.imageUrl, {
        method: 'GET',
        headers: {
          'Accept': 'image/png,image/jpeg,image/*',
        },
      });

      if (!response.ok) {
        throw new Error('이미지를 가져오는데 실패했습니다.');
      }

      const blob = await response.blob();
      
      // Blob URL을 생성합니다
      const blobUrl = window.URL.createObjectURL(blob);
      
      // 다운로드 링크를 생성하고 클릭합니다
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      
      // 정리
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      setToast({ message: '이미지가 다운로드되었습니다.', type: 'success' });
    } catch (error) {
      console.error('이미지 다운로드 중 오류 발생:', error);
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
      <div className="relative aspect-square w-full max-w-2xl mx-auto">
        <Image
          src={generatedImage.imageUrl}
          alt="Generated image"
          fill
          className="object-cover rounded-lg"
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