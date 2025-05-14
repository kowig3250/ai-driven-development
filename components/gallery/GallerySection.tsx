'use client';

import { useState, useMemo } from 'react';
import { mockGalleryImages } from '@/lib/mock-data';
import { ImageCard } from './ImageCard';
import { ImageDetailModal } from './ImageDetailModal';

type ImageType = typeof mockGalleryImages[0];

interface GallerySectionProps {
  selectedFilter: string;
  selectedSort: string;
  selectedDate: string;
  selectedVisibility: string;
  onImageDelete: () => void;
}

export function GallerySection({
  selectedFilter,
  selectedSort,
  selectedDate,
  selectedVisibility,
  onImageDelete
}: GallerySectionProps) {
  const [images, setImages] = useState<ImageType[]>(mockGalleryImages);
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const filteredImages = useMemo(() => {
    let result = [...images];

    // 카테고리 필터링
    if (selectedFilter !== 'all') {
      result = result.filter(img => img.style === selectedFilter);
    }

    // 날짜 필터링
    if (selectedDate !== 'all') {
      const [startDate, endDate] = selectedDate.split('~').map(date => new Date(date));
      result = result.filter(img => {
        const imgDate = new Date(img.createdAt);
        return imgDate >= startDate && imgDate <= endDate;
      });
    }

    // 공개/비공개 필터링
    if (selectedVisibility !== 'all') {
      result = result.filter(img => 
        selectedVisibility === 'public' ? img.isPublic : !img.isPublic
      );
    }

    // 정렬
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      
      switch (selectedSort) {
        case 'latest':
          return dateB - dateA;
        case 'oldest':
          return dateA - dateB;
        case 'popular':
          // TODO: 인기도 기준 정렬 구현
          return 0;
        default:
          return 0;
      }
    });

    return result;
  }, [images, selectedFilter, selectedSort, selectedDate, selectedVisibility]);

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleRemoveImage = (imageId: string) => {
    setImages(images.filter(img => img.id !== imageId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {filteredImages.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onClick={() => handleImageClick(image)}
            onRemove={handleRemoveImage}
            onDelete={onImageDelete}
          />
        ))}
      </div>

      {selectedImage && (
        <ImageDetailModal
          image={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
} 