"use client"

import { useRef, useState } from "react"
import { X, HelpCircle, Plus, RotateCcw, RotateCw, SquareSplitHorizontal, SquareSplitVertical } from "lucide-react"
import { Cropper, CropperRef, createAspectRatio } from "react-advanced-cropper"
import "react-advanced-cropper/dist/style.css"
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

function formatFileSize(bytes: number): string {
  const kb = bytes / 1024
  if (kb < 1024) return `${Math.round(kb)}KB`
  return `${(kb / 1024).toFixed(1)}MB`
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

function LogoUploadField({ id }: { id: string }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const cropperRef = useRef<CropperRef>(null)
  const [rawSrc, setRawSrc] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileMeta, setFileMeta] = useState<{ name: string; size: number } | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const ALLOWED_TYPES = ["image/png", "image/jpeg"]

  function letterboxToSquare(file: File): Promise<string> {
    return new Promise((resolve) => {
      const objectUrl = URL.createObjectURL(file)
      const img = new Image()
      img.onload = () => {
        const SIZE = 1000
        const canvas = document.createElement("canvas")
        canvas.width = SIZE
        canvas.height = SIZE
        const ctx = canvas.getContext("2d")!
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, SIZE, SIZE)
        const scale = SIZE / img.naturalWidth
        const w = SIZE
        const h = img.naturalHeight * scale
        ctx.drawImage(img, 0, (SIZE - h) / 2, w, h)
        URL.revokeObjectURL(objectUrl)
        resolve(canvas.toDataURL("image/jpeg", 0.95))
      }
      img.src = objectUrl
    })
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file || !ALLOWED_TYPES.includes(file.type)) return
    const src = await letterboxToSquare(file)
    setRawSrc(src)
    setFileMeta({ name: file.name, size: file.size })
    setDialogOpen(true)
  }

  function handleRemove() {
    if (preview) URL.revokeObjectURL(preview)
    setPreview(null)
    setFileMeta(null)
  }

  function handleConfirm() {
    const canvas = cropperRef.current?.getCanvas({ width: 900, height: 300 })
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (!blob) return
      if (preview) URL.revokeObjectURL(preview)
      setPreview(URL.createObjectURL(blob))
      setDialogOpen(false)
    })
  }

  function handleDialogClose(open: boolean) {
    if (!open) setRawSrc(null)
    setDialogOpen(open)
  }

  return (
    <>
      <input
        ref={fileRef}
        id={id}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={handleFileChange}
      />

      {preview && fileMeta ? (
        <div className="flex w-full items-center gap-1 rounded-[6px] border border-input bg-secondary px-3 py-2">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="flex min-w-0 flex-1 items-center gap-2 cursor-pointer"
          >
            <img
              src={preview}
              alt=""
              className="size-8 shrink-0 rounded-[6px] object-cover"
            />
            <span className="min-w-0 flex-1 truncate text-left text-xs font-medium text-black">
              {fileMeta.name}
            </span>
          </button>
          <span className="shrink-0 text-xs text-muted-foreground">
            {formatFileSize(fileMeta.size)}
          </span>
          <button
            type="button"
            onClick={handleRemove}
            className="shrink-0 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => fileRef.current?.click()}
        >
          <Plus className="size-4" />
          上傳檔案
        </Button>
      )}

      <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
        {/* Figma: p-6 gap-4 rounded-[10px] shadow-lg, no ring */}
        <DialogContent
          showCloseButton={false}
          className="w-[548px] max-w-[548px] sm:max-w-[548px] p-6 gap-4 rounded-[10px] ring-0 shadow-lg flex flex-col data-open:zoom-in-100 data-closed:zoom-out-100"
        >
          <DialogTitle className="text-[18px] font-semibold leading-[28px] text-[#0a0a0a] shrink-0">
            編輯品牌 LOGO
          </DialogTitle>

          {rawSrc && (
            <div className="flex flex-col w-full shrink-0">
              <div className="w-[500px] h-[500px] bg-black overflow-hidden">
                <Cropper
                  ref={cropperRef}
                  src={rawSrc}
                  stencilProps={{ aspectRatio: 3 }}
                  stencilConstraints={() => ({
                    aspectRatio: createAspectRatio(3),
                  })}
                  defaultSize={(state) => {
                    const area = state.visibleArea ?? state.imageSize
                    if (!area) return { width: 300, height: 100 }
                    return { width: area.width, height: area.width / 3 }
                  }}
                  className="size-full"
                />
              </div>
              <div className="bg-[#171717] flex items-start justify-between px-9 py-4 w-[500px] shrink-0">
                <button
                  type="button"
                  onClick={() => cropperRef.current?.flipImage(true, false)}
                  className="block overflow-clip relative shrink-0 size-[24px] text-white hover:text-white/70 transition-colors cursor-pointer"
                  title="水平翻轉"
                >
                  <SquareSplitHorizontal className="size-full" />
                </button>
                <button
                  type="button"
                  onClick={() => cropperRef.current?.rotateImage(-90)}
                  className="block overflow-clip relative shrink-0 size-[24px] text-white hover:text-white/70 transition-colors cursor-pointer"
                  title="逆時針旋轉"
                >
                  <RotateCcw className="size-full" />
                </button>
                <button
                  type="button"
                  onClick={() => cropperRef.current?.rotateImage(90)}
                  className="block overflow-clip relative shrink-0 size-[24px] text-white hover:text-white/70 transition-colors cursor-pointer"
                  title="順時針旋轉"
                >
                  <RotateCw className="size-full" />
                </button>
                <button
                  type="button"
                  onClick={() => cropperRef.current?.flipImage(false, true)}
                  className="block overflow-clip relative shrink-0 size-[24px] text-white hover:text-white/70 transition-colors cursor-pointer"
                  title="垂直翻轉"
                >
                  <SquareSplitVertical className="size-full" />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 shrink-0 mt-auto">
            <Button
              variant="outline"
              className="px-4 py-2 h-auto rounded-[8px] text-sm font-medium"
              onClick={() => handleDialogClose(false)}
            >
              取消
            </Button>
            <Button
              className="px-4 py-2 h-auto rounded-[8px] text-sm font-medium"
              onClick={handleConfirm}
            >
              儲存
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent
          showCloseButton={false}
          className="w-[548px] max-w-[548px] sm:max-w-[548px] p-6 gap-4 rounded-[10px] ring-0 shadow-lg flex flex-col data-open:zoom-in-100 data-closed:zoom-out-100"
        >
          <div className="flex items-center gap-4 shrink-0">
            <DialogTitle className="flex-1 text-[18px] font-semibold leading-[28px] text-[#0a0a0a]">
              品牌 LOGO
            </DialogTitle>
            <DialogClose className="shrink-0 text-muted-foreground hover:text-foreground cursor-pointer">
              <X className="size-5" />
            </DialogClose>
          </div>
          {preview && (
            <img
              src={preview}
              alt="品牌 LOGO 預覽"
              className="w-full rounded-[6px] object-cover"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
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
              <LogoUploadField id="brand-logo" />
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
                <a href="#" className="text-[#48b4c4] underline">聯繫客服</a>
              </p>
            </div>

            {/* 品牌帳號 */}
            <div className="flex flex-col w-[300px]">
              <FieldLabel label="品牌帳號" required htmlFor="brand-account" />
              <Input id="brand-account" value="fitbutler" readOnly className="bg-secondary text-muted-foreground" />
              <p className="text-sm text-muted-foreground px-1 pt-1">
                如需修改品牌帳號，請
                <a href="#" className="text-[#48b4c4] underline">聯繫客服</a>
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
