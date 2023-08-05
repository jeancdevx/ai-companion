'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/Dialog'
import { Separator } from '@/components/ui/Separator'
import { useModal } from '@/hooks/use-modal'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import Image from 'next/image'

const Modal = () => {
  const { isOpen, closeModal } = useModal()
  const { toast } = useToast()

  const [loading, setLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpgrade = async () => {
    try {
      setLoading(true)

      const { data } = await axios.get('/api/stripe')

      window.location.href = data.url
    } catch (error) {
      toast({
        title: 'Error while upgrading. Please try again.',
        description: 'Something went wrong while upgrading to premium.',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  if (!isMounted) return null

  return (
    <Dialog
      open={isOpen}
      onOpenChange={closeModal}
    >
      <DialogContent>
        <DialogHeader className='space-y-4'>
          <DialogTitle className='text-center'>Upgrade to Premium</DialogTitle>

          <DialogDescription className='space-y-2 text-center'>
            Create {/* add a gradient color to this span */}
            <span className='bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 bg-clip-text font-bold text-transparent'>
              Custom AI
            </span>{' '}
            Companions
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className='flex items-center justify-center'>
          <Image
            src='/premium.svg'
            alt='Premium'
            width={100}
            height={100}
            className=''
          />
        </div>

        <div className='flex justify-between'>
          <p className='text-2xl font-semibold'>
            $9
            <span className='text-sm font-medium'>.99 / month</span>
          </p>

          <Button
            variant='premium'
            onClick={onUpgrade}
            disabled={loading}
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
