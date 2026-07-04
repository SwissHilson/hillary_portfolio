"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

/**
 * Navbar — Primary site navigation
 *
 * Architecture:
 * - Fixed position, full width, sits above all content (z-nav)
 * - Transparent by default; border appears only after scroll
 * - CH monogram mark + full name for brand identity
 * - Active route indicated by accent underline (CAD dimension line analog)
 * - Mobile: slide-in drawer from right, closes on route change
 * - Theme toggle: sun/moon with no flash on mount (mounted state guard)
 *
 * Accessibility:
 * - aria-label on nav element
 * - aria-current="page" on active link
 * - aria-expanded on mobile menu trigger
 * - aria-hidden on decorative elements
 * - Focus trap consideration: drawer closes on Escape key
 *
 * Performance:
 * - useEffect scroll listener is passive and cleaned up on unmount
 * - No framer-motion here — CSS transitions only, keeps this component
 *   lightweight since it renders on every page
 */

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Guards against hydration mismatch on theme icon
  const [mounted, setMounted] = useState(false);

  // Controls the border that appears on scroll
  const [scrolled, setScrolled] = useState(false);

  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Mount guard — theme is unknown until client hydrates
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll listener — passive for performance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[30]",
          "transition-all duration-300 ease-in-out",
          // Background: always present but subtle — allows hero to breathe
          "bg-[var(--color-background)]/90 backdrop-blur-md",
          // Border appears on scroll — structural, not decorative
          scrolled
            ? "border-b border-[var(--color-border)]"
            : "border-b border-transparent"
        )}
      >
        <div className="site-container">
          <nav
            aria-label="Primary navigation"
            className="flex items-center justify-between h-16"
          >
            {/* ── Brand Mark ─────────────────────────────────────────── */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Chukwuemeka Hillary — Home"
            >
              {/* CH Monogram — engineering mark */}
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
                    "font-mono text-xs font-semibold tracking-tight",
                    "text-[var(--color-accent)]",
                    "transition-colors duration-300",
                    "group-hover:text-[var(--color-accent-foreground)]"
                  )}
                >
                  CH
                </span>
              </div>

              {/* Full name — SEO and accessibility */}
              <span
                className={cn(
                  "font-mono text-sm tracking-tight",
                  "text-[var(--color-foreground)]",
                  "transition-colors duration-300",
                  // Hide on very small screens to keep navbar clean
                  "hidden sm:block"
                )}
              >
                Chukwuemeka Hillary
              </span>
            </Link>

            {/* ── Desktop Navigation ──────────────────────────────────── */}
            <div
              className="hidden md:flex items-center gap-8"
              role="list"
            >
              {NAV_LINKS.map((link) => (
                <div key={link.href} role="listitem">
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "relative font-mono text-xs tracking-widest uppercase",
                      "transition-colors duration-200",
                      "py-1",
                      // Active state
                      isActive(link.href)
                        ? "text-[var(--color-foreground)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
                      // Accent underline group
                      "accent-line",
                      isActive(link.href) && "active"
                    )}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* ── Controls: Theme Toggle + Mobile Menu ────────────────── */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label={
                  mounted
                    ? resolvedTheme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                    : "Toggle theme"
                }
                className={cn(
                  "flex items-center justify-center",
                  "w-8 h-8",
                  "text-[var(--color-muted)]",
                  "hover:text-[var(--color-foreground)]",
                  "transition-colors duration-200",
                  "focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[var(--color-accent)]"
                )}
              >
                {/* Render nothing until mounted — prevents hydration mismatch */}
                {mounted ? (
                  resolvedTheme === "dark" ? (
                    <Sun size={15} strokeWidth={1.5} aria-hidden="true" />
                  ) : (
                    <Moon size={15} strokeWidth={1.5} aria-hidden="true" />
                  )
                ) : (
                  // Placeholder with same dimensions — prevents layout shift
                  <span className="w-[15px] h-[15px] block" aria-hidden="true" />
                )}
              </button>

              {/* Mobile Menu Trigger — md and below only */}
              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className={cn(
                  "flex items-center justify-center",
                  "w-8 h-8 md:hidden",
                  "text-[var(--color-muted)]",
                  "hover:text-[var(--color-foreground)]",
                  "transition-colors duration-200"
                )}
              >
                {mobileOpen ? (
                  <X size={16} strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Menu size={16} strokeWidth={1.5} aria-hidden="true" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────────────────── */}
      {/*
        Architecture: The drawer is a full-height overlay rather than a
        dropdown. This is intentional — it forces the user's full attention
        on navigation, consistent with the precision-first design philosophy.

        It slides in from the right. Background overlay closes it on click.
        z-index sits below the header so the CH mark remains visible.
      */}

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        className={cn(
          "fixed inset-0 z-[25] md:hidden",
          "bg-[var(--color-background)]/60 backdrop-blur-sm",
          "transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer Panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-[28] md:hidden",
          "w-72 flex flex-col",
          "bg-[var(--color-surface)] border-l border-[var(--color-border)]",
          "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div
          className={cn(
            "flex items-center justify-between",
            "h-16 px-6",
            "border-b border-[var(--color-border)]"
          )}
        >
          {/* Technical label — coordinates the brand identity */}
          <span className="technical-label">Navigation</span>

          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className={cn(
              "flex items-center justify-center w-8 h-8",
              "text-[var(--color-muted)] hover:text-[var(--color-foreground)]",
              "transition-colors duration-200"
            )}
          >
            <X size={15} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col px-6 pt-8 gap-1"
        >
          {NAV_LINKS.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "flex items-center gap-4",
                "py-3 border-b border-[var(--color-border-subtle)]",
                "transition-colors duration-200 group"
              )}
            >
              {/* Index number — engineering drawing annotation style */}
              <span
                className="font-mono text-2xs text-[var(--color-muted-foreground)] w-4"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className={cn(
                  "font-mono text-sm tracking-widest uppercase",
                  "transition-colors duration-200",
                  isActive(link.href)
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-muted)] group-hover:text-[var(--color-foreground)]"
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Drawer Footer — coordinates, engineering identity */}
        <div className="mt-auto px-6 pb-8">
          <p className="technical-label leading-relaxed">
            06°51′44″N / 007°23′57″E<br />
            Nsukka, Nigeria
          </p>
        </div>
      </div>
    </>
  );
}
