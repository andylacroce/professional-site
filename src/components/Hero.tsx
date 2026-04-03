import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="home" className="pt-14 sm:pt-20 pb-12 sm:pb-16">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-7 lg:gap-10">
        <Reveal delay={40} className="w-fit shrink-0">
          <a href="profile-pic.jpg" target="_blank" rel="noopener noreferrer" className="w-fit shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="profile-pic.jpg"
              alt="Andrew Lacroce"
              width={220}
              height={220}
              className="rounded-full w-36 h-36 sm:w-40 sm:h-40 lg:w-52 lg:h-52"
              style={{ border: "2px solid var(--border)" }}
              loading="eager"
            />
          </a>
        </Reveal>

        <Reveal delay={120} className="max-w-2xl flex flex-col gap-4 sm:gap-5">
          <div>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 5vw, 2.75rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                color: "var(--text-primary)",
              }}
            >
              Andrew Lacroce
            </h1>
            <p
              style={{
                fontSize: "1.1875rem",
                color: "var(--accent-light)",
                marginTop: "0.375rem",
                fontWeight: 500,
              }}
            >
              Technical Program Manager{" "}<span style={{ color: "var(--accent)" }}>✦</span>{" "}Engineering Manager
            </p>
          </div>

          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              maxWidth: "62ch",
              lineHeight: 1.72,
            }}
          >
            20+ years driving delivery across engineering, product, and business
            teams. I build the planning frameworks, team structures, and delivery
            cultures that let engineers do their best work, and I apply AI tools
            pragmatically to improve speed, decision quality, and delivery outcomes.
          </p>

        </Reveal>
      </div>
    </section>
  );
}
