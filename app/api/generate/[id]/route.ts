import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
})

export async function GET(
    request: Request,
    context: { params: { id: string } }
) {
    if (!process.env.REPLICATE_API_TOKEN) {
        return NextResponse.json(
            { error: 'REPLICATE_API_TOKEN is not set' },
            { status: 500 }
        )
    }

    try {
        const { id } = await context.params;
        const prediction = await replicate.predictions.get(id);
        
        return NextResponse.json({
            status: prediction.status,
            output: prediction.output,
            error: prediction.error
        })
    } catch (error) {
        console.error('상태 확인 중 오류 발생:', error)
        return NextResponse.json(
            { error: '상태 확인에 실패했습니다.' },
            { status: 500 }
        )
    }
} 