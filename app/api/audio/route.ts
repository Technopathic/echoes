import { NextResponse, NextRequest } from 'next/server';
import { getAuth, showCharacter, showConversation, showLatestHistory } from '../db';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export async function GET(request: NextRequest) {
    const { slug } = await request.json();

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
            { type: 'ERROR', error: 'Unable to find conversation.' },
            { status: 404 }
        )
    }

    const history = await showLatestHistory(conversation.id); 
    if (!history || history.response === null) {
         return NextResponse.json(
            { type: 'ERROR', error: 'No history data' },
            { status: 401 }
        )
    }

    const elevenlabs = new ElevenLabsClient();

    const audio = await elevenlabs.textToSpeech.convert('JBFqnCBsd6RMkjVDRZzb', {
        text: history.response,
        modelId: 'eleven_multilingual_v2',
        outputFormat: 'mp3_44100_128'
    });

    return new Response(audio, {
        headers: {
            'Content-Type': 'audio/mpeg',
        },
    });

}