export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg"]

const LETTERBOX_SIZE = 1000
const LETTERBOX_FILL = "#000"
const LETTERBOX_JPEG_QUALITY = 0.95

export function formatFileSize(bytes: number): string {
  const kb = bytes / 1024
  if (kb < 1024) return `${Math.round(kb)}KB`
  return `${(kb / 1024).toFixed(1)}MB`
}

export function letterboxToSquare(file: File): Promise<string> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = LETTERBOX_SIZE
      canvas.height = LETTERBOX_SIZE
      const ctx = canvas.getContext("2d")!
      ctx.fillStyle = LETTERBOX_FILL
      ctx.fillRect(0, 0, LETTERBOX_SIZE, LETTERBOX_SIZE)
      const scale = LETTERBOX_SIZE / img.naturalWidth
      const w = LETTERBOX_SIZE
      const h = img.naturalHeight * scale
      ctx.drawImage(img, 0, (LETTERBOX_SIZE - h) / 2, w, h)
      URL.revokeObjectURL(objectUrl)
      resolve(canvas.toDataURL("image/jpeg", LETTERBOX_JPEG_QUALITY))
    }
    img.src = objectUrl
  })
}
