import { artifact } from "../content"

export default function ArtifactPlayground() {
  return (
    <div className="playground">
      <div className="playground-head">
        <p className="eyebrow">{artifact.name}</p>
        <p>{artifact.prompt}</p>
      </div>
      <a
        className="artifact-link"
        href={artifact.href}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={artifact.image}
          alt={`${artifact.name} homepage`}
        />
      </a>
    </div>
  )
}
