import { NextResponse, NextRequest } from 'next/server'
import { getAuth, readCharacters, readConversations } from '../../db'
import { sortCharactersByConversationOrder } from '../../helper';

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return NextResponse.json(
            { type: 'AUTH', error: 'Missing authorization token' },
            { status: 401 }
        )
    }

    const auth = await getAuth(authHeader)
    if (!auth) {
        return NextResponse.json(
            { type: 'AUTH', error: 'Authenticated User not found' },
            { status: 404 }
        )
    }

    const characters = await readCharacters()
    const conversations = await readConversations(auth.id)
    if (conversations.length === 0) {
        return NextResponse.json(
            { type: 'SUCCESS', data: characters },
            { status: 200 }
        )
    }

    const sortedCharacters = sortCharactersByConversationOrder(characters, conversations);

    return NextResponse.json(
        { type: 'SUCCESS', data: sortedCharacters },
        { status: 200 }
    )
}