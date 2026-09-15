import { useEffect, useState } from "react"

export default function ShowCurtain() {
  const [parted, setParted] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (gone) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [gone])

  if (gone) return null

  const open = () => {
    if (parted) return
    setParted(true)
    window.setTimeout(() => setGone(true), 1500)
  }

  const curtainImage = `url(${import.meta.env.BASE_URL}curtain.jpg)`

  return (
    <div
      className={parted ? "show-curtain is-open" : "show-curtain"}
      style={{ "--curtain-image": curtainImage }}
    >
      <div className="show-curtain-panel show-curtain-left">
        <div className="show-curtain-fabric" />
      </div>
      <div className="show-curtain-panel show-curtain-right">
        <div className="show-curtain-fabric is-mirrored" />
      </div>
      <div className="show-curtain-copy">
        <p className="show-curtain-title">The Show Must Go On.</p>
        <button type="button" className="show-curtain-button" onClick={open}>
          Click Here
        </button>
      </div>
    </div>
  )
}
