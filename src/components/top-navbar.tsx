"use client"

import { useId, useRef, useState } from "react"
import { LoaderCircleIcon, SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useNav } from "@/contexts/nav-context"

export function TopNavbar() {
  const { pageTitle } = useNav()
  const searchId = useId()
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

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
    <div className="w-full border-b bg-background">
      <div className="flex h-[60px] items-center gap-3 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="hidden sm:block data-vertical:h-4 data-vertical:self-auto" />
        <span className="text-base font-semibold">{pageTitle}</span>
        <div className="flex-1" />

        {/* 手機版：搜尋 icon 按鈕 */}
        <Button
          variant="outline"
          size="icon"
          className="sm:hidden size-8 rounded-lg shadow-xs"
          aria-label="查詢會員"
        >
          <SearchIcon className="size-4" />
        </Button>

        {/* 桌機/平板版：搜尋輸入框 */}
        <div className="relative hidden sm:block w-48 md:w-64">
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <SearchIcon className="size-4" />
            <span className="sr-only">Search</span>
          </div>
          <Input
            id={searchId}
            type="search"
            placeholder="查詢會員"
            value={value}
            onChange={handleChange}
            className="peer h-9 px-9 rounded-lg border-input bg-white shadow-xs [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
          />
          {isLoading && (
            <div className="text-muted-foreground pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50">
              <LoaderCircleIcon className="size-4 animate-spin" />
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
