import { createContext, useCallback, useContext, useEffect, useRef } from 'react'

const HeartBurstContext = createContext(() => {})

const COLORS = ['#FF8FB8', '#FFB6D5', '#A7D8FF', '#6EC1FF', '#FFD8E6', '#FFF8FB']

export function useHeartBurst() {
  return useContext(HeartBurstContext)
}

function drawHeart(ctx, x, y, size, color, alpha, rotation) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.globalAlpha = Math.max(0, alpha)
  ctx.fillStyle = color
  ctx.beginPath()
  const topCurveHeight = size * 0.3
  ctx.moveTo(0, topCurveHeight)
  ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight)
  ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.4, 0, size)
  ctx.bezierCurveTo(0, (size + topCurveHeight) / 1.4, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight)
  ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export default function HeartBurstProvider({ children }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const ctxRef = useRef(null)
  const rafRef = useRef(0)

  const startLoop = useCallback(() => {
    if (rafRef.current) return

    const step = () => {
      const ctx = ctxRef.current
      if (!ctx) {
        rafRef.current = 0
        return
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      const particles = particlesRef.current

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i]
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.08
        particle.alpha -= particle.decay
        particle.rotation += particle.vRot

        drawHeart(
          ctx,
          particle.x,
          particle.y,
          particle.size,
          particle.color,
          particle.alpha,
          particle.rotation,
        )

        if (particle.alpha <= 0) {
          particles.splice(i, 1)
        }
      }

      if (particles.length > 0) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        rafRef.current = 0
      }
    }

    rafRef.current = requestAnimationFrame(step)
  }, [])

  const burst = useCallback(
    (x, y, count = 15) => {
      for (let i = 0; i < count; i += 1) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 5 + 2
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          size: Math.random() * 8 + 6,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 8,
        })
      }
      startLoop()
    },
    [startLoop],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const ctx = canvas.getContext('2d')
    ctxRef.current = ctx

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
      ctxRef.current = null
      particlesRef.current = []
    }
  }, [])

  useEffect(() => {
    const handlePointerDown = (event) => {
      const target = event.target
      if (target instanceof Element && target.closest('button, a, input, textarea, select')) {
        return
      }
      burst(event.clientX, event.clientY, 5)
    }

    window.addEventListener('pointerdown', handlePointerDown)
    return () => window.removeEventListener('pointerdown', handlePointerDown)
  }, [burst])

  return (
    <HeartBurstContext.Provider value={burst}>
      {children}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50"
      />
    </HeartBurstContext.Provider>
  )
}
