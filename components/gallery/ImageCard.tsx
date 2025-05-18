'use client';

import Image from 'next/image';
import { mockGalleryImages } from '@/lib/mock-data';
import { useState } from 'react';
import { Toast } from '@/components/common/Toast';

type ImageType = {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: string;
  style: string;
  isPublic: boolean;
  tags: string[];
};

interface ImageCardProps {
  image: ImageType;
  onClick: () => void;
  onRemove: (id: string) => void;
  onDelete: () => void;
}

export function ImageCard({ image, onClick, onRemove, onDelete }: ImageCardProps) {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handlePostClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이미지 클릭 이벤트 전파 방지
    setShowPostModal(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이미지 클릭 이벤트 전파 방지
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setIsDeleting(true);
    onRemove(image.id);
    onDelete();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div 
        className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        onClick={onClick}
      >
        <div className="aspect-square relative">
          <Image
            src={image.imageUrl}
            alt={image.prompt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between text-white/70 text-xs">
            <span>{new Date(image.createdAt).toLocaleDateString()}</span>
            <span>{image.isPublic ? '공개' : '비공개'}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {image.tags.map((tag, index) => (
              <span key={index} className="text-white/80 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
          <button 
            onClick={handlePostClick}
            className="bg-white/90 p-2 rounded-full hover:bg-white"
            title="커뮤니티에 게시"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={handleDeleteClick}
            className="bg-white/90 p-2 rounded-full hover:bg-white hover:text-red-600"
            title="이미지 삭제"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">커뮤니티에 게시</h2>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="게시글 제목을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  설명
                </label>
                <textarea
                  className="w-full p-2 border rounded-lg h-32 resize-none"
                  placeholder="이미지에 대한 설명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  태그
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  placeholder="태그를 입력하세요 (쉼표로 구분)"
                />
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  게시하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-xl font-semibold mb-2">이미지 삭제</h2>
              <p className="text-gray-600 mb-6">
                이 이미지를 삭제하시겠습니까?<br />
                삭제된 이미지는 복구할 수 없습니다.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={isDeleting}
                >
                  취소
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isDeleting}
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <Toast
          message="이미지가 삭제되었습니다"
          type="success"
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </>
  );
} 