import { Sidebar } from '@/components/Sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'
import { checkSubscription } from '@/lib/subscription'
import { Menu } from 'lucide-react'

const MobileSidebar = async () => {
  const isUpgrade = await checkSubscription()

  return (
    <Sheet>
      <SheetTrigger className='pr-4 md:hidden'>
        <Menu size={24} />
      </SheetTrigger>

      <SheetContent
        side='left'
        className='w-32 bg-secondary p-0 pt-10'
      >
        <Sidebar isUpgrade={isUpgrade} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
