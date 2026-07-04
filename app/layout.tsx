import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import "@/app/globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f7" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Civil Engineer & Software Developer`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  keywords: [
    "Civil Engineer", "Software Developer", "Backend Developer",
    "Python Developer", "Django", "AutoCAD", "Archicad", "BIM",
    "Structural Engineering", "Nigeria", "University of Nigeria Nsukka",
    "UNN", "HilEco Bricks", "Infrastructure", "Sustainable Construction",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Civil Engineer & Software Developer`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Civil Engineer & Software Developer`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * RootLayout
 *
 * suppressHydrationWarning on both <html> and <body>:
 * - <html> — required by next-themes (class attribute differs server/client)
 * - <body> — required to suppress Grammarly extension attribute injection
 *   (data-new-gr-c-s-check-loaded, data-gr-ext-installed)
 *   These are browser extension artifacts, not code bugs.
 *   suppressHydrationWarning tells React to ignore mismatches on this
 *   specific element only — it does not suppress warnings in children.
 *
 * pt-16 on <main>: compensates for the fixed navbar height (64px = 4rem = 16)
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
