import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabase = createClient<Database>(process.env.PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_KEY || '');

export const readCharacters = async () => {
    const { data } = await supabase.from('echoes_characters')
    .select(`
        id,
        name,
        slug
    `)
    .eq('archived', false)
    
    if (!data) {
        return []
    }

    return data
}

export const showCharacter = async (slug: string) => {
    const { data } = await supabase.from('echoes_characters')
    .select(`
        id, 
        name, 
        slug, 
        prompt
    `)
    .eq('archived', false)
    .eq('slug', slug)
    .single()
    
    if (!data) {
        return null
    }

    return data
}

export const showCharacterPublic = async (slug: string) => {
    const { data } = await supabase.from('echoes_characters')
    .select(`
        id, 
        name, 
        slug
    `)
    .eq('archived', false)
    .eq('slug', slug)
    .single()
    
    if (!data) {
        return null
    }

    return data
}

export const showConversation = async (userId: string, characterId: number) => {
    const { data } = await supabase.from('echoes_conversations')
    .select(`
        id,
        userId,
        characterId,
        mood,
        trust,
        summary,
        updated_at
    `)
    .eq('archived', false)
    .eq('userId', userId)
    .eq('characterId', characterId)
    .single()

    if (!data) {
        return null
    }

    return data
}

export const createConversation = async (userId: string, characterId: number) => {
    const { data, error } = await supabase.from('echoes_conversations')
    .insert({
        userId,
        characterId
    })
    .select(`
        id,
        userId,
        characterId,
        mood,
        trust,
        summary,
        updated_at
    `)
    .single()

    if (!data) {
        return null
    }

    return data
}

export const updateConversation = async (conversationId: number, mood: number, trust: number, summary: string) => {
    await supabase.from('echoes_conversations')
    .update({
        mood,
        trust,
        summary
    })
    .eq('id', conversationId)
}

export const readHistory = async (conversationId: number, limit: number= 10) => {
    const { data } = await supabase.from('echoes_history')
    .select(`
        input,
        response
    `)
    .eq('conversationId', conversationId)
    .order('created_at', { ascending: false })
    .limit(limit)

    if (!data) {
        return []
    }

    return data
}

export const showLatestHistory = async (conversationId: number) => {
    const { data } = await supabase.from('echoes_history')
    .select(`
        input,
        response
    `)
    .eq('conversationId', conversationId)
    .order('created_at', { ascending: false })
    .single()

    if (!data) {
        return null
    }

    return data
}

export const createHistory = async (conversationId: number, input: string, response: string) => {
    await supabase.from('echoes_history')
    .insert({
        conversationId,
        input,
        response
    })
}

export const authClient = (token: string) => {
    if (!process.env.PUBLIC_SUPABASE_URL || !process.env.SUPABASE_KEY) {
        throw new Error ('Supabse configuration is not set')
    }

    return createClient<Database>(
        process.env.PUBLIC_SUPABASE_URL, 
        process.env.SUPABASE_KEY,
        {
          global: {
            headers: { Authorization: token }
          }
        }
    )
}

export const getAuth = async (token: string) => {
    const client = authClient(token)

    const { data: { user } } = await client.auth.getUser()

    return user
}

export const refreshSession = async (refreshToken: string) => {
    const { data } = await supabase.auth.refreshSession({
        refresh_token: refreshToken
    });

    if (!data) {
        return null
    }

    return data.session
}