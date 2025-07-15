"use client"

import type React from "react"

interface CrystalBallProps {
  collectedIcons: React.ReactNode[]
  isGenerating: boolean
  triggerGlow: boolean
}

export function CrystalBall({ collectedIcons, isGenerating, triggerGlow }: CrystalBallProps) {
  return (
    <div className="relative w-full max-w-md aspect-square mx-auto flex flex-col items-center justify-end">
      {/* Crystal Ball Sphere */}
      <div
        className={`relative w-[90%] aspect-square rounded-full bg-gradient-to-br from-gray-900/80 to-black/80 border-2 border-emerald-600/50 shadow-lg shadow-emerald-900/50 overflow-hidden flex items-center justify-center transform-gpu perspective-1000 mb-[-10%] z-10 ${triggerGlow ? "animate-crystal-glow" : ""}`}
      >
        {/* Inner Glow/Energy - removed continuous animations */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-gray-950/80 to-black/80 border border-emerald-500/30"></div>
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-900/30 to-teal-900/30" />{" "}
        {/* Removed animate-pulse */}
        {/* Collected Icons */}
        <div className="relative w-full h-full flex items-center justify-center">
          {collectedIcons.map((icon, idx) => (
            <div
              key={idx}
              className={`absolute text-emerald-300 ${isGenerating ? "animate-icon-super-spin" : "animate-icon-float-in-ball"}`}
              style={{
                animationDelay: `${idx * 0.2}s`,
                // Distribute icons in a circular pattern
                top: `${50 + Math.sin(idx * ((2 * Math.PI) / collectedIcons.length)) * 25}%`,
                left: `${50 + Math.cos(idx * ((2 * Math.PI) / collectedIcons.length)) * 25}%`,
                transform: `translate(-50%, -50%) scale(1.2)`,
              }}
            >
              {icon}
            </div>
          ))}
        </div>
        {/* Subtle light reflections */}
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-white/10 rounded-full blur-md opacity-50 transform rotate-45"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1/4 h-1/4 bg-white/10 rounded-full blur-sm opacity-30 transform -rotate-30"></div>
      </div>

      {/* Crystal Ball Base */}
      <div className="relative w-[95%] h-[25%] bg-gray-800 rounded-b-xl border-t-2 border-emerald-600/50 shadow-lg shadow-emerald-900/50 flex flex-col items-center justify-end pb-4 pt-2 z-0">
        {/* Base top part - trapezoidal shape */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gray-700 rounded-t-lg border-b border-emerald-600/50 transform skew-x-[-10deg] origin-bottom-left"></div>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gray-700 rounded-t-lg border-b border-emerald-600/50 transform skew-x-[10deg] origin-bottom-right"></div>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gray-700 rounded-t-lg border-b border-emerald-600/50"></div>

        {/* Printer Slot - now just a visual element */}
        <div className="relative w-3/4 h-8 bg-gray-950 rounded-b-sm border border-emerald-700/50 flex items-center justify-center overflow-hidden z-10">
          {/* Printed Poem content removed from here */}
        </div>
      </div>
    </div>
  )
}
