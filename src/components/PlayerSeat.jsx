function Badge({ label, color = 'bg-white/10', text = 'text-white/80' }) {
  return (
    <span className={`px-1.5 py-0.5 rounded text-[10px] leading-none border ${text} ${color} border-white/10`}>{label}</span>
  )
}

function Avatar({ name, active, hero }) {
  const initials = name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()
  return (
    <div className={`relative w-10 h-10 rounded-full grid place-items-center font-semibold ${active ? 'ring-2 ring-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.25)]' : 'ring-1 ring-white/10'} ${hero ? 'bg-indigo-500/30 text-indigo-100' : 'bg-white/10 text-white'}`}>
      {initials}
      {hero && (
        <span className="absolute -bottom-1 text-[10px] bg-indigo-500 text-white px-1 rounded">YOU</span>
      )}
    </div>
  )
}

export default function PlayerSeat({ name, chips, bet, active, dealer, sb, bb, hero }) {
  return (
    <div className={`min-w-[160px] max-w-[200px] -translate-y-3 md:-translate-y-0`}> 
      <div className={`rounded-xl px-3 py-2 backdrop-blur border shadow-md ${active ? 'bg-emerald-500/10 border-emerald-400/20' : 'bg-black/30 border-white/10'}`}>
        <div className="flex items-center gap-2">
          <Avatar name={name} active={active} hero={hero} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="truncate text-sm text-white/90">{name}</div>
              <div className="flex items-center gap-1">
                {dealer && <Badge label="D" color="bg-fuchsia-500/20" text="text-fuchsia-200" />}
                {sb && <Badge label="SB" color="bg-cyan-500/20" text="text-cyan-200" />}
                {bb && <Badge label="BB" color="bg-amber-500/20" text="text-amber-200" />}
              </div>
            </div>
            <div className="mt-0.5 text-xs text-white/60">Chips: <span className="text-white/90 font-medium">{chips}</span></div>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs">
          <div className="px-2 py-1 rounded bg-white/5 border border-white/10">Bet: <span className="text-white/90 font-medium">{bet}</span></div>
          {active ? <span className="text-amber-300 animate-pulse">Your turn</span> : <span className="text-white/40">Waiting</span>}
        </div>
      </div>
    </div>
  )
}
