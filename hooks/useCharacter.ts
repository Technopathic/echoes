import useSWR from 'swr'
import * as types from '@/types'

import { API_ROUTE } from '@/config/app'
import { useUserStore } from './useStore'
import { runPreflight } from '@/actions/userActions'

type GetCharacterResponse = types.DefaultResponse & { data?: types.Character[] }

export const useGetCharacters = () => {
    const session = useUserStore(state => state.session);
    const setSession = useUserStore(state => state.setSession);

    const response = async ([key]: [string]): Promise<GetCharacterResponse> => {
        const accessToken = await runPreflight(session, setSession);
        if (!accessToken) {
            throw new Error('Authentication preflight check failed.');
        }

        const result = await fetch(`${API_ROUTE}/${key}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
    
        return await result.json();
    }

    
    const swrKey = session ? [`characters/read`] : null;
    return useSWR(swrKey, response);
}