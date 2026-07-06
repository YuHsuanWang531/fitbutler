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
  useSidebar,
} from "@/components/ui/sidebar"
import { ChevronRightIcon } from "lucide-react"

type NavItem = {
  title: string
  url: string
  icon?: React.ReactNode
  isActive?: boolean
  items?: { title: string; url: string }[]
}

function findActiveParentTitle(items: NavItem[], pageTitle: string) {
  return items.find((item) => item.items?.some((sub) => sub.title === pageTitle))?.title
}

export function NavMain({ items }: { items: NavItem[] }) {
  const { pageTitle, setPageTitle } = useNav()
  const { state, setOpen } = useSidebar()

  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    const parentTitle = findActiveParentTitle(items, pageTitle)
    return parentTitle ? { [parentTitle]: true } : {}
  })
  const [prevPageTitle, setPrevPageTitle] = useState(pageTitle)

  if (pageTitle !== prevPageTitle) {
    setPrevPageTitle(pageTitle)
    const parentTitle = findActiveParentTitle(items, pageTitle)
    if (parentTitle) {
      setOpenItems((prev) => ({ ...prev, [parentTitle]: true }))
    }
  }

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
              onOpenChange={(open) => {
                if (state === "collapsed") {
                  setOpen(true)
                  toggleItem(item.title, true)
                } else {
                  toggleItem(item.title, open)
                }
              }}
              className="group/collapsible"
              render={<SidebarMenuItem />}
            >
              <CollapsibleTrigger
                render={<SidebarMenuButton tooltip={item.title} className="h-auto py-2" />}
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
                        className="h-auto py-2"
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
                className="h-auto py-2"
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
