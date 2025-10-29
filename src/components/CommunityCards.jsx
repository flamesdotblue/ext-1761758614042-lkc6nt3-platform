function Card({ rank, suit }) {
  const isRed = suit === '♥' || suit === '♦'
  return (
    <div className="w-12 h-16 md:w-14 md:h-20 rounded-md bg-white shadow-xl border border-black/10 overflow-hidden">
      <div className={`px-1.5 pt-1 text-sm font-semibold ${isRed ? 'text-rose-600' : 'text-neutral-900'}`}>{rank}</div>
      <div className={`px-1.5 text-lg -mt-1 ${isRed ? 'text-rose-600' : 'text-neutral-900'}`}>{suit}</div>
      <div className="ml-auto mr-1 mt-6 rotate-180 text-xs opacity-70 select-none">{rank}{suit}</div>
    </div>
  )
}

export default function CommunityCards({ cards = [] }) {
  const placeholders = 5 - cards.length
  return (
    <div className="flex items-center gap-2">
      {cards.slice(0,5).map((c, idx) => (
        <Card key={idx} rank={c.rank} suit={c.suit} />
      ))}
      {Array.from({ length: Math.max(0, placeholders) }).map((_, i) => (
        <div key={`ph-${i}`} className="w-12 h-16 md:w-14 md:h-20 rounded-md bg-white/10 border border-white/10" />
      ))}
    </div>
  )
}
