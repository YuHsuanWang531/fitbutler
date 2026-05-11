"use client"

import { useState } from "react"
import { useNav } from "@/contexts/nav-context"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRightIcon } from "lucide-react"

type NavItem = {
  title: string
  url: string
  icon?: React.ReactNode
  isActive?: boolean
  items?: { title: string; url: string }[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  const { pageTitle, setPageTitle } = useNav()

  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      items
        .filter((item) => item.items?.some((sub) => sub.title === pageTitle))
        .map((item) => [item.title, true])
    )
  )

  const toggleItem = (title: string, open: boolean) => {
    setOpenItems((prev) => ({ ...prev, [title]: open }))
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) =>
          item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              open={!!openItems[item.title]}
              onOpenChange={(open) => toggleItem(item.title, open)}
              className="group/collapsible"
              render={<SidebarMenuItem />}
            >
              <CollapsibleTrigger
                render={<SidebarMenuButton tooltip={item.title} />}
              >
                {item.icon}
                <span>{item.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        render={<a href={subItem.url} />}
                        isActive={pageTitle === subItem.title}
                        onClick={() => setPageTitle(subItem.title)}
                      >
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                isActive={pageTitle === item.title}
                tooltip={item.title}
                render={<a href={item.url} />}
                onClick={() => setPageTitle(item.title)}
              >
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}
