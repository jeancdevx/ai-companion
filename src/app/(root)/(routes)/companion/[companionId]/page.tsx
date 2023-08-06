import prismadb from '@/lib/prismadb'
import { checkSubscription } from '@/lib/subscription'
import { auth, redirectToSignIn } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import CompanionForm from './components/CompanionForm'

interface CompanionIdPageProps {
  params: {
    companionId: string
  }
}

const CompanionIdPage = async ({
  params: { companionId }
}: CompanionIdPageProps) => {
  const { userId } = auth()

  if (!userId) {
    return redirectToSignIn()
  }

  const validSubscription = await checkSubscription()

  if (!validSubscription) {
    return redirect('/')
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: companionId,
      userId
    }
  })

  const categories = await prismadb.category.findMany()

  return (
    <CompanionForm
      initialData={companion}
      categories={categories}
    />
  )
}

export default CompanionIdPage
