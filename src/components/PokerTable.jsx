import CommunityCards from './CommunityCards'
import PlayerSeat from './PlayerSeat'

export default function PokerTable({ players, communityCards, pot }) {
  // Positions around the table (percentage-based, responsive-friendly)
  // Order should align with players array
  const positions = [
    { left: '50%', top: '86%', transform: 'translate(-50%, -50%)' }, // Bottom center (Hero)
    { left: '82%', top: '62%', transform: 'translate(-50%, -50%)' },
    { left: '82%', top: '28%', transform: 'translate(-50%, -50%)' },
    { left: '18%', top: '28%', transform: 'translate(-50%, -50%)' },
    { left: '18%', top: '62%', transform: 'translate(-50%, -50%)' },
  ]

  return (
    <div className="w-full">
      <div className="relative w-full aspect-[16/10] md:aspect-[16/7] max-h-[72vh] min-h-[380px] overflow-visible">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Table oval */}
          <div className="relative w-[95%] h-[85%] md:w-[90%] md:h-[80%]">
            <div className="absolute inset-0 rounded-[999px] bg-emerald-800 shadow-[inset_0_0_0_6px_rgba(0,0,0,0.4),_0_10px_30px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-1 rounded-[999px] bg-gradient-to-b from-emerald-800 to-emerald-900" />
              <div className="absolute inset-0 rounded-[999px] ring-4 ring-emerald-700/60" />
            </div>

            {/* Pot */}
            <div className="absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2">
              <div className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-white/80 shadow-lg">
                Pot: <span className="font-semibold text-white">{pot}</span>
              </div>
            </div>

            {/* Community cards */}
            <div className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2">
              <CommunityCards cards={communityCards} />
            </div>

            {/* Seats */}
            {players.map((p, idx) => (
              <div
                key={p.id}
                className="absolute"
                style={{ left: positions[idx]?.left, top: positions[idx]?.top, transform: positions[idx]?.transform }}
              >
                <PlayerSeat
                  name={p.name}
                  chips={p.chips}
                  bet={p.bet}
                  active={p.active}
                  dealer={p.isDealer}
                  sb={p.isSB}
                  bb={p.isBB}
                  hero={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile helper controls under table for extra info if needed */}
      <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-white/60 md:hidden">
        <div className="rounded-md bg-white/5 px-3 py-2">Blinds: 40/80</div>
        <div className="rounded-md bg-white/5 px-3 py-2 text-center">Players: {players.length}</div>
        <div className="rounded-md bg-white/5 px-3 py-2 text-right">Ante: 0</div>
      </div>
    </div>
  )
}
