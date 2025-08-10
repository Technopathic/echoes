import { API_ROUTE } from "@/config/app"

export const getAudio = async (slug: string, accessToken: string) => {
    const response = await fetch(`${API_ROUTE}/audio?slug=${slug}`, {
        method: 'GET',
        headers: { 
            'Authorization': `Bearer ${accessToken}`
        }
    })
    console.log(response)

    return response.blob()
    //return await response.json()
}