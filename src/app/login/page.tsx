"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { EyeIcon, EyeOffIcon, LanguagesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

export default function LoginPage() {
  const router = useRouter()
  const [brandAccount, setBrandAccount] = useState("")
  const [rememberBrand, setRememberBrand] = useState(false)
  const [employeeAccount, setEmployeeAccount] = useState("")
  const [rememberEmployee, setRememberEmployee] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [language, setLanguage] = useState("繁體中文")
  const [brandError, setBrandError] = useState("")
  const [employeeError, setEmployeeError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [brandEmpty, setBrandEmpty] = useState(false)
  const [employeeEmpty, setEmployeeEmpty] = useState(false)
  const [passwordEmpty, setPasswordEmpty] = useState(false)

  function validateBrand(value: string) {
    if (!value) return ""
    if (!/^[a-zA-Z0-9]+$/.test(value)) return "僅能輸入英文和數字"
    return ""
  }

  function validateEmployee(value: string) {
    if (!value) return ""
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "請使用 'username@example.com' 格式"
    return ""
  }

  function validatePassword(value: string) {
    if (!value) return ""
    if (!/^[a-zA-Z0-9]{8,20}$/.test(value)) return "限 8-20 字元的英文及數字"
    return ""
  }

  function handleLogin() {
    const bEmpty = !brandAccount
    const eEmpty = !employeeAccount
    const pEmpty = !password
    const bErr = bEmpty ? "" : validateBrand(brandAccount)
    const eErr = eEmpty ? "" : validateEmployee(employeeAccount)
    const pErr = pEmpty ? "" : validatePassword(password)
    setBrandEmpty(bEmpty)
    setEmployeeEmpty(eEmpty)
    setPasswordEmpty(pEmpty)
    setBrandError(bErr)
    setEmployeeError(eErr)
    setPasswordError(pErr)
    if (!bEmpty && !eEmpty && !pEmpty && !bErr && !eErr && !pErr) router.push("/dashboard")
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

        {/* Login card */}
        <div className="flex w-full flex-col gap-6 rounded-lg bg-white p-9">
          <h1 className="text-2xl font-medium text-black">登入管理帳號</h1>

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
          <div className="flex flex-col gap-2">
            <div>
              <FieldLabel label="品牌帳號" required />
              <Input
                value={brandAccount}
                onChange={(e) => { setBrandAccount(e.target.value); setBrandEmpty(false); if (brandError) setBrandError(validateBrand(e.target.value)) }}
                onBlur={(e) => setBrandError(validateBrand(e.target.value))}
                placeholder="請輸入品牌帳號"
                aria-invalid={!!brandError || brandEmpty}
                className="h-9 rounded-[8px] border-input bg-white text-sm shadow-xs"
              />
              {brandError && <p className="text-sm text-destructive px-1 pt-1">{brandError}</p>}
            </div>
            <label className="flex cursor-pointer items-center gap-3">
              <Checkbox
                checked={rememberBrand}
                onCheckedChange={(v) => setRememberBrand(!!v)}
              />
              <span className="text-sm text-foreground">記住品牌帳號</span>
            </label>
          </div>

          {/* 員工帳號 */}
          <div className="flex flex-col gap-2">
            <div>
              <FieldLabel label="員工帳號" required />
              <Input
                type="email"
                value={employeeAccount}
                onChange={(e) => { setEmployeeAccount(e.target.value); setEmployeeEmpty(false); if (employeeError) setEmployeeError(validateEmployee(e.target.value)) }}
                onBlur={(e) => setEmployeeError(validateEmployee(e.target.value))}
                placeholder="請輸入 Email"
                aria-invalid={!!employeeError || employeeEmpty}
                className="h-9 rounded-[8px] border-input bg-white text-sm shadow-xs"
              />
              {employeeError && <p className="text-sm text-destructive px-1 pt-1">{employeeError}</p>}
            </div>
            <label className="flex cursor-pointer items-center gap-3">
              <Checkbox
                checked={rememberEmployee}
                onCheckedChange={(v) => setRememberEmployee(!!v)}
              />
              <span className="text-sm text-foreground">記住員工帳號</span>
            </label>
          </div>

          {/* 密碼 */}
          <div>
            <FieldLabel label="密碼" required />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordEmpty(false); if (passwordError) setPasswordError(validatePassword(e.target.value)) }}
                onBlur={(e) => setPasswordError(validatePassword(e.target.value))}
                placeholder="請輸入密碼"
                aria-invalid={!!passwordError || passwordEmpty}
                className="h-9 rounded-[8px] border-input bg-white pr-9 text-sm shadow-xs"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-1 top-1/2 -translate-y-1/2 text-muted-foreground"
                tabIndex={-1}
              >
                {showPassword ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
              </Button>
            </div>
            {passwordError && <p className="text-sm text-destructive px-1 pt-1">{passwordError}</p>}
          </div>

          {/* 登入 button */}
          <Button
            className="h-9 w-full rounded-[8px]"
            onClick={handleLogin}
          >
            登入
          </Button>

          {/* 忘記密碼 */}
          <Button
            variant="link"
            nativeButton={false}
            className="self-start px-0 text-sm text-black"
            render={<Link href="/forgot-password" />}
          >
            忘記密碼
          </Button>
        </div>
      </div>
    </div>
  )
}
