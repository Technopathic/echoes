import useSWR from 'swr'
import * as types from '@/types'

import { API_ROUTE } from '@/config/app'

type GetCharacterResponse = types.DefaultResponse & { data?: types.Character[] }
type ShowCharacterResponse = types.DefaultResponse & { data?: types.Character }

export const useGetCharacters = () => {
    const response = async (key: string): Promise<GetCharacterResponse> => {
        const result = await fetch(`${API_ROUTE}/${key}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            }
        });
    
        return await result.json();
    }

    const swrKey = `characters/read`;
    return useSWR(swrKey, response);
}

export const useShowCharacter = (slug: string) => {
    const response = async (key: string): Promise<ShowCharacterResponse> => {
        const result = await fetch(`${API_ROUTE}/${key}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json'
            }
        });
    
        return await result.json();
    }

    const swrKey = `characters/show?id=${slug}`;
    return useSWR(swrKey, response);
}