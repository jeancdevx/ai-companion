import { Card, CardFooter, CardHeader } from '@/components/ui/Card'
import { type Companion } from '@prisma/client'
import { MessagesSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface CompanionsProps {
  data: Array<
    Companion & {
      _count: {
        messages: number
      }
    }
  >
}

const Companions = ({ data }: CompanionsProps) => {
  if (data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center space-y-3 pt-10'>
        <div className='relative flex h-80 w-80'>
          <Image
            fill
            className='object-cover grayscale'
            alt='Empty'
            src='/empty.webp'
          />
        </div>
        <h3 className='text-2xl font-bold text-muted-foreground md:text-5xl'>
          No companions found...
        </h3>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 gap-2 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {data.map((companion) => (
        <Card
          key={companion.id}
          className='cursor-pointer rounded-xl border-0 bg-primary/10 transition hover:opacity-75'
        >
          <Link href={`/chat/${companion.id}`}>
            <CardHeader className='flex items-center justify-center gap-y-1 pb-2 text-center text-muted-foreground'>
              <div className='relative flex h-32 w-32'>
                <Image
                  src={companion.src}
                  className='rounded-xl object-cover'
                  alt={companion.name}
                  fill
                />
              </div>

              <p className='text-base font-bold'>{companion.name}</p>
              <p className='text-xs font-semibold'>{companion.description}</p>
            </CardHeader>

            <CardFooter className='flex items-center justify-between pt-2 text-sm font-medium text-muted-foreground'>
              <p className='lowercase'>@{companion.userName}</p>

              <div className='flex items-center gap-x-1'>
                <MessagesSquare className='h-4 w-4' />
                <p>{companion._count.messages}</p>
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  )
}

export default Companions
