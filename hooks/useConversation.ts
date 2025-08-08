import useSWR from 'swr'
import * as types from '@/types'

import { API_ROUTE } from '@/config/app'
import { useUserStore } from './useStore'

type GetHistoryResponse = types.DefaultResponse & { data?: types.History[] }

export const useGetHistory = (slug: string | null) => {
    const response = async ([key, token]: [string, string | undefined]): Promise<GetHistoryResponse> => {
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
    const swrKey = session ? [`conversations/read?slug=${slug}`, session?.access_token] : null;
    return useSWR(swrKey, response);
}