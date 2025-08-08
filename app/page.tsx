'use client'

import Characters from "@/components/Characters"
import Chat from "@/components/Chat"
import { useUserStore } from "@/hooks/useStore";
import Login from "@/components/Login";

const Home = () => {
  const session = useUserStore(state => state.session);
  const hasHydrated = useUserStore(state => state._hasHydrated);

  if (!hasHydrated) {
    return null;
  }

  return (
    <main className="flex w-full h-screen bg-neutral-900 gap-1">
      <section className="bg-neutral-900 h-screen w-72 flex flex-col">
        <section className="py-4 flex flex-col items-center gap-2 px-2">
          <h1 className="text-neutral-100 font-bold text-2xl">ECHOES</h1>
          <div className="h-px bg-neutral-600 w-full" />
        </section>
        <Characters />
      </section>

      <section className="flex-grow pr-3 py-3 flex flex-col">
        <section></section>
        <section className="bg-neutral-800 h-full rounded-xl">
          {session ? (
            <Chat />
          ): (
            <Login />
          )}
        </section>
      </section>
    </main>
  )
}

export default Home