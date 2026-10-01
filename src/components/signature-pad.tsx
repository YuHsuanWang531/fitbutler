"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 200

export function SignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [hasSignature, setHasSignature] = useState(false)

  function getPoint(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drawing.current = true
    const { x, y } = getPoint(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    const { x, y } = getPoint(e)
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.lineTo(x, y)
    ctx.stroke()
    setHasSignature(true)
  }

  function handlePointerUp() {
    drawing.current = false
  }

  function handleClear() {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="w-full h-[200px] rounded-lg border border-dashed border-input bg-secondary touch-none cursor-crosshair"
        />
        {!hasSignature && (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            請在此手寫簽名
          </p>
        )}
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button type="button" variant="outline" onClick={handleClear} disabled={!hasSignature}>
          清除
        </Button>
        <Button type="button" disabled={!hasSignature}>
          儲存
        </Button>
      </div>
    </div>
  )
}
