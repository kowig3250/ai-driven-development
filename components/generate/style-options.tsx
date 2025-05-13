'use client';

import { styleOptions } from '@/lib/mock-data';

interface StyleOptionsProps {
  selectedStyle: string;
  selectedColor: string;
  onStyleChange: (value: string) => void;
  onColorChange: (value: string) => void;
}

export function StyleOptions({
  selectedStyle,
  selectedColor,
  onStyleChange,
  onColorChange,
}: StyleOptionsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">스타일 옵션</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h3 className="font-medium text-lg">스타일</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block font-medium">이미지 스타일</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={selectedStyle}
              onChange={(e) => onStyleChange(e.target.value)}
            >
              <option value="">스타일 선택</option>
              {styleOptions.styles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">색조</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={selectedColor}
              onChange={(e) => onColorChange(e.target.value)}
            >
              <option value="">색조 선택</option>
              {styleOptions.moods.map((mood) => (
                <option key={mood.id} value={mood.id}>
                  {mood.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 