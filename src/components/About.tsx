import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section id="about" className="py-16 border-t section-divider">
      <SectionHeader>About</SectionHeader>
      <div
        style={{
          color: "var(--text-secondary)",
          lineHeight: 1.75,
          fontSize: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1.25rem",
        }}
      >
        <p>
          I&apos;ve spent 20+ years at the intersection of engineering and delivery —
          leading programs and teams at Kyndryl, Flexe, Comcast, and Radial where
          the work was genuinely complex: AWS cloud migrations, platform rewrites
          under pressure, and distributed teams across time zones.
        </p>
        <p>
          My edge is building the systems around the work — PI planning frameworks,
          team structures, escalation protocols, delivery cadence — that give
          engineers clarity and give executives visibility without creating overhead.
          Whether the title is EM or TPM, I care most about the outcome: software
          that ships predictably and teams that don&apos;t burn out getting there.
        </p>
        <p>
          Lehigh University, B.A. Science, Technology &amp; Society with a minor in
          Computer Science. Since 2023 I&apos;ve pursued hands-on cloud and AI work
          through AWS tutorials, freeCodeCamp certifications, and building projects
          with modern LLM APIs.
        </p>
      </div>
    </section>
  );
}
