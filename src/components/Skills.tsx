import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import careerData from "@/data/career.json";
import type { Career } from "@/lib/career";

const groups = (careerData as Career).skills;

export default function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-16 border-t section-divider">
      <Reveal>
        <SectionHeader>Skills</SectionHeader>
      </Reveal>
      <div className="skills-list">
        {groups.map((g, index) => (
          <Reveal key={g.label} delay={index * 45}>
            <div className="skill-group">
              <div className="skill-row flex flex-col sm:flex-row sm:gap-8">
                <div className="skill-label-wrap shrink-0 sm:w-44">
                  <span className="skill-bullet">✦</span>
                  <p className="skill-label">
                    {g.label}
                  </p>
                </div>
                <p className="skill-items">
                  {g.items.map((item, i) => (
                    <span key={item}>
                      {i > 0 && <span className="skill-items-separator">·</span>}
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
