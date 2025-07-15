// 能量流粒子 (薄荷绿/青绿)
export default function EnergyFlowParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-flow-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 3}s`,
          }}
        >
          <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-70"></div>
        </div>
      ))}
    </div>
  )
}
