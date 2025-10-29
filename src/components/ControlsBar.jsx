import { useMemo } from 'react'

export default function ControlsBar({ minBet, maxBet, value, onChange, onFold, onCheckCall, onBetRaise }) {
  const clamped = useMemo(() => Math.min(Math.max(value ?? 0, minBet), maxBet), [value, minBet, maxBet])
  const canCheck = useMemo(() => minBet <= 0, [minBet])

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 text-sm">
        <button onClick={onFold} className="px-4 py-2 rounded-md bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-medium shadow">
          Fold
        </button>
        <button onClick={onCheckCall} className="px-4 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 active:bg-neutral-700 text-white font-medium shadow min-w-[96px]">
          {canCheck ? 'Check' : 'Call'}
        </button>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-3">
          <div className="text-xs text-white/60">Bet/Raise</div>
          <input
            type="range"
            min={minBet}
            max={maxBet}
            value={clamped}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-56 accent-emerald-400"
          />
          <input
            type="number"
            min={minBet}
            max={maxBet}
            value={clamped}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-24 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white"
          />
          <button onClick={() => onChange(minBet)} className="px-2 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10">Min</button>
          <button onClick={() => onChange(maxBet)} className="px-2 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10">Max</button>
          <button onClick={onBetRaise} className="px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold shadow">
            {minBet > 0 ? 'Raise' : 'Bet'} {clamped}
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className="mt-3 grid grid-cols-3 gap-2 md:hidden">
        <div className="col-span-3">
          <input
            type="range"
            min={minBet}
            max={maxBet}
            value={clamped}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-emerald-400"
          />
        </div>
        <button onClick={() => onChange(minBet)} className="px-3 py-2 rounded bg-white/5 border border-white/10 text-white/80">Min</button>
        <div className="flex items-center justify-center rounded bg-white/5 border border-white/10 text-white">
          {clamped}
        </div>
        <button onClick={() => onChange(maxBet)} className="px-3 py-2 rounded bg-white/5 border border-white/10 text-white/80">Max</button>
        <button onClick={onBetRaise} className="col-span-3 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold shadow">
          {minBet > 0 ? 'Raise' : 'Bet'} {clamped}
        </button>
      </div>
    </div>
  )
}
