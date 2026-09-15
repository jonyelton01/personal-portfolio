import { useEffect, useRef } from "react"

const PALETTES = [
  ["#ff3cac", "#784ba0", "#22d3ee"],
  ["#22d3ee", "#6366f1", "#ff3cac"],
  ["#ffb703", "#ff3cac", "#fff7ad"],
  ["#c6ff3d", "#22d3ee", "#a3e635"],
  ["#fb7185", "#c026d3", "#22d3ee"],
]

export default function Aurora({ sectionIndex }) {
  const canvasRef = useRef(null)
  const sectionRef = useRef(sectionIndex)

  useEffect(() => {
    sectionRef.current = sectionIndex
  }, [sectionIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let frame = 0
    let raf

    const blobs = Array.from({ length: 7 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 180 + Math.random() * 220,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00028,
      i,
    }))

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const { width, height } = canvas
      ctx.fillStyle = frame === 0 ? "#0a0614" : "rgba(10, 6, 20, 0.18)"
      ctx.fillRect(0, 0, width, height)

      const palette = PALETTES[sectionRef.current] ?? PALETTES[0]
      blobs.forEach((b, idx) => {
        b.x += b.vx
        b.y += b.vy
        if (b.x < -0.2 || b.x > 1.2) b.vx *= -1
        if (b.y < -0.2 || b.y > 1.2) b.vy *= -1

        const x = b.x * width
        const y = b.y * height
        const pulse = 1 + Math.sin(frame * 0.012 + idx) * 0.12
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.r * pulse)
        const color = palette[idx % palette.length]
        g.addColorStop(0, hexToRgba(color, 0.32))
        g.addColorStop(0.45, hexToRgba(color, 0.1))
        g.addColorStop(1, "rgba(10,6,20,0)")
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, b.r * pulse, 0, Math.PI * 2)
        ctx.fill()
      })

      frame += 1
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas className="aurora" ref={canvasRef} aria-hidden="true" />
}

function hexToRgba(hex, a) {
  const n = hex.replace("#", "")
  const r = parseInt(n.slice(0, 2), 16)
  const g = parseInt(n.slice(2, 4), 16)
  const b = parseInt(n.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${a})`
}
