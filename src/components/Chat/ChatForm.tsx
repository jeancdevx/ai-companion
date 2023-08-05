'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { type ChatRequestOptions } from 'ai'
import { SendHorizonal } from 'lucide-react'
import { type ChangeEvent, type FormEvent } from 'react'

interface ChatFormProps {
  input: string
  isLoading: boolean
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => void
}

const ChatForm = ({
  input,
  isLoading,
  handleInputChange,
  handleSubmit
}: ChatFormProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className='flex w-full items-center gap-x-2 border-t border-primary/10 py-4'
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder='Type a message...'
        className='rounded-lg bg-primary/10 text-xs font-medium'
        autoFocus
      />

      <Button
        disabled={isLoading}
        type='submit'
        variant='ghost'
      >
        <SendHorizonal className='h-6 w-6' />
      </Button>
    </form>
  )
}

export default ChatForm
