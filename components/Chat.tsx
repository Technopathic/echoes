'use client'

import { PromptInput, PromptInputSubmit, PromptInputTextarea, PromptInputToolbar } from "@/components/ai-elements/prompt-input"
import { useEffect, useRef, useState } from "react"
import { useChat } from '@ai-sdk/react';
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from '@/components/ai-elements/response';
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning";
import { Loader } from "@/components/ai-elements/loader";
import { useSearchParams } from "next/navigation";
import { runPreflight } from "@/actions/userActions";
import { useUserStore } from "@/hooks/useStore";
import { getAudio } from "@/actions/audioActions";
import { ElevenLabsClient, stream } from '@elevenlabs/elevenlabs-js';

const Chat = () => {
  const session = useUserStore(state => state.session)
  const setSession = useUserStore(state => state.setSession)
  const searchParams = useSearchParams()
	const slug = searchParams.get('id')

  const [input, setInput] = useState('')
  const audioRef = useRef<HTMLAudioElement>(null);
  const { messages, sendMessage, status } = useChat({
    onFinish: async (data) => {
      console.log(data);
      if (slug && session) {
        const response = await getAudio(slug, session.access_token)
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onload = () => {
          if (audioRef.current) {
            audioRef.current.src = reader.result as string;
            audioRef.current.play();
          }
        };
        console.log(response);
      }
    }
  })

  const audioTriggeredForStream = useRef(false);

  useEffect(() => {
    const fetchAndPlayAudio = async () => {
      if (slug && session) {

        
        //console.log(response);
       // await stream(response.audioStream);
        //await stream(Readable.from(response.audio));

        /*const mediaSource = new MediaSource();
        audioPlayerRef.current.src = URL.createObjectURL(mediaSource);
        
        mediaSource.addEventListener('sourceopen', () => {
          const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
          const reader = response.body!.getReader();

          const pump = async () => {
            const { done, value } = await reader.read();
            
            if (done) {
              if (!sourceBuffer.updating) {
                mediaSource.endOfStream();
              } else {
                sourceBuffer.addEventListener('updateend', () => mediaSource.endOfStream(), { once: true });
              }
              return;
            }

            const appendBuffer = (chunk: BufferSource) => {
                return new Promise((resolve) => {
                    if (sourceBuffer.updating) {
                        sourceBuffer.addEventListener('updateend', () => {
                            sourceBuffer.appendBuffer(chunk);
                            resolve();
                        }, { once: true });
                    } else {
                        sourceBuffer.appendBuffer(chunk);
                        resolve();
                    }
                });
            };
            
            await appendBuffer(value);
            pump(); // Continue to the next chunk
          };
          
          pump();
        }, { once: true });

        audioPlayerRef.current.play().catch(console.error)*/
      }
    };
    fetchAndPlayAudio()
  }, [status, slug])

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
        <audio ref={audioRef} />
      </section>
    </section>
  )
}

export default Chat