"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { Pencil, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AddCompanySheet } from "@/components/add-company-sheet"
import { EditBrandSheet } from "@/components/edit-brand-sheet"

const tabs = [
  { name: "公司", value: "company" },
  { name: "場館", value: "venue" },
  { name: "空間", value: "space" },
]

function BrandInfoSection({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-xl font-medium text-black">品牌資訊</h2>
      <div className="flex gap-4 items-start bg-white border border-border rounded-lg p-6">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex gap-15 items-start">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">品牌 LOGO</p>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-sm text-muted-foreground">品牌名稱</p>
              <p className="text-base text-black">小明的品牌</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">品牌帳號</p>
            <p className="text-base text-black">yuhsuan</p>
          </div>
        </div>
        <Button variant="outline" className="shrink-0" onClick={onEdit}>
          <Pencil />
          編輯
        </Button>
      </div>
    </div>
  )
}

function CompanyListSection({ onAddCompany }: { onAddCompany: () => void }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <p className="text-xl font-medium text-black">公司列表</p>
          <p className="text-sm text-muted-foreground">授權開通數：已開通 0 / 總授權 2</p>
        </div>
        <Button onClick={onAddCompany}>
          <Plus />
          新增公司
        </Button>
      </div>
      <div className="bg-white border border-border rounded-lg p-6">
        <p className="text-sm text-muted-foreground">尚未建立公司</p>
      </div>
    </div>
  )
}

export function EnterpriseSettingsSection() {
  const [activeTab, setActiveTab] = useState("company")
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editBrandOpen, setEditBrandOpen] = useState(false)

  useLayoutEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.value === activeTab)
    const activeTabElement = tabRefs.current[activeIndex]
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth })
    }
  }, [activeTab])

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-0">
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

        <TabsContent value="company" className="mt-6">
          <div className="flex flex-col gap-6 px-6 pb-6">
            <BrandInfoSection onEdit={() => setEditBrandOpen(true)} />
            <CompanyListSection onAddCompany={() => setSheetOpen(true)} />
          </div>
        </TabsContent>
        <TabsContent value="venue" className="mt-6" />
        <TabsContent value="space" className="mt-6" />
      </Tabs>

      <AddCompanySheet open={sheetOpen} onOpenChange={setSheetOpen} />
      <EditBrandSheet open={editBrandOpen} onOpenChange={setEditBrandOpen} />
    </>
  )
}
