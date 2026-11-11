import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon.jsx'
import { useHeartBurst } from './HeartBurstProvider.jsx'

export default function CelebrationDialog({ open, onClose }) {
  const burst = useHeartBurst()
  const [hugged, setHugged] = useState(false)
  const dialogRef = useRef(null)
  const hugTimeoutRef = useRef(null)
  const hugButtonRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const timers = Array.from({ length: 5 }, (_, index) =>
      window.setTimeout(() => {
        burst(
          Math.random() * window.innerWidth,
          Math.random() * (window.innerHeight * 0.7),
          25,
        )
      }, index * 200),
    )

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [open, burst])

  useEffect(() => {
    if (!open) {
      setHugged(false)
      if (dialogRef.current?.contains(document.activeElement)) {
        document.activeElement.blur()
      }
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusables = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables?.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    const focusTimer = window.setTimeout(() => hugButtonRef.current?.focus(), 80)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      window.clearTimeout(focusTimer)
    }
  }, [open, onClose])

  useEffect(() => {
    return () => window.clearTimeout(hugTimeoutRef.current)
  }, [])

  const handleHug = () => {
    setHugged(true)
    burst(window.innerWidth / 2, window.innerHeight / 2, 40)
    window.clearTimeout(hugTimeoutRef.current)
    hugTimeoutRef.current = window.setTimeout(() => setHugged(false), 2200)
  }

  const dialog = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="celebration-title"
      inert={!open}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className={`fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-on-surface/40 p-4 backdrop-blur-md transition-opacity duration-500 ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        id="celebration-card"
        className={`relative flex w-full max-w-sm transform flex-col items-center rounded-3xl bg-surface-container-lowest p-6 text-center shadow-2xl transition-transform duration-500 sm:p-8 ${
          open ? 'scale-100' : 'scale-90'
        }`}
      >
        <div className="mb-3 h-40 w-40 overflow-hidden rounded-2xl drop-shadow-lg">
          <img
            src="/images/mascot-celebration.jpg"
            alt="Kelinci putih kawaii memegang amplop cinta bertuliskan love you"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-fixed px-3 py-1 font-label-sm text-label-sm text-on-primary-fixed">
          <Icon name="favorite" filled className="text-sm" />
          Hari Paling Bahagia!
        </div>

        <h3
          id="celebration-title"
          className="mb-2 font-headline-md text-headline-md text-primary"
        >
          Yeayyy! Makasih ya, Sayang! 💗🎉
        </h3>
        <p className="mb-6 font-body-md text-body-md leading-relaxed text-on-surface-variant">
          Resmi pacaran! Aku janji bakal selalu berusaha bikin kamu tersenyum setiap hari. I love
          you so much! 🌸✨
        </p>

        <div className="flex w-full flex-col gap-2.5">
          <button
            ref={hugButtonRef}
            type="button"
            id="btn-hug"
            onClick={handleHug}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-container py-3.5 font-label-lg text-label-lg text-on-primary-container shadow-md transition-all hover:bg-primary hover:text-on-primary"
          >
            {!hugged && <Icon name="favorite" className="text-xl" />}
            {hugged ? 'Pelukan Terkirim! 💖🥰' : 'Peluk Online 🤗'}
          </button>
          <button
            type="button"
            id="btn-close-modal"
            onClick={onClose}
            className="w-full rounded-full bg-surface-container py-2.5 font-label-md text-label-md text-on-surface transition-colors hover:bg-surface-container-high"
          >
            Tutup &amp; Simpan Momen Ini 💌
          </button>
        </div>
      </div>
    </div>
  )

  return typeof document === 'undefined' ? null : createPortal(dialog, document.body)
}
