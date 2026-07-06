import {
  ActivityIcon,
  CalendarIcon,
  ChartNoAxesCombinedIcon,
  DumbbellIcon,
  FileBarChartIcon,
  FlameIcon,
  ScaleIcon,
  SettingsIcon,
  TargetIcon,
  TrendingUpIcon,
  UtensilsIcon
} from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { MenuItem, SidebarGroupedMenuItems } from '@/components/sidebar-grouped-menu-items'

const menuItems: MenuItem[] = [
  {
    icon: ChartNoAxesCombinedIcon,
    label: 'Dashboard',
    href: '#',
    badge: '3'
  }
]

const mainFeatureItems: MenuItem[] = [
  {
    icon: DumbbellIcon,
    label: 'Workout Plans',
    items: [
      { label: "Today's Workout", href: '#', badge: '1' },
      { label: 'My Plans', href: '#' },
      { label: 'Explore Workouts', href: '#' }
    ]
  },
  {
    icon: UtensilsIcon,
    label: 'Nutrition Tracking',
    items: [
      { label: 'Meal Log', href: '#' },
      { label: 'Recipes', href: '#' },
      { label: 'Water Intake', href: '#' }
    ]
  },
  {
    icon: TrendingUpIcon,
    label: 'Progress Tracking',
    href: '#'
  },
  {
    icon: ScaleIcon,
    label: 'Body Metrics',
    href: '#'
  },
  {
    icon: FlameIcon,
    label: 'Activity History',
    href: '#',
    badge: '12'
  }
]

const supportingFeatureItems: MenuItem[] = [
  {
    icon: TargetIcon,
    label: 'Goals & Challenges',
    href: '#'
  },
  {
    icon: CalendarIcon,
    label: 'Schedule & Calendar',
    href: '#'
  },
  {
    icon: ActivityIcon,
    label: 'Health Insights',
    href: '#'
  },
  {
    icon: FileBarChartIcon,
    label: 'Reports & Analytics',
    href: '#'
  },
  {
    icon: SettingsIcon,
    label: 'Settings',
    items: [
      { label: 'Account Settings', href: '#' },
      { label: 'Notification Preferences', href: '#' },
      { label: 'Connected Devices', href: '#' }
    ]
  }
]

const SidebarPage = () => {
  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className='items-center gap-2 border-b py-6'>
            <Avatar className='size-12'>
              <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png' alt='Alex Chen' />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            <div className='text-sidebar-accent-foreground flex flex-col items-center'>
              <p className='text-sm font-medium'>Alex Chen</p>
              <p className='text-xs font-light'>alex.chen@fitbutler.com</p>
            </div>
            <Badge variant='secondary' className='h-auto gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary [&>svg]:size-3!'>
              <FlameIcon className='text-primary' />
              7-day streak
            </Badge>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroupedMenuItems data={menuItems} />
            <SidebarGroupedMenuItems data={mainFeatureItems} groupLabel='Training & Nutrition' />
            <SidebarGroupedMenuItems data={supportingFeatureItems} groupLabel='Tools' />
          </SidebarContent>
          <SidebarFooter className='px-4 py-3.5'>
            <a href='#' className='self-start'>
              <div className='flex items-center gap-2'>
                <DumbbellIcon className='size-6 text-primary' />
                <span className='text-xl font-bold'>FitButler</span>
              </div>
            </a>
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
