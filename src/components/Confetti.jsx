import { useEffect, useState } from 'react'

const COLORS = ['#e2231a', '#00a2ff', '#ffd700', '#ff6b6b', '#4ecdc4', '#96ceb4', '#ffeaa7', '#a29bfe']

export default function Confetti({ active }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!active) return
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      top:  `${Math.random() * 30 + 10}vh`,
      bg:   COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: `${Math.random() * 0.6}s`,
      dur:   `${1 + Math.random() * 0.8}s`,
      size:  `${8 + Math.random() * 8}px`,
    }))
    setParticles(pieces)
    const t = setTimeout(() => setParticles([]), 2500)
    return () => clearTimeout(t)
  }, [active])

  return (
    <>
      {particles.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            top:  p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.bg,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
    </>
  )
}
