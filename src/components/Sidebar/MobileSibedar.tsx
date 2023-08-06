import { Sidebar } from '@/components/Sidebar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/Sheet'
import { Menu } from 'lucide-react'

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className='pr-4 md:hidden'>
        <Menu size={24} />
      </SheetTrigger>

      <SheetContent
        side='left'
        className='w-32 bg-secondary p-0 pt-10'
      >
        <Sidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
