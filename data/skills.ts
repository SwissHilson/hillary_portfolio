import type { SkillGroup } from "@/types";

/**
 * Hillary Portfolio — Skills Data
 *
 * Skills are organized into groups by category.
 * The "level" field drives visual treatment:
 * - proficient → full opacity, solid indicator
 * - learning   → slightly muted, dashed indicator
 * - planned    → most muted, dotted indicator (future roadmap)
 *
 * This is honest communication. Showing a "planned" skill signals
 * intentionality and direction — it tells recruiters where you are going,
 * not just where you are. That is a strength, not a weakness.
 */

export const skillGroups: SkillGroup[] = [
  {
    category: "civil-engineering",
    label: "Civil Engineering",
    description:
      "Core engineering discipline — structural analysis, hydraulic design, transportation systems, and construction technology.",
    skills: [
      { name: "Structural Engineering", category: "civil-engineering", level: "proficient" },
      { name: "Reinforced Concrete Design", category: "civil-engineering", level: "proficient" },
      { name: "Hydraulics & Fluid Mechanics", category: "civil-engineering", level: "proficient" },
      { name: "Transportation Engineering", category: "civil-engineering", level: "proficient" },
      { name: "Engineering Drawing", category: "civil-engineering", level: "proficient" },
      { name: "Surveying", category: "civil-engineering", level: "proficient" },
      { name: "Steel Structures", category: "civil-engineering", level: "proficient" },
      { name: "Construction Technology", category: "civil-engineering", level: "proficient" },
      { name: "Engineering Mathematics", category: "civil-engineering", level: "proficient" },
    ],
  },

  {
    category: "cad-bim",
    label: "CAD & BIM",
    description:
      "Digital design and building information modelling tools for technical drawing, 3D modelling, and construction documentation.",
    skills: [
      { name: "AutoCAD", category: "cad-bim", level: "proficient" },
      { name: "Archicad", category: "cad-bim", level: "proficient" },
      { name: "Revit", category: "cad-bim", level: "planned" },
      { name: "Civil 3D", category: "cad-bim", level: "planned" },
      { name: "ETABS", category: "cad-bim", level: "planned" },
      { name: "STAAD Pro", category: "cad-bim", level: "planned" },
      { name: "SAP2000", category: "cad-bim", level: "planned" },
      { name: "Tekla Structures", category: "cad-bim", level: "planned" },
    ],
  },

  {
    category: "programming",
    label: "Software Development",
    description:
      "Backend development, API design, and database engineering — building the software layer that makes infrastructure intelligent.",
    skills: [
      { name: "Python", category: "programming", level: "proficient" },
      { name: "Django", category: "programming", level: "proficient" },
      { name: "Django REST Framework", category: "programming", level: "proficient" },
      { name: "PostgreSQL", category: "programming", level: "proficient" },
      { name: "MySQL", category: "programming", level: "proficient" },
      { name: "REST API Design", category: "programming", level: "proficient" },
      { name: "Git & GitHub", category: "programming", level: "proficient" },
      { name: "HTML & CSS", category: "programming", level: "proficient" },
      { name: "JavaScript", category: "programming", level: "proficient" },
      { name: "React", category: "programming", level: "learning" },
      { name: "Next.js", category: "programming", level: "learning" },
      { name: "TypeScript", category: "programming", level: "learning" },
    ],
  },

  {
    category: "entrepreneurship",
    label: "Entrepreneurship",
    description:
      "Building ventures at the intersection of engineering and sustainability.",
    skills: [
      { name: "Product Development", category: "entrepreneurship", level: "proficient" },
      { name: "Sustainable Construction", category: "entrepreneurship", level: "proficient" },
      { name: "Market Research", category: "entrepreneurship", level: "proficient" },
      { name: "Technical Writing", category: "entrepreneurship", level: "proficient" },
    ],
  },
];

/**
 * getSkillsByCategory — Returns skills for a specific category
 */
export function getSkillsByCategory(
  category: SkillGroup["category"]
): SkillGroup | undefined {
  return skillGroups.find((g) => g.category === category);
}
