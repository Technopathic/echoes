'use client'

import { useRouter, useSearchParams } from "next/navigation";

import Chat from "@/components/Chat"
import { useUserStore } from "@/hooks/useStore";
import { Suspense, useEffect, useState } from "react";
import Link from "@/components/common/Link";
import { LuArrowLeft, LuHistory, LuX } from "react-icons/lu";
import { useShowConversation } from "@/hooks/useConversation";
import Button from "@/components/common/Button";

const Conversation = () => {
    const session = useUserStore(state => state.session)
    const hasHydrated = useUserStore(state => state._hasHydrated)
    const router = useRouter()
    const [showHistory, setShowHistory] = useState(false)

    const searchParams = useSearchParams()
    const slug = searchParams.get('id')
    const { data } = useShowConversation(slug)

    useEffect(() => {
        if (hasHydrated && !session) {
            router.push('/')
        }
    }, [hasHydrated, session, router])

    if (!hasHydrated || !session || !data) {
        return null
    }

    return (
        <section className="h-full relative">
            <header className="h-14 w-full bg-neutral-700/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-20 shadow-sm flex items-center justify-center px-2">
                <section className="w-full max-w-screen-sm flex items-center justify-between">
                    <Link 
                        content={<LuArrowLeft />}
                        backgroundColor="bg-transparent"
                        textColor="text-neutral-400"
                        hoverColor="hover:bg-neutral-800"
                        activeColor="active:bg-neutral-800/50"
                        className="text-xl shadow-none !p-2"
                        href="/"
                    />
                    <p className="text-neutral-400 text-lg uppercase">{data.data?.character.name}</p>
                    <Button 
                        content={<LuHistory />}
                        backgroundColor="bg-transparent"
                        textColor="text-neutral-400"
                        hoverColor="hover:bg-neutral-800"
                        activeColor="active:bg-neutral-800/50"
                        className="text-xl shadow-none !p-2"
                        onClick={() => setShowHistory(true)}
                    />
                </section>
            </header>
            <Chat />
            {showHistory && (
                <section className="fixed w-full h-screen bg-neutral-900/80 backdrop-blur-sm top-0 left-0 right-0 bottom-0 flex flex-col z-30 items-center">
                    <section className="relative w-full h-full max-w-screen-sm flex flex-col items-center px-2">
                        <section className="h-14 w-full max-w-screen-sm relative z-40 flex justify-end py-2">
                            <Button 
                                content={<LuX />}
                                backgroundColor="bg-transparent"
                                textColor="text-neutral-400"
                                hoverColor="hover:bg-neutral-800"
                                activeColor="active:bg-neutral-800/50"
                                className="text-xl shadow-none !p-2"
                                onClick={() => setShowHistory(false)}
                            />
                        </section>

                        <section className="flex flex-col overflow-auto">
                            <section className="flex flex-col">
                                <p className="text-sm text-neutral-400 font-bold pb-2">Summary</p>
                                <section className="bg-neutral-800 rounded-lg p-2">
                                    {data.data && data.data.conversation ? 
                                        <p className="text-sm text-neutral-400">{data.data?.conversation.summary}</p> :
                                        <p className="text-sm text-neutral-400">No Summary yet. Try talking to the character!</p>
                                    }
                                </section>
                            </section>

                            <section className="flex flex-col my-8">
                                <p className="text-sm text-neutral-400 font-bold pb-2">History</p>
                                <section className="flex flex-col flex-grow overflow-auto gap-4">
                                    {
                                        data.data && data.data.history.length === 0 ? (
                                            <p className="text-sm text-neutral-400">No conversation history</p>
                                        ) : 
                                        data.data && data.data?.history.map((history, i) => (
                                            <section className="flex flex-col gap-4" key={i}>
                                                <article className="bg-neutral-100 p-2 rounded-lg">
                                                    <p className="text-sm text-neutral-800">{history.response}</p>
                                                </article>
                                                <article className="bg-neutral-700 p-2 rounded-lg">
                                                    <p className="text-sm text-neutral-400">{history.input}</p>
                                                </article>
                                            </section>    
                                        ))
                                    }
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            )}
        </section>
    )
}

const ConversationRender = () => {
    return (
        <Suspense fallback={<div className="w-full h-screen flex items-center justify-center bg-neutral-900 text-white">Loading...</div>}>
            <Conversation />
        </Suspense>
    );
};

export default ConversationRender