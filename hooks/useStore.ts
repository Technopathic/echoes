import { create } from 'zustand'
import * as types from '@/types'
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer'
import { Session, User } from '@/types';

export const useUserStore = create<types.UserState>()(persist(immer(set => ({
    user: undefined,
    session: undefined,
    setUser: (user: User | undefined) => set({ user }),
    setSession: (session: Session | undefined) => set({ session }),
})), {
    name: 'user-storage',
    storage: createJSONStorage(() => sessionStorage),
    merge: (persistedState, currentState) => ({ ...currentState, ...(persistedState as types.UserState) })
}));