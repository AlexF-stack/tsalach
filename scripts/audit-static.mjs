import fs from "fs";
import path from "path";

const visuals = fs
  .readdirSync("public/visuals")
  .filter((f) => /\.jpe?g$/i.test(f))
  .map((f) => {
    const s = fs.statSync(path.join("public/visuals", f));
    return { name: f, kb: Math.round(s.size / 1024) };
  })
  .sort((a, b) => b.kb - a.kb);

const brand = fs
  .readdirSync("public/brand")
  .filter((f) => /\.(png|jpe?g|svg)$/i.test(f))
  .map((f) => {
    const s = fs.statSync(path.join("public/brand", f));
    return { name: f, kb: Math.round(s.size / 1024) };
  })
  .sort((a, b) => b.kb - a.kb);

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const deps = Object.keys(pkg.dependencies || {});
const heavy = deps.filter((d) =>
  /three|gsap|lenis|framer|lucide|react-three/.test(d),
);

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", ".git"].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.(tsx|ts)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const files = walk("src");
const counts = {
  framer: 0,
  gsap: 0,
  three: 0,
  nextImage: 0,
  priorityHits: 0,
  dynamic: 0,
  useClient: 0,
};

for (const f of files) {
  const t = fs.readFileSync(f, "utf8");
  if (t.includes("framer-motion")) counts.framer++;
  if (t.includes("from \"gsap") || t.includes("from 'gsap")) counts.gsap++;
  if (t.includes("@react-three") || t.includes('from "three"')) counts.three++;
  if (t.includes("next/image")) counts.nextImage++;
  const pri = t.match(/\bpriority(?:={true}|\b)/g);
  if (pri) counts.priorityHits += pri.length;
  if (t.includes("next/dynamic")) counts.dynamic++;
  if (t.includes('"use client"') || t.includes("'use client'")) counts.useClient++;
}

const experience = fs.readFileSync("src/components/Experience.tsx", "utf8");
const homepageEager = [...experience.matchAll(/from "@\/components\/tsa\/(\w+)"/g)].map(
  (m) => m[1],
);
const homepageDynamic = [
  ...experience.matchAll(/import\("@\/components\/tsa\/(\w+)"\)/g),
].map((m) => m[1]);

const buildLog = fs.existsSync("tmp-plaquette/build-audit.log")
  ? fs.readFileSync("tmp-plaquette/build-audit.log", "utf8")
  : "";

fs.writeFileSync(
  "tmp-plaquette/audit-static.json",
  JSON.stringify(
    {
      visualsTotalKb: visuals.reduce((a, b) => a + b.kb, 0),
      visualsCount: visuals.length,
      visualsTop: visuals.slice(0, 10),
      brandTop: brand.slice(0, 8),
      depsHeavy: heavy,
      fileCounts: counts,
      tsFiles: files.length,
      homepageEager,
      homepageDynamic,
      buildLogTail: buildLog.split(/\r?\n/).slice(-60),
    },
    null,
    2,
  ),
);
console.log("wrote tmp-plaquette/audit-static.json");
