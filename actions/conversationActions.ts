import { API_ROUTE } from "@/config/app";

export const createConversation = async (input: string, slug: string) => {
    const response = await fetch(`${API_ROUTE}/conversations/create`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           input,
           slug
        })
    });

    return await response.json();
}