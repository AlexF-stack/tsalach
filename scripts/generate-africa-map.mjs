/**
 * Generates transparent Africa SVG with gold borders, Gabon fill, and HQ pin.
 * Run: node scripts/generate-africa-map.mjs
 * Gabon ISO numeric id = 266
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { feature } from "topojson-client";
import { geoMercator, geoPath } from "d3-geo";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const worldPath = path.join(__dirname, "data", "world-110m.json");
const outSvg = path.join(__dirname, "..", "public", "brand", "africa-map.svg");
const outMeta = path.join(__dirname, "..", "public", "brand", "africa-map-meta.json");

const AFRICA_IDS = new Set([
  12, 24, 72, 108, 120, 132, 140, 148, 174, 178, 180, 204, 226, 231, 232, 262,
  266, 270, 288, 324, 384, 404, 426, 430, 434, 450, 454, 466, 478, 480, 504,
  508, 516, 562, 566, 624, 646, 678, 686, 690, 694, 706, 710, 716, 728, 729,
  732, 748, 768, 788, 800, 818, 834, 854, 894,
]);

const world = JSON.parse(fs.readFileSync(worldPath, "utf8"));
const countries = feature(world, world.objects.countries);
const africa = {
  type: "FeatureCollection",
  features: countries.features.filter((f) => AFRICA_IDS.has(+f.id)),
};

const projection = geoMercator().fitSize([800, 900], africa);
const geoPathGen = geoPath(projection);

const countryPaths = [];
let gabonPath = "";
for (const f of africa.features) {
  const d = geoPathGen(f);
  if (!d) continue;
  if (+f.id === 266) gabonPath = d;
  else countryPaths.push(`    <path d="${d}" />`);
}

const gabon = africa.features.find((f) => +f.id === 266);
const [cx, cy] = geoPathGen.centroid(gabon);

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 900" fill="none">
  <defs>
    <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8CE8A"/>
      <stop offset="50%" stop-color="#C9A24B"/>
      <stop offset="100%" stop-color="#8A6A2E"/>
    </linearGradient>
    <linearGradient id="goldFill" x1="18%" y1="8%" x2="82%" y2="92%">
      <stop offset="0%" stop-color="#F0D78A"/>
      <stop offset="48%" stop-color="#C9A24B"/>
      <stop offset="100%" stop-color="#8A6A2E"/>
    </linearGradient>
    <filter id="pinGlow" x="-120%" y="-120%" width="340%" height="340%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#F0D78A" flood-opacity="0.85"/>
    </filter>
  </defs>
  <g id="countries" fill="none" stroke="url(#goldStroke)" stroke-width="1.15" stroke-linejoin="round">
${countryPaths.join("\n")}
  </g>
  <path id="gabon" d="${gabonPath}" fill="url(#goldFill)" stroke="#F0D78A" stroke-width="1.35" stroke-linejoin="round"/>
  <g id="hq-pin" filter="url(#pinGlow)">
    <circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="22" fill="none" stroke="#E8CE8A" stroke-width="1.2" opacity="0.55"/>
    <path d="M ${cx.toFixed(2)} ${(cy + 16).toFixed(2)} C ${(cx - 14).toFixed(2)} ${(cy + 1).toFixed(2)} ${(cx - 14).toFixed(2)} ${(cy - 14).toFixed(2)} ${cx.toFixed(2)} ${(cy - 14).toFixed(2)} C ${(cx + 14).toFixed(2)} ${(cy - 14).toFixed(2)} ${(cx + 14).toFixed(2)} ${(cy + 1).toFixed(2)} ${cx.toFixed(2)} ${(cy + 16).toFixed(2)} Z" fill="#F0D78A"/>
    <circle cx="${cx.toFixed(2)}" cy="${(cy - 4).toFixed(2)}" r="5.5" fill="#0a0e1a"/>
    <circle cx="${cx.toFixed(2)}" cy="${(cy - 4).toFixed(2)}" r="2.5" fill="#C9A24B"/>
  </g>
</svg>
`;

fs.writeFileSync(outSvg, svg);
fs.writeFileSync(
  outMeta,
  JSON.stringify({ gabonCentroid: [cx, cy], viewBox: [800, 900] }, null, 2),
);
console.log("Gabon centroid:", cx.toFixed(2), cy.toFixed(2));
console.log("Wrote", outSvg);
