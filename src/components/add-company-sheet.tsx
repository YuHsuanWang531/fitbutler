"use client"

import { useRef, useState } from "react"
import { X, HelpCircle, PlusIcon, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Combobox,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet"

const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2).toString().padStart(2, "0")
  const m = i % 2 === 0 ? "00" : "30"
  return `${h}:${m}`
})

const countryItems = [
  { value: "", label: "請選擇公司登記國家" },
  { value: "tw", label: "台灣" },
  { value: "my", label: "馬來西亞" },
  { value: "jp", label: "日本" },
  { value: "kr", label: "韓國" },
  { value: "sg", label: "新加坡" },
  { value: "hk", label: "香港" },
  { value: "cn", label: "中國" },
  { value: "th", label: "泰國" },
  { value: "vn", label: "越南" },
  { value: "ph", label: "菲律賓" },
  { value: "id", label: "印尼" },
  { value: "us", label: "美國" },
  { value: "gb", label: "英國" },
  { value: "de", label: "德國" },
  { value: "fr", label: "法國" },
  { value: "au", label: "澳洲" },
  { value: "ca", label: "加拿大" },
  { value: "nz", label: "紐西蘭" },
  { value: "in", label: "印度" },
  { value: "br", label: "巴西" },
]

const currencyItems = [
  { value: "", label: "請選擇使用幣別" },
  { value: "twd", label: "新台幣 (TWD)" },
  { value: "myr", label: "馬來西亞令吉 (MYR)" },
]

interface AddCompanySheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function FieldLabel({
  label,
  required,
  helpIcon,
  htmlFor,
}: {
  label: string
  required?: boolean
  helpIcon?: boolean
  htmlFor?: string
}) {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-black cursor-pointer">
        {label}
      </Label>
      {helpIcon && <HelpCircle className="size-3.5 text-muted-foreground cursor-pointer" />}
      {required && <span className="text-sm font-medium text-destructive">*</span>}
    </div>
  )
}

