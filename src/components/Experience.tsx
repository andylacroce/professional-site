import type { CSSProperties } from "react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const experienceGroups = [
  {
    company: "Kyndryl (formerly Skytap)",
    logo: "logos/kyndryl.svg",
    homepage: "https://www.kyndryl.com/",
    positions: [
      {
        title: "Sr. Lead, Program Management",
        dates: "Apr 2024 – Jun 2025",
        bullets: [
          "Formalized PI planning across 12 teams by standardizing cross-team estimation and building shared capacity visibility; used Jira as the execution backbone and a purpose-built Google Sheets workbook as a flexible planning layer to prototype the process before migrating to permanent tooling.",
          "Established cut-line communication protocols and trade-off frameworks that gave executives meaningful visibility into capacity and dependencies, enabling informed prioritization and reducing unstructured top-down pressure on teams.",
          "Restructured the planning timeline by shifting preparation further left, enabling teams to enter each quarter with committed, well-defined work and improving delivery cadence predictability across the program.",
        ],
      },
    ],
  },
  {
    company: "Flexe",
    logo: "logos/flexe.png",
    homepage: "https://www.flexe.com/",
    logoFit: "cover" as const,
    logoPosition: "center 58%",
    positions: [
      {
        title: "Software Development Manager",
        dates: "Jan 2022 – Aug 2023",
        bullets: [
          "Directly managed two teams (Order Management and Item Master DevOps, ~6 engineers each) within a ~100-person engineering org; drove a replatforming effort from Ruby/Scala to Kotlin, reducing tech debt and improving platform scalability.",
          "Reduced tech debt-driven support burden from 80% to 20% of team capacity, enabling sustained focus on feature development.",
          "Inherited a team in chronic firefighting mode; stabilized operations within 3–6 months by providing air cover, enforcing severity-based SLAs, and transferring prioritization ownership back to the team.",
        ],
      },
    ],
  },
  {
    company: "Comcast",
    logo: "logos/comcast.svg",
    homepage: "https://corporate.comcast.com/",
    positions: [
      {
        title: "Software Development Manager",
        dates: "Dec 2019 – Nov 2021",
        bullets: [
          "Led a Scrum team within a 100+ microservice ecosystem and reduced customer-impacting errors by 50% in 3 months by tightening ownership, on-call practices, and incident review discipline.",
          "Expanded scope to lead 3 Scrum teams (~15–20 engineers) supporting Comcast's customer service messaging platform, reduced custom workflow implementation time from 3 months to 1 month, and mentored and hired talent across remote teams.",
        ],
      },
      {
        title: "Sr. Technical Program Manager",
        dates: "Jul 2016 – Nov 2019",
        bullets: [
          "Served as Scrum Master and program manager for the Comcast Messaging Platform (~10 DevOps engineers, 3–4 QA), responsible for all customer-facing SMS and email interactions across non-marketing channels.",
          "Led the phased AWS migration of the messaging platform; completed bulk traffic cutover in 6 months and full migration in 10–12 months, beating the original 12–18 month target.",
          "Integrated Comcast's AI assistant with the SMS platform, enabling customers to interact with automated troubleshooting workflows via interactive SMS dialog.",
        ],
      },
    ],
  },
  {
    company: "Radial (formerly GSI Commerce)",
    logo: "logos/radial.png",
    homepage: "https://www.radial.com/",
    logoFit: "cover" as const,
    positions: [
      {
        title: "Lead Technical Project Manager",
        dates: "Jan 2011 – Jun 2016",
        bullets: [
          "Led implementation and ongoing management of large-scale e-commerce platforms for Toys R Us (primary account), Sports Authority, and Dick's Sporting Goods, with sites handling millions of users with strict uptime SLAs during peak retail seasons.",
          "Managed cross-functional teams across engineering, operations, and business to deliver complex platform implementations and integrations on schedule and within scope.",
        ],
      },
    ],
  },
  {
    company: "LRN",
    logo: "logos/lrn.svg",
    homepage: "https://www.lrn.com/",
    positions: [
      {
        title: "Technical Project Manager",
        dates: "Jan 2006 – Jan 2011",
        description: "Technical Project Manager supporting e-learning SaaS platform delivery for Fortune 500 clients.",
        bullets: [],
      },
    ],
  },
  {
    company: "Aon",
    logo: "logos/aon.svg",
    homepage: "https://www.aon.com/",
    positions: [
      {
        title: "Business Systems Engineer",
        dates: "Sep 2004 – Sep 2005",
        description: "Business Systems Engineer supporting internal tooling and workflow automation in a global insurance environment.",
        bullets: [],
      },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-12 sm:py-16 border-t section-divider">
      <Reveal>
        <SectionHeader>Experience</SectionHeader>
      </Reveal>
      <div className="experience-list">
        {experienceGroups.map((group, index) => (
          <Reveal key={group.company} delay={index * 55}>
            <div className="experience-item flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="w-[88px] sm:w-[96px] shrink-0 flex flex-col items-center pt-[0.15rem]">
                <a
                  href={group.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${group.company} homepage`}
                  className="experience-logo-frame"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={group.logo}
                    alt={group.company}
                    width={80}
                    height={32}
                    loading="lazy"
                    className="experience-logo"
                    style={{
                      "--logo-object-fit": group.logoFit ?? "contain",
                      "--logo-object-position": group.logoPosition ?? "center",
                    } as CSSProperties}
                  />
                </a>
              </div>

              <div className="flex-1">
                <div className="experience-company">
                  {group.company}
                </div>

                <div className="experience-positions">
                  {group.positions.map((position) => (
                    <div key={`${group.company}-${position.title}`} className="experience-position">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                        <div className="flex flex-col gap-1">
                          <span className="experience-title font-display">
                            {position.title}
                          </span>
                        </div>
                        <span className="experience-dates sm:whitespace-nowrap">
                          {position.dates}
                        </span>
                      </div>
                      {"description" in position && position.description && (
                        <p className="experience-description">
                          {position.description}
                        </p>
                      )}
                      {position.bullets.length > 0 && (
                        <ul className="experience-bullets">
                          {position.bullets.map((bullet, bulletIndex) => (
                            <li key={bulletIndex} className="experience-bullet">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
