import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"

import { BrandProvider } from "@/components/member/brand-context"
import { MemberSideNav } from "@/components/member/member-side-nav"
import { cn } from "@/lib/utils"

// Design pairs Geist (Latin/digits) with the app's Noto Sans TC (CJK).
const geist = Geist({ variable: "--font-geist", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DEN YOGA",
  description: "DEN YOGA 會員專區",
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
}

export default function MemberAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <BrandProvider
      className={cn(
        geist.variable,
        "flex min-h-dvh w-full flex-col bg-white md:h-dvh md:overflow-hidden font-[family-name:var(--font-geist),var(--font-sans)] text-black"
      )}
    >
      <MemberSideNav />
      {children}
    </BrandProvider>
  )
}
