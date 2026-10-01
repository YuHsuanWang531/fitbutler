"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UnderlineTabsProps {
  tabs: { name: string; value: string }[]
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

export function UnderlineTabs({ tabs, value, onValueChange, children }: UnderlineTabsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.value === value)
    const activeTabElement = tabRefs.current[activeIndex]
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth })
    }
  }, [value, tabs])

  return (
    <Tabs value={value} onValueChange={onValueChange} className="gap-0">
      <TabsList className="bg-background relative rounded-none border-b p-0 w-full justify-start h-[48px] group-data-horizontal/tabs:h-[48px]">
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            ref={(el) => { tabRefs.current[index] = el }}
            className="bg-background dark:data-[state=active]:bg-background relative z-10 h-full flex-none rounded-none border-0 px-6 text-sm font-medium text-muted-foreground data-active:text-brand data-active:hover:text-brand data-active:shadow-none!"
          >
            {tab.name}
          </TabsTrigger>
        ))}
        <div
          className="bg-brand absolute bottom-0 z-20 h-0.5 transition-[left,width] duration-300 ease-out"
          style={{ left: underlineStyle.left, width: underlineStyle.width }}
        />
      </TabsList>
      {children}
    </Tabs>
  )
}
