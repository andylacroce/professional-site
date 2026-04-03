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
              className="rounded-full w-36 h-36 sm:w-40 sm:h-40 lg:w-52 lg:h-52"
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
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--text-primary)",
              }}
            >
              Andrew Lacroce
            </h1>
            <p
              style={{
                fontSize: "1.1875rem",
                color: "var(--accent-light)",
                marginTop: "0.375rem",
                fontWeight: 500,
              }}
            >
              Technical Program Manager{" "}<span style={{ color: "var(--accent)" }}>✦</span>{" "}Engineering Manager
            </p>
          </div>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              maxWidth: "62ch",
              lineHeight: 1.72,
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
              style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
              className="accent-link flex items-center gap-1.5"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href="mailto:andrew+work@andrewlacroce.com"
              style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}
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


function EmailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
