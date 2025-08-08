import { NextResponse, NextRequest } from 'next/server'
import { showCharacter } from '../../db'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')

    if (!slug) {
        return NextResponse.json(
            { type: 'GENERAL', error: 'Missing Slug.' },
            { status: 401 }
        )
    }

    const data = await showCharacter(slug)
    if (!data) {
         return NextResponse.json(
            { type: 'GENERAL', error: 'Character not found.' },
            { status: 404 }
        )
    }

    return NextResponse.json(
        { type: 'SUCCESS', data },
        { status: 200 }
    )
}