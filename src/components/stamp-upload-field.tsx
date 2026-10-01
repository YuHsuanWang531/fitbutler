"use client"

import { useRef, useState } from "react"
import { Plus, X } from "lucide-react"
import { Cropper, CropperRef, createAspectRatio } from "react-advanced-cropper"
import "react-advanced-cropper/dist/style.css"
import { Button } from "@/components/ui/button"
import { CropperToolbar } from "@/components/cropper-toolbar"
import { useCropperActions } from "@/hooks/use-cropper-actions"
import { ALLOWED_IMAGE_TYPES, letterboxToSquare } from "@/lib/image-utils"

const MAX_UPLOADS = 2
const OUTPUT_SIZE = 400
const DEFAULT_STAMP_ID = "default-stamp"
const DEFAULT_STAMP_SRC = "/stamps/default-stamp.png"

interface StampImage {
  id: string
  rawSrc: string
  croppedSrc: string | null
  croppable: boolean
}

interface StampUploadFieldProps {
  onCancel: () => void
  onConfirm: (images: { id: string; src: string }[]) => void
}

export function StampUploadField({ onCancel, onConfirm }: StampUploadFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const cropperRef = useRef<CropperRef>(null)
  const [images, setImages] = useState<StampImage[]>([
    { id: DEFAULT_STAMP_ID, rawSrc: DEFAULT_STAMP_SRC, croppedSrc: null, croppable: false },
  ])
  const [activeId, setActiveId] = useState<string | null>(null)
  const cropperActions = useCropperActions(cropperRef)

  const activeImage = images.find((img) => img.id === activeId && img.croppable) ?? null
  const uploadedCount = images.filter((img) => img.croppable).length

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).filter((file) => ALLOWED_IMAGE_TYPES.includes(file.type))
    e.target.value = ""
    const remaining = MAX_UPLOADS - uploadedCount
    const accepted = files.slice(0, remaining)
    if (!accepted.length) return

    const newImages: StampImage[] = await Promise.all(
      accepted.map(async (file) => ({
        id: crypto.randomUUID(),
        rawSrc: await letterboxToSquare(file),
        croppedSrc: null,
        croppable: true,
      }))
    )
    setImages((prev) => [...prev, ...newImages])
    setActiveId(newImages[newImages.length - 1].id)
  }

  function handleRemove(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id))
    setActiveId((prev) => (prev === id ? null : prev))
  }

  function handleCropCancel() {
    if (activeImage && activeImage.croppedSrc === null) {
      setImages((prev) => prev.filter((img) => img.id !== activeId))
    }
    setActiveId(null)
  }

  function handleCropSave() {
    const canvas = cropperRef.current?.getCanvas({ width: OUTPUT_SIZE, height: OUTPUT_SIZE })
    if (canvas) {
      const snapshot = canvas.toDataURL("image/png")
      setImages((prev) => prev.map((img) => (img.id === activeId ? { ...img, croppedSrc: snapshot } : img)))
    }
    setActiveId(null)
  }

  function handleConfirm() {
    onConfirm(images.map((img) => ({ id: img.id, src: img.croppedSrc ?? img.rawSrc })))
  }

  if (activeImage) {
    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-[400px] shrink-0">
          <div className="w-[400px] h-[400px] bg-black overflow-hidden">
            <Cropper
              key={activeImage.id}
              ref={cropperRef}
              src={activeImage.rawSrc}
              stencilProps={{ aspectRatio: 1 }}
              stencilConstraints={() => ({ aspectRatio: createAspectRatio(1) })}
              defaultSize={() => ({ width: 240, height: 240 })}
              className="size-full"
            />
          </div>
          <CropperToolbar
            onFlipHorizontal={cropperActions.flipHorizontal}
            onFlipVertical={cropperActions.flipVertical}
            onRotateCcw={cropperActions.rotateCcw}
            onRotateCw={cropperActions.rotateCw}
          />
        </div>

        <div className="flex items-center justify-end gap-2 mt-6">
          <Button
            type="button"
            variant="outline"
            className="px-4 py-2 h-auto rounded-[8px] text-sm font-medium"
            onClick={handleCropCancel}
          >
            取消
          </Button>
          <Button
            type="button"
            className="px-4 py-2 h-auto rounded-[8px] text-sm font-medium"
            onClick={handleCropSave}
          >
            儲存
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-4 items-start w-full">
          {images.map((img) => (
            <div key={img.id} className="group relative shrink-0 size-[80px]">
              <div className="block size-full overflow-hidden rounded-[6px]">
                <img
                  src={img.croppedSrc ?? img.rawSrc}
                  alt=""
                  className="size-full object-cover"
                />
              </div>

              <button
                type="button"
                onClick={() => handleRemove(img.id)}
                className="absolute -top-1.5 -right-1.5 hidden size-5 items-center justify-center rounded-full bg-foreground text-background group-hover:flex"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}

          {uploadedCount < MAX_UPLOADS && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex shrink-0 size-[80px] flex-col items-center justify-center rounded-[3px] border border-dashed border-[#e4e6ea] bg-white transition-colors hover:bg-muted/50 cursor-pointer"
            >
              <Plus className="size-6 text-muted-foreground" />
            </button>
          )}
        </div>

        <p className="text-sm text-[#6b7280]">
          最多上傳 {MAX_UPLOADS} 張，接受 PNG、JPG、JPEG，檔案上限為 10MB
        </p>
      </div>

      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex items-center justify-end gap-2 mt-6">
        <Button
          type="button"
          variant="outline"
          className="px-4 py-2 h-auto rounded-[8px] text-sm font-medium"
          onClick={onCancel}
        >
          取消
        </Button>
        <Button
          type="button"
          className="px-4 py-2 h-auto rounded-[8px] text-sm font-medium"
          onClick={handleConfirm}
        >
          確定上傳
        </Button>
      </div>
    </div>
  )
}
