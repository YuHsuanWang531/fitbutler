"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  ChartColumnBigIcon,
  CircleDollarSignIcon,
  IdCardIcon,
  HomeIcon,
  PackageIcon,
  SettingsIcon,
  TagIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "營運中心",
      logo: <ZapIcon />,
      plan: "",
    },
  ],
  navMain: [
    {
      title: "總覽",
      url: "#",
      icon: <ChartColumnBigIcon />,
      isActive: true,
    },
    {
      title: "會員列表",
      url: "#",
      icon: <UsersIcon />,
    },
    {
      title: "空間租賃",
      url: "#",
      icon: <HomeIcon />,
    },
    {
      title: "帳務管理",
      url: "#",
      icon: <CircleDollarSignIcon />,
      items: [
        { title: "帳務概覽", url: "#" },
        { title: "帳單總表", url: "#" },
        { title: "未出帳帳單", url: "#" },
      ],
    },
    {
      title: "方案管理",
      url: "#",
      icon: <PackageIcon />,
      items: [
        { title: "票券", url: "#" },
        { title: "租約", url: "#" },
        { title: "權益類型", url: "#" },
      ],
    },
    {
      title: "標籤管理",
      url: "#",
      icon: <TagIcon />,
      items: [
        { title: "會員標籤", url: "#" },
        { title: "空間標籤", url: "#" },
      ],
    },
    {
      title: "員工",
      url: "#",
      icon: <IdCardIcon />,
      items: [
        { title: "員工管理", url: "#" },
        { title: "權限管理", url: "#" },
      ],
    },
    {
      title: "設定",
      url: "#",
      icon: <SettingsIcon />,
      items: [
        { title: "企業管理", url: "#" },
        { title: "收款設定", url: "#" },
        { title: "會員管理", url: "#" },
        { title: "通知管理", url: "#" },
        { title: "合約範本", url: "#" },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="dark" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
