import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS, SITE_COORDINATES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Footer — Site-wide footer
 *
 * Architecture:
 * - Server component — no interactivity needed, zero JS overhead
 * - Three-column layout on desktop, stacked on mobile
 * - Left: brand identity + mission statement
 * - Center: navigation links (mirrors navbar)
 * - Right: social links + coordinates
 * - Bottom bar: copyright + technical label
 *
 * Design rationale:
 * The footer is the last thing a recruiter sees before closing the tab
 * or clicking contact. It must reinforce identity, not just fill space.
 * The coordinates ground the site in a specific geography — this is
 * intentional. African infrastructure is the mission. Own that location.
 */

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className={cn(
        "border-t border-[var(--color-border)]",
        "bg-[var(--color-background)]"
      )}
      aria-label="Site footer"
    >
      <div className="site-container">
        {/* ── Main Footer Content ──────────────────────────────────────── */}
        <div
          className={cn(
            "grid grid-cols-1 gap-12",
            "md:grid-cols-3",
            "py-16"
          )}
        >
          {/* Column 1 — Brand Identity */}
          <div className="flex flex-col gap-4">
            {/* CH Mark */}
            <Link
              href="/"
              className="flex items-center gap-3 group w-fit"
              aria-label="Chukwuemeka Hillary — Home"
            >
              <div
                className={cn(
                  "flex items-center justify-center",
                  "w-8 h-8",
                  "border border-[var(--color-accent)]",
                  "transition-all duration-300",
                  "group-hover:bg-[var(--color-accent)]"
                )}
                aria-hidden="true"
              >
                <span
                  className={cn(
                    "font-mono text-xs font-semibold",
                    "text-[var(--color-accent)]",
                    "transition-colors duration-300",
                    "group-hover:text-[var(--color-accent-foreground)]"
                  )}
                >
                  CH
                </span>
              </div>
              <span className="font-mono text-sm text-[var(--color-foreground)]">
                Chukwuemeka Hillary
              </span>
            </Link>

            {/* Mission */}
            <p
              className={cn(
                "text-sm leading-relaxed",
                "text-[var(--color-muted)]",
                "max-w-[260px]"
              )}
            >
              Civil Engineer combining structural design and software
              development to build Africa&apos;s infrastructure future.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div className="flex flex-col gap-4">
            <span className="technical-label">Navigation</span>
            <nav
              aria-label="Footer navigation"
              className="flex flex-col gap-2"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-mono text-xs tracking-widest uppercase",
                    "text-[var(--color-muted)]",
                    "hover:text-[var(--color-foreground)]",
                    "transition-colors duration-200",
                    "w-fit"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Contact & Location */}
          <div className="flex flex-col gap-4">
            <span className="technical-label">Connect</span>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className={cn(
                  "flex items-center gap-3 w-fit",
                  "text-[var(--color-muted)]",
                  "hover:text-[var(--color-foreground)]",
                  "transition-colors duration-200 group"
                )}
              >
                <Github
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="group-hover:text-[var(--color-accent)] transition-colors duration-200"
                />
                <span className="font-mono text-xs">GitHub</span>
              </a>

              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className={cn(
                  "flex items-center gap-3 w-fit",
                  "text-[var(--color-muted)]",
                  "hover:text-[var(--color-foreground)]",
                  "transition-colors duration-200 group"
                )}
              >
                <Linkedin
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="group-hover:text-[var(--color-accent)] transition-colors duration-200"
                />
                <span className="font-mono text-xs">LinkedIn</span>
              </a>

              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                aria-label="Send email"
                className={cn(
                  "flex items-center gap-3 w-fit",
                  "text-[var(--color-muted)]",
                  "hover:text-[var(--color-foreground)]",
                  "transition-colors duration-200 group"
                )}
              >
                <Mail
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="group-hover:text-[var(--color-accent)] transition-colors duration-200"
                />
                <span className="font-mono text-xs">{SOCIAL_LINKS.email}</span>
              </a>
            </div>

            {/* Coordinates — engineering identity marker */}
            <div className="mt-4 pt-4 border-t border-[var(--color-border-subtle)]">
              <p className="technical-label leading-relaxed">
                {SITE_COORDINATES.lat} / {SITE_COORDINATES.lng}<br />
                {SITE_COORDINATES.institution}
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ───────────────────────────────────────────────── */}
        <div
          className={cn(
            "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
            "py-6",
            "border-t border-[var(--color-border-subtle)]"
          )}
        >
          <p className="technical-label">
            © {currentYear} Chukwuemeka Chidera Hillary. All rights reserved.
          </p>

          <p className="technical-label">
            Designed and built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
