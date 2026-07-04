import type { NavLink, PageMeta } from "@/types";

/**
 * Hillary Portfolio — Site Constants
 *
 * Single source of truth for:
 * - Site metadata (used in layout.tsx for SEO)
 * - Navigation structure
 * - Social links
 * - Contact information
 *
 * Why constants over hardcoded values?
 * When your email, title, or nav structure changes, you update one file.
 * Every component that consumes these constants updates automatically.
 */

// ─── Site Identity ────────────────────────────────────────────────────────────

export const SITE_NAME = "Chukwuemeka Chidera Hillary";
export const SITE_TAGLINE = "Civil Engineer & Software Developer";

export const SITE_DESCRIPTION =
  "Civil Engineering student at UNN combining structural design, CAD/BIM, and backend software development to solve infrastructure challenges across Africa.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hillary.dev";

export const SITE_AUTHOR = "Chukwuemeka Chidera Hillary";

// ─── Navigation ───────────────────────────────────────────────────────────────

/**
 * Primary navigation links.
 *
 * Architecture note: /work is unified — not split into /engineering and /software.
 * This communicates that Hillary's work is one discipline, not two separate tracks.
 * The filtering happens inside the /work page itself.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

// ─── Social & Contact ─────────────────────────────────────────────────────────

export const SOCIAL_LINKS = {
  github: "https://github.com/SwissHilson",
  linkedin: "https://www.linkedin.com/in/chiderahillary/",
  email: "chiderahillary80@gmail.com",
} as const;

// ─── Page Metadata ────────────────────────────────────────────────────────────

export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: `${SITE_NAME} — Civil Engineer & Software Developer`,
    description: SITE_DESCRIPTION,
    path: "/",
  },
  about: {
    title: `About — ${SITE_NAME}`,
    description:
      "Civil Engineering student at UNN with expertise in structural design, CAD/BIM, Python, and Django. Co-founder of HilEco Bricks.",
    path: "/about",
  },
  work: {
    title: `Work — ${SITE_NAME}`,
    description:
      "Engineering projects, software systems, and CAD drawings by Chukwuemeka Hillary — where infrastructure meets code.",
    path: "/work",
  },
  resume: {
    title: `Resume — ${SITE_NAME}`,
    description:
      "Professional resume of Chukwuemeka Chidera Hillary — Civil Engineer, Backend Developer, and Entrepreneur.",
    path: "/resume",
  },
  contact: {
    title: `Contact — ${SITE_NAME}`,
    description:
      "Get in touch with Chukwuemeka Hillary for engineering projects, software collaborations, or professional enquiries.",
    path: "/contact",
  },
};

// ─── Engineering Coordinates ──────────────────────────────────────────────────
// Displayed as decorative technical labels in the hero section.
// These are real coordinates — University of Nigeria, Nsukka.

export const SITE_COORDINATES = {
  lat: "06°51′44″N",
  lng: "007°23′57″E",
  location: "Nsukka, Enugu State, Nigeria",
  institution: "University of Nigeria, Nsukka",
} as const;

// ─── Project Categories ───────────────────────────────────────────────────────

export const PROJECT_CATEGORY_LABELS = {
  software: "Software",
  engineering: "Engineering",
  cad: "CAD & BIM",
  entrepreneurship: "Entrepreneurship",
} as const;

// ─── Animation Config ─────────────────────────────────────────────────────────

export const ANIMATION_DURATION = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
  verySlow: 0.9,
} as const;

export const ANIMATION_EASE = {
  engineering: [0.16, 1, 0.3, 1] as const,
  precise: [0.4, 0, 0.2, 1] as const,
  snap: [0.87, 0, 0.13, 1] as const,
} as const;
