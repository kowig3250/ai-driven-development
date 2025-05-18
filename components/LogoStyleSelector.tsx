'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Style, StyleType, STYLES } from '@/types/style';
import { LOGO_STYLE_PREVIEWS } from '@/lib/mock-data';

interface LogoStyleSelectorProps {
  onSelect: (style: Style) => void;
  selectedStyle?: StyleType;
}

const LogoStyleSelector = ({ onSelect, selectedStyle }: LogoStyleSelectorProps) => {
  const [hoveredStyle, setHoveredStyle] = useState<StyleType | null>(null);

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">로고 스타일 선택</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STYLES.map((style) => (
          <button
            key={style.type}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedStyle === style.type
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => onSelect(style)}
            onMouseEnter={() => setHoveredStyle(style.type)}
            onMouseLeave={() => setHoveredStyle(null)}
          >
            <div className="aspect-square w-full mb-2 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
              <Image
                src={LOGO_STYLE_PREVIEWS[style.type].image}
                alt={`${style.name} 스타일 예시`}
                width={120}
                height={120}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-gray-900">{style.name}</h4>
              <p className="text-sm text-gray-500">{style.description}</p>
            </div>
          </button>
        ))}
      </div>
      {hoveredStyle && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-medium">프롬프트: </span>
            {STYLES.find((s) => s.type === hoveredStyle)?.prompt}
          </p>
        </div>
      )}
    </div>
  );
};

export default LogoStyleSelector; 