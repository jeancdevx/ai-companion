'use client'

import { UserButton } from '@clerk/nextjs'
import { Sparkles } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'

import MobileSidebar from '@/components/Sidebar/MobileSibedar'
import ThemeToggle from '@/components/Theme/ThemeToggle'
import { Button } from '@/components/ui/Button'
import { useModal } from '@/hooks/use-modal'
import { cn } from '@/lib/utils'

interface NavbarProps {
  isUpgrade: boolean
}

const font = Poppins({
  weight: '600',
  subsets: ['latin']
})

const Navbar = ({ isUpgrade }: NavbarProps) => {
  const { openModal } = useModal()

  return (
    <nav className='fixed z-50 flex h-16 w-full items-center justify-between bg-secondary px-4 py-2'>
      <div className='flex items-center'>
        <MobileSidebar />

        <Link href='/'>
          <h1
            className={cn(
              'hidden text-xl font-bold text-primary md:block md:text-2xl',
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>

      <div className='flex items-center gap-x-3'>
        {!isUpgrade && (
          <Button
            size='sm'
            variant='premium'
            onClick={openModal}
          >
            Upgrade
            <Sparkles className='ml-2 h-4 w-4 fill-white text-white' />
          </Button>
        )}

        <ThemeToggle />

        <UserButton afterSignOutUrl='/' />
      </div>
    </nav>
  )
}

export default Navbar
