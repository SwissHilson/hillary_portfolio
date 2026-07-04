import type { Project } from "@/types";

/**
 * Hillary Portfolio — Projects Data
 *
 * Architecture note:
 * Data lives here, not in components. Components consume data — they do not own it.
 * When you add a new project, you update this file only.
 * The /work page and any featured sections update automatically.
 *
 * Add project images to: /public/images/projects/
 * Reference them in the image field as: "/images/projects/filename.jpg"
 */

export const projects: Project[] = [

  // ─── Software Projects ───────────────────────────────────────────────────

  {
    id: "eventconnect",
    title: "EventConnect",
    description:
      "A university event discovery platform solving the communication gap between student event organisers and their audience at UNN.",
    longDescription:
      "EventConnect addresses a real problem on university campuses — events happen, but students miss them because communication is fragmented across WhatsApp groups, notice boards, and word of mouth. The platform centralises event discovery, enables organisers to publish structured event information, and gives students a reliable feed of campus activity.",
    category: "software",
    tags: ["TypeScript", "Supabase", "PostgreSQL", "Web App"],
    status: "live",
    year: "2024",
    links: {
      live: "https://eventconnecthub.com/",
    },
    highlights: [
      "Real-time event discovery and notifications",
      "Organiser and attendee role management",
      "Supabase backend with PostgreSQL database",
      "Live and actively used at UNN",
    ],
    featured: true,
  },

  {
    id: "ai-cgpa-calculator",
    title: "AI-Powered CGPA Calculator",
    description:
      "An engineering academic tool combining CGPA calculation with an AI mentor — helping university students track performance and get intelligent academic guidance.",
    longDescription:
      "Built to solve a real problem faced by Nigerian university students: understanding their academic standing and getting actionable guidance on how to improve it. The AI mentor component uses the Gemini API to provide context-aware academic advice based on the student's actual performance data — not generic responses.",
    category: "software",
    tags: ["Django REST Framework", "Python", "Gemini API", "AI"],
    status: "in-progress",
    year: "2025",
    links: {
      github: "https://github.com/SwissHilson",
    },
    highlights: [
      "CGPA calculation engine with Nigerian university grading systems",
      "AI academic mentor powered by Google Gemini API",
      "Django REST Framework backend with structured API",
      "Designed for Nigerian university students",
    ],
    featured: true,
  },

  {
    id: "backend-api-suite",
    title: "Backend API Suite",
    description:
      "A collection of production-grade RESTful APIs built with Django and PostgreSQL for various domain problems.",
    category: "software",
    tags: ["Django", "DRF", "PostgreSQL", "Python"],
    status: "completed",
    year: "2024",
    links: {
      github: "https://github.com/SwissHilson",
    },
    highlights: [
      "Authentication and authorisation systems",
      "Relational data modelling with PostgreSQL",
      "API versioning and structured error handling",
      "Input validation and security middleware",
    ],
    featured: false,
  },

  // ─── Entrepreneurship ────────────────────────────────────────────────────

  {
    id: "hileco-bricks",
    title: "HilEco Bricks",
    description:
      "Co-founded a sustainable construction materials initiative developing eco-friendly bricks for African markets — focused on affordability and environmental responsibility.",
    longDescription:
      "HilEco Bricks was founded on the premise that African construction does not have to choose between affordability and environmental responsibility. We are exploring alternative brick formulations that reduce embodied carbon compared to conventional fired clay bricks while maintaining structural performance for low-rise residential construction.",
    category: "entrepreneurship",
    tags: ["Sustainable Construction", "Entrepreneurship", "R&D", "Africa"],
    status: "in-progress",
    year: "2023",
    highlights: [
      "Eco-friendly brick formulation research",
      "Market analysis across Nigerian construction sector",
      "Cost-benefit study vs. conventional materials",
      "Early-stage R&D with long-term production roadmap",
    ],
    featured: true,
  },

  // ─── Engineering Projects ────────────────────────────────────────────────

  {
    id: "structural-design-projects",
    title: "Structural Design Studies",
    description:
      "Academic structural engineering projects including reinforced concrete design, steel structure analysis, and load calculations following Nigerian and British standards.",
    category: "engineering",
    tags: ["Structural Engineering", "Reinforced Concrete", "Steel Structures", "AutoCAD"],
    status: "completed",
    year: "2024",
    highlights: [
      "Reinforced concrete beam and column design",
      "Steel structure connection and member design",
      "Load analysis and structural calculations",
      "Technical drawing production in AutoCAD",
    ],
    featured: true,
  },

  {
    id: "hydraulic-design-projects",
    title: "Hydraulic & Water Systems",
    description:
      "Hydraulics and fluid mechanics projects covering pipe flow analysis, open channel design, and drainage system calculations.",
    category: "engineering",
    tags: ["Hydraulics", "Fluid Mechanics", "Water Systems", "Engineering"],
    status: "completed",
    year: "2024",
    highlights: [
      "Open channel flow design and analysis",
      "Pipe network hydraulic calculations",
      "Drainage system sizing and layout",
      "Fluid mechanics laboratory reports",
    ],
    featured: false,
  },

  {
    id: "transportation-projects",
    title: "Transportation Engineering",
    description:
      "Transportation engineering studies covering road design geometry, traffic analysis, and pavement engineering principles.",
    category: "engineering",
    tags: ["Transportation", "Road Design", "Pavement Engineering", "Traffic"],
    status: "completed",
    year: "2024",
    highlights: [
      "Highway geometric design",
      "Pavement thickness design",
      "Traffic volume studies",
      "Road safety analysis",
    ],
    featured: false,
  },

  // ─── CAD Projects ────────────────────────────────────────────────────────

  {
    id: "architectural-cad-drawings",
    title: "Architectural CAD Drawings",
    description:
      "Technical drawings produced in AutoCAD and Archicad — floor plans, elevations, sections, and construction details to professional drawing standards.",
    category: "cad",
    tags: ["AutoCAD", "Archicad", "Technical Drawing", "BIM"],
    status: "completed",
    year: "2024",
    highlights: [
      "Floor plan production with full annotation",
      "Elevation and section drawings",
      "Construction detail drawings",
      "BIM model development in Archicad",
    ],
    featured: true,
  },
];

// ─── Derived Collections ─────────────────────────────────────────────────────

export const featuredProjects = projects.filter((p) => p.featured);
export const softwareProjects = projects.filter((p) => p.category === "software");
export const engineeringProjects = projects.filter((p) => p.category === "engineering");
export const cadProjects = projects.filter((p) => p.category === "cad");
export const entrepreneurshipProjects = projects.filter(
  (p) => p.category === "entrepreneurship"
);

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
