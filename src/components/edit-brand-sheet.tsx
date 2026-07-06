"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet"
import { ImageUploadField } from "@/components/image-upload-field"
import { FieldLabel } from "@/components/field-label"

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
              <ImageUploadField id="brand-logo" label="品牌 LOGO" aspectRatio={3} />
              <p className="text-sm text-muted-foreground px-1 pt-1">
                圖片比例 3:1（寬:高），檔案上限 10MB，支援 PNG、JPG、JPEG
              </p>
            </div>

            {/* 品牌名稱 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="品牌名稱" required htmlFor="brand-name" />
              <Input id="brand-name" value="小明的品牌" readOnly className="bg-secondary text-muted-foreground" />
              <p className="text-sm text-muted-foreground px-1 pt-1">
                如需修改品牌名稱，請
                <a href="#" className="text-teal underline">聯繫客服</a>
              </p>
            </div>

            {/* 品牌帳號 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="品牌帳號" required htmlFor="brand-account" />
              <Input id="brand-account" value="fitbutler" readOnly className="bg-secondary text-muted-foreground" />
              <p className="text-sm text-muted-foreground px-1 pt-1">
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
