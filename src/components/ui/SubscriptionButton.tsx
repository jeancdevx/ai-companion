'use client'

import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Button } from './Button'

interface SubscriptionButtonProps {
  isUpgrade: boolean
}

const SubscriptionButton = ({ isUpgrade = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubscription = async () => {
    try {
      setLoading(true)

      const { data } = await axios.get('/api/stripe')

      window.location.href = data.url
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description:
          "We couldn't process your request, please try again later.",
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      size='sm'
      variant={isUpgrade ? 'free' : 'premium'}
      className='rounded-full'
      onClick={handleSubscription}
      disabled={loading}
    >
      {isUpgrade ? 'Manage Subscription' : 'Upgrade to Premium'}
      {!isUpgrade && (
        <Sparkles className='ml-2 inline-block h-4 w-4 fill-white' />
      )}
    </Button>
  )
}

export default SubscriptionButton
