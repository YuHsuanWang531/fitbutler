import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { DashboardContent } from "@/components/dashboard-content"
import { NavProvider } from "@/contexts/nav-context"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <NavProvider>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <TopNavbar />
        <DashboardContent />
        <footer className="flex items-center justify-between gap-6 bg-gray-100 px-4 py-2">
          <p className="text-muted-foreground text-xs whitespace-nowrap">
            時區：(GMT+08:00) 台灣標準時間 - 台灣 (台北)
          </p>
          <div className="flex items-center gap-1 text-muted-foreground text-xs whitespace-nowrap">
            <span>Copyright © 2025 雲端力鍊股份有限公司</span>
            <span>|</span>
            <a href="#" className="hover:underline">隱私權政策</a>
            <span>|</span>
            <a href="#" className="hover:underline">幫助中心</a>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
    </NavProvider>
  )
}
