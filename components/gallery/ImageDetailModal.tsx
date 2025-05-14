'use client';

import Image from 'next/image';
import { mockGalleryImages } from '@/lib/mock-data';
import { useState } from 'react';

type ImageType = typeof mockGalleryImages[0] & {
  tone?: string;
};

interface ImageDetailModalProps {
  image: ImageType;
  onClose: () => void;
}

export function ImageDetailModal({ image, onClose }: ImageDetailModalProps) {
  const [tags, setTags] = useState<string[]>(['풍경', '자연']);
  const [newTag, setNewTag] = useState('');
  const [isPublic, setIsPublic] = useState(image.isPublic);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // 스타일 한글 변환
  const getStyleInKorean = (style: string) => {
    const styleMap: { [key: string]: string } = {
      'realistic': '사실적',
      'cartoon': '만화',
      'cyberpunk': '사이버펑크',
      'watercolor': '수채화',
      'sketch': '스케치',
      'oil-painting': '유화'
    };
    return styleMap[style] || style;
  };

  // 색조 한글 변환
  const getToneInKorean = (tone: string) => {
    const toneMap: { [key: string]: string } = {
      'neutral': '중립적',
      'warm': '따뜻한',
      'cool': '차가운',
      'vibrant': '선명한',
      'muted': '부드러운',
      'dark': '어두운',
      'light': '밝은'
    };
    return toneMap[tone] || tone;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* 이미지 섹션 */}
          <div className="relative md:w-1/2 aspect-square md:aspect-auto">
            <Image
              src={image.imageUrl}
              alt={image.prompt}
              fill
              className="object-contain p-4"
            />
          </div>
          
          {/* 상세 내용 섹션 */}
          <div className="p-6 md:w-1/2 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-semibold">이미지 상세 정보</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 프롬프트 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">프롬프트</h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{image.prompt}</p>
            </div>

            {/* 스타일 옵션 */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">스타일</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-600">{getStyleInKorean(image.style)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">색조</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-600">{getToneInKorean(image.tone || 'neutral')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 태그 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">태그</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span 
                    key={tag}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button 
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="새 태그 입력"
                  className="flex-1 p-2 border rounded-lg"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <button
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  추가
                </button>
              </div>
            </div>

            {/* 공개 설정 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">공개 설정</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">커뮤니티에 공개</span>
                <button
                  onClick={() => setIsPublic(!isPublic)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isPublic ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isPublic ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-4 mt-auto">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 