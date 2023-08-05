'use client'

import { type Companion } from '@prisma/client'
import { useEffect, useRef, useState, type ElementRef } from 'react'
import ChatMessage, { type ChatMessageProps } from './ChatMessage'

interface ChatMessagesProps {
  companion: Companion
  isLoading: boolean
  messages: ChatMessageProps[]
}

const ChatMessages = ({
  companion,
  isLoading,
  messages = []
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<'div'>>(null)

  const [fakeLoading, setFakeLoading] = useState(messages.length === 0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length])

  return (
    <section className='flex-1 overflow-y-auto pr-4'>
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role='SYSTEM'
        content={`Welcome my friend! I'm _${companion.name}_, ${companion.description} and I'm here to help you with your questions. Feel free to ask me anything!`}
      />

      {messages.map(({ content, role }) => (
        <ChatMessage
          key={content}
          src={companion.src}
          content={content}
          role={role}
        />
      ))}

      {isLoading && (
        <ChatMessage
          src={companion.src}
          role='SYSTEM'
          isLoading
        />
      )}

      <div ref={scrollRef} />
    </section>
  )
}

export default ChatMessages
