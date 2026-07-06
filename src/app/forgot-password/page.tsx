"use client"

import { useState } from "react"
import { LanguagesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldLabel } from "@/components/field-label"

export default function ForgotPasswordPage() {
  const [language, setLanguage] = useState("繁體中文")
  const [brandAccount, setBrandAccount] = useState("")
  const [employeeAccount, setEmployeeAccount] = useState("")
  const [brandEmpty, setBrandEmpty] = useState(false)
  const [employeeEmpty, setEmployeeEmpty] = useState(false)

  function handleSubmit() {
    const bEmpty = !brandAccount
    const eEmpty = !employeeAccount
    setBrandEmpty(bEmpty)
    setEmployeeEmpty(eEmpty)
    if (!bEmpty && !eEmpty) {
      // TODO: call API
    }
  }

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute right-[-80px] top-[-280px] size-[540px] rounded-full bg-brand opacity-60 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-160px] top-[-150px] size-[320px] rounded-full bg-teal opacity-50 blur-[80px]" />

      <div className="relative flex w-full max-w-[372px] flex-col gap-4">
        {/* Language selector */}
        <Select value={language} onValueChange={(v) => v && setLanguage(v)}>
          <SelectTrigger className="w-[160px] h-9! rounded-[8px] border-0 bg-white/20 text-sm text-white [&_svg]:text-white">
            <LanguagesIcon className="size-4 shrink-0" />
            <SelectValue>{(v: unknown) => v as string}</SelectValue>
          </SelectTrigger>
          <SelectContent side="bottom" sideOffset={4} align="start" alignItemWithTrigger={false}>
            <SelectGroup>
              <SelectItem value="繁體中文">繁體中文</SelectItem>
              <SelectItem value="English(US)">English (US)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Card */}
        <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-9">
          <h1 className="text-2xl font-medium text-black">忘記密碼</h1>

          {/* 產業別 */}
          <div>
            <FieldLabel label="產業別" required />
            <Select defaultValue="運動健身">
              <SelectTrigger className="w-full h-9! rounded-[8px] border-input bg-white text-sm shadow-xs">
                <SelectValue>{(v: unknown) => (v as string) ?? ""}</SelectValue>
              </SelectTrigger>
              <SelectContent side="bottom" sideOffset={4} align="start" alignItemWithTrigger={false}>
                <SelectGroup>
                  <SelectItem value="運動健身">運動健身</SelectItem>
                  <SelectItem value="不動產租賃">不動產租賃</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* 品牌帳號 */}
          <div>
            <FieldLabel label="品牌帳號" required />
            <Input
              value={brandAccount}
              onChange={(e) => { setBrandAccount(e.target.value); setBrandEmpty(false) }}
              placeholder="請輸入品牌帳號"
              aria-invalid={brandEmpty}
              className="h-9 rounded-[8px] border-input bg-white text-sm shadow-xs"
            />
          </div>

          {/* 員工帳號 */}
          <div>
            <FieldLabel label="員工帳號" required />
            <Input
              type="email"
              value={employeeAccount}
              onChange={(e) => { setEmployeeAccount(e.target.value); setEmployeeEmpty(false) }}
              placeholder="請輸入 Email"
              aria-invalid={employeeEmpty}
              className="h-9 rounded-[8px] border-input bg-white text-sm shadow-xs"
            />
          </div>

          {/* 發送重設密碼信 */}
          <Button className="h-9 w-full rounded-[8px]" onClick={handleSubmit}>
            發送重設密碼信
          </Button>
        </div>
      </div>
    </div>
  )
}
