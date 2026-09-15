import { nav, site } from "../content"

export default function Nav({ active }) {
  return (
    <header className="topbar">
      <a className="mark" href="#intro">
        <span className="mark-icon" aria-hidden="true">
          <svg viewBox="0 0 200 66" focusable="false">
            <path d="M100 32C86 10 62 4 42 16 30 24 28 8 40 4 48 1 22 0 14 16 6 34 16 62 48 62 70 62 88 48 100 32 112 48 130 62 152 62 184 62 194 34 186 16 178 0 152 1 160 4 172 8 170 24 158 16 138 4 114 10 100 32Z" />
          </svg>
        </span>
        <em>{site.name}</em>
      </a>
      <a
        className="boring-link"
        href={site.linkedin}
        target="_blank"
        rel="noreferrer noopener"
      >
        Click for Boring Version (Linkedin)
      </a>
      <nav>
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={active === item.id ? "active" : ""}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
