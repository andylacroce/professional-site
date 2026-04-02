import SectionHeader from "./SectionHeader";

const projects = [
  {
    name: "Character Chatbot Generator",
    url: "https://github.com/andylacroce/character-chatbot-generator",
    description:
      "Full-stack Next.js chatbot hosted on Vercel, integrating the Claude API, Google Text-to-Speech, and AI image generation to support interactive voice and visual conversations with public-domain characters. Built independently to develop hands-on fluency with modern AI APIs and cloud deployment.",
    tags: ["Next.js", "Claude API", "Google TTS", "TypeScript", "Vercel"],
  },
  {
    name: "andrewlacroce.com",
    url: "https://github.com/andylacroce",
    description:
      "This site. Built from scratch with Next.js 15, Tailwind CSS v4, and static export — no template, no CMS. Deployed to Vercel with a custom domain via Cloudflare.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 border-t section-divider">
      <SectionHeader>Projects</SectionHeader>
      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {projects.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              padding: "1.25rem",
              borderRadius: "0.5rem",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              textDecoration: "none",
              transition: "border-color 0.2s",
            }}
            className="hover:border-indigo-500/50"
          >
            <div className="flex items-center justify-between gap-2">
              <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.95rem" }}>
                {p.name}
              </span>
              <ExternalLinkIcon />
            </div>
            <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {p.description}
            </p>
            <div style={{ marginTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    padding: "0.2rem 0.55rem",
                    borderRadius: "9999px",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ color: "var(--text-secondary)", flexShrink: 0 }}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
