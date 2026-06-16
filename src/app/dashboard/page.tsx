import { AppSidebar } from "@/components/app-sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { DashboardContent } from "@/components/dashboard-content"
import { NavProvider } from "@/contexts/nav-context"
import { DashboardFooter } from "@/components/dashboard-footer"
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
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
    </NavProvider>
  )
}
