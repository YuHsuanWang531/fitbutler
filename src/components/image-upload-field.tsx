"use client"

import { useRef, useState } from "react"
import { X, Plus } from "lucide-react"
import { Cropper, CropperRef, createAspectRatio } from "react-advanced-cropper"
import "react-advanced-cropper/dist/style.css"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { CropperToolbar } from "@/components/cropper-toolbar"
import { useCropperActions } from "@/hooks/use-cropper-actions"
import { ALLOWED_IMAGE_TYPES, formatFileSize, letterboxToSquare } from "@/lib/image-utils"

const OUTPUT_WIDTH = 900

interface ImageUploadFieldProps {
  id: string
  label: string
  aspectRatio: number
}

export function ImageUploadField({ id, label, aspectRatio }: ImageUploadFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const cropperRef = useRef<CropperRef>(null)
  const [rawSrc, setRawSrc] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [fileMeta, setFileMeta] = useState<{ name: string; size: number } | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const cropperActions = useCropperActions(cropperRef)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file || !ALLOWED_IMAGE_TYPES.includes(file.type)) return
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
    const canvas = cropperRef.current?.getCanvas({
      width: OUTPUT_WIDTH,
      height: OUTPUT_WIDTH / aspectRatio,
    })
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
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={handleRemove}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </Button>
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
        <DialogContent
          showCloseButton={false}
          className="w-[548px] max-w-[548px] sm:max-w-[548px] p-6 gap-4 rounded-[10px] ring-0 shadow-lg flex flex-col data-open:zoom-in-100 data-closed:zoom-out-100"
        >
          <DialogTitle className="text-[18px] font-semibold leading-[28px] text-[#0a0a0a] shrink-0">
            編輯{label}
          </DialogTitle>

          {rawSrc && (
            <div className="flex flex-col w-full shrink-0">
              <div className="w-[500px] h-[500px] bg-black overflow-hidden">
                <Cropper
                  ref={cropperRef}
                  src={rawSrc}
                  stencilProps={{ aspectRatio }}
                  stencilConstraints={() => ({
                    aspectRatio: createAspectRatio(aspectRatio),
                  })}
                  defaultSize={(state) => {
                    if (aspectRatio === 1) return { width: 300, height: 300 }
                    const area = state.visibleArea ?? state.imageSize
                    if (!area) return { width: 300, height: 300 / aspectRatio }
                    return { width: area.width, height: area.width / aspectRatio }
                  }}
                  className="size-full"
                />
              </div>
              <CropperToolbar
                onFlipHorizontal={cropperActions.flipHorizontal}
                onFlipVertical={cropperActions.flipVertical}
                onRotateCcw={cropperActions.rotateCcw}
                onRotateCw={cropperActions.rotateCw}
                className="w-[500px]"
              />
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
              {label}
            </DialogTitle>
            <DialogClose
              render={<Button variant="ghost" size="icon-sm" className="shrink-0 text-muted-foreground hover:text-foreground" />}
            >
              <X className="size-4" />
            </DialogClose>
          </div>
          {preview && (
            <img
              src={preview}
              alt={`${label} 預覽`}
              className="w-full rounded-[6px] object-cover"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
