"use client";

import { useState, useEffect } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
      className="sticky top-0 z-50 transition-all duration-300"
    >
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <span style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "-0.02em" }}>
          AL
        </span>
        <ul className="flex gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}
                className="hover:text-white transition-colors"
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
