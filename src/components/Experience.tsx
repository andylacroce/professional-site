import type { CSSProperties } from "react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import careerData from "@/data/career.json";
import { formatRange, type Career } from "@/lib/career";

const career = careerData as Career;

export default function Experience() {
  return (
    <section id="experience" className="py-12 sm:py-16 border-t section-divider">
      <Reveal>
        <SectionHeader>Experience</SectionHeader>
      </Reveal>
      <div className="experience-list">
        {career.companies.map((group, index) => (
          <Reveal key={group.name} delay={index * 55}>
            <div className="experience-item flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="w-[88px] sm:w-[96px] shrink-0 flex flex-col items-center pt-[0.15rem]">
                <a
                  href={group.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${group.name} homepage`}
                  className="experience-logo-frame"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={group.logo}
                    alt={group.name}
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
                  {group.name}
                </div>

                <div className="experience-positions">
                  {group.positions.map((position) => (
                    <div key={`${group.name}-${position.title}`} className="experience-position">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1.5">
                        <div className="flex flex-col gap-1">
                          <span className="experience-title font-display">
                            {position.title}
                          </span>
                        </div>
                        <span className="experience-dates sm:whitespace-nowrap">
                          {formatRange(position)}
                        </span>
                      </div>
                      {position.description && (
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
