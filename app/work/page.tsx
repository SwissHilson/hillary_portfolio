"use client";

import { useCallback, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useInView } from "framer-motion";
import ProjectCard from "@/components/shared/ProjectCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { projects } from "@/data/projects";
import { PROJECT_CATEGORY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types";

/**
 * Work Page — Unified project portfolio
 *
 * Architecture:
 * - Client component — URL state and animations require browser APIs
 * - useSearchParams reads ?category= from URL for shareable filtered views
 * - useRouter updates URL without page reload on filter change
 * - AnimatePresence handles card enter/exit animations cleanly
 * - LayoutGroup + layoutId on the active indicator creates a sliding
 *   underline that physically moves between filter options — this is
 *   Framer Motion's shared layout animation, not a CSS trick
 *
 * Filter design rationale:
 * Standard tab bars look like UI components. The filter strip here is
 * styled as an engineering drawing legend — each category has a code
 * annotation (CE, SWE, BIM, VNT), a label, and a project count.
 * The active indicator slides using layout animation — it feels
 * physically engineered rather than digitally toggled.
 *
 * URL strategy:
 * /work               → All projects
 * /work?category=software      → Software only
 * /work?category=engineering   → Engineering only
 * /work?category=cad           → CAD & BIM only
 * /work?category=entrepreneurship → Ventures only
 *
 * This makes filtered views bookmarkable and shareable — a recruiter
 * from an engineering firm can share the engineering-filtered URL
 * with colleagues.
 *
 * Performance:
 * - useMemo prevents re-filtering on every render
 * - useCallback prevents filter handler recreation on every render
 * - AnimatePresence mode="popLayout" prevents layout thrash on filter change
 */

// ─── Filter Configuration ─────────────────────────────────────────────────────

type FilterValue = ProjectCategory | "all";

interface FilterOption {
  value: FilterValue;
  label: string;
  code: string;
  count: number;
}

const categoryCodeMap: Record<FilterValue, string> = {
  all: "ALL",
  software: "SWE",
  engineering: "CE",
  cad: "BIM",
  entrepreneurship: "VNT",
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorkPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  // Read active category from URL — defaults to "all"
  const activeCategory = (searchParams.get("category") ?? "all") as FilterValue;

  // Build filter options with live project counts
  const filterOptions = useMemo<FilterOption[]>(() => {
    const allCount = projects.length;
    const categoryCounts = projects.reduce(
      (acc, project) => {
        acc[project.category] = (acc[project.category] ?? 0) + 1;
        return acc;
      },
      {} as Record<ProjectCategory, number>
    );

    return [
      { value: "all", label: "All Work", code: "ALL", count: allCount },
      {
        value: "software",
        label: PROJECT_CATEGORY_LABELS.software,
        code: "SWE",
        count: categoryCounts.software ?? 0,
      },
      {
        value: "engineering",
        label: PROJECT_CATEGORY_LABELS.engineering,
        code: "CE",
        count: categoryCounts.engineering ?? 0,
      },
      {
        value: "cad",
        label: PROJECT_CATEGORY_LABELS.cad,
        code: "BIM",
        count: categoryCounts.cad ?? 0,
      },
      {
        value: "entrepreneurship",
        label: PROJECT_CATEGORY_LABELS.entrepreneurship,
        code: "VNT",
        count: categoryCounts.entrepreneurship ?? 0,
      },
    ];
  }, []);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Update URL on filter change — no page reload
  const handleFilterChange = useCallback(
    (value: FilterValue) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete("category");
      } else {
        params.set("category", value);
      }
      router.push(`/work?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-col">

      {/* ── Hero Statement ────────────────────────────────────────────── */}
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
              <span className="text-[var(--color-accent)]">
                as one discipline.
              </span>
            </h1>

            <p className="text-lg text-[var(--color-muted)] leading-relaxed max-w-2xl">
              Every project here represents a real problem, a deliberate
              approach, and a concrete result — whether the output is a
              structural calculation, a backend API, a CAD drawing, or a
              sustainable construction initiative.
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
              className="flex items-stretch overflow-x-auto scrollbar-none"
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
                      "relative flex items-center gap-2.5",
                      "px-4 py-4 flex-shrink-0",
                      "transition-colors duration-200",
                      "focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]",
                      isActive
                        ? "text-[var(--color-foreground)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                    )}
                  >
                    {/* Category code */}
                    <span className="font-mono text-[0.625rem] tracking-widest text-[var(--color-accent)]">
                      {option.code}
                    </span>

                    {/* Label */}
                    <span className="font-mono text-xs tracking-wide whitespace-nowrap">
                      {option.label}
                    </span>

                    {/* Count badge */}
                    <span
                      className={cn(
                        "font-mono text-[0.625rem]",
                        "px-1.5 py-0.5",
                        "border border-[var(--color-border)]",
                        isActive
                          ? "text-[var(--color-accent)] border-[var(--color-accent)]/30"
                          : "text-[var(--color-muted-foreground)]"
                      )}
                      aria-label={`${option.count} projects`}
                    >
                      {option.count}
                    </span>

                    {/* Active sliding indicator — Framer Motion layout animation */}
                    {isActive && (
                      <motion.div
                        layoutId="active-filter-indicator"
                        className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent)]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
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
        aria-label={`${activeCategory === "all" ? "All" : PROJECT_CATEGORY_LABELS[activeCategory as ProjectCategory]} projects`}
        className="site-container py-16 lg:py-20"
      >
        {/* Result count */}
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

        {/* Cards */}
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

        {/* Empty state — when a category has no projects yet */}
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
        aria-label="Contact prompt"
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
