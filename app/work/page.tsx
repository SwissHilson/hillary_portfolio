import { Suspense } from "react";
import WorkClient from "./WorkClient";

/**
 * Work Page — Server Component Shell
 *
 * Architecture:
 * Next.js 15 requires that any component using useSearchParams() be wrapped
 * in a <Suspense> boundary. This page is a minimal server component whose
 * only job is to provide that boundary.
 *
 * The actual page content lives in WorkClient — a client component that
 * handles URL state, filtering, and animations.
 *
 * Why this separation matters:
 * - Server component = zero client JS for the shell
 * - Suspense boundary = no static generation failure on Vercel
 * - WorkClient = all interactivity isolated in one place
 *
 * The fallback renders a minimal loading state that matches the design
 * system — not a generic spinner. It occupies the same visual space
 * as the loaded content to prevent layout shift.
 */

function WorkFallback() {
  return (
    <div className="flex flex-col">
      {/* Hero skeleton */}
      <div className="border-b border-[var(--color-border)] py-24 lg:py-32">
        <div className="site-container">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div className="h-3 w-24 bg-[var(--color-surface)] animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-10 w-3/4 bg-[var(--color-surface)] animate-pulse" />
              <div className="h-10 w-1/2 bg-[var(--color-surface)] animate-pulse" />
            </div>
            <div className="h-4 w-2/3 bg-[var(--color-surface)] animate-pulse" />
          </div>
        </div>
      </div>
      {/* Filter skeleton */}
      <div className="border-b border-[var(--color-border)] py-4">
        <div className="site-container flex gap-6">
          {[120, 80, 96, 80, 110].map((w, i) => (
            <div
              key={i}
              className="h-3 bg-[var(--color-surface)] animate-pulse rounded-none"
              style={{ width: w }}
            />
          ))}
        </div>
      </div>
      {/* Grid skeleton */}
      <div className="site-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-[var(--color-background)] animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={<WorkFallback />}>
      <WorkClient />
    </Suspense>
  );
}
