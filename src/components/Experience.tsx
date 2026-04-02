import Image from "next/image";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const roles = [
  {
    company: "Kyndryl (formerly Skytap)",
    logo: "/logos/kyndryl.svg",
    title: "Sr. Lead, Program Management",
    dates: "Apr 2024 – Jun 2025",
    bullets: [
      "Formalized PI planning across 12 teams by standardizing cross-team estimation and building shared capacity visibility; used Jira as the execution backbone and a purpose-built Google Sheets workbook as a flexible planning layer to prototype the process before migrating to permanent tooling.",
      "Established cut-line communication protocols and trade-off frameworks that gave executives meaningful visibility into capacity and dependencies, enabling informed prioritization and reducing unstructured top-down pressure on teams.",
      "Restructured the planning timeline by shifting preparation further left, enabling teams to enter each quarter with committed, well-defined work and improving delivery cadence predictability across the program.",
    ],
  },
  {
    company: "Flexe",
    logo: "/logos/flexe.png",
    title: "Software Development Manager",
    dates: "Jan 2022 – Aug 2023",
    bullets: [
      "Directly managed two teams (Order Management and Item Master DevOps, ~6 engineers each) within a ~100-person engineering org; drove a replatforming effort from Ruby/Scala to Kotlin, reducing tech debt and improving platform scalability.",
      "Reduced tech debt-driven support burden from 80% to 20% of team capacity, enabling sustained focus on feature development.",
      "Inherited a team in chronic firefighting mode; stabilized operations within 3–6 months by providing air cover, enforcing severity-based SLAs, and transferring prioritization ownership back to the team.",
    ],
  },
  {
    company: "Comcast",
    logo: "/logos/comcast.svg",
    title: "Software Development Manager",
    dates: "Dec 2019 – Nov 2021",
    bullets: [
      "Reduced customer-impacting errors by 50% in 3 months across a 100+ microservice platform by establishing clearer team ownership, on-call practices, and structured incident review processes.",
      "Expanded to lead 3 Scrum teams (~15–20 engineers) on Comcast's SMS customer service platform, processing millions of messages daily; reduced custom workflow implementation time from 3 months to 1 month.",
      "Mentored an embedded junior TPM/Scrum Master; hired and onboarded engineering talent across multiple teams in a fully remote environment.",
    ],
  },
  {
    company: "Comcast",
    logo: "/logos/comcast.svg",
    title: "Sr. Technical Program Manager",
    dates: "Jul 2016 – Nov 2019",
    bullets: [
      "Served as Scrum Master and program manager for the Comcast Messaging Platform (~10 DevOps engineers, 3–4 QA), responsible for all customer-facing SMS and email interactions across non-marketing channels.",
      "Led the phased AWS migration of the messaging platform — completed bulk traffic cutover in 6 months and full migration in 10–12 months, beating the original 12–18 month target.",
      "Integrated Comcast's AI assistant with the SMS platform, enabling customers to interact with automated troubleshooting workflows via interactive SMS dialog.",
    ],
  },
  {
    company: "Radial (formerly GSI Commerce)",
    logo: "/logos/radial.png",
    logoFit: "cover" as const,
    title: "Lead Technical Project Manager",
    dates: "Jan 2011 – Jun 2016",
    bullets: [
      "Led implementation and ongoing management of large-scale e-commerce platforms for Toys R Us (primary account), Sports Authority, and Dick's Sporting Goods — sites handling millions of users with strict uptime SLAs during peak retail seasons.",
      "Managed cross-functional teams across engineering, operations, and business to deliver complex platform implementations and integrations on schedule and within scope.",
    ],
  },
  {
    company: "LRN",
    logo: "/logos/lrn.svg",
    title: "Technical Project Manager",
    dates: "Jan 2006 – Jan 2011",
    bullets: [],
  },
  {
    company: "Aon",
    logo: "/logos/aon.svg",
    title: "Business Systems Engineer",
    dates: "Sep 2004 – Sep 2005",
    bullets: [],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-12 sm:py-16 border-t section-divider">
      <Reveal>
        <SectionHeader>Experience</SectionHeader>
      </Reveal>
      <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        {roles.map((role, index) => (
          <Reveal key={`${role.company}-${role.title}`} delay={index * 55}>
            <div className="experience-item flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Logo / dot */}
            <div className="w-[88px] sm:w-[96px]" style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "0.15rem" }}>
              <div
                style={{
                  width: "100%",
                  height: "44px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  background: "#ffffff",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px 8px",
                }}
              >
                <Image
                  src={role.logo}
                  alt={role.company}
                  width={80}
                  height={32}
                  style={{ objectFit: role.logoFit ?? "contain", width: "100%", height: "100%" }}
                />
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1.5">
                <div>
                  <span className="font-display" style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "1rem", lineHeight: 1.2 }}>
                    {role.title}
                  </span>
                  <span className="block sm:inline sm:ml-2" style={{ color: "var(--text-secondary)", fontSize: "0.875rem", letterSpacing: "0.01em" }}>
                    @ {role.company}
                  </span>
                </div>
                <span className="sm:whitespace-nowrap" style={{ fontSize: "0.75rem", color: "var(--accent-light)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {role.dates}
                </span>
              </div>
              {role.bullets.length > 0 && (
                <ul style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {role.bullets.map((b, i) => (
                    <li
                      key={i}
                      style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, paddingLeft: "0.75rem", position: "relative" }}
                    >
                      <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>·</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
