'use client'

import { Avatar, AvatarImage } from '@/components/ui/Avatar'
import { useUser } from '@clerk/nextjs'

export const UserAvatar = () => {
  const { user } = useUser()

  return (
    <Avatar className='h-10 w-10'>
      <AvatarImage src={user?.imageUrl} />
    </Avatar>
  )
}
