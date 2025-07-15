import { CircleDot } from "lucide-react"

// 生物反馈光环 (薄荷绿/青绿)
interface BioFeedbackRingProps {
  size?: string
}

export default function BioFeedbackRing({ size = "w-32 h-32" }: BioFeedbackRingProps) {
  return (
    <div className={`${size} relative mx-auto`}>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 animate-ping"></div>
      <div className="absolute inset-1 rounded-full bg-gradient-to-r from-teal-500/30 to-green-500/30 animate-pulse"></div>
      <div
        className="absolute inset-3 rounded-full bg-gradient-to-r from-emerald-400/40 to-teal-400/40 animate-spin"
        style={{ animationDuration: "10s" }}
      ></div>
      <div className="absolute inset-5 rounded-full bg-gradient-to-r from-gray-900 to-black flex items-center justify-center border border-emerald-400/30">
        <CircleDot className="w-12 h-12 text-emerald-400 animate-pulse" />
      </div>
    </div>
  )
}
