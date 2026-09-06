import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="home" className="pt-6 sm:pt-10 pb-12 sm:pb-16">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-7 lg:gap-10">
        <Reveal delay={40} className="w-fit shrink-0">
          <a href="profile-pic.jpg" target="_blank" rel="noopener noreferrer" className="w-fit shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="profile-pic.jpg"
              alt="Andrew Lacroce"
              width={220}
              height={220}
              className="hero-photo rounded-full w-36 h-36 sm:w-40 sm:h-40 lg:w-52 lg:h-52"
              loading="eager"
            />
          </a>
        </Reveal>

        <Reveal delay={120} className="max-w-2xl flex flex-col gap-4 sm:gap-5">
          <div>
            <h1 className="hero-name font-display">
              Andrew Lacroce
            </h1>
            <p className="hero-role">
              Technical Program Manager{" "}<span className="hero-role-accent">✦</span>{" "}Engineering Manager
            </p>
          </div>

          <p className="hero-summary">
            I build the planning frameworks, team structures, and delivery
            cultures that let engineers do their best work, and I apply AI tools
            pragmatically to improve speed, decision quality, and delivery
            outcomes.
          </p>

        </Reveal>
      </div>
    </section>
  );
}
