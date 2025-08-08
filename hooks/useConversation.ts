import useSWR from 'swr'
import * as types from '@/types'

import { API_ROUTE } from '@/config/app'

type GetHistoryResponse = types.DefaultResponse & { data?: types.History[] }

export const useGetHistory= () => {
    const response = async (key: string): Promise<GetHistoryResponse> => {
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