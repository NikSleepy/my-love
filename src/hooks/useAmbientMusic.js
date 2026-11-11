import { useCallback, useEffect, useRef, useState } from 'react'

const MELODY = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880.0, 698.46]
const BASS = [261.63, 220.0, 174.61, 196.0]
const NOTE_INTERVAL = 620

export function useAmbientMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const ctxRef = useRef(null)
  const timerRef = useRef(null)

  const stop = useCallback(() => {
    window.clearInterval(timerRef.current)
    timerRef.current = null

    const ctx = ctxRef.current
    ctxRef.current = null
    if (ctx && ctx.state !== 'closed') {
      ctx.close().catch(() => {})
    }
    setIsPlaying(false)
  }, [])

  const start = useCallback(() => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return

    const ctx = new AudioContextClass()
    ctxRef.current = ctx
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }

    const master = ctx.createGain()
    master.gain.value = 0.12
    master.connect(ctx.destination)

    let step = 0

    const playNote = () => {
      const now = ctx.currentTime
      const frequency = MELODY[step % MELODY.length]

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(frequency, now)
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.6, now + 0.08)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6)
      osc.connect(gain).connect(master)
      osc.start(now)
      osc.stop(now + 1.7)

      if (step % 4 === 0) {
        const bass = ctx.createOscillator()
        const bassGain = ctx.createGain()
        bass.type = 'triangle'
        bass.frequency.setValueAtTime(BASS[(step / 4) % BASS.length], now)
        bassGain.gain.setValueAtTime(0.0001, now)
        bassGain.gain.exponentialRampToValueAtTime(0.35, now + 0.2)
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2)
        bass.connect(bassGain).connect(master)
        bass.start(now)
        bass.stop(now + 2.3)
      }

      step += 1
    }

    playNote()
    timerRef.current = window.setInterval(playNote, NOTE_INTERVAL)
    setIsPlaying(true)
  }, [])

  const toggle = useCallback(() => {
    if (ctxRef.current) {
      stop()
    } else {
      start()
    }
  }, [start, stop])

  useEffect(() => {
    return () => {
      window.clearInterval(timerRef.current)
      const ctx = ctxRef.current
      if (ctx && ctx.state !== 'closed') {
        ctx.close().catch(() => {})
      }
    }
  }, [])

  return { isPlaying, toggle }
}
