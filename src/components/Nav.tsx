"use client";

import { useState, useEffect, useRef } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const lastHref = links[links.length - 1]?.href ?? "";
  const manualSelectionUntilRef = useRef(0);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => Boolean(section));

    const handler = () => {
      setScrolled(window.scrollY > 40);

      if (sections.length === 0) {
        return;
      }

      if (Date.now() < manualSelectionUntilRef.current) {
        return;
      }

      const pageBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const isAtBottom = pageBottom >= docHeight - 2;

      if (isAtBottom && lastHref) {
        setActiveHref((previousHref) =>
          previousHref === lastHref ? previousHref : lastHref,
        );
        return;
      }

      const viewportAnchor = window.innerHeight * 0.32;
      let currentHref = "";

      for (let index = 0; index < sections.length; index += 1) {
        const section = sections[index];
        const rect = section.getBoundingClientRect();
        const nextSection = sections[index + 1];
        const nextTop = nextSection ? nextSection.getBoundingClientRect().top : Number.POSITIVE_INFINITY;

        if (rect.top <= viewportAnchor && viewportAnchor < nextTop) {
          currentHref = `#${section.id}`;
          break;
        }

        if (rect.top <= viewportAnchor) {
          currentHref = `#${section.id}`;
        }
      }

      setActiveHref((previousHref) =>
        previousHref === currentHref ? previousHref : currentHref,
      );
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [lastHref]);

  return (
    <nav
      style={{
        borderBottom: "1px solid var(--border)",
        background: scrolled ? "rgba(10, 17, 18, 0.9)" : "rgba(10, 17, 18, 0.97)",
        backdropFilter: "blur(12px)",
      }}
      className="sticky top-0 z-50 transition-all duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2 sm:py-0 sm:h-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="#home"
            onClick={() => setActiveHref("")}
            className="font-display text-xl sm:text-xl md:text-2xl leading-none"
            style={{ color: "var(--accent)", letterSpacing: "0.01em" }}
          >
            Andrew Lacroce
          </a>
          <a
            href="https://www.linkedin.com/in/andrew-lacroce/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Andrew Lacroce on LinkedIn"
            className="accent-link inline-flex items-center justify-center rounded-full border"
            style={{
              width: "1.9rem",
              height: "1.9rem",
              borderColor: "color-mix(in srgb, var(--accent) 34%, var(--border))",
              color: "var(--accent-light)",
              background: "color-mix(in srgb, var(--accent-soft) 72%, transparent)",
              flexShrink: 0,
            }}
          >
            <LinkedInIcon />
          </a>
        </div>
        <ul className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap gap-x-3 gap-y-1 sm:gap-2 md:gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => {
                  setActiveHref(l.href);
                  manualSelectionUntilRef.current = Date.now() + 1200;
                }}
                aria-current={activeHref === l.href ? "page" : undefined}
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1rem",
                  background: activeHref === l.href ? "var(--accent-soft)" : "transparent",
                  borderColor: activeHref === l.href ? "color-mix(in srgb, var(--accent) 30%, transparent)" : "transparent",
                }}
                className="accent-link nav-pill-link inline-flex min-h-8 items-center whitespace-nowrap rounded-full border px-2.5 sm:min-h-0 sm:px-2.5 sm:py-0.5 sm:text-base"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
