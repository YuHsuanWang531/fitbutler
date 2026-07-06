"use client"

import { useState } from "react"
import { X, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageUploadField } from "@/components/image-upload-field"
import { FieldLabel } from "@/components/field-label"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

const countryItems = [
  { value: "", label: "請選擇公司登記國家" },
  { value: "tw", label: "台灣", currency: "新台幣 (TWD)" },
  { value: "my", label: "馬來西亞", currency: "馬來西亞令吉 (MYR)" },
  { value: "jp", label: "日本", currency: "日圓 (JPY)" },
  { value: "kr", label: "韓國", currency: "韓元 (KRW)" },
  { value: "sg", label: "新加坡", currency: "新加坡幣 (SGD)" },
  { value: "hk", label: "香港", currency: "港幣 (HKD)" },
  { value: "cn", label: "中國", currency: "人民幣 (CNY)" },
  { value: "th", label: "泰國", currency: "泰銖 (THB)" },
  { value: "vn", label: "越南", currency: "越南盾 (VND)" },
  { value: "ph", label: "菲律賓", currency: "菲律賓披索 (PHP)" },
  { value: "id", label: "印尼", currency: "印尼盾 (IDR)" },
  { value: "us", label: "美國", currency: "美元 (USD)" },
  { value: "gb", label: "英國", currency: "英鎊 (GBP)" },
  { value: "de", label: "德國", currency: "歐元 (EUR)" },
  { value: "fr", label: "法國", currency: "歐元 (EUR)" },
  { value: "au", label: "澳洲", currency: "澳幣 (AUD)" },
  { value: "ca", label: "加拿大", currency: "加拿大幣 (CAD)" },
  { value: "nz", label: "紐西蘭", currency: "紐西蘭幣 (NZD)" },
  { value: "in", label: "印度", currency: "印度盧比 (INR)" },
  { value: "br", label: "巴西", currency: "巴西雷亞爾 (BRL)" },
]

const countryCurrencyMap: Record<string, string> = Object.fromEntries(
  countryItems.filter((c) => c.currency).map((c) => [c.value, c.currency!])
)

interface AddCompanySheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function CountryCombobox({
  disabled,
  placeholder = "請選擇公司登記國家",
  addLabel,
  onValueChange,
}: {
  disabled?: boolean
  placeholder?: string
  addLabel?: string
  onValueChange?: (value: string) => void
}) {
  return (
    <Combobox items={countryItems} defaultValue={countryItems[0].value} disabled={disabled} onValueChange={(v) => v && onValueChange?.(v)}>
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


export function AddCompanySheet({ open, onOpenChange }: AddCompanySheetProps) {
  const [isLegalPerson, setIsLegalPerson] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [country, setCountry] = useState("")

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
              <CountryCombobox addLabel="新增國家" onValueChange={setCountry} />
            </div>

            {/* 營業登記號碼 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="營業登記號碼" required htmlFor="business-no" />
              <Input id="business-no" placeholder="請輸入營業登記號碼" />
            </div>

            {/* 使用幣別 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="使用幣別" required />
              <Input
                disabled
                readOnly
                value={country ? (countryCurrencyMap[country] ?? "") : ""}
                placeholder="請選擇公司登記國家"
                className="bg-secondary"
              />
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
              <ImageUploadField id="rental-seal" label="租賃住宅管理者章" aspectRatio={1} />
              <p className="text-xs text-muted-foreground px-1 pt-1">檔案大小上限 10MB，僅支援 png, jpg, jpeg</p>
            </div>

            {/* 公司大章 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="公司大章" helpIcon />
              <ImageUploadField id="company-seal-large" label="公司大章" aspectRatio={1} />
              <p className="text-xs text-muted-foreground px-1 pt-1">檔案大小上限 10MB，僅支援 png, jpg, jpeg</p>
            </div>

            {/* 公司小章 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="公司小章" helpIcon />
              <ImageUploadField id="company-seal-small" label="公司小章" aspectRatio={1} />
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
