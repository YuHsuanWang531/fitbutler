"use client"

import { createContext, useContext, useEffect, useState } from "react"

type NavContextType = {
  pageTitle: string
  setPageTitle: (title: string) => void
  timezone: string
  setTimezone: (tz: string) => void
}

const NavContext = createContext<NavContextType>({
  pageTitle: "總覽",
  setPageTitle: () => {},
  timezone: "(GMT+08:00) 台灣標準時間 - 台灣 (台北)",
  setTimezone: () => {},
})

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [pageTitle, setPageTitleState] = useState("總覽")
  const [timezone, setTimezone] = useState("(GMT+08:00) 台灣標準時間 - 台灣 (台北)")

  useEffect(() => {
    const stored = localStorage.getItem("nav:pageTitle")
    if (stored) setPageTitleState(stored)
  }, [])

  function setPageTitle(title: string) {
    setPageTitleState(title)
    localStorage.setItem("nav:pageTitle", title)
  }

  return (
    <NavContext.Provider value={{ pageTitle, setPageTitle, timezone, setTimezone }}>
      {children}
    </NavContext.Provider>
  )
}

export const useNav = () => useContext(NavContext)
