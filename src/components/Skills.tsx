import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const groups = [
  {
    label: "Program & Delivery Leadership",
    items: [
      "Large-scale program management",
      "PI planning & SAFe delivery",
      "Portfolio & roadmap management",
      "Risk & dependency management",
      "Operating cadence design",
    ],
  },
  {
    label: "Engineering Management",
    items: [
      "Engineering team leadership",
      "Hiring & performance management",
      "Technical debt strategy",
      "Incident management & SLA ownership",
      "Team health & operating model",
    ],
  },
  {
    label: "Technical Strategy & Platform",
    items: [
      "Cloud migration strategy",
      "CI/CD & DevOps",
      "Platform modernization",
      "Distributed systems & microservices",
      "Technical risk management",
    ],
  },
  {
    label: "Stakeholder & Executive Alignment",
    items: [
      "Executive communication",
      "Cross-org prioritization",
      "Capacity planning & cut-line framing",
      "Engineering-to-business translation",
      "Global distributed team leadership",
    ],
  },
  {
    label: "Applied AI & Automation",
    items: [
      "LLM integration & API workflows",
      "AI-augmented delivery & analysis",
      "Prompt engineering & output quality",
      "AI adoption strategy",
      "LLM feasibility evaluation",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 border-t section-divider">
      <Reveal>
        <SectionHeader>Skills</SectionHeader>
      </Reveal>
      <div className="mt-5" style={{ display: "flex", flexDirection: "column" }}>
        {groups.map((g, index) => (
          <Reveal key={g.label} delay={index * 45}>
            <div style={{ borderBottom: index < groups.length - 1 ? "1px solid color-mix(in srgb, var(--border) 50%, transparent)" : "none" }}>
              <div
                className="skill-row flex flex-col sm:flex-row sm:gap-8"
                style={{ padding: "1rem 0.75rem", margin: "0 -0.75rem", gap: "0.4rem" }}
              >
                <div className="shrink-0 sm:w-44" style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <span style={{ color: "var(--accent)", fontSize: "0.5em", flexShrink: 0, marginTop: "0.38rem", lineHeight: 1 }}>✦</span>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0, lineHeight: 1.45 }}>
                    {g.label}
                  </p>
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                  {g.items.map((item, i) => (
                    <span key={item}>
                      {i > 0 && <span style={{ color: "var(--accent)", opacity: 0.6, margin: "0 0.38em" }}>·</span>}
                      {item}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
