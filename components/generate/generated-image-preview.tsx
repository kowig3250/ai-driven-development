'use client';

import Image from 'next/image';
import { mockGeneratedImage } from '@/lib/mock-data';

interface GeneratedImagePreviewProps {
  generatedImage: typeof mockGeneratedImage;
}

export function GeneratedImagePreview({ generatedImage }: GeneratedImagePreviewProps) {
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
          onClick={() => {
            const link = document.createElement('a');
            link.href = generatedImage.imageUrl;
            link.download = `generated-image-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          다운로드
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          갤러리에 저장
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          커뮤니티에 공유
        </button>
      </div>
    </div>
  );
} 