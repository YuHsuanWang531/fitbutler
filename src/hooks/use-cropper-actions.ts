import type { RefObject } from "react"
import type { CropperRef } from "react-advanced-cropper"

export function useCropperActions(cropperRef: RefObject<CropperRef | null>) {
  function transformInPlace(action: () => void) {
    const prevState = cropperRef.current?.getState()
    action()
    if (prevState) {
      cropperRef.current?.setState(
        (state) => state && { ...state, coordinates: prevState.coordinates, visibleArea: prevState.visibleArea },
        { immediately: true }
      )
    }
  }

  return {
    flipHorizontal: () => transformInPlace(() => cropperRef.current?.flipImage(true, false)),
    flipVertical: () => transformInPlace(() => cropperRef.current?.flipImage(false, true)),
    rotateCcw: () => transformInPlace(() => cropperRef.current?.rotateImage(-90)),
    rotateCw: () => transformInPlace(() => cropperRef.current?.rotateImage(90)),
  }
}
