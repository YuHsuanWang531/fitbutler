"use client"

import { useNav } from "@/contexts/nav-context"
import { Button } from "@/components/ui/button"

export function DashboardFooter() {
  const { timezone } = useNav()
  return (
    <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-6 bg-gray-100 px-4 py-2">
      <p className="text-muted-foreground text-xs">
        時區：{timezone}
      </p>
      <div className="flex flex-wrap items-center gap-1 text-muted-foreground text-xs">
        <span>Copyright © 2025 雲端力鍊股份有限公司</span>
        <span>|</span>
        <Button variant="link" size="sm" className="h-auto p-0 text-xs font-normal text-muted-foreground">隱私權政策</Button>
        <span>|</span>
        <Button variant="link" size="sm" className="h-auto p-0 text-xs font-normal text-muted-foreground">幫助中心</Button>
      </div>
    </footer>
  )
}
