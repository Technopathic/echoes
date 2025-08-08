export interface appConfig {
	siteName: string;
	title: string;
	locale: string;
	keywords: string[];
	creator: string;
	appType: 'website';
	ogImage: string;
	description: string;
	siteURL: string;
};

export type DefaultResponse = {
    type: 'ERROR' | 'SUCCESS'
    error?: string;
}

export interface Character {
    id: number
    name: string
    prompt: string
    image: string
}

export interface CharacterState {
    characters: Character[];
}

