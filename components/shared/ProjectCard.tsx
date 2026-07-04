"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECT_CATEGORY_LABELS } from "@/lib/constants";
import type { Project } from "@/types";

/**
 * ProjectCard — Reusable project display component
 *
 * Architecture:
 * - Client component — hover animations require browser environment
 * - Receives a Project object; renders nothing it doesn't receive
 * - No hardcoded content — fully data-driven from data/projects.ts
 * - Status badge communicates project lifecycle honestly
 * - Links render conditionally — if no GitHub, no GitHub link appears
 *
 * Design rationale:
 * The card anatomy mirrors a technical drawing title block — the standard
 * box in the bottom-right corner of every engineering drawing that
 * identifies the project, revision, and status. This is not decorative;
 * it is a deliberate reference to engineering documentation culture.
 *
 * Accessibility:
 * - Card is not itself a link — individual links within are focusable
 * - Status badges use aria-label for screen readers
 * - External links have rel="noopener noreferrer"
 */

interface ProjectCardProps {
  project: Project;
  /** Animation delay for staggered entrance */
  delay?: number;
  /** Whether to show in featured (larger) layout */
  featured?: boolean;
}

const statusConfig = {
  live: {
    label: "Live",
    className: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
    dot: "bg-emerald-400",
    pulse: true,
  },
  completed: {
    label: "Completed",
    className: "text-[var(--color-muted-foreground)] border-[var(--color-border)] bg-transparent",
    dot: "bg-[var(--color-muted-foreground)]",
    pulse: false,
  },
  "in-progress": {
    label: "In Progress",
    className: "text-[var(--color-accent)] border-[var(--color-accent)]/30 bg-[var(--color-accent)]/5",
    dot: "bg-[var(--color-accent)]",
    pulse: true,
  },
  planned: {
    label: "Planned",
    className: "text-[var(--color-muted-foreground)] border-[var(--color-border)] bg-transparent",
    dot: "bg-[var(--color-muted-foreground)]",
    pulse: false,
  },
} as const;

const categoryCodeMap = {
  software: "SWE",
  engineering: "CE",
  cad: "BIM",
  entrepreneurship: "VNT",
} as const;

export default function ProjectCard({
  project,
  delay = 0,
  featured = false,
}: ProjectCardProps) {
  const status = statusConfig[project.status];
  const categoryCode = categoryCodeMap[project.category];
  const categoryLabel = PROJECT_CATEGORY_LABELS[project.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={cn(
        "group relative flex flex-col",
        "border border-[var(--color-border)]",
        "bg-[var(--color-background)]",
        "transition-all duration-300",
        // Border brightens on hover — structural node activating under load
        "hover:border-[var(--color-muted-foreground)]",
        "hover:bg-[var(--color-surface)]",
        featured && "md:col-span-2"
      )}
      aria-label={`${project.title} — ${categoryLabel} project`}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className={cn(
        "flex items-start justify-between gap-4",
        "px-6 pt-6 pb-4",
        "border-b border-[var(--color-border-subtle)]"
      )}>
        {/* Category annotation */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[0.625rem] text-[var(--color-accent)] tracking-widest">
            {categoryCode}
          </span>
          <div className="w-3 h-px bg-[var(--color-border)]" aria-hidden="true" />
          <span className="technical-label">{categoryLabel}</span>
        </div>

        {/* Status badge */}
        <div
          className={cn(
            "flex items-center gap-1.5 px-2 py-0.5",
            "border rounded-none",
            "font-mono text-[0.625rem] tracking-wide",
            status.className
          )}
          aria-label={`Status: ${status.label}`}
        >
          <span
            className={cn(
              "w-1 h-1 rounded-full flex-shrink-0",
              status.dot,
              status.pulse && "animate-[load-pulse_2s_ease-in-out_infinite]"
            )}
            aria-hidden="true"
          />
          {status.label}
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 px-6 py-5 flex-1">
        {/* Year */}
        <span className="technical-label">{project.year}</span>

        {/* Title */}
        <h3 className={cn(
          "font-medium tracking-tight text-[var(--color-foreground)]",
          featured ? "text-2xl" : "text-xl"
        )}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Highlights — shown if present */}
        {project.highlights && project.highlights.length > 0 && (
          <ul className="flex flex-col gap-1.5 pt-1">
            {project.highlights.slice(0, 3).map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-xs text-[var(--color-muted-foreground)]"
              >
                <span
                  className="mt-1.5 w-1 h-1 flex-shrink-0 bg-[var(--color-accent)]"
                  aria-hidden="true"
                />
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <div className={cn(
        "flex items-center justify-between gap-4",
        "px-6 pb-6 pt-4",
        "border-t border-[var(--color-border-subtle)]"
      )}>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={cn(
                "font-mono text-[0.625rem] tracking-wide",
                "px-2 py-0.5",
                "border border-[var(--color-border)]",
                "text-[var(--color-muted-foreground)]",
                "whitespace-nowrap"
              )}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="font-mono text-[0.625rem] text-[var(--color-muted-foreground)] self-center">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className={cn(
                "text-[var(--color-muted-foreground)]",
                "hover:text-[var(--color-foreground)]",
                "transition-colors duration-200"
              )}
            >
              <Github size={14} strokeWidth={1.5} aria-hidden="true" />
            </a>
          )}
          {project.links?.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live site`}
              className={cn(
                "text-[var(--color-muted-foreground)]",
                "hover:text-[var(--color-accent)]",
                "transition-colors duration-200"
              )}
            >
              <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
            </a>
          )}
          {project.links?.document && (
            <a
              href={project.links.document}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} document`}
              className={cn(
                "text-[var(--color-muted-foreground)]",
                "hover:text-[var(--color-foreground)]",
                "transition-colors duration-200"
              )}
            >
              <FileText size={14} strokeWidth={1.5} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
