import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import careerData from "@/data/career.json";
import type { Career } from "@/lib/career";

const { profile } = careerData as Career;

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16 border-t section-divider">
      <Reveal>
        <SectionHeader>About</SectionHeader>
      </Reveal>
      <Reveal delay={70} className="about-body">
        {[...profile.summary, ...profile.siteOnlyAbout].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
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
