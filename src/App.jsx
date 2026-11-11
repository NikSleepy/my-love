import { useCallback, useRef, useState } from 'react'
import BigQuestion from './components/BigQuestion.jsx'
import BunnyNote from './components/BunnyNote.jsx'
import CelebrationDialog from './components/CelebrationDialog.jsx'
import Gallery from './components/Gallery.jsx'
import Hero from './components/Hero.jsx'
import Letter from './components/Letter.jsx'
import MusicCharm from './components/MusicCharm.jsx'
import Reasons from './components/Reasons.jsx'
import { useHeartBurst } from './components/HeartBurstProvider.jsx'

export default function App() {
  const letterRef = useRef(null)
  const [isCelebrationOpen, setIsCelebrationOpen] = useState(false)
  const burst = useHeartBurst()

  const openLetter = useCallback(() => {
    burst(window.innerWidth / 2, window.innerHeight / 2)
    letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [burst])

  const openCelebration = useCallback(() => setIsCelebrationOpen(true), [])
  const closeCelebration = useCallback(() => {
    setIsCelebrationOpen(false)
    window.setTimeout(() => document.getElementById('btn-yes')?.focus(), 0)
  }, [])

  return (
    <div className="relative flex select-none flex-col font-body-md text-body-md text-on-surface">
      <main className="relative flex min-h-screen w-full flex-col pb-safe pt-safe">
        <div
          id="scrapbook-root"
          className="mx-auto flex w-full max-w-md select-none flex-col space-y-10 overflow-hidden px-4 py-6"
        >
          <MusicCharm />
          <Hero onOpenLetter={openLetter} />
          <Letter letterRef={letterRef} />
          <Gallery />
          <Reasons />
          <BigQuestion onAccept={openCelebration} />
          <BunnyNote />
          <CelebrationDialog open={isCelebrationOpen} onClose={closeCelebration} />
        </div>
      </main>
    </div>
  )
}
