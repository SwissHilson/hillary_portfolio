"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Layers,
  Code2,
  Building2,
  Leaf,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { ANIMATION_EASE } from "@/lib/constants";

/**
 * About Page
 *
 * Architecture:
 * - Client component — scroll-triggered animations require browser APIs
 * - useInView from Framer Motion triggers animations as sections enter viewport
 * - Each section is independently animated — no single large animation tree
 * - This keeps re-renders isolated and performance clean
 *
 * Structure:
 * 1. Hero statement — thesis: cross-disciplinary engineer
 * 2. Story — why engineering, why software, why Africa
 * 3. Discipline pillars — four domains, each with a precise description
 * 4. HilEco Bricks — venture callout, honestly framed
 * 5. Core values — six values, minimal treatment
 * 6. CTA — resume download + view work
 *
 * SEO:
 * Metadata is exported from this file and merged with root layout metadata.
 */

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: ANIMATION_EASE.engineering,
      delay,
    },
  }),
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: ANIMATION_EASE.precise, delay },
  }),
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: ANIMATION_EASE.engineering },
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const disciplines = [
  {
    code: "01",
    icon: Building2,
    title: "Civil Engineering",
    description:
      "Structural analysis, reinforced concrete design, hydraulics, transportation engineering, and construction technology. Trained at the University of Nigeria, Nsukka — grounded in the realities of African infrastructure.",
    tags: ["Structural Design", "Hydraulics", "Transportation", "Surveying"],
  },
  {
    code: "02",
    icon: Layers,
    title: "CAD & BIM",
    description:
      "Technical drawing production in AutoCAD and architectural modelling in Archicad. Every engineering idea begins as a precise drawing — I treat digital models with the same discipline as physical ones.",
    tags: ["AutoCAD", "Archicad", "Technical Drawing", "BIM"],
  },
  {
    code: "03",
    icon: Code2,
    title: "Software Development",
    description:
      "Backend systems in Python and Django, RESTful API design, PostgreSQL data modelling, and now expanding into React and Next.js. Software is the second language I use to solve engineering problems.",
    tags: ["Python", "Django", "REST APIs", "PostgreSQL"],
  },
  {
    code: "04",
    icon: Leaf,
    title: "Entrepreneurship",
    description:
      "Co-founder of HilEco Bricks — an early-stage initiative developing eco-friendly construction materials for African markets. Building sustainable alternatives, starting with the materials themselves.",
    tags: ["HilEco Bricks", "Sustainable Construction", "Innovation"],
  },
] as const;

const values = [
  "Precision",
  "Integrity",
  "Excellence",
  "Sustainability",
  "Innovation",
  "Service",
] as const;

