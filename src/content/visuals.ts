/** Visuels institutionnels TSALACH — locaux `public/visuals` (infra / chantier / Afrique) */
export const visuals = {
  hero: "/visuals/hero-infra.jpg",
  building: "/visuals/building-glass.jpg",
  construction: "/visuals/construction-site.jpg",
  /** Ancien fichier cascade retiré du mapping — génie civil chantier */
  bridge: "/visuals/civil-works.jpg",
  road: "/visuals/building-glass.jpg",
  housing: "/visuals/housing.jpg",
  civil: "/visuals/civil-works.jpg",
  skyline: "/visuals/africa-urban.jpg",
  meeting: "/visuals/meeting-ppp.jpg",
  africa: "/visuals/africa-urban.jpg",
  crane: "/visuals/construction-site.jpg",
  /** Plans / ingénierie — pas d’écran de code */
  blueprint: "/visuals/engineering-plans.jpg",
  engineering: "/visuals/engineering-plans.jpg",
  closing: "/visuals/building-glass.jpg",
  ambition: "/visuals/africa-urban.jpg",
} as const;

/** Mapping objet social → image */
export const objetVisuals: Record<string, string> = {
  immobilier: visuals.housing,
  epc: visuals.construction,
  ppp: visuals.meeting,
  engineering: visuals.engineering,
  "public-works": visuals.civil,
};

/** Domaines d'expertise → image */
export const domainVisuals: Record<string, string> = {
  immobilier: visuals.building,
  infrastructures: visuals.civil,
  ingenierie: visuals.engineering,
};
