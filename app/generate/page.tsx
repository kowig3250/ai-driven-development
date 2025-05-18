'use client';

import { useState, useEffect } from 'react';
import { PromptInput } from '@/components/generate/prompt-input';
import StyleOptions from '@/components/generate/style-options';
import { GenerateButton } from '@/components/generate/generate-button';
import { GeneratedImagePreview } from '@/components/generate/generated-image-preview';
import { useSearchParams } from 'next/navigation';
import { Toast } from '@/components/ui/toast';
import { GenerateImageRequest } from '@/types';
import { StyleType, ColorTone } from '@/types/style';

// 이미지 생성 상태를 위한 타입 정의
interface GenerationStatus {
    status: 'success' | 'error' | 'processing';
    imageUrl?: string;
    error?: string;
    generationId?: string;
}

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<StyleType | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<ColorTone>('bright');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<{
    imageUrl: string;
    generationId: string;
    status: 'success';
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // URL에서 프롬프트 가져오기
  useEffect(() => {
    const promptFromUrl = searchParams.get('prompt');
    if (promptFromUrl) {
      setPrompt(decodeURIComponent(promptFromUrl));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setToast({ message: '이미지 생성이 시작되었습니다.', type: 'info' });

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          styleOptions: {
            style: selectedStyle,
            color: selectedColor,
            quality: 'high',
            aspectRatio: '1:1'
          }
        } as GenerateImageRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '이미지 생성에 실패했습니다.');
      }

      const data = await response.json();
      console.log('생성 응답:', data);

      // 폴링 시작
      await pollStatus(data.generationId);

    } catch (error) {
      console.error('이미지 생성 중 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '이미지 생성에 실패했습니다.';
      setError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const pollStatus = async (generationId: string) => {
    try {
      const response = await fetch(`/api/generate/status?id=${generationId}`);
      const data = await response.json();

      if (data.status === 'succeeded' && data.output?.[0]) {
        setGeneratedImage({
          imageUrl: data.output[0],
          generationId,
          status: 'success'
        });
        setToast({ message: '이미지가 성공적으로 생성되었습니다!', type: 'success' });
      } else if (data.status === 'failed') {
        throw new Error('이미지 생성에 실패했습니다.');
      } else {
        // 계속 폴링
        setTimeout(() => pollStatus(generationId), 1000);
      }
    } catch (error) {
      console.error('상태 확인 중 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '상태 확인에 실패했습니다.';
      setError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">이미지 생성</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            프롬프트
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="생성하고 싶은 이미지를 설명해주세요..."
            required
          />
        </div>

        <StyleOptions
          selectedStyle={selectedStyle}
          selectedColor={selectedColor}
          onStyleChangeAction={(style) => setSelectedStyle(style)}
          onColorChangeAction={setSelectedColor}
        />

        <button
          type="submit"
          disabled={isLoading || !prompt}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
            isLoading || !prompt
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? '이미지 생성 중...' : '이미지 생성'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {generatedImage && (
        <div className="mt-8">
          <GeneratedImagePreview generatedImage={generatedImage} />
        </div>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
} 