import React from "react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const projects = [
  {
    name: "Character Chatbot Generator",
    siteUrl: "https://character-chatbot-generator.vercel.app/",
    githubUrl: "https://github.com/andylacroce/character-chatbot-generator",
    githubSlug: "character-chatbot-generator",
    description:
      "Built to develop hands-on fluency with modern AI APIs, full-stack deployment, and agentic conversation design. Integrates the Claude API, Google Text-to-Speech, and AI image generation to support interactive voice and visual conversations with public-domain characters.",
    tags: ["Next.js", "Claude API", "Google TTS", "TypeScript", "Vercel"],
  },
  {
    name: "andrewlacroce.com",
    siteUrl: null,
    isSelf: true,
    githubUrl: "https://github.com/andylacroce/professional-site",
    githubSlug: "professional-site",
    description:
      "Built from scratch to practice modern frontend development and own the full deployment pipeline. No template, no CMS. Next.js 16, Tailwind CSS v4, TypeScript, deployed to Vercel with a custom domain via Cloudflare.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
  },
  {
    name: "Nukefire MUD Scripts",
    siteUrl: null,
    githubUrl: "https://github.com/andylacroce/nukefire",
    githubSlug: "nukefire",
    description: (
      <>
        Built for personal use to automate and enhance playing a text-based multiplayer RPG (
        <a href="https://nukefire.org" target="_blank" rel="noopener noreferrer" className="accent-link">nukefire.org</a>
        ) on Windows. TinTin++ scripts handle character session management, GMCP-driven automapping, class-specific combat hooks, and a multi-window Windows Terminal launcher for coordinating multi-character group play.
      </>
    ),
    tags: ["TinTin++", "PowerShell", "Windows Terminal", "MUD"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-12 sm:py-16 border-t section-divider">
      <Reveal>
        <SectionHeader>Projects</SectionHeader>
      </Reveal>
      <div className="mt-6 flex flex-col gap-5">
        {projects.map((p, index) => (
          <Reveal key={p.name} delay={index * 65}>
            <div className="project-card">
              {p.siteUrl ? (
                <a
                  href={p.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-title font-display accent-link inline-flex items-center gap-1.5 w-fit"
                >
                  {p.name}
                  <ExternalLinkIcon />
                </a>
              ) : p.isSelf ? (
                <span className="project-title font-display inline-flex items-center gap-1.5">
                  {p.name}
                  <YouAreHereIcon />
                  <span className="project-self-note">(You are here)</span>
                </span>
              ) : (
                <span className="project-title font-display">
                  {p.name}
                </span>
              )}
              <p className="project-description">
                {p.description}
              </p>
              <div className="project-tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-repo-link">
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accent-link flex items-center gap-1.5"
                >
                  <GitHubIcon />
                  {p.githubSlug}
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function YouAreHereIcon() {
  return (
    <svg className="shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="shrink-0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
