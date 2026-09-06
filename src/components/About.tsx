import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 border-t section-divider">
      <Reveal>
        <SectionHeader>About</SectionHeader>
      </Reveal>
      <Reveal delay={70} className="about-body">
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
        <div className="about-callout">
          I&apos;m actively looking for Engineering Manager and Technical Program
          Manager roles. If you have something that fits,{" "}
          <a href="#contact-form" className="about-callout-link">
            I&apos;d like to hear about it.
          </a>
        </div>
      </Reveal>
    </section>
  );
}
