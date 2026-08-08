/** Visuels institutionnels TSALACH — locaux `public/visuals` (thème infra / Afrique) */
export const visuals = {
  hero: "/visuals/hero-infra.jpg",
  building: "/visuals/building-glass.jpg",
  construction: "/visuals/construction-site.jpg",
  bridge: "/visuals/bridge-infra.jpg",
  road: "/visuals/road-urban.jpg",
  housing: "/visuals/housing.jpg",
  civil: "/visuals/civil-works.jpg",
  skyline: "/visuals/africa-urban.jpg",
  meeting: "/visuals/meeting-ppp.jpg",
  africa: "/visuals/africa-urban.jpg",
  crane: "/visuals/construction-site.jpg",
  blueprint: "/visuals/blueprint.jpg",
  engineering: "/visuals/engineering-plans.jpg",
  closing: "/visuals/building-glass.jpg",
  ambition: "/visuals/africa-urban.jpg",
} as const;

/** Mapping objet social → image */
export const objetVisuals: Record<string, string> = {
  immobilier: visuals.housing,
  epc: visuals.construction,
  ppp: visuals.meeting,
  engineering: visuals.blueprint,
  "public-works": visuals.civil,
};

/** Domaines d'expertise → image */
export const domainVisuals: Record<string, string> = {
  immobilier: visuals.building,
  infrastructures: visuals.road,
  ingenierie: visuals.engineering,
};
