import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — Class Name utility
 *
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 * This is the standard pattern in every serious Tailwind project.
 *
 * Why both?
 * - clsx handles conditional/array class logic
 * - twMerge resolves Tailwind conflicts (e.g. p-4 + p-6 → p-6, not both)
 *
 * Usage:
 *   cn("base-class", condition && "conditional-class", "another-class")
 *   cn(styles.root, isActive && "text-accent", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * formatDate — Converts ISO date string to readable format
 * Used for blog post dates and project years
 *
 * @param dateString — ISO date string e.g. "2024-03-15"
 * @param format — "long" (March 15, 2024) or "short" (Mar 2024)
 */
export function formatDate(
  dateString: string,
  format: "long" | "short" = "long"
): string {
  const date = new Date(dateString);

  if (format === "short") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * slugify — Converts a string to URL-safe slug
 * Used for generating blog post and project URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * clamp — Constrains a number between min and max
 * Used for scroll-based animation progress calculations
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * mapRange — Maps a value from one range to another
 * Used for converting scroll progress to animation values
 *
 * @example
 * mapRange(0.5, 0, 1, 0, 100) → 50
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/**
 * truncate — Truncates text to a given character count with ellipsis
 * Used for project and blog card descriptions
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}
