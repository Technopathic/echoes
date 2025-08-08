import { API_ROUTE } from "@/config/app";

export const signIn = async (email: string, password: string) => {
    const emailValue = email.toLowerCase().trim();
    const passwordValue = password.trim();

    const response = await fetch(`${API_ROUTE}/users/signIn`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
    });

    return await response.json();

}