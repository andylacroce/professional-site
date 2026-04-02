"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState(links[0].href);

  useEffect(() => {
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((section): section is HTMLElement => Boolean(section));

    const handler = () => {
      setScrolled(window.scrollY > 40);

      if (sections.length === 0) {
        return;
      }
      const viewportAnchor = window.innerHeight * 0.32;
      let currentHref = `#${sections[0].id}`;

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
  }, []);

  return (
    <nav
      style={{
        borderBottom: "1px solid var(--border)",
        background: scrolled ? "rgba(10, 17, 18, 0.9)" : "rgba(10, 17, 18, 0.97)",
        backdropFilter: "blur(12px)",
      }}
      className="sticky top-0 z-50 transition-all duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2 sm:py-0 sm:h-14 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <span
          className="font-display text-base sm:text-base md:text-lg leading-none"
          style={{ color: "var(--accent)", letterSpacing: "0.01em" }}
        >
          Andrew Lacroce
        </span>
        <ul className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap gap-x-3 gap-y-1 sm:gap-3 md:gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setActiveHref(l.href)}
                aria-current={activeHref === l.href ? "page" : undefined}
                style={{
                  color: activeHref === l.href ? "var(--text-primary)" : "var(--text-secondary)",
                  fontSize: "0.9375rem",
                  background: activeHref === l.href ? "var(--accent-soft)" : "transparent",
                  borderColor: activeHref === l.href ? "color-mix(in srgb, var(--accent) 30%, transparent)" : "transparent",
                }}
                className="accent-link inline-flex min-h-8 items-center whitespace-nowrap rounded-full border px-2.5 sm:min-h-0 sm:px-3 sm:py-1 sm:text-sm"
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
