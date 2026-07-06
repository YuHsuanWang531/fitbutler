import {
  BarChart3Icon,
  CalendarIcon,
  ChartLineIcon,
  CreditCardIcon,
  DumbbellIcon,
  GaugeIcon,
  PlugIcon,
  PlusIcon,
  UtensilsIcon,
  UsersIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { MenuItem, SidebarGroupedMenuItems } from '@/components/sidebar-grouped-menu-items'

import WorkspaceSwitcher from '@/components/shadcn-studio/blocks/sidebar-workspace-switcher'

const menuItems: MenuItem[] = [
  {
    icon: GaugeIcon,
    label: 'Dashboard',
    href: '#'
  }
]

const pagesItems: MenuItem[] = [
  {
    icon: UsersIcon,
    label: 'Client Management',
    items: [
      { label: 'All Clients', href: '#' },
      { label: 'Onboarding', href: '#', badge: '4' },
      { label: 'Groups', href: '#' }
    ]
  },
  {
    icon: DumbbellIcon,
    label: 'Training Programs',
    items: [
      { label: 'Workout Plans', href: '#' },
      { label: 'Exercise Library', href: '#' },
      { label: 'Templates', href: '#' }
    ]
  },
  {
    icon: UtensilsIcon,
    label: 'Nutrition',
    items: [
      { label: 'Meal Plans', href: '#' },
      { label: 'Food Database', href: '#' }
    ]
  },
  {
    icon: ChartLineIcon,
    label: 'Progress Tracking',
    items: [
      { label: 'Body Metrics', href: '#' },
      { label: 'Performance', href: '#' },
      { label: 'Goals', href: '#' }
    ]
  },
  {
    icon: CalendarIcon,
    label: 'Appointments',
    href: '#',
    badge: '5'
  },
  {
    icon: BarChart3Icon,
    label: 'Reports & Analytics',
    href: '#'
  },
  {
    icon: CreditCardIcon,
    label: 'Billing & Invoices',
    href: '#',
    badge: '2'
  },
  {
    icon: PlugIcon,
    label: 'Integrations',
    items: [
      { label: 'Wearables', href: '#' },
      { label: 'Calendar Sync', href: '#' },
      { label: 'Payment Gateway', href: '#' }
    ]
  }
]

const SidebarPage = () => {
  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider>
        <Sidebar collapsible='icon'>
          <SidebarHeader>
            <WorkspaceSwitcher />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroupedMenuItems data={menuItems} />
            <SidebarGroupedMenuItems data={pagesItems} groupLabel='Management' />
          </SidebarContent>
          <SidebarFooter className='gap-4 p-3 transition-[padding] duration-200 [[data-state=collapsed]_&]:p-2'>
            <div className='flex flex-col gap-4 overflow-hidden rounded-md border p-4 [[data-state=collapsed]_&]:hidden'>
              <p className='truncate text-xl font-semibold'>Upgrade to Pro</p>
              <p className='line-clamp-3 text-sm'>
                Your free trial ends in 12 days. Upgrade to unlock unlimited clients and advanced analytics.
              </p>
              <Progress value={50} className='h-2' />
              <Button className='truncate'>See All Plans</Button>
            </div>
            <Button className='bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40'>
              <span className='truncate [[data-state=collapsed]_&]:hidden'>Add new workspace</span>
              <PlusIcon />
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className='flex flex-1 flex-col'>
          <header className='bg-card sticky top-0 z-50 h-13.75 border-b'>
            <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6'>
              <SidebarTrigger className='[&_svg]:!size-5' />
            </div>
          </header>
          <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
            <Card className='h-250'>
              <CardContent className='h-full'>
                <div className='border-card-foreground/10 h-full rounded-md border bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)]' />
              </CardContent>
            </Card>
          </main>
          <footer className='bg-card h-10 border-t'>
            <div className='mx-auto size-full max-w-7xl px-4 sm:px-6'>
              <div className='border-card-foreground/10 h-full bg-[repeating-linear-gradient(45deg,color-mix(in_oklab,var(--card-foreground)10%,transparent),color-mix(in_oklab,var(--card-foreground)10%,transparent)_1px,var(--card)_2px,var(--card)_15px)]' />
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default SidebarPage
