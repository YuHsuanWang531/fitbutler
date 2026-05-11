'use client'

import { useId, useRef, useState } from 'react'

import { LoaderCircleIcon, SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const InputSearchLoaderDemo = () => {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const id = useId()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    setValue(next)
    if (timerRef.current) clearTimeout(timerRef.current)
    if (next) {
      setIsLoading(true)
      timerRef.current = setTimeout(() => setIsLoading(false), 500)
    } else {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full max-w-xs space-y-2'>
      <Label htmlFor={id}>Search input with loader</Label>
      <div className='relative'>
        <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50'>
          <SearchIcon className='size-4' />
          <span className='sr-only'>Search</span>
        </div>
        <Input
          id={id}
          type='search'
          placeholder='Search...'
          value={value}
          onChange={handleChange}
          className='peer px-9 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none'
        />
        {isLoading && (
          <div className='text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
            <LoaderCircleIcon className='size-4 animate-spin' />
            <span className='sr-only'>Loading...</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default InputSearchLoaderDemo
