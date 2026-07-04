import type { Config } from "tailwindcss";

/**
 * Hillary Portfolio — Tailwind v4 Configuration
 *
 * In Tailwind v4, design tokens (colors, fonts, spacing) are defined
 * in globals.css using the @theme directive — not here.
 *
 * This file handles only what CSS cannot:
 * - Content scanning paths (which files Tailwind scans for class names)
 *
 * All color tokens, typography, spacing, and animations
 * are defined in app/globals.css inside @theme {}
 */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
