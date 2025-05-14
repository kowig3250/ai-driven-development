'use client';

import { useState } from 'react';
import { TabNavigation } from '@/components/gallery/TabNavigation';
import { GallerySection } from '@/components/gallery/GallerySection';
import { CommunitySection } from '@/components/gallery/CommunitySection';
import { FilterSortBar } from '@/components/gallery/FilterSortBar';
import { Toast } from '@/components/common/Toast';

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'community'>('gallery');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSort, setSelectedSort] = useState('latest');
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedVisibility, setSelectedVisibility] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleResetFilters = () => {
    setSelectedFilter('all');
    setSelectedSort('latest');
    setSelectedDate('all');
    setSelectedVisibility('all');
  };

  const handleImageDelete = () => {
    setToastMessage('이미지가 삭제되었습니다');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">내 갤러리 & 커뮤니티</h1>
      
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <FilterSortBar
        selectedFilter={selectedFilter}
        selectedSort={selectedSort}
        selectedDate={selectedDate}
        selectedVisibility={selectedVisibility}
        onFilterChange={setSelectedFilter}
        onSortChange={setSelectedSort}
        onDateChange={setSelectedDate}
        onVisibilityChange={setSelectedVisibility}
        onReset={handleResetFilters}
      />

      {activeTab === 'gallery' ? (
        <GallerySection
          selectedFilter={selectedFilter}
          selectedSort={selectedSort}
          selectedDate={selectedDate}
          selectedVisibility={selectedVisibility}
          onImageDelete={handleImageDelete}
        />
      ) : (
        <CommunitySection />
      )}

      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </main>
  );
} 