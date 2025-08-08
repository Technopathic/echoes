import { NextResponse, NextRequest } from 'next/server'
import { getAuth, readHistory, showCharacter, showConversation } from '../../db'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')

    if (!slug) {
        return NextResponse.json(
            { type: 'GENERAL', error: 'Missing Slug.' },
            { status: 401 }
        )
    }

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return NextResponse.json(
            { type: 'AUTH', error: 'Missing authorization token' },
            { status: 401 }
        )
    }

    const auth = await getAuth(authHeader);
    if (!auth) {
        return NextResponse.json(
            { type: 'AUTH', error: 'Authenticated User not found' },
            { status: 404 }
        )
    }

    const character = await showCharacter(slug);
    if (!character) {
        return NextResponse.json(
            { type: 'ERROR', error: 'Character not found' },
            { status: 404 }
        )
    }

    const conversation = await showConversation(auth.id, character.id);
    if (!conversation) {
        return NextResponse.json(
            { type: 'SUCCESS', data: [] },
            { status: 200 }
        )
    }

    const history = await readHistory(conversation.id, 10);

    return NextResponse.json(
        { type: 'SUCCESS', data: history },
        { status: 200 }
    )
}