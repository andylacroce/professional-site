import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const groups = [
  {
    label: "Program & Delivery Management",
    items: [
      "Technical Program Management",
      "PI Planning & Portfolio Management",
      "Agile / Scrum / SAFe",
      "Risk & dependency management",
      "Roadmap execution",
    ],
  },
  {
    label: "Engineering Leadership",
    items: [
      "Engineering management & team development",
      "Agile transformation",
      "Cross-functional alignment",
      "Remote & distributed teams",
      "Hiring & performance management",
    ],
  },
  {
    label: "Cloud & Infrastructure",
    items: [
      "AWS",
      "GCP",
      "Cloud migration strategy",
      "CI/CD & DevOps",
      "Platform modernization",
    ],
  },
  {
    label: "Tools & Process",
    items: [
      "Jira / Confluence",
      "GitHub",
      "Incident management",
      "Stakeholder communication",
      "Technical debt reduction",
    ],
  },
  {
    label: "Applied AI",
    items: [
      "ChatGPT and Claude",
      "LLM API integration",
      "AI-assisted delivery workflows",
      "Prompt and output quality management",
      "Outcome-focused AI adoption",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 border-t section-divider">
      <Reveal>
        <SectionHeader>Skills</SectionHeader>
      </Reveal>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {groups.map((g, index) => (
          <Reveal key={g.label} delay={index * 45} className="skill-group">
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.7rem", letterSpacing: "0.02em" }}>
              {g.label}
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {g.items.map((item) => (
                <li key={item} style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
