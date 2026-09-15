import { useEffect, useRef, useState } from "react"

const INK = "#7c3aed"

export default function PortraitMarkup({ src, alt, caption }) {
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const strokesRef = useRef([])
  const drawingRef = useRef(false)
  const [hasMarks, setHasMarks] = useState(false)

  const redraw = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = INK
    ctx.globalAlpha = 0.92
    ctx.lineWidth = Math.max(8, canvas.width * 0.016)

    strokesRef.current.forEach((stroke) => {
      if (stroke.length === 1) {
        ctx.beginPath()
        ctx.arc(
          stroke[0].x * canvas.width,
          stroke[0].y * canvas.height,
          ctx.lineWidth / 2,
          0,
          Math.PI * 2
        )
        ctx.fillStyle = INK
        ctx.fill()
        return
      }
      ctx.beginPath()
      stroke.forEach((point, i) => {
        const x = point.x * canvas.width
        const y = point.y * canvas.height
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()
    })
  }

  const syncCanvas = () => {
    const stage = stageRef.current
    const canvas = canvasRef.current
    if (!stage || !canvas) return
    const rect = stage.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.max(1, Math.round(rect.width * dpr))
    canvas.height = Math.max(1, Math.round(rect.height * dpr))
    redraw()
  }

  const pointFromEvent = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    return {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    }
  }

  useEffect(() => {
    syncCanvas()
    const stage = stageRef.current
    const ro = new ResizeObserver(syncCanvas)
    if (stage) ro.observe(stage)
    window.addEventListener("resize", syncCanvas)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", syncCanvas)
    }
  }, [])

  const onPointerDown = (event) => {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    drawingRef.current = true
    strokesRef.current.push([pointFromEvent(event)])
    setHasMarks(true)
    redraw()
  }

  const onPointerMove = (event) => {
    if (!drawingRef.current) return
    strokesRef.current[strokesRef.current.length - 1].push(pointFromEvent(event))
    redraw()
  }

  const onPointerUp = (event) => {
    drawingRef.current = false
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const clearMarks = () => {
    strokesRef.current = []
    setHasMarks(false)
    redraw()
  }

  return (
    <figure className="portrait">
      <div
        ref={stageRef}
        className="portrait-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img src={src} alt={alt} draggable="false" />
        <canvas ref={canvasRef} className="portrait-markup" />
      </div>
      {hasMarks && (
        <button
          type="button"
          className="portrait-clear"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={clearMarks}
        >
          Clear marks
        </button>
      )}
      <figcaption>{caption}</figcaption>
    </figure>
  )
}
