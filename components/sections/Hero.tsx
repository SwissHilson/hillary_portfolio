"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_COORDINATES, ANIMATION_EASE } from "@/lib/constants";

/**
 * Hero — Primary landing section
 *
 * Architecture:
 * - Client component — Framer Motion requires browser environment
 * - Full viewport height minus navbar (100dvh - 64px)
 * - Two-column layout: content left, photo right (stacks on mobile)
 * - Engineering grid background — blueprint analog
 * - Staggered entrance animations — each element draws in sequence
 *   like a CAD instrument completing a technical drawing
 *
 * Animation philosophy:
 * Every animation has an engineering analog:
 * - Coordinate label: survey instrument locking onto target
 * - Headline lines: drafting pen drawing text annotations
 * - Dimension line: CAD dimension indicator extending from left
 * - CTAs: structural nodes becoming active
 * - Photo frame: blueprint border being traced
 *
 * Photo slot:
 * - Set PHOTO_READY = true when /public/images/hillary-professional.jpg exists
 * - Layout is identical — no shift, no redesign required
 */

const PHOTO_READY = true;
const PHOTO_SRC = "/images/hillary-professional.png";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: ANIMATION_EASE.engineering },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: ANIMATION_EASE.precise },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: ANIMATION_EASE.engineering },
  },
};

const disciplines = [
  { label: "Civil Engineering", code: "CE" },
  { label: "CAD & BIM", code: "BIM" },
  { label: "Software Development", code: "SWE" },
] as const;

const cornerPositions = [
  { outer: "top-0 left-0", border: "border-t-2 border-l-2" },
  { outer: "top-0 right-0", border: "border-t-2 border-r-2" },
  { outer: "bottom-0 left-0", border: "border-b-2 border-l-2" },
  { outer: "bottom-0 right-0", border: "border-b-2 border-r-2" },
] as const;

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className={cn(
        "relative min-h-[calc(100dvh-64px)]",
        "flex items-center",
        "engineering-grid",
        "overflow-hidden"
      )}
    >
      {/* Grid fade toward bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[var(--color-background)]"
      />

      {/* Top-right coordinates */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute top-6 right-6 hidden lg:flex flex-col items-end gap-1"
      >
        <span className="technical-label">{SITE_COORDINATES.lat}</span>
        <span className="technical-label">{SITE_COORDINATES.lng}</span>
      </motion.div>

      {/* Bottom-left revision label */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="absolute bottom-8 left-6 hidden lg:block"
      >
        <span className="technical-label">REV 01 — 2025</span>
      </motion.div>

      {/* Main content */}
      <div className="site-container w-full relative z-10">
        <div className={cn(
          "grid grid-cols-1 gap-16",
          "lg:grid-cols-[1fr_400px] lg:gap-24",
          "items-center py-20 lg:py-0"
        )}>

          {/* Left — Identity */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-8"
          >
            {/* Location */}
            <motion.div variants={fadeInVariants} className="flex items-center gap-2">
              <MapPin size={12} className="text-[var(--color-accent)]" aria-hidden="true" />
              <span className="technical-label">
                {SITE_COORDINATES.institution} — Nigeria
              </span>
            </motion.div>

            {/* Headline */}
            <div className="flex flex-col gap-1">
              <motion.p
                variants={fadeUpVariants}
                className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-[var(--color-foreground)] leading-[1.08]"
              >
                Civil Engineer.
              </motion.p>
              <motion.p
                variants={fadeUpVariants}
                className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-[var(--color-foreground)] leading-[1.08]"
              >
                Software Developer.
              </motion.p>
              <motion.p
                variants={fadeUpVariants}
                className="text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-[var(--color-accent)] leading-[1.08]"
              >
                Building Africa.
              </motion.p>
            </div>

            {/* Screen reader full headline */}
            <span className="sr-only">
              Civil Engineer. Software Developer. Building Africa&apos;s infrastructure future.
            </span>

            {/* Dimension line */}
            <motion.div variants={fadeInVariants} className="flex items-center gap-3" aria-hidden="true">
              <motion.div
                variants={lineVariants}
                className="h-px flex-1 max-w-[48px] bg-[var(--color-accent)] origin-left"
              />
              <span className="technical-label">CE / SWE / BIM</span>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={fadeUpVariants}
              className="text-base lg:text-lg text-[var(--color-muted)] leading-relaxed max-w-[480px]"
            >
              Civil Engineering student at UNN combining structural design,
              CAD/BIM, and backend software to solve infrastructure challenges
              across Africa. Co-founder of HilEco Bricks.
            </motion.p>

            {/* Discipline tags */}
            <motion.div variants={fadeInVariants} className="flex flex-wrap gap-2">
              {disciplines.map((d) => (
                <span
                  key={d.code}
                  className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] bg-[var(--color-surface)]"
                >
                  <span className="font-mono text-[0.625rem] text-[var(--color-accent)]">{d.code}</span>
                  <span className="font-mono text-[0.625rem] text-[var(--color-muted)]">{d.label}</span>
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-4 pt-2">
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
                <ArrowRight size={12} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className={cn(
                  "group flex items-center gap-2 px-5 py-3",
                  "border border-[var(--color-border)]",
                  "text-[var(--color-muted)]",
                  "font-mono text-xs tracking-widest uppercase",
                  "transition-all duration-300",
                  "hover:border-[var(--color-foreground)] hover:text-[var(--color-foreground)]"
                )}
              >
                Get in Touch
                <ArrowDownRight size={12} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — Photo slot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: ANIMATION_EASE.engineering, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Outer dashed annotation frame */}
              <div
                aria-hidden="true"
                className="absolute -top-3 -left-3 -right-3 -bottom-3 border border-dashed border-[var(--color-border)] pointer-events-none"
              />

              {/* CAD corner markers */}
              {cornerPositions.map((pos, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className={cn("absolute w-3 h-3 border-[var(--color-accent)]", pos.outer, pos.border)}
                />
              ))}

              {/* Photo or placeholder */}
              <div className="relative w-full aspect-[3/4] bg-[var(--color-surface)] overflow-hidden">
                {PHOTO_READY ? (
                  <Image
                    src={PHOTO_SRC}
                    alt="Chukwuemeka Chidera Hillary — Civil Engineer and Software Developer"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="400px"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 engineering-grid-sm"
                    role="img"
                    aria-label="Professional photo — coming soon"
                  >
                    {/* Crosshair */}
                    <div aria-hidden="true" className="relative flex items-center justify-center">
                      <div className="w-px h-8 bg-[var(--color-border)]" />
                      <div className="absolute w-8 h-px bg-[var(--color-border)]" />
                      <div className="absolute w-2 h-2 rounded-full border border-[var(--color-accent)]" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="technical-label">PHOTO — PENDING</span>
                      <span className="technical-label opacity-50">400 × 533 PX</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom annotation */}
              <div aria-hidden="true" className="mt-3 flex items-center justify-between">
                <span className="technical-label">Chukwuemeka C. Hillary</span>
                <span className="technical-label">UNN — 2025</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex"
      >
        <span className="technical-label">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-[var(--color-border)]"
        />
      </motion.div>
    </section>
  );
}
