'use client'

import { useRouter } from "next/navigation";

import Chat from "@/components/Chat"
import { useUserStore } from "@/hooks/useStore";
import { useEffect } from "react";

const Conversation = () => {
    const session = useUserStore(state => state.session);
    const hasHydrated = useUserStore(state => state._hasHydrated);
    const router = useRouter();

    useEffect(() => {
        if (hasHydrated && !session) {
            router.push('/')
        }
    }, [hasHydrated, session, router])

    if (!hasHydrated || !session) {
        return null
    }

    return (
        <section className="h-full">
            <Chat />
        </section>
    )
}

export default Conversation