import { create } from 'zustand'
import * as types from '@/types'
import { immer } from 'zustand/middleware/immer'

export const useCharacterStore = create<types.CharacterState>()(immer(set => ({
    characters: []
})))