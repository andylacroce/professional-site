export type Theme = "light" | "dark";

// Single source of truth for the theme-color meta values, shared by
// ThemeToggle.tsx (post-hydration) and layout.tsx's inline pre-hydration
// script (via THEME_INIT_SCRIPT), so the two can no longer drift.
export const THEME_COLORS: Record<Theme, string> = {
  light: "#f6f3ee",
  dark: "#0a1112",
};
