'use client'

import { cn } from '@/lib/utils'
import { type Category } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

interface CategoriesProps {
  data: Category[]
}

const Categories = ({ data }: CategoriesProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryId = searchParams.get('categoryId')

  const handleCategoryClick = (id: string) => {
    const query = { categoryId: id }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query
      },
      { skipNull: true }
    )

    return router.push(url)
  }

  return (
    <div className='flex w-full space-x-2 overflow-x-auto p-1'>
      <button
        onClick={() => handleCategoryClick('')}
        className={cn(
          'flex items-center rounded-md bg-primary/10 px-2 py-2 text-center text-xs transition hover:opacity-75 md:px-4 md:py-3 md:text-sm',
          !categoryId && 'bg-primary/25'
        )}
      >
        Newest
      </button>

      {data.map(({ id, name }) => (
        <button
          onClick={() => handleCategoryClick(id)}
          className={cn(
            'flex items-center rounded-md bg-primary/10 px-2 py-2 text-center text-xs transition hover:opacity-75 md:px-4 md:py-3 md:text-sm',
            id === categoryId && 'bg-primary/25'
          )}
          key={id}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default Categories
