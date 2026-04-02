import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-16 border-t section-divider">
      <Reveal>
        <SectionHeader>Contact</SectionHeader>
      </Reveal>
      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.25rem" }}>
        <Reveal delay={70}>
          <a href="mailto:andrew+work@andrewlacroce.com" className="contact-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" style={{ color: "var(--accent)", flexShrink: 0 }}>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="contact-row-label" style={{ fontSize: "0.925rem", color: "var(--text-secondary)" }}>
              andrew+work@andrewlacroce.com
            </span>
            <ExternalLinkIcon />
          </a>
        </Reveal>
        <Reveal delay={130}>
          <a href="https://www.linkedin.com/in/andrew-lacroce/" target="_blank" rel="noopener noreferrer" className="contact-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--accent)", flexShrink: 0 }}>
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="contact-row-label" style={{ fontSize: "0.925rem", color: "var(--text-secondary)" }}>
              LinkedIn
            </span>
            <ExternalLinkIcon />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="contact-row-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-secondary)", flexShrink: 0 }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
