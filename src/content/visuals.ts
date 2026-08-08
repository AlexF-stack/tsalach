/** Visuels TSALACH — sources distinctes sur la homepage (réutilisations minimales) */
export const visuals = {
  hero: "/visuals/hero-infra.jpg",
  construction: "/visuals/construction-site.jpg",
  workers: "/visuals/workers-site.jpg",
  meeting: "/visuals/meeting-ppp.jpg",
  boardroom: "/visuals/boardroom.jpg",
  excavator: "/visuals/excavator.jpg",
  civil: "/visuals/civil-works.jpg",
  building: "/visuals/building-glass.jpg",
  towers: "/visuals/modern-housing.jpg",
  architecture: "/visuals/arch-white.jpg",
  residences: "/visuals/residences.jpg",
  housing: "/visuals/housing.jpg",
  skyline: "/visuals/city-skyline.jpg",
  dusk: "/visuals/city-dusk.jpg",
  africa: "/visuals/africa-city.jpg",
  africaCity: "/visuals/africa-city.jpg",
  engineering: "/visuals/engineering-plans.jpg",
  closing: "/visuals/city-dusk.jpg",
  ambition: "/visuals/construction-site.jpg",
  bridge: "/visuals/excavator.jpg",
  road: "/visuals/city-skyline.jpg",
  crane: "/visuals/workers-site.jpg",
  blueprint: "/visuals/engineering-plans.jpg",
} as const;

/** Métiers */
export const objetVisuals: Record<string, string> = {
  immobilier: visuals.residences,
  epc: visuals.workers,
  ppp: visuals.boardroom,
  engineering: visuals.engineering,
  "public-works": visuals.excavator,
};

/** Domaines d'expertise */
export const domainVisuals: Record<string, string> = {
  immobilier: visuals.towers,
  infrastructures: visuals.dusk,
  ingenierie: visuals.architecture,
};

/** Secteurs d'impact */
export const sectorVisuals: Record<string, string> = {
  housing: visuals.housing,
  "public-facilities": visuals.skyline,
  "urban-infra": visuals.building,
  territorial: visuals.africaCity,
  "ppp-projects": visuals.meeting,
};
