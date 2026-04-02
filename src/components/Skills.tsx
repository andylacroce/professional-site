import SectionHeader from "./SectionHeader";

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
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 border-t section-divider">
      <SectionHeader>Skills</SectionHeader>
      <div
        style={{
          marginTop: "1.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {groups.map((g) => (
          <div key={g.label}>
            <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.6rem", letterSpacing: "0.02em" }}>
              {g.label}
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
              {g.items.map((item) => (
                <li key={item} style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
