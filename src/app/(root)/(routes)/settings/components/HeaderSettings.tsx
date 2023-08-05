'use client'

import { Avatar, AvatarImage } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import SubscriptionButton from '@/components/ui/SubscriptionButton'
import { cn, formatDateTime } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'

interface HeaderSettingsProps {
  isUpgrade: boolean
}

const HeaderSettings = ({ isUpgrade }: HeaderSettingsProps) => {
  const { user } = useUser()

  if (!user) return null

  return (
    <>
      <div className='relative h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-56'>
        <Avatar className='relative h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-56'>
          <AvatarImage src={user?.imageUrl} />
        </Avatar>

        <span
          className={cn(
            'absolute bottom-2 right-4 h-3 w-3 rounded-full outline outline-2 outline-white md:bottom-4 md:right-5 lg:bottom-4 lg:right-6 lg:h-4 lg:w-4 xl:bottom-6 xl:right-7',
            isUpgrade ? 'bg-green-500' : 'bg-red-500 '
          )}
        />
      </div>

      <article className='flex flex-col items-center gap-y-4 md:items-start'>
        <div className='flex flex-col items-center gap-y-1 md:items-start'>
          <h3 className='text-2xl font-bold text-primary md:text-3xl lg:text-4xl xl:text-5xl'>
            {user?.fullName}
          </h3>
          <p className='text-xs text-muted-foreground md:text-sm lg:text-base'>
            {user?.emailAddresses[0].emailAddress}
          </p>
        </div>

        <div className='flex items-center gap-x-2'>
          {isUpgrade ? (
            <Badge variant='free'>Premium Plan</Badge>
          ) : (
            <Badge variant='premium'>Free Plan</Badge>
          )}

          {user?.createdAt && (
            <Badge variant='default'>{formatDateTime(user.createdAt)}</Badge>
          )}
        </div>

        <SubscriptionButton isUpgrade={isUpgrade} />
      </article>
    </>
  )
}

export default HeaderSettings
