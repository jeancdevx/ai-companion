'use client'

import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Copy } from 'lucide-react'
import { useTheme } from 'next-themes'
import { BeatLoader } from 'react-spinners'
import BotAvatar from './BotAvatar'
import { UserAvatar } from './UserAvatar'

export interface ChatMessageProps {
  role: 'SYSTEM' | 'USER'
  content?: string
  isLoading?: boolean
  src?: string
}

const ChatMessage = ({ role, content, isLoading, src }: ChatMessageProps) => {
  const { toast } = useToast()
  const { theme } = useTheme()

  const onCopy = () => {
    if (!content) return

    void navigator.clipboard.writeText(content)

    toast({
      title: 'Copied to clipboard',
      description: 'The message has been copied to your clipboard.'
    })
  }

  return (
    <article
      className={cn(
        'group flex w-full items-start gap-x-3 pb-4',
        role === 'USER' && 'justify-end'
      )}
    >
      {role !== 'USER' && src && <BotAvatar src={src} />}

      <div
        className={cn(
          'max-w-md rounded-md px-4 py-2 text-sm font-normal',
          role === 'SYSTEM' ? 'bg-primary-foreground' : 'bg-primary/5'
        )}
      >
        {isLoading ? (
          <BeatLoader
            color={theme === 'light' ? 'black' : 'white'}
            size={5}
          />
        ) : (
          content?.split('*').map((text, index) => {
            if (index % 2 === 1) {
              return (
                <span
                  key={text}
                  className='font-bold'
                >
                  *{text}*
                </span>
              )
            }

            return text.split('_').map((text, index) => {
              if (index % 2 === 1) {
                return (
                  <span
                    key={text}
                    className='font-bold'
                  >
                    {text}
                  </span>
                )
              }

              return text
            })
          })
        )}
      </div>

      {role === 'USER' && <UserAvatar />}

      {role !== 'USER' && !isLoading && (
        <Button
          onClick={onCopy}
          className='opacity-0 transition group-hover:opacity-100'
          size='icon'
          variant='ghost'
        >
          <Copy className='h-4 w-4' />
        </Button>
      )}

      {role === 'USER' && !isLoading && (
        <Button
          onClick={onCopy}
          className='absolute -left-14 opacity-0 transition group-hover:opacity-100'
          size='icon'
          variant='ghost'
        >
          <Copy className='h-4 w-4' />
        </Button>
      )}
    </article>
  )
}

export default ChatMessage
