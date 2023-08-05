import prismadb from '@/lib/prismadb'
import { auth, redirectToSignIn } from '@clerk/nextjs'
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

  // todo: check subscription

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
