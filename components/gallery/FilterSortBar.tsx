'use client';

import { useState } from 'react';

interface FilterSortBarProps {
  selectedFilter: string;
  selectedSort: string;
  selectedDate: string;
  selectedVisibility: string;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onVisibilityChange: (value: string) => void;
  onReset: () => void;
}

export function FilterSortBar({
  selectedFilter,
  selectedSort,
  selectedDate,
  selectedVisibility,
  onFilterChange,
  onSortChange,
  onDateChange,
  onVisibilityChange,
  onReset
}: FilterSortBarProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateRangeChange = () => {
    if (startDate && endDate) {
      onDateChange(`${startDate}~${endDate}`);
    }
    setShowCalendar(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={selectedFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="p-2 border rounded-lg bg-white min-w-[160px]"
        >
          <option value="all">전체 카테고리</option>
          <option value="realistic">사실적</option>
          <option value="cartoon">만화</option>
          <option value="cyberpunk">사이버펑크</option>
          <option value="watercolor">수채화</option>
          <option value="oil">유화</option>
        </select>

        <div className="relative">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="p-2 border rounded-lg bg-white flex items-center gap-2 min-w-[160px] justify-between"
          >
            <span>{selectedDate === 'all' ? '전체 기간' : selectedDate}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </button>

          {showCalendar && (
            <div className="absolute top-full left-0 mt-2 p-4 bg-white border rounded-lg shadow-lg z-10 w-[300px]">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="p-2 border rounded-lg w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="p-2 border rounded-lg w-full"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleDateRangeChange}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    적용
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <select
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
          className="p-2 border rounded-lg bg-white min-w-[160px]"
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="popular">인기순</option>
        </select>

        <select
          value={selectedVisibility}
          onChange={(e) => onVisibilityChange(e.target.value)}
          className="p-2 border rounded-lg bg-white min-w-[160px]"
        >
          <option value="all">전체</option>
          <option value="public">공개</option>
          <option value="private">비공개</option>
        </select>

        <button
          onClick={onReset}
          className="p-2 border rounded-lg bg-white hover:bg-gray-50 flex items-center gap-2 min-w-[160px] justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          필터 초기화
        </button>
      </div>
    </div>
  );
} 