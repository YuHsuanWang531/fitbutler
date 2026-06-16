"use client"

import { useRef, useState } from "react"
import { X, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet"

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

interface EditBrandSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditBrandSheet({ open, onOpenChange }: EditBrandSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" showCloseButton={false} className="w-[400px] sm:max-w-[400px] p-0 gap-0 flex flex-col">
        <ScrollArea className="flex-1 min-h-0">
          <div className="flex flex-col items-center gap-4 px-9 pt-9 pb-9">

            {/* Header */}
            <div className="flex items-center gap-4 w-full">
              <SheetTitle className="flex-1 text-xl font-medium text-black">品牌資訊</SheetTitle>
              <SheetClose
                render={<Button variant="ghost" size="icon-lg" className="shrink-0" />}
              >
                <X className="size-5" />
              </SheetClose>
            </div>

            {/* 品牌 LOGO */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="品牌 LOGO" helpIcon />
              <FileInputField id="brand-logo" />
              <p className="text-xs text-muted-foreground px-1 pt-1">
                限單張圖片，比例 3:1（寬:高），檔案大小上限 10MB，僅支援 png, jpg, jpeg
              </p>
            </div>

            {/* 品牌名稱 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="品牌名稱" required htmlFor="brand-name" />
              <Input id="brand-name" defaultValue="小明的品牌" disabled />
              <p className="text-xs text-muted-foreground px-1 pt-1">
                如需修改品牌名稱，請
                <a href="#" className="text-teal underline">聯繫客服</a>
              </p>
            </div>

            {/* 品牌帳號 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="品牌帳號" required htmlFor="brand-account" />
              <Input id="brand-account" defaultValue="fitbutler" disabled />
              <p className="text-xs text-muted-foreground px-1 pt-1">
                如需修改品牌帳號，請
                <a href="#" className="text-teal underline">聯繫客服</a>
              </p>
            </div>

            {/* 隱私權政策 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="隱私權政策" helpIcon />
              <Button variant="outline" className="w-full">新增設定</Button>
            </div>

            {/* 儲存 */}
            <Button size="lg" className="w-[300px]">儲存</Button>

          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
