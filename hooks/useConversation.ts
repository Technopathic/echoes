import useSWR from 'swr'
import * as types from '@/types'

import { API_ROUTE } from '@/config/app'
import { useUserStore } from './useStore'

type ShowConversationResponse = types.DefaultResponse & { data?: { history: types.History[], character: types.Character, conversation: types.Conversation } }

export const useShowConversation = (slug: string | null) => {
    const response = async ([key, token]: [string, string | undefined]): Promise<ShowConversationResponse> => {
        const result = await fetch(`${API_ROUTE}/${key}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    
        return await result.json();
    }

    const session = useUserStore(state => state.session);
    const swrKey = session ? [`conversations/show?slug=${slug}`, session?.access_token] : null;
    return useSWR(swrKey, response);
}