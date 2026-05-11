"use client"

import { createContext, useContext, useState } from "react"

type NavContextType = {
  pageTitle: string
  setPageTitle: (title: string) => void
}

const NavContext = createContext<NavContextType>({
  pageTitle: "總覽",
  setPageTitle: () => {},
})

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [pageTitle, setPageTitle] = useState("總覽")
  return (
    <NavContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </NavContext.Provider>
  )
}

export const useNav = () => useContext(NavContext)
