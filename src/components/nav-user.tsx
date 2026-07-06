"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useNav } from "@/contexts/nav-context"
import { TIMEZONES } from "@/lib/timezones"
import { ChevronsUpDownIcon } from "lucide-react"

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const router = useRouter()
  const { isMobile } = useSidebar()
  const { timezone, setTimezone, language, setLanguage } = useNav()
  const [open, setOpen] = useState(false)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            render={<SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />}
          >
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[250px] rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <div className="flex items-center gap-2 px-2 py-1.5">
              <Avatar className="size-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-semibold leading-5 text-popover-foreground">{user.name}</span>
                <span className="text-xs leading-4 text-muted-foreground">{user.email}</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>設定</DropdownMenuLabel>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="px-2 py-1.5 text-sm">
                  系統語言
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-[250px]">
                  <DropdownMenuRadioGroup value={language} onValueChange={(v) => { setLanguage(v); setOpen(false) }}>
                    <DropdownMenuRadioItem value="zh-TW" className="pl-2 py-1.5 text-sm data-checked:bg-accent">
                      繁體中文 (台灣)
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="en-US" className="pl-2 py-1.5 text-sm data-checked:bg-accent">
                      English (US)
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="px-2 py-1.5 text-sm">
                  使用時區
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-max p-0">
                  <ScrollArea className="h-64">
                    <div className="p-1">
                      <DropdownMenuRadioGroup value={timezone} onValueChange={(v) => { setTimezone(v); setOpen(false) }}>
                        {TIMEZONES.map((tz) => (
                          <DropdownMenuRadioItem key={tz} value={tz} className="pl-2 py-1.5 text-sm data-checked:bg-accent">
                            {tz}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </div>
                  </ScrollArea>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="px-2 py-1.5 text-sm"
              onClick={() => router.push("/login")}
            >
              登出
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
