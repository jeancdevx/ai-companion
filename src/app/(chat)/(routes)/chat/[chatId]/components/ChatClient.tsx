'use client'

import ChatForm from '@/components/Chat/ChatForm'
import ChatHeader from '@/components/Chat/ChatHeader'
import { type ChatMessageProps } from '@/components/Chat/ChatMessage'
import ChatMessages from '@/components/Chat/ChatMessages'
import { type Companion, type Message } from '@prisma/client'
import { useCompletion } from 'ai/react'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

interface ChatClientProps {
  companion: Companion & {
    messages: Message[]
    _count: {
      messages: number
    }
  }
}

const ChatClient = ({ companion }: ChatClientProps) => {
  const router = useRouter()
  const [messages, setMessages] = useState<any[]>(companion.messages)

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(_, completion) {
        const systemMessage: ChatMessageProps = {
          role: 'SYSTEM',
          content: completion
        }

        setMessages((messages) => [...messages, systemMessage])
        setInput('')

        router.refresh()
      }
    })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userMessage: ChatMessageProps = {
      role: 'USER',
      content: input
    }

    setMessages((messages) => [...messages, userMessage])

    handleSubmit(e)
  }

  return (
    <aside className='flex h-full flex-col space-y-2 p-4'>
      <ChatHeader companion={companion} />

      <ChatMessages
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />

      <ChatForm
        input={input}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
        handleSubmit={onSubmit}
      />
    </aside>
  )
}

export default ChatClient
