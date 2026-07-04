"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ANIMATION_EASE, SOCIAL_LINKS } from "@/lib/constants";

/**
 * Resume Page — Structured web resume
 *
 * Architecture:
 * - Client component — scroll animations require browser APIs
 * - Web-first resume: HTML renders on every device perfectly
 * - PDF available for download — links to /public/resume.pdf
 * - Print stylesheet consideration: page is print-friendly by design
 *
 * Why a web resume over PDF embed:
 * - PDF iframes fail silently on iOS Safari
 * - HTML is indexed by Google — PDF content is not always crawled
 * - Web resume matches the portfolio design system — PDF does not
 * - Lighthouse score is unaffected — iframe embeds hurt performance
 *
 * Structure:
 * 1. Header — name, title, contact, download CTA
 * 2. Summary — professional positioning statement
 * 3. Education — degree, institution, level
 * 4. Projects — live products and active development
 * 5. Skills — organised by domain, honest levels
 * 6. Certifications — verified credentials only
 * 7. Volunteer — community engagement
 */

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUpVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ANIMATION_EASE.engineering, delay },
  }),
};

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function ResumeSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUpVariants}
      custom={0}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Resume Section Label ─────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="technical-label text-[var(--color-accent)]">
        {children}
      </span>
      <div
        className="flex-1 h-px bg-[var(--color-border)]"
        aria-hidden="true"
      />
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function ResumePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="flex flex-col">

      {/* ── Page Header ───────────────────────────────────────────────── */}
      <section
        aria-label="Resume header"
        className={cn(
          "relative border-b border-[var(--color-border)]",
          "engineering-grid overflow-hidden"
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[var(--color-background)]"
        />

        <div className="site-container relative z-10 py-20 lg:py-28">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: ANIMATION_EASE.engineering }}
            className="flex flex-col gap-8"
          >
            {/* Section index */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.625rem] text-[var(--color-accent)] tracking-widest">
                03
              </span>
              <div className="w-4 h-px bg-[var(--color-accent)]" aria-hidden="true" />
              <span className="technical-label">Resume</span>
            </div>

            {/* Name + Download row */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-[var(--color-foreground)]">
                  Chukwuemeka<br />Chidera Hillary
                </h1>
                <p className="font-mono text-sm text-[var(--color-accent)] tracking-wide">
                  Civil Engineer & Software Developer
                </p>
              </div>

              {/* Download CTA */}
              <a
                href="/resume.pdf"
                download="Chukwuemeka_Hillary_Resume.pdf"
                className={cn(
                  "group flex items-center gap-2 px-5 py-3 w-fit",
                  "border border-[var(--color-accent)]",
                  "text-[var(--color-accent)]",
                  "font-mono text-xs tracking-widest uppercase",
                  "transition-all duration-300",
                  "hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-foreground)]"
                )}
              >
                <Download size={12} aria-hidden="true" />
                Download PDF
              </a>
            </div>

            {/* Contact strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { label: "Email", value: "chiderahillary80@gmail.com", href: "mailto:chiderahillary80@gmail.com" },
                { label: "LinkedIn", value: "chiderahillary", href: SOCIAL_LINKS.linkedin },
                { label: "GitHub", value: "SwissHilson", href: SOCIAL_LINKS.github },
                { label: "Location", value: "Nsukka, Nigeria", href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="technical-label">{item.label}</span>
                  <span className="technical-label opacity-30">—</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cn(
                        "font-mono text-[0.625rem] tracking-wide",
                        "text-[var(--color-muted)]",
                        "hover:text-[var(--color-accent)]",
                        "transition-colors duration-200",
                        "flex items-center gap-1"
                      )}
                    >
                      {item.value}
                      {item.href.startsWith("http") && (
                        <ExternalLink size={9} aria-hidden="true" />
                      )}
                    </a>
                  ) : (
                    <span className="font-mono text-[0.625rem] tracking-wide text-[var(--color-muted)]">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Resume Body ───────────────────────────────────────────────── */}
      <div className="site-container py-16 lg:py-20">
        <div className="max-w-3xl flex flex-col gap-16">

          {/* ── Professional Summary ───────────────────────────────────── */}
          <ResumeSection>
            <SectionLabel>Professional Summary</SectionLabel>
            <p className="text-base text-[var(--color-muted)] leading-relaxed">
              Civil Engineering undergraduate at the University of Nigeria,
              Nsukka (400 Level), combining structural design, CAD/BIM, and
              backend software development to solve infrastructure challenges
              across Africa. Co-developed a live TypeScript/Supabase platform
              serving university students. Currently building an AI-powered
              engineering tool with Django REST Framework and the Gemini API.
              Co-founder of HilEco Bricks — an early-stage sustainable
              construction materials initiative. Seeking SIWES/Industrial
              Training placement to apply cross-disciplinary engineering
              skills in a real-world environment.
            </p>
          </ResumeSection>

          {/* ── Education ─────────────────────────────────────────────── */}
          <ResumeSection>
            <SectionLabel>Education</SectionLabel>
            <div className={cn(
              "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3",
              "p-6 border border-[var(--color-border)] bg-[var(--color-surface)]"
            )}>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-medium text-[var(--color-foreground)] tracking-tight">
                  B.Eng. Civil Engineering
                </h3>
                <p className="font-mono text-xs text-[var(--color-muted)]">
                  University of Nigeria, Nsukka (UNN)
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn(
                    "font-mono text-[0.625rem] px-2 py-0.5",
                    "border border-[var(--color-accent)]/30",
                    "text-[var(--color-accent)]",
                    "bg-[var(--color-accent)]/5"
                  )}>
                    400 Level — 4 of 5 Years
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1">
                <span className="technical-label">2022 — 2027</span>
                <span className="technical-label">Expected Graduation</span>
              </div>
            </div>
          </ResumeSection>

          {/* ── Projects ──────────────────────────────────────────────── */}
          <ResumeSection>
            <SectionLabel>Projects & Ventures</SectionLabel>
            <div className="flex flex-col gap-px bg-[var(--color-border)]">

              {/* EventConnect */}
              <div className="flex flex-col gap-3 p-6 bg-[var(--color-background)] hover:bg-[var(--color-surface)] transition-colors duration-200">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-medium text-[var(--color-foreground)] tracking-tight">
                        EventConnect
                      </h3>
                      <span className={cn(
                        "flex items-center gap-1 font-mono text-[0.625rem] px-2 py-0.5",
                        "border border-emerald-400/30 text-emerald-400 bg-emerald-400/5"
                      )}>
                        <span className="w-1 h-1 rounded-full bg-emerald-400 animate-[load-pulse_2s_ease-in-out_infinite]" aria-hidden="true" />
                        Live
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[var(--color-accent)]">
                      Co-Developer — with Nwankwo Hillary
                    </p>
                  </div>
                  <a
                    href="https://eventconnecthub.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-mono text-[0.625rem] text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-200 w-fit"
                  >
                    eventconnecthub.com
                    <ExternalLink size={9} aria-hidden="true" />
                  </a>
                </div>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  University event discovery platform solving the communication
                  gap between student organisers and their audience at UNN.
                  Built with TypeScript and Supabase.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["TypeScript", "Supabase", "PostgreSQL", "Web App"].map((tag) => (
                    <span key={tag} className="font-mono text-[0.625rem] px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-muted-foreground)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI CGPA Calculator */}
              <div className="flex flex-col gap-3 p-6 bg-[var(--color-background)] hover:bg-[var(--color-surface)] transition-colors duration-200">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-[var(--color-foreground)] tracking-tight">
                      AI-Powered CGPA Calculator
                    </h3>
                    <span className={cn(
                      "flex items-center gap-1 font-mono text-[0.625rem] px-2 py-0.5",
                      "border border-[var(--color-accent)]/30 text-[var(--color-accent)] bg-[var(--color-accent)]/5"
                    )}>
                      <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] animate-[load-pulse_2s_ease-in-out_infinite]" aria-hidden="true" />
                      In Progress
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[var(--color-accent)]">
                    Solo Developer
                  </p>
                </div>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  Engineering tool for university students combining CGPA
                  calculation with an AI academic mentor. Built with Django
                  REST Framework and the Gemini API.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Django REST Framework", "Gemini API", "Python", "AI"].map((tag) => (
                    <span key={tag} className="font-mono text-[0.625rem] px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-muted-foreground)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* HilEco Bricks */}
              <div className="flex flex-col gap-3 p-6 bg-[var(--color-background)] hover:bg-[var(--color-surface)] transition-colors duration-200">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-medium text-[var(--color-foreground)] tracking-tight">
                    HilEco Bricks
                  </h3>
                  <p className="font-mono text-xs text-[var(--color-accent)]">
                    Co-Founder — Early-Stage R&D
                  </p>
                </div>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  Sustainable construction materials initiative developing
                  eco-friendly brick alternatives for African markets.
                  Focused on environmental responsibility and structural
                  performance for low-rise residential construction.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Sustainable Construction", "Entrepreneurship", "R&D", "Africa"].map((tag) => (
                    <span key={tag} className="font-mono text-[0.625rem] px-2 py-0.5 border border-[var(--color-border)] text-[var(--color-muted-foreground)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </ResumeSection>

          {/* ── Skills ────────────────────────────────────────────────── */}
          <ResumeSection>
            <SectionLabel>Technical Skills</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-border)]">
              {[
                {
                  domain: "Civil Engineering",
                  code: "CE",
                  skills: [
                    "Structural Analysis & Design",
                    "Reinforced Concrete Design",
                    "Hydraulics & Fluid Mechanics",
                    "Transportation Engineering",
                    "Engineering Drawing",
                    "Surveying",
                  ],
                },
                {
                  domain: "CAD & BIM",
                  code: "BIM",
                  skills: [
                    "AutoCAD — Proficient",
                    "Archicad — Proficient",
                    "Technical Drawing Production",
                    "2D Drafting & Annotation",
                  ],
                },
                {
                  domain: "Software Development",
                  code: "SWE",
                  skills: [
                    "Python — Proficient",
                    "Django & Django REST Framework",
                    "TypeScript — Learning",
                    "Supabase & PostgreSQL",
                    "REST API Design",
                    "Git & GitHub",
                  ],
                },
                {
                  domain: "Tools & Productivity",
                  code: "TLS",
                  skills: [
                    "Microsoft Excel",
                    "Microsoft Word",
                    "Technical Report Writing",
                    "Gemini API Integration",
                  ],
                },
              ].map((group) => (
                <div
                  key={group.domain}
                  className="flex flex-col gap-3 p-6 bg-[var(--color-background)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.625rem] text-[var(--color-accent)] tracking-widest">
                      {group.code}
                    </span>
                    <span className="technical-label">{group.domain}</span>
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2 text-xs text-[var(--color-muted)]"
                      >
                        <span
                          className="w-1 h-1 flex-shrink-0 bg-[var(--color-border)]"
                          aria-hidden="true"
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* ── Engineering Projects ───────────────────────────────────── */}
          <ResumeSection>
            <SectionLabel>Academic Engineering</SectionLabel>
            <div className="flex flex-col gap-3 p-6 border border-[var(--color-border)] bg-[var(--color-surface)]">
              <h3 className="text-base font-medium text-[var(--color-foreground)] tracking-tight">
                University of Nigeria, Nsukka
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  "Structural calculations for beams, columns, and load analysis following BS and Nigerian standards",
                  "Reinforced concrete design and steel structure member design as part of coursework",
                  "Technical engineering drawings produced in AutoCAD and Archicad",
                  "Hydraulics and fluid mechanics design projects — open channel flow, pipe networks",
                  "Transportation engineering studies — road geometry, pavement design, traffic analysis",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[var(--color-muted)] leading-relaxed"
                  >
                    <span
                      className="mt-2 w-1 h-1 flex-shrink-0 bg-[var(--color-accent)]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ResumeSection>

          {/* ── Volunteer ─────────────────────────────────────────────── */}
          <ResumeSection>
            <SectionLabel>Volunteer Experience</SectionLabel>
            <div className={cn(
              "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3",
              "p-6 border border-[var(--color-border)] bg-[var(--color-surface)]"
            )}>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-medium text-[var(--color-foreground)] tracking-tight">
                  Registration & Logistics Volunteer
                </h3>
                <p className="font-mono text-xs text-[var(--color-muted)]">
                  Enugu Tech Festival
                </p>
                <ul className="flex flex-col gap-1.5 mt-2">
                  {[
                    "Participant registration and event coordination",
                    "Logistics planning and team operations support",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-muted)] leading-relaxed">
                      <span className="mt-2 w-1 h-1 flex-shrink-0 bg-[var(--color-border)]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="technical-label flex-shrink-0">Feb 2026</span>
            </div>
          </ResumeSection>

          {/* ── Certifications ────────────────────────────────────────── */}
          <ResumeSection>
            <SectionLabel>Certifications</SectionLabel>
            <div className={cn(
              "flex items-center justify-between gap-4",
              "p-6 border border-[var(--color-border)] bg-[var(--color-surface)]"
            )}>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-medium text-[var(--color-foreground)] tracking-tight">
                  ALX Professional Foundations
                </h3>
                <p className="font-mono text-xs text-[var(--color-muted)]">
                  ALX Africa
                </p>
              </div>
              <span className={cn(
                "font-mono text-[0.625rem] px-2 py-0.5 flex-shrink-0",
                "border border-[var(--color-border)]",
                "text-[var(--color-muted-foreground)]"
              )}>
                Completed
              </span>
            </div>
          </ResumeSection>

          {/* ── Languages ─────────────────────────────────────────────── */}
          <ResumeSection>
            <SectionLabel>Languages</SectionLabel>
            <div className="grid grid-cols-2 gap-px bg-[var(--color-border)]">
              {[
                { language: "English", level: "Professional Proficiency" },
                { language: "Igbo", level: "Native" },
              ].map((item) => (
                <div
                  key={item.language}
                  className="flex flex-col gap-1 p-6 bg-[var(--color-background)]"
                >
                  <span className="text-sm font-medium text-[var(--color-foreground)]">
                    {item.language}
                  </span>
                  <span className="technical-label">{item.level}</span>
                </div>
              ))}
            </div>
          </ResumeSection>

        </div>
      </div>

    </div>
  );
}
