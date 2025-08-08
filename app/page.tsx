'use client'

import Characters from "@/components/Characters"
import { useUserStore } from "@/hooks/useStore";
import Login from "@/components/Login";

const Home = () => {
  const session = useUserStore(state => state.session);
  const hasHydrated = useUserStore(state => state._hasHydrated);

  if (!hasHydrated) {
    return null;
  }

  return (
    session ? (
      <section className="flex flex-col items-center h-full w-full gap-8 px-2">
        <section className="w-full flex flex-col items-center max-w-screen-sm">
          <h1 className="text-6xl font-bold text-neutral-600">ECHOES</h1>
          <div className="h-px bg-neutral-700 w-full my-4 w-full" />
          <p className="text-center md:text-2xl text-neutral-500 uppercase">Select a Character to speak with</p>
        </section>
        <section className="w-full max-w-screen-sm pb-4">
          <Characters />
        </section>
      </section>
    ): (
      <Login />
    )
  )
}

export default Home