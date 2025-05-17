import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import { FluxModelInput } from '@/types/flux'

// 환경 변수 확인
const apiToken = process.env.REPLICATE_API_TOKEN;
console.log('API 토큰 존재 여부:', !!apiToken);
console.log('API 토큰 길이:', apiToken?.length);

if (!apiToken) {
    console.error('환경 변수에 REPLICATE_API_TOKEN이 설정되지 않았습니다.');
}

const replicate = new Replicate({
    auth: apiToken
})

export async function POST(request: Request) {
    console.log('API 요청 시작');
    
    if (!process.env.REPLICATE_API_TOKEN) {
        console.error('REPLICATE_API_TOKEN이 설정되지 않음');
        return NextResponse.json(
            { error: '서버 설정 오류' },
            { status: 500 }
        );
    }

    try {
        const { prompt, styleOptions } = await request.json();
        console.log('요청 데이터:', { prompt, styleOptions });

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

        try {
            // 이미지 생성 요청
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
            console.log('Replicate API 응답:', JSON.stringify(prediction, null, 2));

            if (!prediction) {
                console.error('Replicate API 응답이 없음');
                return NextResponse.json(
                    { error: '이미지 생성에 실패했습니다.', details: 'Replicate API 응답이 없습니다.' },
                    { status: 500 }
                );
            }

            // 생성 ID와 상태를 반환
            return NextResponse.json({
                generationId: prediction.id,
                status: prediction.status,
                urls: prediction.urls
            }, { status: 201 });

        } catch (replicateError) {
            console.error('Replicate API 호출 중 오류:', replicateError);
            if (replicateError instanceof Error) {
                console.error('에러 이름:', replicateError.name);
                console.error('에러 메시지:', replicateError.message);
                console.error('에러 스택:', replicateError.stack);
            }
            return NextResponse.json(
                { 
                    error: '이미지 생성 서비스에 문제가 발생했습니다.',
                    details: replicateError instanceof Error ? replicateError.message : '알 수 없는 오류'
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('요청 처리 중 오류:', error);
        return NextResponse.json(
            { error: '요청 처리 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
} 