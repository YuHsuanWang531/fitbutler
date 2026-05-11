"use client"

import { useNav } from "@/contexts/nav-context"
import { OverviewSection } from "@/components/overview-section"
import { EnterpriseSettingsSection } from "@/components/enterprise-settings-section"

export function DashboardContent() {
  const { pageTitle } = useNav()

  return (
    <div className={`flex flex-1 flex-col bg-gray-50 ${pageTitle === "企業管理" ? "" : "gap-4 p-6"}`}>
      {pageTitle === "總覽" && <OverviewSection />}
      {pageTitle === "企業管理" && <EnterpriseSettingsSection />}
    </div>
  )
}
