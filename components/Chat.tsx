'use client'

import { PromptInput, PromptInputSubmit, PromptInputTextarea, PromptInputToolbar } from "@/components/ai-elements/prompt-input"
import { useState } from "react"
import { useChat } from '@ai-sdk/react';
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from '@/components/ai-elements/response';
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning";
import { Loader } from "@/components/ai-elements/loader";
import { useGetHistory } from "@/hooks/useConversation";
import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/hooks/useStore";
import { createConversation } from "@/actions/conversationActions";

const Chat = () => {
	const session = useUserStore(state => state.session)
  const [input, setInput] = useState('')
  const { messages, sendMessage, status } = useChat()

	const searchParams = useSearchParams()
	const slug = searchParams.get('id');
  const { data } = useGetHistory(slug)

  const storePrompt = async (e: React.FormEvent) => {
		e.preventDefault();
		if (input.trim() && session && slug) {

			await createConversation(input, slug, session.access_token)
			//sendMessage({ text: input })
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
                      case 'reasoning':
                        return (
                          <Reasoning
                            key={`${message.id}-${i}`}
                            className="w-full"
                            isStreaming={status === 'streaming'}
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>{part.text}</ReasoningContent>
                          </Reasoning>
                        );
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
      </section>
    </section>
  )
}

export default Chat