"use client";

import { useCallback, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup, useInView } from "framer-motion";
import ProjectCard from "@/components/shared/ProjectCard";
import { projects } from "@/data/projects";
import { PROJECT_CATEGORY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types";

/**
 * WorkClient — Client Component
 *
 * Architecture:
 * Separated from the page shell (page.tsx) because useSearchParams()
 * requires a Suspense boundary in Next.js 15. The page.tsx shell provides
 * that boundary; this component contains all the interactive logic.
 *
 * Filter design:
 * Each filter option displays a category code (CE, SWE, BIM, VNT),
 * a label, and a live project count. The active indicator is a Framer
 * Motion shared layout element — it physically slides between options
 * using spring physics rather than CSS transitions. This is the same
 * technique used by Linear and Vercel's dashboards.
 *
 * URL strategy:
 * /work                          → All projects
 * /work?category=software        → Software only
 * /work?category=engineering     → Engineering only
 * /work?category=cad             → CAD & BIM only
 * /work?category=entrepreneurship → Ventures only
 *
 * Filtered views are bookmarkable and shareable — a recruiter from an
 * engineering firm can share the engineering-filtered URL with colleagues.
 *
 * Performance:
 * - useMemo prevents re-filtering on every render
 * - useCallback prevents handler recreation on every render
 * - AnimatePresence mode="popLayout" prevents layout thrash on filter change
 */

type FilterValue = ProjectCategory | "all";

interface FilterOption {
  value: FilterValue;
  label: string;
  code: string;
  count: number;
}

export default function WorkClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const activeCategory = (searchParams.get("category") ?? "all") as FilterValue;

  const filterOptions = useMemo<FilterOption[]>(() => {
    const counts = projects.reduce(
      (acc, p) => {
        acc[p.category] = (acc[p.category] ?? 0) + 1;
        return acc;
      },
      {} as Record<ProjectCategory, number>
    );

    return [
      { value: "all", label: "All Work", code: "ALL", count: projects.length },
      { value: "software", label: PROJECT_CATEGORY_LABELS.software, code: "SWE", count: counts.software ?? 0 },
      { value: "engineering", label: PROJECT_CATEGORY_LABELS.engineering, code: "CE", count: counts.engineering ?? 0 },
      { value: "cad", label: PROJECT_CATEGORY_LABELS.cad, code: "BIM", count: counts.cad ?? 0 },
      { value: "entrepreneurship", label: PROJECT_CATEGORY_LABELS.entrepreneurship, code: "VNT", count: counts.entrepreneurship ?? 0 },
    ];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleFilterChange = useCallback(
    (value: FilterValue) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete("category");
      } else {
        params.set("category", value);
      }
      const query = params.toString();
      router.push(`/work${query ? `?${query}` : ""}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-col">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        aria-label="Work introduction"
        className={cn(
          "relative border-b border-[var(--color-border)]",
          "engineering-grid overflow-hidden"
        )}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[var(--color-background)]"
        />
        <div className="site-container relative z-10 py-24 lg:py-32">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 max-w-3xl"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.625rem] text-[var(--color-accent)] tracking-widest">
                02
              </span>
              <div className="w-4 h-px bg-[var(--color-accent)]" aria-hidden="true" />
              <span className="technical-label">Portfolio</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-[var(--color-foreground)] leading-[1.1]">
              Engineering and software,{" "}
              <span className="text-[var(--color-accent)]">as one discipline.</span>
            </h1>

            <p className="text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl">
              Every project here represents a real problem, a deliberate approach,
              and a concrete result — whether the output is a structural calculation,
              a backend API, a CAD drawing, or a sustainable construction initiative.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Filter Strip ──────────────────────────────────────────────── */}
      <section
        aria-label="Filter projects by category"
        className="sticky top-16 z-20 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur-md"
      >
        <div className="site-container">
          <LayoutGroup id="work-filter">
            <div
              role="tablist"
              aria-label="Project categories"
              className="flex items-stretch overflow-x-auto"
              style={{ scrollbarWidth: "none" }}
            >
              {filterOptions.map((option) => {
                const isActive = activeCategory === option.value;
                return (
                  <button
                    key={option.value}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="project-grid"
                    onClick={() => handleFilterChange(option.value)}
                    className={cn(
                      "relative flex items-center gap-2.5 px-4 py-4 flex-shrink-0",
                      "transition-colors duration-200",
                      "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]",
                      isActive
                        ? "text-[var(--color-foreground)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                    )}
                  >
                    <span className="font-mono text-[0.625rem] tracking-widest text-[var(--color-accent)]">
                      {option.code}
                    </span>
                    <span className="font-mono text-xs tracking-wide whitespace-nowrap">
                      {option.label}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[0.625rem] px-1.5 py-0.5 border",
                        isActive
                          ? "text-[var(--color-accent)] border-[var(--color-accent)]/30"
                          : "text-[var(--color-muted-foreground)] border-[var(--color-border)]"
                      )}
                      aria-label={`${option.count} projects`}
                    >
                      {option.count}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="active-filter-indicator"
                        className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent)]"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>
      </section>

      {/* ── Project Grid ──────────────────────────────────────────────── */}
      <section
        id="project-grid"
        role="tabpanel"
        aria-label={
          activeCategory === "all"
            ? "All projects"
            : `${PROJECT_CATEGORY_LABELS[activeCategory as ProjectCategory]} projects`
        }
        className="site-container py-16 lg:py-20"
      >
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-10 flex items-center gap-3"
        >
          <span className="technical-label">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
            {activeCategory !== "all" &&
              ` — ${PROJECT_CATEGORY_LABELS[activeCategory as ProjectCategory]}`}
          </span>
          <div className="h-px flex-1 bg-[var(--color-border-subtle)]" aria-hidden="true" />
        </motion.div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={index * 0.06}
                featured={project.featured && filteredProjects.length <= 2}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
          >
            <div className="w-8 h-8 border border-dashed border-[var(--color-border)] flex items-center justify-center">
              <div className="w-1 h-1 bg-[var(--color-muted-foreground)]" />
            </div>
            <p className="technical-label text-center">
              No projects in this category yet.
            </p>
          </motion.div>
        )}
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      <section
        aria-label="Collaboration prompt"
        className="border-t border-[var(--color-border)]"
      >
        <div className="site-container py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            <div className="flex flex-col gap-1">
              <span className="technical-label">Collaboration</span>
              <p className="text-lg font-medium text-[var(--color-foreground)] tracking-tight">
                Have a project that needs this skill set?
              </p>
            </div>
            <a
              href="/contact"
              className={cn(
                "group flex items-center gap-2 px-5 py-3 w-fit flex-shrink-0",
                "bg-[var(--color-accent)] text-[var(--color-accent-foreground)]",
                "font-mono text-xs tracking-widest uppercase",
                "transition-all duration-300",
                "hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)]"
              )}
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
