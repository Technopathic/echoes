import { create } from 'zustand'
import * as types from '@/types'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Session } from '@/types'

export const useUserStore = create<types.UserState>()(persist(immer(set => ({
    session: undefined,
    _hasHydrated: false,
    setSession: (session: Session | undefined) => set({ session }),
    setHasHydrated: (isHydrated: boolean) => set({ _hasHydrated: isHydrated })
})), {
    name: 'user-storage',
    storage: createJSONStorage(() => sessionStorage),
    merge: (persistedState, currentState) => ({ ...currentState, ...(persistedState as types.UserState) }),
    onRehydrateStorage: () => (state) => {
        if (state) {
            state.setHasHydrated(true);
        }
    },
}))


export const useUIStore = create<types.UIState>()(immer(set => ({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({ isLoading })
})))