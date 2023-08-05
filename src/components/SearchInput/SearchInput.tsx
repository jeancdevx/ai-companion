'use client'

import { Input } from '@/components/ui/Input'
import { useDebounce } from '@/hooks/use-debounce'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'

const SearchInput = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryId = searchParams.get('categoryId')
  const name = searchParams.get('name')

  const [value, setValue] = useState(name ?? '')
  const debouncedValue = useDebounce(value, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const query = {
      name: debouncedValue,
      categoryId
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query
      },
      {
        skipEmptyString: true,
        skipNull: true
      }
    )

    router.push(url)
  }, [debouncedValue, categoryId, router])

  return (
    <div className='relative'>
      <Search className='absolute left-4 top-3 h-4 w-4 text-muted-foreground' />

      <Input
        placeholder='Search...'
        className='bg-primary/10 pl-10'
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchInput
