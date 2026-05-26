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
          both Engineering Manager and Technical Program Manager roles, giving me
          technical credibility, delivery discipline, and the ability to align
          engineering, product, and leadership around clear priorities.
        </p>
        <p>
          I lead through clarity, not authority. I specialize in translating
          business goals into executable roadmaps, managing multi-team programs in
          remote and distributed environments, and creating the operating rhythms
          that keep teams focused and accountable. I do my best work in
          high-expectation environments where the problems are hard and the stakes
          are real.
        </p>
        <p>
          After a stretch of progressively demanding roles, I took an intentional
          break: I built personal software projects in modern stacks, developed
          hands-on fluency with AI tools including ChatGPT, GitHub Copilot, and
          Claude, made music a serious pursuit, and spent meaningful time with
          family.
        </p>
      </Reveal>
      <Reveal delay={130}>
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem 1.25rem",
            borderRadius: "0.5rem",
            border: "1px solid var(--accent)",
            background: "color-mix(in srgb, var(--accent) 8%, transparent)",
            color: "var(--text-primary)",
            fontSize: "1.0625rem",
            lineHeight: 1.72,
          }}
        >
          I&apos;m actively looking for Engineering Manager and Technical Program
          Manager roles. If you have something that fits, I&apos;d like to hear
          about it.
        </div>
      </Reveal>
    </section>
  );
}
