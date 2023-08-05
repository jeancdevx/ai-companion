import { checkSubscription } from '@/lib/subscription'
import HeaderSettings from './components/HeaderSettings'

const SettingsPage = async () => {
  const isUpgrade = await checkSubscription()

  return (
    <aside className='relative h-full space-y-2 py-4'>
      <div className='absolute -z-40 h-32 w-full bg-gradient-to-b from-primary/10' />

      <section className='flex flex-col items-center justify-center gap-4 px-8 py-4 md:flex-row md:justify-start'>
        <HeaderSettings isUpgrade={isUpgrade} />
      </section>
    </aside>
  )
}

export default SettingsPage
