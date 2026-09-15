import { Fragment, useEffect, useMemo, useState } from "react"
import ArtifactPlayground from "./components/ArtifactPlayground"
import Aurora from "./components/Aurora"
import Nav from "./components/Nav"
import PortraitMarkup from "./components/PortraitMarkup"
import ShowCurtain from "./components/ShowCurtain"
import {
  artifact,
  chapters,
  moment,
  site,
  table,
  why,
} from "./content"

export default function App() {
  const [active, setActive] = useState("intro")
  const [frontCard, setFrontCard] = useState(null)

  const sectionIndex = useMemo(
    () => Math.max(0, chapters.findIndex((n) => n.id === active)),
    [active]
  )

  useEffect(() => {
    const nodes = chapters
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { threshold: [0.28, 0.45, 0.6] }
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  return (
    <div className="app" data-section={active}>
      <Aurora sectionIndex={sectionIndex} />
      <div className="grain" />
      <Nav active={active} />
      <ShowCurtain />

      <main>
        <section id="intro" className="chapter intro">
          <div className="intro-grid">
            <div className="intro-photo">
              <PortraitMarkup
                src={site.portrait}
                alt={`${site.name} portrait`}
                caption={site.name}
              />
              <p className="draw-nudge" aria-hidden="true">
                draw on me!
              </p>
            </div>
            <div className="intro-copy">
              <blockquote>
                <span className="quote-lead">{site.quoteLead}</span>
                <span className="quote-rest">{site.quoteRest}</span>
              </blockquote>
            </div>
          </div>
        </section>

        <section id="why" className="chapter why-chapter">
          <div className="why-copy">
            <p className="kicker">{why.kicker}</p>
            <h2>{why.title}</h2>
            <p className="lede">
              {why.lede.map((part, i) =>
                typeof part === "string" ? (
                  <Fragment key={i}>{part}</Fragment>
                ) : (
                  <span key={i} className="scribble lime-words">
                    {part.scribble}
                  </span>
                )
              )}
            </p>
          </div>
          <ol className="between">
            {why.lines.map((line) =>
              line.tiles ? (
                <li key={line.tiles.join("-")} className="between-trio">
                  {line.tiles.map((label) => (
                    <p key={label}>{label}</p>
                  ))}
                </li>
              ) : (
              <li key={line.surface}>
                {line.heading ? (
                  <h3 className="tile-heading scribble">{line.surface}</h3>
                ) : (
                  <p className="surface">{line.surface}</p>
                )}
                {line.points ? (
                  <ul className="tile-points">
                    {line.points.map((point, i) => (
                      <li key={i}>
                        {typeof point === "string"
                          ? point
                          : point.map((part, j) =>
                              typeof part === "string" ? (
                                <Fragment key={j}>{part}</Fragment>
                              ) : (
                                <span key={j} className="lime-words">
                                  {part.lime}
                                </span>
                              )
                            )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="subtext">{line.between}</p>
                )}
              </li>
              )
            )}
          </ol>
        </section>

        <section id="moment" className="chapter moment-chapter">
          <p className="kicker">{moment.kicker}</p>
          <h2>{moment.title}</h2>
          <p className="lede">{moment.lede}</p>
          <div className="card-deck" role="list">
            {moment.photos.map((photo, i) => (
              <figure
                key={photo.src}
                className={frontCard === i ? "deck-card is-front" : "deck-card"}
                role="listitem"
                style={{ "--i": i }}
                tabIndex={0}
                onMouseEnter={() => setFrontCard(i)}
                onMouseLeave={() => setFrontCard(null)}
                onFocus={() => setFrontCard(i)}
                onBlur={() => setFrontCard(null)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  style={
                    photo.objectPosition
                      ? { objectPosition: photo.objectPosition }
                      : undefined
                  }
                />
                <figcaption>
                  <strong>{photo.label}</strong>
                  <span>{photo.note}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="table" className="chapter table-chapter">
          <div className="table-copy">
            <p className="kicker">{table.kicker}</p>
            <h2>{table.title}</h2>
            <p className="lede">{table.lede}</p>
            <div className="table-grid">
              <div className="place-setting">
                <h3>{table.darkTitle}</h3>
                <ul>
                  {table.strengths.map((item, i) => (
                    <li key={`strength-${i}`}>
                      <strong>{item.name}</strong>
                      {item.note ? <span>{item.note}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="place-setting edges">
                <h3>{table.lightTitle}</h3>
                <ul>
                  {table.edges.map((item, i) => (
                    <li key={`edge-${i}`}>
                      <strong>{item.name}</strong>
                      {item.note ? <span>{item.note}</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="table-flyer-wrap">
            <p className="flyer-nudge" aria-hidden="true">
              {table.flyer.caption}
            </p>
            <figure className="table-flyer">
              <img src={table.flyer.src} alt={table.flyer.alt} />
            </figure>
          </div>
        </section>

        <section id="artifact" className="chapter">
          <p className="kicker">{artifact.kicker}</p>
          <h2>{artifact.title}</h2>
          <p className="lede">{artifact.lede}</p>
          <ArtifactPlayground />
        </section>
      </main>
    </div>
  )
}