function CountryCombobox({
  disabled,
  placeholder = "請選擇公司登記國家",
  addLabel,
}: {
  disabled?: boolean
  placeholder?: string
  addLabel?: string
}) {
  return (
    <Combobox items={countryItems} defaultValue={countryItems[0].value} disabled={disabled}>
      <ComboboxTrigger
        render={
          <Button variant="outline" className="w-full justify-between font-normal">
            <ComboboxValue placeholder={placeholder} />
          </Button>
        }
      />
      <ComboboxContent>
        <ComboboxInput showTrigger={false} className="max-w-full" placeholder={placeholder} />
        <ComboboxEmpty>找不到符合的國家</ComboboxEmpty>
        <ComboboxList>
          <ComboboxCollection>
            {(item) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxCollection>
        </ComboboxList>
        {addLabel && (
          <>
            <ComboboxSeparator />
            <Button variant="ghost" className="w-full justify-start font-normal">
              <PlusIcon className="-ms-2 opacity-60" aria-hidden="true" />
              {addLabel}
            </Button>
          </>
        )}
      </ComboboxContent>
    </Combobox>
  )
}

function CurrencyCombobox({ disabled }: { disabled?: boolean }) {
  return (
    <Combobox items={currencyItems} defaultValue={currencyItems[0].value} disabled={disabled}>
      <ComboboxTrigger
        render={
          <Button variant="outline" className="w-full justify-between font-normal">
            <ComboboxValue placeholder="請選擇使用幣別" />
          </Button>
        }
      />
      <ComboboxContent>
        <ComboboxInput showTrigger={false} className="max-w-full" placeholder="請選擇使用幣別" />
        <ComboboxEmpty>找不到符合的幣別</ComboboxEmpty>
        <ComboboxList>
          <ComboboxCollection>
            {(item) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxCollection>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

function FileInputField({ id }: { id: string }) {
  const [fileName, setFileName] = useState("未選擇檔案")
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-stretch w-full">
      <Button
        type="button"
        className="rounded-r-none rounded-l-[10px] shrink-0"
        onClick={() => fileRef.current?.click()}
      >
        選擇檔案
      </Button>
      <input
        ref={fileRef}
        id={id}
        type="file"
        accept=".png,.jpg,.jpeg"
        className="hidden"
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "未選擇檔案")}
      />
      <div className="flex flex-1 items-center border border-l-0 border-input bg-white px-3 rounded-r-lg min-w-0 h-9">
        <span className="text-sm text-muted-foreground truncate">{fileName}</span>
      </div>
    </div>
  )
}

export function AddCompanySheet({ open, onOpenChange }: AddCompanySheetProps) {
  const [isLegalPerson, setIsLegalPerson] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [establishDate, setEstablishDate] = useState<Date | undefined>(undefined)
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" showCloseButton={false} className="w-[400px] sm:max-w-[400px] p-0 gap-0 flex flex-col">
        <ScrollArea className="flex-1 min-h-0">
          <div className="flex flex-col items-center gap-4 px-9 pt-9 pb-9">

            {/* Header */}
            <div className="flex items-center gap-4 w-full">
              <SheetTitle className="flex-1 text-xl font-medium text-black">新增公司</SheetTitle>
              <SheetClose
                render={<Button variant="ghost" size="icon-lg" className="shrink-0" />}
              >
                <X className="size-5" />
              </SheetClose>
            </div>

            {/* 屬自然人 toggle */}
            <div className="flex items-center gap-2 w-full px-6 py-3 bg-sky-50 rounded-lg">
              <Label className="flex-1 text-sm font-medium text-black cursor-pointer leading-none">屬自然人</Label>
              <Switch checked={isLegalPerson} onCheckedChange={setIsLegalPerson} />
            </div>

            {/* 公司名稱 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="公司名稱" required htmlFor="company-name" />
              <Input id="company-name" placeholder="請輸入公司名稱" />
            </div>

            {/* 公司登記國家 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="公司登記國家" required />
              <CountryCombobox addLabel="新增國家" />
            </div>

            {/* 營業登記號碼 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="營業登記號碼" required htmlFor="business-no" />
              <Input id="business-no" placeholder="請輸入營業登記號碼" />
            </div>

            {/* 使用幣別 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="使用幣別" required />
              <CurrencyCombobox disabled />
            </div>

            {/* 公司成立日期 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="公司成立日期" htmlFor="establish-date" />
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger
                  render={<Button variant="outline" id="establish-date" className="w-full justify-between font-normal" />}
                >
                  {establishDate
                    ? establishDate.toLocaleDateString("zh-TW")
                    : <span className="text-muted-foreground">選擇日期</span>}
                  <CalendarIcon className="size-4 text-muted-foreground" />
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={establishDate}
                    onSelect={(date) => {
                      setEstablishDate(date)
                      setDatePickerOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* 營業時間 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="營業時間" />
              <div className="flex items-center gap-2">
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="開始時間" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {timeOptions.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground text-sm shrink-0">至</span>
                <Select>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="結束時間" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {timeOptions.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 公司負責人 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="公司負責人" />
              <div className="flex gap-2">
                <Input placeholder="請輸入名字" className="flex-1" />
                <Input placeholder="請輸入姓氏" className="flex-1" />
              </div>
            </div>

            {/* 手機號碼 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="手機號碼" />
              <div className="flex gap-2">
                <Select defaultValue="tw">
                  <SelectTrigger className="w-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tw">🇹🇼 +886</SelectItem>
                    <SelectItem value="my">🇲🇾 +60</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="請輸入手機號碼" className="flex-1" />
              </div>
            </div>

            {/* 聯絡信箱 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="聯絡信箱" required htmlFor="email" />
              <Input id="email" type="email" placeholder="請輸入聯絡信箱" />
            </div>

            {/* 簽署合約通知信箱 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="簽署合約通知信箱" required helpIcon htmlFor="contract-email" />
              <Input id="contract-email" type="email" placeholder="請輸入電子信箱" />
            </div>

            {/* 公司地址 */}
            <div className="flex flex-col gap-1 w-[300px]">
              <FieldLabel label="公司地址" />
              <CountryCombobox disabled />
              <Input placeholder="街道地址" />
              <Input placeholder="州/省/郡/區" />
              <Input placeholder="城市" />
              <Input placeholder="郵遞區號" />
            </div>

            {/* 登記證字號 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="登記證字號" required htmlFor="reg-no" />
              <Input id="reg-no" placeholder="請輸入登記證字號" />
            </div>

            {/* 租賃住宅管理者 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="租賃住宅管理者" htmlFor="rental-manager" />
              <Input id="rental-manager" placeholder="請輸入登記證字號" />
            </div>

            {/* 租賃住宅管理者證書字號 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="租賃住宅管理者證書字號" htmlFor="rental-cert-no" />
              <Input id="rental-cert-no" placeholder="請輸入租賃住宅管理者證書字號" />
            </div>

            {/* 租賃住宅管理者章 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="租賃住宅管理者章" helpIcon />
              <FileInputField id="rental-seal" />
              <p className="text-xs text-muted-foreground px-1 pt-1">檔案大小上限 10MB，僅支援 png, jpg, jpeg</p>
            </div>

            {/* 公司大章 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="公司大章" helpIcon />
              <FileInputField id="company-seal-large" />
              <p className="text-xs text-muted-foreground px-1 pt-1">檔案大小上限 10MB，僅支援 png, jpg, jpeg</p>
            </div>

            {/* 公司小章 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="公司小章" helpIcon />
              <FileInputField id="company-seal-small" />
              <p className="text-xs text-muted-foreground px-1 pt-1">檔案大小上限 10MB，僅支援 png, jpg, jpeg</p>
            </div>

            {/* 啟用狀態 */}
            <div className="flex items-center gap-2 w-[300px]">
              <Label className="flex-1 text-sm font-medium text-black cursor-pointer">啟用狀態</Label>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
                className="data-checked:bg-teal"
              />
            </div>

            {/* 儲存 */}
            <Button size="lg" className="w-[300px]">
              儲存
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
