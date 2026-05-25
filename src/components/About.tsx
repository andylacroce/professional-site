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
          and delivering complex technical programs at scale. My background spans
          Engineering Manager and Technical Program Manager roles, giving me
          technical credibility, delivery discipline, and the ability to align
          engineering, product, and leadership around clear priorities. I
          specialize in translating business goals into executable roadmaps,
          managing multi-team programs in remote and distributed environments, and
          creating the operating rhythms that keep teams focused and accountable.
        </p>
        <p>
          I lead through clarity, not authority, and do my best work in
          high-expectation environments where the problems are hard and the stakes
          are real. My focus is consistent across roles: reduce technical debt,
          break down silos, strengthen collaboration, and create the conditions for
          engineers to do their best work while delivering outcomes the business
          can trust.
        </p>
        <p>
          After a long stretch of progressively demanding roles, I took an
          intentional break. I used the time to keep building: several personal
          software projects in modern stacks with full CI pipelines, and
          deliberate practice with AI tools including ChatGPT, GitHub Copilot, and
          Claude as a way to deepen my understanding of current development
          practices rather than just move faster. I also made music a serious
          pursuit, cleared a long backlog of books, and spent meaningful time with
          family and friends.
        </p>
      </Reveal>
    </section>
  );
}
