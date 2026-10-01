"use client"

import { RotateCcw, RotateCw, SquareSplitHorizontal, SquareSplitVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CropperToolbarProps {
  onFlipHorizontal: () => void
  onFlipVertical: () => void
  onRotateCcw: () => void
  onRotateCw: () => void
  rightSlot?: React.ReactNode
  className?: string
}

export function CropperToolbar({ onFlipHorizontal, onFlipVertical, onRotateCcw, onRotateCw, rightSlot, className }: CropperToolbarProps) {
  return (
    <div className={cn("bg-[#171717] flex items-center justify-between px-4 py-2 w-full shrink-0", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onFlipHorizontal}
        className="text-white hover:bg-white/10 hover:text-white"
        title="水平翻轉"
      >
        <SquareSplitHorizontal className="size-5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onRotateCcw}
        className="text-white hover:bg-white/10 hover:text-white"
        title="逆時針旋轉"
      >
        <RotateCcw className="size-5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onRotateCw}
        className="text-white hover:bg-white/10 hover:text-white"
        title="順時針旋轉"
      >
        <RotateCw className="size-5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={onFlipVertical}
        className="text-white hover:bg-white/10 hover:text-white"
        title="垂直翻轉"
      >
        <SquareSplitVertical className="size-5" />
      </Button>
      {rightSlot}
    </div>
  )
}
