/**
 * Generates a printable HERNA Company Profile PDF (A4).
 * Run: node scripts/generate-company-profile.mjs
 *
 * NOTE: The live downloadable asset is the official "Plaquette HERNA"
 * (`public/company-profile.pdf`). Do not overwrite it with this generator
 * unless you intentionally regenerate a draft substitute.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "..", "public", "company-profile.pdf");

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 54;
const CONTENT_W = PAGE_W - MARGIN * 2;

function escapePdf(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapLines(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function buildPageContent(blocks) {
  const ops = ["BT", "/F1 11 Tf", "0 g"];
  let y = PAGE_H - MARGIN - 12;

  for (const block of blocks) {
    const size = block.size ?? 11;
    const leading = block.leading ?? size + 5;
    const maxChars = block.maxChars ?? (size >= 16 ? 42 : size >= 13 ? 52 : 78);
    const gapBefore = block.gapBefore ?? 0;
    y -= gapBefore;
    if (y < MARGIN + 40) break;

    ops.push(`/F1 ${size} Tf`);
    const lines = [];
    for (const paragraph of block.lines) {
      lines.push(...wrapLines(paragraph, maxChars));
      if (block.paragraphGap) lines.push("");
    }

    let first = true;
    for (const line of lines) {
      if (y < MARGIN + 36) break;
      if (first) {
        ops.push(`1 0 0 1 ${MARGIN} ${y.toFixed(2)} Tm (${escapePdf(line)}) Tj`);
        first = false;
      } else {
        ops.push(`0 -${leading} Td (${escapePdf(line)}) Tj`);
      }
      y -= leading;
    }
  }

  ops.push("ET");
  return ops.join("\n");
}

const pages = [
  buildPageContent([
    { size: 22, leading: 28, maxChars: 36, lines: ["HERNA HOLDING"] },
    {
      size: 14,
      leading: 18,
      maxChars: 48,
      gapBefore: 6,
      lines: ["Heritage of Nations — Company Profile 2026"],
    },
    {
      size: 11,
      leading: 15,
      gapBefore: 18,
      lines: [
        "Pan-African investment holding based in Cotonou, Benin.",
        "We identify, finance and develop high-impact projects across strategic sectors.",
        "Ambition: build a lasting legacy through sustainable investments.",
      ],
    },
    { size: 14, leading: 18, gapBefore: 22, lines: ["Vision"] },
    {
      size: 11,
      leading: 15,
      gapBefore: 8,
      lines: [
        "To become a catalyst for Africa's economic transformation through strategic investments.",
      ],
    },
    { size: 14, leading: 18, gapBefore: 18, lines: ["Mission"] },
    {
      size: 11,
      leading: 15,
      gapBefore: 8,
      lines: [
        "To design, structure and support sustainable projects creating value for investors, communities and future generations.",
      ],
    },
    { size: 14, leading: 18, gapBefore: 18, lines: ["Approach"] },
    {
      size: 11,
      leading: 15,
      gapBefore: 8,
      lines: [
        "Every HERNA endeavor rests on five principles: Professionalism, Quality, Innovation, Partnership, and Sustainable Development.",
      ],
    },
    { size: 14, leading: 18, gapBefore: 22, lines: ["Contact"] },
    {
      size: 11,
      leading: 15,
      gapBefore: 8,
      lines: [
        "HERNA HOLDING",
        "Cotonou - Benin",
        "Phone: [+229] 0196399988",
        "Email: contact@hernaholding.com",
        "Web: https://www.hernaholding.com",
      ],
    },
  ]),
  buildPageContent([
    { size: 18, leading: 24, maxChars: 40, lines: ["Strategic Business Units"] },
    {
      size: 11,
      leading: 15,
      gapBefore: 14,
      lines: [
        "HERNA channels expertise through five divisions focused on critical sectors for Africa's progress.",
      ],
    },
    { size: 13, leading: 17, gapBefore: 18, lines: ["1. Equipment"] },
    {
      size: 10,
      leading: 14,
      gapBefore: 6,
      maxChars: 86,
      lines: [
        "Supply, distribution and maintenance of advanced technical and industrial solutions for construction, mining and agriculture.",
      ],
    },
    { size: 13, leading: 17, gapBefore: 14, lines: ["2. Real Estate & Infrastructure"] },
    {
      size: 10,
      leading: 14,
      gapBefore: 6,
      maxChars: 86,
      lines: [
        "Residential, commercial and public infrastructure projects — from land structuring to delivery.",
      ],
    },
    { size: 13, leading: 17, gapBefore: 14, lines: ["3. Mining"] },
    {
      size: 10,
      leading: 14,
      gapBefore: 6,
      maxChars: 86,
      lines: [
        "Exploration, development and support of responsible extraction projects with local partners.",
      ],
    },
    { size: 13, leading: 17, gapBefore: 14, lines: ["4. Agriculture & Livestock"] },
    {
      size: 10,
      leading: 14,
      gapBefore: 6,
      maxChars: 86,
      lines: [
        "Agro-industrial capacity from primary production to processing, strengthening local value chains.",
      ],
    },
    { size: 13, leading: 17, gapBefore: 14, lines: ["5. Energy"] },
    {
      size: 10,
      leading: 14,
      gapBefore: 6,
      maxChars: 86,
      lines: [
        "Electrical solutions, renewable generation and energy efficiency for public and private clients.",
      ],
    },
    { size: 14, leading: 18, gapBefore: 22, lines: ["Partners"] },
    {
      size: 11,
      leading: 15,
      gapBefore: 8,
      lines: [
        "TPG — The Pertinent Group",
        "HMD",
        "OSGB — Oluwa Shola Global Business",
      ],
    },
  ]),
  buildPageContent([
    { size: 18, leading: 24, maxChars: 40, lines: ["Profil d'entreprise HERNA"] },
    {
      size: 11,
      leading: 15,
      gapBefore: 14,
      lines: [
        "Holding d'investissement panafricaine basee a Cotonou (Benin).",
        "Nous identifions, financons et developpons des projets a fort impact dans des secteurs strategiques.",
      ],
    },
    { size: 14, leading: 18, gapBefore: 18, lines: ["Vision"] },
    {
      size: 11,
      leading: 15,
      gapBefore: 8,
      lines: [
        "Devenir un catalyseur de la transformation economique de l'Afrique grace a des investissements strategiques.",
      ],
    },
    { size: 14, leading: 18, gapBefore: 16, lines: ["Mission"] },
    {
      size: 11,
      leading: 15,
      gapBefore: 8,
      lines: [
        "Concevoir, structurer et accompagner des projets durables creant de la valeur pour les investisseurs, les communautes et les generations futures.",
      ],
    },
    { size: 14, leading: 18, gapBefore: 16, lines: ["Approche"] },
    {
      size: 11,
      leading: 15,
      gapBefore: 8,
      lines: [
        "Cinq principes: Professionnalisme, Qualite, Innovation, Partenariat, Developpement durable.",
      ],
    },
    { size: 14, leading: 18, gapBefore: 18, lines: ["Divisions"] },
    {
      size: 11,
      leading: 15,
      gapBefore: 8,
      lines: [
        "Equipement · Immobilier & Infrastructures · Mines · Agriculture & Elevage · Energie",
      ],
    },
    { size: 14, leading: 18, gapBefore: 18, lines: ["Contact"] },
    {
      size: 11,
      leading: 15,
      gapBefore: 8,
      lines: [
        "HERNA HOLDING — Cotonou, Benin",
        "Tel: [+229] 0196399988",
        "Email: contact@hernaholding.com",
        "https://www.hernaholding.com",
      ],
    },
    {
      size: 9,
      leading: 12,
      gapBefore: 28,
      maxChars: 90,
      lines: [
        "Document produit pour HERITAGE OF NATIONS (HERNA). Contenu institutionnel — 2026.",
      ],
    },
  ]),
];

function assemblePdf(pageStreams) {
  const objects = [];
  const add = (body) => {
    objects.push(body);
    return objects.length;
  };

  const fontId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const contentIds = pageStreams.map((stream) =>
    add(`<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}\nendstream`),
  );
  const pageIds = contentIds.map((contentId) =>
    add(
      `<< /Type /Page /Parent XXX /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Contents ${contentId} 0 R /Resources << /Font << /F1 ${fontId} 0 R >> >> >>`,
    ),
  );
  const kids = pageIds.map((id) => `${id} 0 R`).join(" ");
  const pagesId = add(`<< /Type /Pages /Kids [${kids}] /Count ${pageIds.length} >>`);
  // Patch parent refs
  for (let i = 0; i < pageIds.length; i++) {
    const idx = pageIds[i] - 1;
    objects[idx] = objects[idx].replace("/Parent XXX", `/Parent ${pagesId} 0 R`);
  }
  const catalogId = add(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 0; i < objects.length; i++) {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xref = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i <= objects.length; i++) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\n`;
  pdf += `startxref\n${xref}\n%%EOF\n`;
  return pdf;
}

const pdf = assemblePdf(pages);
fs.writeFileSync(outPath, pdf, "utf8");
console.log(`Wrote ${outPath} (${Buffer.byteLength(pdf)} bytes, ${pages.length} pages)`);
