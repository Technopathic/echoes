export interface appConfig {
	siteName: string
	title: string
	locale: string
	keywords: string[]
	creator: string
	appType: 'website'
	ogImage: string
	description: string
	siteURL: string
}

export type DefaultResponse = {
    type: 'ERROR' | 'SUCCESS'
    error?: string
}

export type InputError = { errorState: boolean, errorDescription: string | undefined }

type ResponseType = 'EMAIL' | 'PASSWORD' | 'GENERAL' | 'SUCCESS'

export interface AuthResponse {
    type: ResponseType
    error?: string
    data?: User
    session?: Session
}

export interface User {
    id: number
    username: string
    email: string
}

export interface Session {
    access_token: string
    expires_at: number
    expires_in: number
    refresh_token: string
    token_type: "bearer"
}

export interface UserState {
    user: User | undefined
    session: Session | undefined
    setUser: (user: User | undefined) => void
    setSession: (sesson: Session | undefined) => void
}

export interface Character {
    id: number
    name: string
    prompt: string
    slug: string
}
