'use client'

import { useModal } from '@/hooks/use-modal'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import routes from './Sidebar.constants'

interface SidebarProps {
  isUpgrade?: boolean
}

const Sidebar = ({ isUpgrade }: SidebarProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { openModal } = useModal()

  const onNavigate = (url: string, pro: boolean) => {
    if (url === pathname || `/${url}` === pathname) {
      return
    }

    if (pro && !isUpgrade) {
      return openModal()
    }

    // clean up the url each to / each time we navigate
    url = url === '/' ? url : `/${url}`
    return router.push(url)
  }

  return (
    <aside className='flex h-full flex-col space-y-4 bg-secondary text-primary'>
      <section className='flex flex-1 justify-center p-3'>
        <ul className='space-y-2'>
          {routes.map((route) => (
            <li
              className={cn(
                'group flex cursor-pointer justify-start rounded-lg p-3 text-xs font-medium text-muted-foreground transition hover:bg-primary/10 hover:text-primary',
                pathname === route.href && 'bg-primary/10 text-primary'
              )}
              key={route.href}
              onClick={() => onNavigate(route.href, route.pro)}
            >
              <div className='flex flex-1 flex-col items-center gap-y-2'>
                <route.icon className='h-6 w-6' />
                <span>{route.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  )
}

export default Sidebar
