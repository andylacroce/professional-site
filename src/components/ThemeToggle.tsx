"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");

    function syncFromSystem() {
      const stored = window.localStorage.getItem("theme");
      setTheme(stored === "light" || stored === "dark" ? stored : media.matches ? "light" : "dark");
    }

    // Runs once for the initial value, then again only if the OS theme
    // changes while no explicit choice is stored (an explicit choice from
    // ThemeToggle itself is applied straight to the DOM in the effect
    // below, without needing a re-sync here).
    syncFromSystem();
    media.addEventListener("change", syncFromSystem);
    return () => media.removeEventListener("change", syncFromSystem);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  function toggle() {
    setTheme((current) => {
      const next: Theme = current === "light" ? "dark" : "light";
      window.localStorage.setItem("theme", next);
      return next;
    });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={theme ? `Switch to ${theme === "light" ? "dark" : "light"} mode` : "Toggle color theme"}
      aria-pressed={theme === "light"}
    >
      <SunIcon className="theme-toggle-icon theme-toggle-icon-sun" />
      <MoonIcon className="theme-toggle-icon theme-toggle-icon-moon" />
    </button>
  );
}

function SunIcon({ className }: { className: string }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className: string }) {
  return (
    <svg className={className} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
