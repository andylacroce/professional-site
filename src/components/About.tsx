import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 border-t section-divider">
      <Reveal>
        <SectionHeader>About</SectionHeader>
      </Reveal>
      <Reveal
        delay={70}
        style={{
          color: "var(--text-secondary)",
          lineHeight: 1.82,
          fontSize: "1.0625rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1.25rem",
        }}
      >
        <p>
          I&apos;m a software engineering and delivery leader with 20+ years of
          experience building high-performing teams, driving Agile transformation,
          and delivering complex technical programs at scale. I work at the
          intersection of engineering execution and business outcomes, whether the
          priority is stabilizing a struggling team, standing up a planning
          framework across a large organization, or leading a cloud migration
          without slowing critical delivery.
        </p>
        <p>
          My background spans both Engineering Manager and Technical Program
          Manager roles, so I bring technical credibility, delivery discipline,
          and the ability to align engineering, product, and leadership around
          clear priorities. I specialize in translating business goals into
          executable roadmaps, managing multi-team programs in remote and
          distributed environments, and creating the operating rhythms that keep
          teams moving with focus and accountability.
        </p>
        <p>
          I lead through clarity, not authority, and do my best work in
          high-expectation environments where the problems are hard and the stakes
          are real. My focus is consistent across roles: reduce technical debt,
          break down silos, strengthen collaboration, and create the conditions for
          engineers to do their best work while delivering outcomes the business
          can trust. I also use modern AI capabilities, including ChatGPT and
          Claude with API integrations, as practical tools to accelerate analysis,
          improve communication, and support better execution.
        </p>
      </Reveal>
    </section>
  );
}
