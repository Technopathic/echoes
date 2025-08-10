import { NextResponse, NextRequest } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateObject, generateText, streamText } from 'ai';
import { z } from 'zod';
import { getAuth, showCharacter, showConversation, createConversation, createHistory, updateConversation, readHistory } from '../db';
import { calculateMood, calculateTrust, moodToText, trustToText } from '../helper';

export const maxDuration = 30;

export async function POST(request: NextRequest) {
    const { input, slug  } = await request.json();

    const _input = input.trim();

    if (!_input) {
        return NextResponse.json(
            { type: 'ERROR', error: 'Game description cannot be empty.' },
            { status: 401 }
        )
    }

    if (_input.length > 2500) {
        return NextResponse.json(
            { type: 'ERROR', error: 'Game description cannot exceed 2500 characters.' },
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

    let conversation = await showConversation(auth.id, character.id);
    if (!conversation) {
        conversation = await createConversation(auth.id, character.id);
        if (!conversation) {
            return NextResponse.json(
                { type: 'ERROR', error: 'Unable to start conversation' },
                { status: 500 }
            )
        }
    }

    const analysisPrompt = `
        You are a state analysis engine for a character.
        Character Persona: ${character.prompt}
        Current Mood: ${conversation.mood}
        Current Trust: ${conversation.trust}
        User Input: "${_input}"

        Analyze the user's input and determine the shift in the character's mood and trust.
        - mood_shift: -1 for negative, 0 for neutral, 1 for positive.
        - trust_shift: -1 for negative, 0 for neutral, 1 for positive.
        
        Respond with ONLY a JSON object.
    `

    const { object: stateUpdate } = await generateObject({
        model: openai('gpt-4o-mini'), // Use a smart but cheap model for this
        schema: z.object({
            mood_shift: z.number().min(-1).max(1),
            trust_shift: z.number().min(-1).max(1),
            reasoning: z.string().describe('Briefly explain why you chose these shifts.'),
        }),
        prompt: analysisPrompt,
    });


    const newMood = calculateMood(conversation.mood, stateUpdate.mood_shift)
    const newTrust = calculateTrust(conversation.trust, stateUpdate.trust_shift)

    const convertMood = moodToText(newMood)
    const convertTrust = trustToText(newTrust)

    const history = await readHistory(conversation.id, 5); 
    const formattedHistory = history.map(h => `User: ${h.input}\nYou: ${h.response}`).join('\n\n');

    const masterPrompt = `
        Your Persona: ${character.prompt}

        The Story So Far (Summary): ${conversation.summary || 'This is your first meeting.'}
        
        Your Current State: Your mood is now **${convertMood}** and your trust in the user is **${convertTrust}**.
        
        Most Recent Exchange: ${formattedHistory}

        The user just said: "${_input}"

        Your Task: Based on all of this context, generate your next response. Stay in character. Do not break the fourth wall.
    `

    const result = streamText({
        model: openai(process.env.OPENAI_MODEL || 'gpt-4o-mini'),
        system: "You are an interactive character.",
        prompt: masterPrompt,
        onFinish: async (aiResponse) => {
            const summaryPrompt = `
                Create a summary of this conversation based on the previous summary (if there is one) and the new conversation. 

                Previous summary: ${conversation.summary || 'No previous summary'}
                New Conversation: {
                    User Input: ${_input}
                    Character Response: ${aiResponse.text}
                }
                
                Respond with only the summarized conversation.
            `

            const { text: summaryResponse } = await generateText({
                model: openai(process.env.OPENAI_MODEL || 'gpt-4o-mini'),
                prompt: summaryPrompt,
            })

            await Promise.all([
                updateConversation(conversation.id, newMood, newTrust, summaryResponse),
                createHistory(conversation.id, _input, aiResponse.text)
            ])
        }
    }) 

    return result.toUIMessageStreamResponse()
}
