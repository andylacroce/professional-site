"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

export default function Hero() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  function closeLightbox() {
    setLightboxOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <section id="home" className="pt-6 sm:pt-10 pb-12 sm:pb-16">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-7 lg:gap-10">
        <Reveal delay={40} className="w-fit shrink-0">
          <button
            type="button"
            ref={triggerRef}
            onClick={() => setLightboxOpen(true)}
            aria-haspopup="dialog"
            aria-label="Expand profile photo"
            className="hero-photo-trigger w-fit shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="profile-pic.jpg"
              alt="Andrew Lacroce"
              width={220}
              height={220}
              className="hero-photo rounded-full w-36 h-36 sm:w-40 sm:h-40 lg:w-52 lg:h-52"
              loading="eager"
            />
          </button>
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

      {lightboxOpen ? (
        <div
          className="hero-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Andrew Lacroce"
          onClick={closeLightbox}
        >
          <div className="relative max-w-lg max-h-full" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              ref={closeButtonRef}
              onClick={closeLightbox}
              aria-label="Close"
              className="hero-lightbox-close absolute -top-3 -right-3 w-9 h-9 sm:w-10 sm:h-10"
            >
              <CloseIcon />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="profile-pic.jpg"
              alt="Andrew Lacroce"
              onClick={closeLightbox}
              className="hero-lightbox-image max-h-[85vh] w-auto rounded-2xl cursor-pointer"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
