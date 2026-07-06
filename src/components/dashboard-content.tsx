"use client"

import { useNav } from "@/contexts/nav-context"
import { OverviewSection } from "@/components/overview-section"
import { EnterpriseSettingsSection } from "@/components/enterprise-settings-section"

const SECTIONS = [
  { title: "總覽", Component: OverviewSection, padded: true },
  { title: "企業管理", Component: EnterpriseSettingsSection, padded: false },
] as const

export function DashboardContent() {
  const { pageTitle } = useNav()
  const section = SECTIONS.find((s) => s.title === pageTitle)

  return (
    <div className={`flex flex-1 flex-col bg-gray-50 ${section?.padded ? "gap-4 p-4 sm:p-6" : ""}`}>
      {section && <section.Component />}
    </div>
  )
}
