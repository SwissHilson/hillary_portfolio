/**
 * SectionHeading — Reusable section header component
 *
 * Architecture:
 * - Server component — purely presentational, zero JS
 * - Used on every page section for visual consistency
 * - Index number communicates engineering drawing annotation style
 * - Accent line extends like a CAD dimension line
 *
 * Props:
 * - index: section number e.g. "01" — shown as technical label
 * - label: small uppercase descriptor above the heading
 * - heading: the primary h2 text
 * - subheading: optional supporting paragraph
 * - align: left (default) or center
 */

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  index?: string;
  label: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  index,
  label,
  heading,
  subheading,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {/* Index + Label row */}
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        {index && (
          <span
            className="font-mono text-[0.625rem] text-[var(--color-accent)] tracking-widest"
            aria-hidden="true"
          >
            {index}
          </span>
        )}
        {index && (
          <div
            className="w-4 h-px bg-[var(--color-accent)]"
            aria-hidden="true"
          />
        )}
        <span className="technical-label">{label}</span>
      </div>

      {/* Primary heading */}
      <h2
        className={cn(
          "text-3xl lg:text-4xl font-medium tracking-tight",
          "text-[var(--color-foreground)]",
          align === "center" && "max-w-2xl mx-auto"
        )}
      >
        {heading}
      </h2>

      {/* Optional subheading */}
      {subheading && (
        <p
          className={cn(
            "text-base text-[var(--color-muted)] leading-relaxed",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-prose"
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
