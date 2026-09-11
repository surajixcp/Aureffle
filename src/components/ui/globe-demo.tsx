import { Globe } from "@/components/ui/globe"

export function GlobeDemo() {
  return (
    <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border border-[#c6a252]/20 bg-[#080d1a] px-40 pb-40 pt-8 md:pb-60 md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-[#f4ecce] to-[#c6a252] bg-clip-text text-center text-8xl font-semibold leading-none text-transparent">
        Globe
      </span>
      <Globe className="top-28" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(198,162,82,0.2),rgba(8,13,26,0))]" />
    </div>
  )
}
