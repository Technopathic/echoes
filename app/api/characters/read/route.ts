import { NextResponse } from 'next/server'
import { readCharacters } from '../../db'

export async function GET() {
    const data = await readCharacters()

    return NextResponse.json(
        { type: 'SUCCESS', data },
        { status: 200 }
    )
}