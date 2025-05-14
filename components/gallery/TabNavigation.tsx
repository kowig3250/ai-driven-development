'use client';

import { cn } from '@/lib/utils';

interface TabNavigationProps {
  activeTab: 'gallery' | 'community';
  onTabChange: (tab: 'gallery' | 'community') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex space-x-4 mb-8 border-b">
      <button
        onClick={() => onTabChange('gallery')}
        className={cn(
          'px-4 py-2 font-medium transition-colors',
          activeTab === 'gallery'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        갤러리
      </button>
      <button
        onClick={() => onTabChange('community')}
        className={cn(
          'px-4 py-2 font-medium transition-colors',
          activeTab === 'community'
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        )}
      >
        커뮤니티
      </button>
    </div>
  );
} 