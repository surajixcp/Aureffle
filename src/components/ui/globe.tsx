import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export type GlobeOptions = COBEOptions & {
  onRender?: (state: Record<string, any>) => void
}

const GLOBE_CONFIG: GlobeOptions = {
  width: 1000,
  height: 1000,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.2,
  mapSamples: 16000,
  mapBrightness: 2,
  baseColor: [1, 1, 1], // Bright white/gold land mass dots
  markerColor: [255 / 255, 180 / 255, 40 / 255], // Glowing amber gold markers
  glowColor: [0.9, 0.7, 0.35], // Ambient gold atmospheric halo
  markers: [
    { location: [1.30219, 103.8597], size: 0.12 }, // Singapore (Aureffle HQ)
    { location: [48.8566, 2.3522], size: 0.08 }, // Paris
    { location: [35.6762, 139.6503], size: 0.07 }, // Tokyo
    { location: [40.7128, -74.006], size: 0.08 }, // New York
    { location: [51.5074, -0.1278], size: 0.07 }, // London
    { location: [25.2048, 55.2708], size: 0.08 }, // Dubai
    { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
    { location: [19.076, 72.8777], size: 0.07 }, // Mumbai
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: GlobeOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const [r, setR] = useState(0)

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      setR(delta / 200)
    }
  }

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phiRef.current += 0.005
      state.phi = phiRef.current + r
      const w = widthRef.current || 600
      state.width = w * 2
      state.height = w * 2
      if (config.onRender) {
        config.onRender(state)
      }
    },
    [r, config],
  )

  useEffect(() => {
    if (!canvasRef.current) return

    const width = canvasRef.current.offsetWidth || 600
    widthRef.current = width

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    } as any)

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    }, 50)

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth || 600
      }
    }

    window.addEventListener("resize", onResize)

    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [config, onRender])

  return (
    <div className={cn("relative mx-auto aspect-square w-full max-w-[600px]", className)}>
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current,
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
