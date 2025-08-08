import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { User } from '@/types';

const supabase = createClient<Database>(process.env.PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_KEY || '');

export const readCharacters = async () => {
    const { data } = await supabase.from('echoes_characters').select(`
        id,
        name,
        image,
        slug
    `)
    .eq('archived', false)
    
    if (!data) {
        return []
    }

    return data
}

export const showCharacter = async (slug: string) => {
    const { data } = await supabase.from('echoes_characters').select(`
        id,
        name,
        image,
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

export const showAuthUser = async (uid: string): Promise<User | null> => {
    const { data } = await supabase.from('echoes_users').select(`
        id, 
        username, 
        email
    `).eq('uid', uid).eq('archived', false).single();

    if (!data) {
        return null
    }

    return data;
}