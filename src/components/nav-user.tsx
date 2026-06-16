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
import { ChevronsUpDownIcon } from "lucide-react"

const timezones = [
  "(GMT-12:00) 國際換日線西側時間 - 美國 (貝克島)",
  "(GMT-11:00) 薩摩亞標準時間 - 美屬薩摩亞 (帕果帕果)",
  "(GMT-10:00) 夏威夷標準時間 - 美國 (檀香山)",
  "(GMT-09:00) 阿拉斯加標準時間 - 美國 (安克拉治)",
  "(GMT-08:00) 太平洋標準時間 - 美國 (洛杉磯)",
  "(GMT-07:00) 山區標準時間 - 美國 (丹佛)",
  "(GMT-06:00) 中部標準時間 - 美國 (芝加哥)",
  "(GMT-05:00) 東部標準時間 - 美國 (紐約)",
  "(GMT-04:00) 大西洋標準時間 - 加拿大 (哈利法克斯)",
  "(GMT-03:00) 巴西利亞標準時間 - 巴西 (聖保羅)",
  "(GMT-02:00) 中大西洋標準時間",
  "(GMT-01:00) 亞速爾標準時間 - 葡萄牙 (亞速爾)",
  "(GMT+00:00) 格林威治標準時間 - 英國 (倫敦)",
  "(GMT+01:00) 中歐標準時間 - 法國 (巴黎)",
  "(GMT+02:00) 東歐標準時間 - 埃及 (開羅)",
  "(GMT+03:00) 莫斯科標準時間 - 俄羅斯 (莫斯科)",
  "(GMT+04:00) 海灣標準時間 - 阿聯酋 (杜拜)",
  "(GMT+05:00) 巴基斯坦標準時間 - 巴基斯坦 (喀拉蚩)",
  "(GMT+05:30) 印度標準時間 - 印度 (孟買)",
  "(GMT+05:45) 尼泊爾標準時間 - 尼泊爾 (加德滿都)",
  "(GMT+06:00) 孟加拉標準時間 - 孟加拉 (達卡)",
  "(GMT+07:00) 中南半島標準時間 - 泰國 (曼谷)",
  "(GMT+08:00) 台灣標準時間 - 台灣 (台北)",
  "(GMT+08:00) 中國標準時間 - 中國 (北京)",
  "(GMT+08:00) 新加坡標準時間 - 新加坡 (新加坡)",
  "(GMT+09:00) 日本標準時間 - 日本 (東京)",
  "(GMT+09:00) 韓國標準時間 - 韓國 (首爾)",
  "(GMT+10:00) 澳洲東部標準時間 - 澳洲 (雪梨)",
  "(GMT+11:00) 所羅門群島標準時間 - 所羅門群島 (荷尼阿拉)",
  "(GMT+12:00) 紐西蘭標準時間 - 紐西蘭 (奧克蘭)",
]

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
  const { timezone, setTimezone } = useNav()
  const [open, setOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("zh-TW")

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            render={<SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />}
          >
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>CN</AvatarFallback>
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
                <AvatarFallback>CN</AvatarFallback>
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
                  <DropdownMenuRadioGroup value={selectedLanguage} onValueChange={(v) => { setSelectedLanguage(v); setOpen(false) }}>
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
                        {timezones.map((tz) => (
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
