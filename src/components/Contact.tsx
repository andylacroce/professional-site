import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-16 border-t section-divider">
      <Reveal>
        <SectionHeader>Contact</SectionHeader>
      </Reveal>
      <Reveal delay={70}>
        <p style={{ marginTop: "1rem", color: "var(--text-secondary)", fontSize: "0.98rem", lineHeight: 1.7, maxWidth: "42ch" }}>
          Open to Technical Program Manager and Engineering Manager roles. Best ways to reach me:
        </p>
      </Reveal>
      <Reveal delay={120} style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <a
          href="mailto:andrew+work@andrewlacroce.com"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            color: "var(--text-primary)",
            fontSize: "0.98rem",
            fontWeight: 500,
            textDecoration: "none",
          }}
          className="accent-link w-fit break-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          andrew+work@andrewlacroce.com
        </a>
        <a
          href="https://www.linkedin.com/in/andrew-lacroce/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            color: "var(--text-primary)",
            fontSize: "0.98rem",
            fontWeight: 500,
            textDecoration: "none",
          }}
          className="accent-link w-fit break-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      </Reveal>
    </section>
  );
}
