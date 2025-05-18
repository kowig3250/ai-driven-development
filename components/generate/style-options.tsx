'use client';

import { Style, StyleType, STYLES, ColorTone } from '@/types/style';

interface StyleOptionsProps {
  selectedStyle: StyleType | undefined;
  selectedColor: ColorTone;
  onStyleChangeAction: (style: StyleType) => void;
  onColorChangeAction: (color: ColorTone) => void;
}

const StyleOptions = ({
  selectedStyle,
  selectedColor,
  onStyleChangeAction,
  onColorChangeAction,
}: StyleOptionsProps) => {
  const imageStyles = STYLES.filter(style => style.category === 'image');
  const logoStyles = STYLES.filter(style => style.category === 'logo');

  const colorOptions = [
    { value: 'bright', label: '밝은' },
    { value: 'dark', label: '어두운' },
    { value: 'warm', label: '따뜻한' },
    { value: 'cold', label: '차가운' },
    { value: 'monochrome', label: '단색' },
    { value: 'gradient', label: '그라데이션' },
    { value: 'pastel', label: '파스텔톤' },
    { value: 'vibrant', label: '선명한' },
    { value: 'muted', label: '차분한' },
    { value: 'metallic', label: '금속성' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          스타일
        </label>
        <select
          value={selectedStyle || ''}
          onChange={(e) => onStyleChangeAction(e.target.value as StyleType)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">스타일 선택</option>
          <optgroup label="일반 이미지">
            {imageStyles.map((style) => (
              <option key={style.type} value={style.type}>
                {style.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="로고">
            {logoStyles.map((style) => (
              <option key={style.type} value={style.type}>
                {style.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          색조
        </label>
        <select
          value={selectedColor}
          onChange={(e) => onColorChangeAction(e.target.value as ColorTone)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">색조 선택</option>
          {colorOptions.map((color) => (
            <option key={color.value} value={color.value}>
              {color.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StyleOptions; 