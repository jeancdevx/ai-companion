import { Navbar } from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
import { checkSubscription } from '@/lib/subscription'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const isUpgrade = await checkSubscription()

  return (
    <div className='h-full'>
      <Navbar isUpgrade={isUpgrade} />

      <div className='fixed inset-y-0 mt-16 hidden w-24 flex-col md:flex'>
        <Sidebar isUpgrade={isUpgrade} />
      </div>

      <main className='h-full pt-16 md:pl-24'>{children}</main>
    </div>
  )
}

export default RootLayout
