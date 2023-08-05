import BotAvatar from '@/components/Chat/BotAvatar'
import { Button } from '@/components/ui/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@clerk/nextjs'
import { type Companion, type Message } from '@prisma/client'
import axios from 'axios'
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ChatHeaderProps {
  companion: Companion & {
    messages: Message[]
    _count: {
      messages: number
    }
  }
}

const ChatHeader = ({ companion }: ChatHeaderProps) => {
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/companion/${companion.id}`)

      toast({
        title: 'Companion deleted',
        description: 'The companion was deleted successfully.'
      })

      router.refresh()
      router.push('/')
    } catch (error) {
      toast({
        title: 'Error deleting companion',
        description:
          'An error occurred while deleting the companion. Please try again later.',
        variant: 'destructive'
      })
    }
  }

  return (
    <header className='mb-4 flex w-full items-center justify-between border-b border-primary/10 pb-4'>
      <div className='flex items-center gap-x-2'>
        <Button
          size='icon'
          variant='ghost'
          onClick={() => router.back()}
        >
          <ChevronLeft className='h-6 w-6' />
        </Button>

        <BotAvatar src={companion.src} />

        <div className='flex flex-col gap-y-1'>
          <div className='flex items-center gap-x-2'>
            <h2 className='text-lg font-semibold'>{companion.name}</h2>

            <div className='flex items-center text-xs text-muted-foreground'>
              <MessagesSquare className='mr-1 h-4 w-4' />
              <span>{companion._count.messages}</span>
            </div>
          </div>

          <p className='text-xs text-muted-foreground'>
            Created by {companion.userName}
          </p>
        </div>
      </div>

      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='secondary'
              size='icon'
            >
              <MoreVertical className='h-6 w-6' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${companion.id}`)}
              className='cursor-pointer'
            >
              <Edit className='mr-2 h-4 w-4' />
              <span>Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={handleDelete}
              className='cursor-pointer'
            >
              <Trash className='mr-2 h-4 w-4' />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  )
}

export default ChatHeader
