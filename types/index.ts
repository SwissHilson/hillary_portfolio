/**
 * Hillary Portfolio — Global Type Definitions
 *
 * Architecture principle:
 * All shared types live here. Component-specific types stay in their own files.
 * This prevents circular imports and keeps the type system navigable.
 */

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  /** Optional: marks this link as external — opens in new tab */
  external?: boolean;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export type ProjectCategory =
  | "software"
  | "engineering"
  | "cad"
  | "entrepreneurship";

export type ProjectStatus = "live" | "in-progress" | "completed" | "planned";

export interface Project {
  id: string;
  title: string;
  description: string;
  /** Longer description for project detail view */
  longDescription?: string;
  category: ProjectCategory;
  tags: string[];
  status: ProjectStatus;
  year: string;
  /** GitHub, live URL, or document link */
  links?: {
    github?: string;
    live?: string;
    document?: string;
  };
  /** Path relative to /public/images/projects/ */
  image?: string;
  /** Highlights shown on the project card */
  highlights?: string[];
  featured?: boolean;
}

// ─── Skills ──────────────────────────────────────────────────────────────────

export type SkillLevel = "proficient" | "learning" | "planned";

export type SkillCategory =
  | "civil-engineering"
  | "cad-bim"
  | "programming"
  | "tools"
  | "entrepreneurship";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  /** Optional icon identifier — maps to a Lucide icon name */
  icon?: string;
}

export interface SkillGroup {
  category: SkillCategory;
  label: string;
  description: string;
  skills: Skill[];
}

// ─── Blog ────────────────────────────────────────────────────────────────────

export type BlogCategory =
  | "civil-engineering"
  | "software"
  | "cad"
  | "career"
  | "sustainability"
  | "ai";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string;   // ISO date string
  readingTime: number;   // minutes
  featured?: boolean;
  /** Path relative to /public/images/blog/ */
  coverImage?: string;
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  subject: string;
  message: string;
}

// ─── SEO / Metadata ──────────────────────────────────────────────────────────

export interface PageMeta {
  title: string;
  description: string;
  /** Canonical path — e.g. "/about" */
  path: string;
  /** OG image path relative to /public */
  ogImage?: string;
}

// ─── Theme ───────────────────────────────────────────────────────────────────

export type Theme = "dark" | "light" | "system";

// ─── Animation Variants ──────────────────────────────────────────────────────
// Shared Framer Motion variant shapes — prevents inconsistency across components

export interface MotionVariants {
  hidden: Record<string, unknown>;
  visible: Record<string, unknown>;
}
