import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
})

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
        return NextResponse.json(
            { error: '생성 ID가 필요합니다.' },
            { status: 400 }
        )
    }

    try {
        const prediction = await replicate.predictions.get(id)
        return NextResponse.json(prediction)
    } catch (error) {
        console.error('상태 확인 중 오류:', error)
        return NextResponse.json(
            { error: '상태 확인에 실패했습니다.' },
            { status: 500 }
        )
    }
} 