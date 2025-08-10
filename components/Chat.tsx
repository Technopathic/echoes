'use client'

import { PromptInput, PromptInputSubmit, PromptInputTextarea, PromptInputToolbar } from "@/components/ai-elements/prompt-input"
import { useRef, useState } from "react"
import { useChat } from '@ai-sdk/react';
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from '@/components/ai-elements/response';
import { Loader } from "@/components/ai-elements/loader";
import { useSearchParams } from "next/navigation";
import { runPreflight } from "@/actions/userActions";
import { useUserStore } from "@/hooks/useStore";
import { getAudio } from "@/actions/audioActions";

const Chat = () => {
  const session = useUserStore(state => state.session)
  const setSession = useUserStore(state => state.setSession)
  const searchParams = useSearchParams()
	const slug = searchParams.get('id')

  const [input, setInput] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null);
  const { messages, sendMessage, status } = useChat({
    onFinish: async () => {
      if (slug && session && audioRef.current) {
        audioRef.current.pause()
        const response = await getAudio(slug, session.access_token)
        const audioUrl = URL.createObjectURL(response);

        audioRef.current.src = audioUrl
        audioRef.current.play()
      }
    }
  })

  const storePrompt = async (e: React.FormEvent) => {
		e.preventDefault()
		if (input.trim() && slug) {
      const accessToken = await runPreflight(session, setSession)
      if (accessToken) {
        sendMessage(
          { text: input },
          {
            body: { input, slug },
            headers: { 'Authorization': `Bearer ${accessToken}` },
          }
        )
      }
		}

		setInput('')
  }

  return (
    <section className="w-full max-w-screen-sm mx-auto p-4 relative h-full">
      <section className="flex flex-col h-full w-full gap-4 justify-between">
      	<Conversation>
          <ConversationContent>
            {messages.map((message) => (
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <Response key={`${message.id}-${i}`}>
                            {part.text}
                          </Response>
                        )
                      default:
                        return null
                    }
                  })}
                </MessageContent>
              </Message>
            ))}
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput onSubmit={storePrompt} className="bg-neutral-700 border-neutral-600 text-neutral-100">
          <PromptInputTextarea onChange={(e) => setInput(e.target.value)} value={input} className="!text-base"/>
          <PromptInputToolbar className="border-t border-neutral-600">
            <div />
            <PromptInputSubmit disabled={!input} status={status} />
          </PromptInputToolbar>
        </PromptInput>
        <audio ref={audioRef} />
      </section>
    </section>
  )
}

export default Chat