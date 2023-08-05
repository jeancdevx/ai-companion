import { Categories } from '@/components/Categories'
import { Companions } from '@/components/Companions'
import { SearchInput } from '@/components/SearchInput'
import prismadb from '@/lib/prismadb'

interface RootPageProps {
  searchParams: {
    categoryId: string
    name: string
  }
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name
      }
    },
    orderBy: {
      name: 'desc'
    },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  })

  const categories = await prismadb.category.findMany()

  return (
    <div className='h-full space-y-2 p-4'>
      <SearchInput />

      <Categories data={categories} />

      <Companions data={data} />
    </div>
  )
}

export default RootPage