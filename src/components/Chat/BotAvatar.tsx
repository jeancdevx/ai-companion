import { Avatar, AvatarImage } from '@/components/ui/Avatar'

interface BotAvatarProps {
  src: string
}

const BotAvatar = ({ src }: BotAvatarProps) => {
  return (
    <Avatar className='h-10 w-10'>
      <AvatarImage
        src={src}
        alt='Bot avatar'
        className='rounded-full object-cover'
      />
    </Avatar>
  )
}

export default BotAvatar
