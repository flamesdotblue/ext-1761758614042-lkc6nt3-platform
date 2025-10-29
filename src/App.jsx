import { useState } from 'react'
import { Settings, Volume2, HelpCircle } from 'lucide-react'
import PokerTable from './components/PokerTable'
import ControlsBar from './components/ControlsBar'

export default function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'You', chips: 1520, bet: 0, isDealer: true, isSB: false, isBB: false, active: true },
    { id: 2, name: 'Ava', chips: 840, bet: 40, isDealer: false, isSB: true, isBB: false, active: false },
    { id: 3, name: 'Ben', chips: 2230, bet: 80, isDealer: false, isSB: false, isBB: true, active: false },
    { id: 4, name: 'Kai', chips: 960, bet: 0, isDealer: false, isSB: false, isBB: false, active: false },
    { id: 5, name: 'Lia', chips: 1870, bet: 0, isDealer: false, isSB: false, isBB: false, active: false },
  ])

  const [communityCards, setCommunityCards] = useState([
    { rank: 'A', suit: '♠' },
    { rank: 'K', suit: '♥' },
    { rank: '7', suit: '♦' },
    { rank: '2', suit: '♣' },
    { rank: 'J', suit: '♠' },
  ])

  const [pot, setPot] = useState(120)
  const [minBet, setMinBet] = useState(80)
  const [maxBet, setMaxBet] = useState(1520)
  const [pendingBet, setPendingBet] = useState(minBet)

  const handleFold = () => {
    // Visual-only demo: mark first player inactive
    setPlayers((prev) => prev.map(p => p.id === 1 ? { ...p, active: false, bet: 0 } : p))
  }

  const handleCheckCall = () => {
    const toCall = Math.max(...players.map(p => p.bet)) - players.find(p => p.id === 1).bet
    if (toCall > 0) {
      setPlayers(prev => prev.map(p => p.id === 1 ? { ...p, chips: Math.max(0, p.chips - toCall), bet: p.bet + toCall } : p))
      setPot(prev => prev + toCall)
    }
  }

  const handleBetRaise = () => {
    const amount = Math.min(pendingBet, players.find(p => p.id === 1).chips)
    if (amount <= 0) return
    setPlayers(prev => prev.map(p => p.id === 1 ? { ...p, chips: p.chips - amount, bet: p.bet + amount } : p))
    setPot(prev => prev + amount)
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/70 bg-neutral-900/90 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-emerald-500/20 grid place-items-center">
              <span className="text-emerald-400 font-bold">TH</span>
            </div>
            <div>
              <div className="text-sm text-white/60">Texas Hold'em</div>
              <div className="text-xs text-white/40">Demo UI</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-white/5 active:bg-white/10"><Volume2 className="w-5 h-5" /></button>
            <button className="p-2 rounded-md hover:bg-white/5 active:bg-white/10"><HelpCircle className="w-5 h-5" /></button>
            <button className="p-2 rounded-md hover:bg-white/5 active:bg-white/10"><Settings className="w-5 h-5" /></button>
          </div>
        </div>
      </header>

      <main className="flex-1 grid">
        <div className="max-w-6xl w-full mx-auto px-4 py-4 md:py-6 grid gap-4 md:gap-6">
          <PokerTable
            players={players}
            communityCards={communityCards}
            pot={pot}
          />
        </div>
      </main>

      <footer className="sticky bottom-0 z-30 bg-neutral-900/80 backdrop-blur border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <ControlsBar
            minBet={minBet}
            maxBet={maxBet}
            value={pendingBet}
            onChange={setPendingBet}
            onFold={handleFold}
            onCheckCall={handleCheckCall}
            onBetRaise={handleBetRaise}
          />
        </div>
      </footer>
    </div>
  )
}
