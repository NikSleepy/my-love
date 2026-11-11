import { useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { useHeartBurst } from './HeartBurstProvider.jsx'

const FUNNY_TEXTS = [
  'Eh, kok kabur? 😜',
  'Tombolnya malu-malu nih 🙈',
  'Coba pikir pelan-pelan dulu~ 🌸',
  'Meleset! 😆',
  'Susah ya diklik? 🥹',
  'Yang pink kelihatan lebih ramah lho 💕',
]

export default function BigQuestion({ onAccept }) {
  const arenaRef = useRef(null)
  const noButtonRef = useRef(null)
  const evadeCountRef = useRef(0)
  const lastDodgeRef = useRef(0)
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 })
  const [noLabel, setNoLabel] = useState('Aku butuh waktu dulu ya')
  const burst = useHeartBurst()

  const dodge = () => {
    const arena = arenaRef.current
    const button = noButtonRef.current
    if (!arena || !button) return

    const now = Date.now()
    if (now - lastDodgeRef.current < 350) return
    lastDodgeRef.current = now

    evadeCountRef.current += 1

    const maxX = Math.max(0, (arena.clientWidth - button.offsetWidth) / 2 - 8)
    const maxY = 34

    setNoOffset({
      x: (Math.random() * 2 - 1) * maxX,
      y: (Math.random() * 2 - 1) * maxY,
    })
    setNoLabel(FUNNY_TEXTS[(evadeCountRef.current - 1) % FUNNY_TEXTS.length])

    const rect = button.getBoundingClientRect()
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 4)
  }

  return (
    <section id="question-section" className="relative flex flex-col pb-12 pt-4">
      <div className="relative flex flex-col items-center rounded-3xl bg-surface-container-lowest/95 p-6 text-center shadow-2xl backdrop-blur-md sm:p-8">
        <div className="mb-3 h-36 w-36 overflow-hidden rounded-2xl drop-shadow-md transition-transform hover:scale-105">
          <img
            src="/images/mascot-question.jpg"
            alt="Kelinci putih kawaii memegang amplop cinta di atas awan pastel"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <h2 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile text-primary">
          Boleh nggak aku jadi pacarmu? <br />🥺👉👈
        </h2>
        <p className="mb-8 max-w-xs font-body-md text-body-md text-on-surface-variant">
          Kita memang baru kenal, tapi aku nyaman dan seneng banget sama kamu. Aku pengen kita
          coba jalan bareng, pelan-pelan dan apa adanya.
        </p>

        <div
          ref={arenaRef}
          id="buttons-arena"
          className="relative flex min-h-[140px] w-full flex-col items-center justify-center gap-4"
        >
          <button
            type="button"
            id="btn-yes"
            onClick={onAccept}
            className="relative z-30 flex w-full max-w-[220px] animate-pulse items-center justify-center gap-2 rounded-full bg-primary-container py-4 font-headline-sm text-headline-sm text-on-primary-container shadow-xl shadow-primary-container/60 transition-all duration-300 hover:bg-primary hover:text-on-primary active:scale-95"
          >
            <Icon name="favorite" filled className="text-2xl" />
            Mau! 💖
          </button>

          <button
            ref={noButtonRef}
            type="button"
            id="btn-no"
            aria-label="Aku butuh waktu dulu ya (tombol suka kabur)"
            style={{ transform: `translate(${noOffset.x}px, ${noOffset.y}px)` }}
            onMouseEnter={dodge}
            onTouchStart={dodge}
            onClick={dodge}
            className="z-20 rounded-full bg-secondary-fixed px-6 py-2 font-label-md text-label-md text-on-secondary-fixed shadow-sm transition-all duration-200"
          >
            {noLabel}
          </button>
        </div>
      </div>
    </section>
  )
}