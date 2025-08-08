import { create } from 'zustand'
import * as types from '@/types'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { Session, User } from '@/types'

export const useUserStore = create<types.UserState>()(persist(immer(set => ({
    user: undefined,
    session: undefined,
    _hasHydrated: false,
    setUser: (user: User | undefined) => set({ user }),
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

export const useHistoryStore = create<types.HistoryState>()(immer(set => ({
    history: []
})))