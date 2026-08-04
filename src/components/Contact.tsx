"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Script from "next/script";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const TURNSTILE_SITE_KEY = "0x4AAAAAAC1H38vsaMDp8so8";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykblepl";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formOpen, setFormOpen] = useState(false);
  const [meetingOpen, setMeetingOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const tryRenderWidget = useCallback(() => {
    if (process.env.NODE_ENV === "development") return;
    const ts = (window as unknown as { turnstile?: { render: (el: HTMLElement, opts: unknown) => string; execute: (id: string) => void } }).turnstile;
    if (ts && widgetRef.current && !widgetIdRef.current) {
      widgetIdRef.current = ts.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: "interaction-only",
        callback: (t: string) => { setToken(t); setCaptchaError(false); },
        "expired-callback": () => setToken(null),
        "error-callback": () => setToken(null),
      });
    }
  }, []);

  useEffect(() => {
    tryRenderWidget();
  }, [tryRenderWidget]);

  useEffect(() => {
    const openFormIfTargeted = () => {
      if (window.location.hash === "#contact-form") {
        setFormOpen(true);
        // After the accordion transition (~300 ms), scroll the card into view
        setTimeout(() => {
          document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 320);
      }
    };
    openFormIfTargeted(); // handle direct navigation / page-load with hash
    window.addEventListener("hashchange", openFormIfTargeted);
    return () => window.removeEventListener("hashchange", openFormIfTargeted);
  }, []);

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!token && process.env.NODE_ENV !== "development") {
      setCaptchaError(true);
      // Force the widget to surface so the user can complete it
      const ts = (window as unknown as { turnstile?: { execute: (id: string) => void } }).turnstile;
      if (ts && widgetIdRef.current) ts.execute(widgetIdRef.current);
      return;
    }
    setSubmitStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setName("");
        setEmail("");
        setMessage("");
        setToken(null);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <>
      {process.env.NODE_ENV !== "development" && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={tryRenderWidget}
        />
      )}
      <section id="contact" className="py-12 sm:py-16 border-t section-divider">
        <Reveal>
          <SectionHeader>Contact</SectionHeader>
        </Reveal>
        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.25rem" }}>
          <Reveal delay={70}>
            <a href="https://www.linkedin.com/in/andrew-lacroce/" target="_blank" rel="noopener noreferrer" className="contact-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--accent)", flexShrink: 0 }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="contact-row-label" style={{ fontSize: "0.925rem", color: "var(--text-secondary)" }}>
                LinkedIn
              </span>
              <ExternalLinkIcon />
            </a>
          </Reveal>
        </div>

        <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <Reveal delay={190}>
          <div id="contact-form" className="contact-form-card">
            <button
              className="contact-card-toggle"
              onClick={() => setFormOpen((o) => !o)}
              aria-expanded={formOpen}
            >
              <span className="contact-form-card-title" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <MailIcon />
                Send an email
              </span>
              <ChevronIcon open={formOpen} />
            </button>
            <div className={`contact-card-body${formOpen ? " open" : ""}`}>
              <div className="contact-card-body-inner">
                <div className="contact-card-body-content">
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-row">
                    <label htmlFor="contact-name" className="contact-form-label">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="contact-form-input"
                    />
                  </div>
                  <div className="contact-form-row">
                    <label htmlFor="contact-email" className="contact-form-label">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="contact-form-input"
                    />
                  </div>
                  <div className="contact-form-row">
                    <label htmlFor="contact-message" className="contact-form-label">Message</label>
                    <textarea
                      id="contact-message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="What's on your mind?"
                      rows={5}
                      className="contact-form-input contact-form-textarea"
                    />
                  </div>
                  <div className="contact-turnstile-wrapper">
                    <div ref={widgetRef} />
                  </div>
                  {captchaError && (
                    <p className="contact-form-error">Please complete the security check above before sending.</p>
                  )}
                  {submitStatus === "success" ? (
                    <p className="contact-form-success">Message sent — thanks, I&apos;ll be in touch.</p>
                  ) : (
                    <>
                      {submitStatus === "error" && (
                        <p className="contact-form-error">Something went wrong. Try emailing me directly.</p>
                      )}
                      <button
                        type="submit"
                        className="contact-form-submit"
                        disabled={submitStatus === "submitting"}
                      >
                        {submitStatus === "submitting" ? "Sending…" : "Send message"}
                      </button>
                    </>
                  )}
                </form>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={190}>
          <div className="contact-form-card">
            <button
              className="contact-card-toggle"
              onClick={() => setMeetingOpen((o) => !o)}
              aria-expanded={meetingOpen}
            >
              <span className="contact-form-card-title" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <CalendarIcon />
                Schedule a meeting
              </span>
              <ChevronIcon open={meetingOpen} />
            </button>
            <div className={`contact-card-body${meetingOpen ? " open" : ""}`}>
              <div className="contact-card-body-inner">
                <div className="contact-card-body-content">
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: "1.65" }}>
                    Prefer to connect live? Book time directly on my calendar. I&apos;m happy to discuss new opportunities, technical projects, or potential collaborations.
                  </p>
                  <a
                    href="https://cal.com/andrew-lacroce"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-form-submit"
                    style={{ textDecoration: "none", display: "inline-block" }}
                  >
                    Book a 30-minute intro call →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        </div>
      </section>
    </>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{
        color: "var(--accent)",
        flexShrink: 0,
        transform: open ? "rotate(90deg)" : "rotate(0deg)",
        transition: "transform 0.25s ease",
      }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="contact-row-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-secondary)", flexShrink: 0 }}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