// ─── Animated Section Wrapper ─────────────────────────────────────────────────

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUpVariants}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="flex flex-col">

      {/* ── 1. Hero Statement ─────────────────────────────────────────── */}
      <section
        aria-labelledby="about-heading"
        className={cn(
          "relative border-b border-[var(--color-border)]",
          "engineering-grid overflow-hidden"
        )}
      >
        {/* Grid fade */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[var(--color-background)]"
        />

        <div className="site-container relative z-10 py-24 lg:py-32">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="flex flex-col gap-8 max-w-4xl"
          >
            {/* Section index */}
            <motion.div
              variants={fadeInVariants}
              custom={0}
              className="flex items-center gap-3"
            >
              <span className="font-mono text-[0.625rem] text-[var(--color-accent)] tracking-widest">
                00
              </span>
              <div className="w-4 h-px bg-[var(--color-accent)]" aria-hidden="true" />
              <span className="technical-label">About</span>
            </motion.div>

            {/* Thesis statement */}
            <motion.h1
              id="about-heading"
              variants={fadeUpVariants}
              custom={0.1}
              className={cn(
                "text-4xl lg:text-5xl xl:text-6xl",
                "font-medium tracking-tight leading-[1.1]",
                "text-[var(--color-foreground)]"
              )}
            >
              An engineer who thinks{" "}
              <span className="text-[var(--color-accent)]">
                across disciplines.
              </span>
            </motion.h1>

            {/* Dimension line */}
            <motion.div
              variants={lineVariants}
              className="h-px w-full max-w-[120px] bg-[var(--color-border)] origin-left"
              aria-hidden="true"
            />

            {/* Lead paragraph */}
            <motion.p
              variants={fadeUpVariants}
              custom={0.2}
              className={cn(
                "text-lg lg:text-xl",
                "text-[var(--color-muted)]",
                "leading-relaxed max-w-2xl"
              )}
            >
              Most engineers specialise early and stay there. I chose a
              different path — combining Civil Engineering, CAD and BIM,
              backend software development, and sustainable entrepreneurship
              because Africa&apos;s infrastructure challenges demand engineers
              who speak multiple technical languages.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Story ──────────────────────────────────────────────────── */}
      <section
        aria-label="My story"
        className="border-b border-[var(--color-border)]"
      >
        <div className="site-container py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-24">

            {/* Left — label */}
            <AnimatedSection className="flex flex-col gap-4">
              <SectionHeading
                index="01"
                label="The Story"
                heading="Why engineering. Why software. Why Africa."
              />
            </AnimatedSection>

            {/* Right — narrative */}
            <div className="flex flex-col gap-6">
              {[
                {
                  delay: 0,
                  text: "I study Civil Engineering at the University of Nigeria, Nsukka because I have always been fascinated by how infrastructure shapes the way people live — how a well-designed road changes a community, how a properly built structure protects lives, how good engineering solves real problems that affect millions of people.",
                },
                {
                  delay: 0.1,
                  text: "Over time, that fascination grew beyond the classroom. I realised that the future of engineering is not purely physical — it is computational. The engineers who will build Africa's next generation of infrastructure will need to understand structural analysis and software systems, CAD and code, concrete and data. I decided to become one of them.",
                },
                {
                  delay: 0.2,
                  text: "Africa's infrastructure challenges feel personal because I experience many of them firsthand. Growing up and studying in Nigeria has shown me how roads, housing, water systems, and public infrastructure directly affect education, business, and quality of life. My work — whether it is a structural design, a backend API, or HilEco Bricks — all points toward the same goal: contributing to infrastructure that is technically sound, accessible, and built with the realities of African communities in mind.",
                },
                {
                  delay: 0.3,
                  text: "What consistently sets my work apart is not passion — every engineering student claims passion. It is the deliberate decision to build across disciplines: Civil Engineering, CAD and BIM, backend software development, sustainability, and entrepreneurship. That combination is rare. I intend to use it.",
                },
              ].map((paragraph, i) => (
                <AnimatedSection key={i} delay={paragraph.delay}>
                  <p className="text-base lg:text-lg text-[var(--color-muted)] leading-relaxed">
                    {paragraph.text}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Discipline Pillars ─────────────────────────────────────── */}
      <section
        aria-label="Disciplines"
        className="border-b border-[var(--color-border)]"
      >
        <div className="site-container py-20 lg:py-28">
          <AnimatedSection className="mb-14">
            <SectionHeading
              index="02"
              label="Disciplines"
              heading="Four domains. One engineer."
              subheading="The technical breadth that makes cross-disciplinary engineering possible."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]">
            {disciplines.map((discipline, i) => {
              const Icon = discipline.icon;
              return (
                <AnimatedSection
                  key={discipline.code}
                  delay={i * 0.08}
                  className={cn(
                    "flex flex-col gap-5 p-8",
                    "bg-[var(--color-background)]",
                    "transition-colors duration-300",
                    "hover:bg-[var(--color-surface)]",
                    "group"
                  )}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Icon
                        size={16}
                        strokeWidth={1.5}
                        className="text-[var(--color-accent)]"
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[0.625rem] text-[var(--color-muted-foreground)] tracking-widest">
                        {discipline.code}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-medium text-[var(--color-foreground)] tracking-tight">
                    {discipline.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1">
                    {discipline.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {discipline.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          "font-mono text-[0.625rem] tracking-wide",
                          "px-2 py-1",
                          "border border-[var(--color-border)]",
                          "text-[var(--color-muted-foreground)]",
                          "group-hover:border-[var(--color-border)]",
                          "transition-colors duration-200"
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. HilEco Bricks ─────────────────────────────────────────── */}
      <section
        aria-label="HilEco Bricks venture"
        className="border-b border-[var(--color-border)]"
      >
        <div className="site-container py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-24 items-start">
            <AnimatedSection>
              <SectionHeading
                index="03"
                label="Venture"
                heading="HilEco Bricks"
              />
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className={cn(
                "flex flex-col gap-6 p-8",
                "border border-[var(--color-border)]",
                "bg-[var(--color-surface)]"
              )}>
                {/* Status badge */}
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-[load-pulse_2s_ease-in-out_infinite]" aria-hidden="true" />
                  <span className="technical-label text-[var(--color-accent)]">
                    Early-Stage — Research & Development
                  </span>
                </div>

                <p className="text-base text-[var(--color-muted)] leading-relaxed">
                  HilEco Bricks is a sustainable construction materials
                  initiative I co-founded to explore eco-friendly alternatives
                  for brick and block production in African markets. The
                  long-term goal is to develop materials that are
                  environmentally responsible, structurally sound, and
                  affordable for low-to-medium-cost construction.
                </p>

                <p className="text-base text-[var(--color-muted)] leading-relaxed">
                  We are currently in the research and concept validation
                  phase; refining formulations, studying comparable
                  international initiatives, and building toward a viable
                  production and business model. HilEco Bricks is not yet a
                  manufacturing operation. It is a serious early-stage venture
                  being developed with the rigour of an engineering project.
                </p>

                {/* Key focus areas */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[var(--color-border-subtle)]">
                  {[
                    { label: "Focus", value: "Sustainable Materials" },
                    { label: "Market", value: "African Construction" },
                    { label: "Stage", value: "R&D Phase" },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-1">
                      <span className="technical-label">{item.label}</span>
                      <span className="font-mono text-xs text-[var(--color-foreground)]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 5. Values ─────────────────────────────────────────────────── */}
      <section
        aria-label="Core values"
        className="border-b border-[var(--color-border)]"
      >
        <div className="site-container py-20 lg:py-28">
          <AnimatedSection className="mb-14">
            <SectionHeading
              index="04"
              label="Values"
              heading="What guides the work."
            />
          </AnimatedSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[var(--color-border)]">
            {values.map((value, i) => (
              <AnimatedSection
                key={value}
                delay={i * 0.06}
                className={cn(
                  "flex items-center justify-center",
                  "p-6 bg-[var(--color-background)]",
                  "hover:bg-[var(--color-surface)]",
                  "transition-colors duration-300"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs tracking-widest uppercase",
                    "text-[var(--color-muted)]",
                    "hover:text-[var(--color-foreground)]",
                    "transition-colors duration-200 text-center"
                  )}
                >
                  {value}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ────────────────────────────────────────────────────── */}
      <section aria-label="Next steps">
        <div className="site-container py-20 lg:py-28">
          <AnimatedSection className="flex flex-col gap-8 max-w-2xl">
            <div className="flex flex-col gap-3">
              <span className="technical-label">Next</span>
              <h2 className="text-3xl lg:text-4xl font-medium tracking-tight text-[var(--color-foreground)]">
                See the work. Download the resume.
              </h2>
              <p className="text-base text-[var(--color-muted)] leading-relaxed">
                The best way to evaluate an engineer is through their output.
                Every project listed in my portfolio reflects a real problem,
                a deliberate approach, and a concrete result.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/work"
                className={cn(
                  "group flex items-center gap-2 px-5 py-3",
                  "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]",
                  "font-mono text-xs tracking-widest uppercase",
                  "transition-all duration-300",
                  "hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)]"
                )}
              >
                View Work
                <ArrowRight
                  size={12}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="/resume.pdf"
                download
                className={cn(
                  "group flex items-center gap-2 px-5 py-3",
                  "border border-[var(--color-border)]",
                  "text-[var(--color-muted)]",
                  "font-mono text-xs tracking-widest uppercase",
                  "transition-all duration-300",
                  "hover:border-[var(--color-foreground)] hover:text-[var(--color-foreground)]"
                )}
              >
                Download Resume
                <Download
                  size={12}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
