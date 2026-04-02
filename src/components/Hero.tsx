import Image from "next/image";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="home" className="pt-14 sm:pt-20 pb-12 sm:pb-16">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-7 lg:gap-10">
        <Reveal delay={40} className="w-fit shrink-0">
          <a href="/profile-pic.jpg" target="_blank" rel="noopener noreferrer" className="w-fit shrink-0">
            <Image
              src="/profile-pic.jpg"
              alt="Andrew Lacroce"
              width={220}
              height={220}
              className="rounded-full w-36 h-36 sm:w-40 sm:h-40 lg:w-52 lg:h-52 transition-opacity hover:opacity-90"
              style={{ border: "2px solid var(--border)" }}
              priority
            />
          </a>
        </Reveal>

        <Reveal delay={120} className="max-w-2xl flex flex-col gap-4 sm:gap-5">
          <div>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 5vw, 2.75rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                color: "var(--text-primary)",
              }}
            >
              Andrew Lacroce
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--accent-light)",
                marginTop: "0.375rem",
                fontWeight: 500,
              }}
            >
              Engineering Leader · TPM / EM
            </p>
          </div>

          <p
            style={{
              fontSize: "1rem",
              color: "var(--text-secondary)",
              maxWidth: "62ch",
              lineHeight: 1.6,
            }}
          >
            20+ years driving delivery across engineering, product, and business
            teams. I build the planning frameworks, team structures, and delivery
            cultures that let engineers do their best work, and I apply AI tools
            pragmatically to improve speed, decision quality, and delivery outcomes.
          </p>

          <div className="flex items-center gap-x-5 gap-y-2 flex-wrap">
            <a
              href="https://www.linkedin.com/in/andrew-lacroce/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}
              className="accent-link flex items-center gap-1.5"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href="https://github.com/andylacroce"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}
              className="accent-link flex items-center gap-1.5"
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href="mailto:andrew+work@andrewlacroce.com"
              style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}
              className="accent-link flex items-center gap-1.5 break-all"
            >
              <EmailIcon />
              andrew+work@andrewlacroce.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
