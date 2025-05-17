# Replicate Flux 모델 사용 가이드

이 가이드는 Next.js 프로젝트에서 Replicate의 Flux 이미지 생성 모델을 설정하고 사용하는 방법을 설명합니다.

## 목차

-   [사전 준비](#사전-준비)
-   [프로젝트 설정](#프로젝트-설정)
-   [API 구현](#api-구현)
-   [프론트엔드 구현](#프론트엔드-구현)
-   [환경 변수 설정](#환경-변수-설정)
-   [스타일 옵션](#스타일-옵션)

## 사전 준비

1. Replicate 계정 생성

-   [Replicate](https://replicate.com) 웹사이트에서 계정을 생성합니다.
-   API 토큰을 발급받습니다.

2. 필요한 패키지 설치

```bash
npm install replicate
```

## 프로젝트 설정

1. Next.js 설정
   `next.config.ts` 파일에 이미지 도메인을 추가합니다:

```typescript
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'replicate.com'
            },
            {
                protocol: 'https',
                hostname: 'replicate.delivery'
            }
        ]
    }
}
```

2. 타입 정의
   `types/flux.ts` 파일을 생성하여 Flux 모델의 입력 타입을 정의합니다:

```typescript
export interface FluxModelInput {
    prompt: string
    seed?: number
    go_fast?: boolean
    megapixels?: '1' | '0.25'
    num_outputs?: number
    aspect_ratio?:
        | '1:1'
        | '16:9'
        | '21:9'
        | '3:2'
        | '2:3'
        | '4:5'
        | '5:4'
        | '3:4'
        | '4:3'
        | '9:16'
        | '9:21'
    output_format?: 'webp' | 'jpg' | 'png'
    output_quality?: number
    num_inference_steps?: number
    disable_safety_checker?: boolean
}
```

## API 구현

1. 이미지 생성 API
   `app/api/generate/route.ts` 파일을 생성합니다:

```typescript
import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import { FluxModelInput } from '@/types/flux'

export async function POST(request: Request) {
    if (!process.env.REPLICATE_API_TOKEN) {
        return NextResponse.json(
            { error: '서버 설정 오류' },
            { status: 500 }
        );
    }

    try {
        const { prompt, styleOptions } = await request.json();
        
        if (!prompt) {
            return NextResponse.json(
                { error: '프롬프트가 필요합니다.' },
                { status: 400 }
            );
        }

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        // 스타일 옵션에 따른 프롬프트 수정
        let enhancedPrompt = prompt;
        if (styleOptions?.style) {
            enhancedPrompt = `${prompt}, ${styleOptions.style} style`;
        }
        if (styleOptions?.quality) {
            enhancedPrompt = `${enhancedPrompt}, ${styleOptions.quality} quality`;
        }

        const prediction = await replicate.predictions.create({
            model: 'black-forest-labs/flux-schnell',
            input: {
                prompt: enhancedPrompt,
                aspect_ratio: styleOptions?.aspectRatio || '1:1',
                num_outputs: 1,
                output_format: 'webp',
                output_quality: 90
            } as FluxModelInput
        });

        return NextResponse.json({
            generationId: prediction.id,
            status: prediction.status,
            urls: prediction.urls
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json(
            { error: '이미지 생성에 실패했습니다.' },
            { status: 500 }
        );
    }
}
```

2. 상태 확인 API
   `app/api/generate/status/route.ts` 파일을 생성합니다:

```typescript
import { NextResponse } from 'next/server'
import Replicate from 'replicate'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json(
            { error: '생성 ID가 필요합니다.' },
            { status: 400 }
        );
    }

    try {
        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const prediction = await replicate.predictions.get(id);
        return NextResponse.json(prediction);
    } catch (error) {
        return NextResponse.json(
            { error: '상태 확인에 실패했습니다.' },
            { status: 500 }
        );
    }
}
```

## 프론트엔드 구현

1. 이미지 생성 페이지
   `app/generate/page.tsx` 파일을 생성합니다:

```typescript
'use client';

import { useState } from 'react';
import { StyleOptions } from '@/components/generate/style-options';
import { GeneratedImagePreview } from '@/components/generate/generated-image-preview';
import { GenerateImageRequest } from '@/types';
import { Toast } from '@/components/ui/toast';

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<{
    imageUrl: string;
    generationId: string;
    status: 'success';
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

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
      await pollStatus(data.generationId);

    } catch (error) {
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
        setTimeout(() => pollStatus(generationId), 1000);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '상태 확인에 실패했습니다.';
      setError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
          onStyleChangeAction={setSelectedStyle}
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
```

## 환경 변수 설정

1. 프로젝트 루트에 `.env.local` 파일을 생성합니다:

```plaintext
REPLICATE_API_TOKEN=your_api_token_here
```

2. `.gitignore`에 환경 변수 파일이 포함되어 있는지 확인합니다:

```plaintext
.env*
```

## 스타일 옵션

스타일 옵션은 이미지 생성 시 적용할 수 있는 다양한 스타일과 색조를 제공합니다.

### 사용 가능한 스타일

- 사실주의 (realistic)
- 만화풍 (cartoon)
- 수채화 (watercolor)
- 유화 (oil)

### 사용 가능한 색조

- 밝은 (bright)
- 어두운 (dark)
- 따뜻한 (warm)
- 차가운 (cold)

### 스타일 옵션 컴포넌트

```typescript
'use client';

import { styleOptions } from '@/lib/mock-data';
import { StyleOptionsProps } from '@/types';

export function StyleOptions({
  selectedStyle,
  selectedColor,
  onStyleChangeAction,
  onColorChangeAction,
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
              onChange={(e) => onStyleChangeAction(e.target.value)}
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
              onChange={(e) => onColorChangeAction(e.target.value)}
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
-   `prompt`: 생성하고 싶은 이미지에 대한 설명 (필수)
-   `aspect_ratio`: 이미지 비율 (기본값: '1:1')
-   `num_outputs`: 생성할 이미지 수 (기본값: 1)
-   `output_format`: 출력 이미지 형식 (webp/jpg/png)
-   `output_quality`: 출력 이미지 품질 (1-100)

## 참고 사항

-   이미지 생성에는 일정 시간이 소요되므로, 적절한 로딩 상태 처리가 필요합니다.
-   API 요청 횟수에 따라 과금될 수 있으므로 사용량을 모니터링하세요.
-   생성된 이미지의 저작권 및 사용 제한 사항을 확인하세요.