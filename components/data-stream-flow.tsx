// 数据流效果 (薄荷绿/青绿)
export default function DataStreamFlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute text-emerald-400 text-xs font-mono animate-data-stream"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          {Math.random().toString(16).substr(2, 8)}
        </div>
      ))}
    </div>
  )
}
