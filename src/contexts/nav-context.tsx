"use client"

import { createContext, useContext, useMemo, useSyncExternalStore } from "react"

const DEFAULT_TIMEZONE = "(GMT+08:00) 台灣標準時間 - 台灣 (台北)"
const DEFAULT_LANGUAGE = "zh-TW"
const DEFAULT_PAGE_TITLE = "總覽"

type NavContextType = {
  pageTitle: string
  setPageTitle: (title: string) => void
  timezone: string
  setTimezone: (tz: string) => void
  language: string
  setLanguage: (lang: string) => void
}

const NavContext = createContext<NavContextType>({
  pageTitle: DEFAULT_PAGE_TITLE,
  setPageTitle: () => {},
  timezone: DEFAULT_TIMEZONE,
  setTimezone: () => {},
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
})

function createLocalStorageStore(key: string, initial: string) {
  let listeners: Array<() => void> = []

  function getSnapshot() {
    if (typeof window === "undefined") return initial
    return localStorage.getItem(key) ?? initial
  }

  function getServerSnapshot() {
    return initial
  }

  function subscribe(listener: () => void) {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  function set(next: string) {
    localStorage.setItem(key, next)
    listeners.forEach((listener) => listener())
  }

  return { getSnapshot, getServerSnapshot, subscribe, set }
}

function usePersistedState(key: string, initial: string) {
  const store = useMemo(() => createLocalStorageStore(key, initial), [key, initial])
  const value = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)
  return [value, store.set] as const
}

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [pageTitle, setPageTitle] = usePersistedState("nav:pageTitle", DEFAULT_PAGE_TITLE)
  const [timezone, setTimezone] = usePersistedState("nav:timezone", DEFAULT_TIMEZONE)
  const [language, setLanguage] = usePersistedState("nav:language", DEFAULT_LANGUAGE)

  return (
    <NavContext.Provider value={{ pageTitle, setPageTitle, timezone, setTimezone, language, setLanguage }}>
      {children}
    </NavContext.Provider>
  )
}

export const useNav = () => useContext(NavContext)
