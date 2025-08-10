import type * as types from '@/types'

export const API_ROUTE = 'https://echoes-ecru.vercel.app/api'
export const STORAGE_ROUTE = 'https://wbswqqpsrcafccpfxeby.supabase.co/storage/v1/object/public/echoes/characters'

export const appConfig: types.appConfig = {
	siteName: 'Echoes',
	title: 'Echoes',
	locale: 'en',
	keywords: ['games', 'characters', 'ai', 'agent', 'growth', 'sales', 'development', 'design', 'research'],
	creator: 'Ren',
	appType: 'website',
	ogImage: 'https://echoes-ecru.vercel.app/ogimage.png',
	description: "Conversational Character bots from popular games and media.",
	siteURL: 'https://echoes-ecru.vercel.app'
}