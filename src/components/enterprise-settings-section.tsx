"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs = [
  { name: "公司", value: "company" },
  { name: "場館", value: "venue" },
  { name: "空間", value: "space" },
]

export function EnterpriseSettingsSection() {
  const [activeTab, setActiveTab] = useState("company")
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })

  useLayoutEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.value === activeTab)
    const activeTabElement = tabRefs.current[activeIndex]
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth })
    }
  }, [activeTab])

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-0">
      <TabsList className="bg-background relative rounded-none border-b p-0 w-full justify-start h-auto">
        {tabs.map((tab, index) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            ref={(el) => { tabRefs.current[index] = el }}
            className="bg-background dark:data-[state=active]:bg-background relative z-10 flex-none rounded-none border-0 px-6 py-4 text-muted-foreground data-active:text-[#d7006f] data-[state=active]:shadow-none!"
          >
            {tab.name}
          </TabsTrigger>
        ))}
        <motion.div
          className="bg-[#d7006f] absolute bottom-0 z-20 h-0.5"
          layoutId="underline"
          style={{ left: underlineStyle.left, width: underlineStyle.width }}
          transition={{ type: "spring", stiffness: 400, damping: 40 }}
        />
      </TabsList>

      <TabsContent value="company" className="mt-6" />
      <TabsContent value="venue" className="mt-6" />
      <TabsContent value="space" className="mt-6" />
    </Tabs>
  )
}
