import Hero from "@/components/sections/Hero";

/**
 * Home page — root route
 *
 * Architecture note:
 * This is a Server Component. Hero is Client Component (Framer Motion).
 * Next.js handles the boundary automatically — no "use client" needed here.
 * Future sections (Featured Work, Skills snapshot) will be added below Hero.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}
