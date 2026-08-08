import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const brand = path.resolve("public/brand");
const partners = path.resolve("public/partners");
const publicDir = path.resolve("public");

const tpgSrc = path.resolve(
  "C:/Users/ALEX/.cursor/projects/c-Users-ALEX-Desktop-herna/assets/c__Users_ALEX_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_Capture_d__cran_2026-07-16_164122-349d842b-1226-4aa1-a1c3-03a5b9bba52e.png",
);

const hernaClear = path.join(brand, "herna-logo-clear.png");

async function knockNearWhite(input, output, threshold = 245) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (min > threshold && max - min < 18) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 8 })
    .png()
    .toFile(output);
}

async function knockNearBlack(input, output, threshold = 28) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    if (max < threshold) data[i + 3] = 0;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 6 })
    .png()
    .toFile(output);
}

// --- TPG: user-provided gold/navy lockup ---
await sharp(tpgSrc)
  .resize({ width: 900, withoutEnlargement: true })
  .jpeg({ quality: 95 })
  .toFile(path.join(partners, "tpg.jpg"));

await knockNearWhite(tpgSrc, path.join(partners, "tpg-clear.png"));
await sharp(path.join(partners, "tpg-clear.png"))
  .resize({ width: 720, height: 320, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(partners, "tpg.png"));

// --- HERNA nav: compact transparent lockup from official clear ---
const navRaw = path.join(brand, "_nav-raw.png");
await knockNearBlack(hernaClear, navRaw, 42);
await sharp(navRaw)
  .resize({ width: 320, height: 110, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(brand, "herna-logo-nav-clear.png"));
await sharp(navRaw)
  .resize({ width: 320, height: 110, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(brand, "herna-logo-nav.png"));

// --- Favicons / app icons from official HERNA lockup (replace old gear icon) ---
const markCrop = await sharp(hernaClear)
  .extract({ left: 180, top: 40, width: 280, height: 280 })
  .resize(512, 512, { fit: "contain", background: { r: 10, g: 14, b: 26, alpha: 1 } })
  .png()
  .toBuffer();

await sharp(markCrop).resize(180, 180).png().toFile(path.join(publicDir, "apple-icon.png"));
await sharp(markCrop).resize(512, 512).png().toFile(path.join(publicDir, "icon-512.png"));
await sharp(markCrop).resize(48, 48).png().toFile(path.join(publicDir, "favicon.png"));
await sharp(markCrop).resize(32, 32).png().toFile(path.join(publicDir, "favicon-32.png"));
await sharp(markCrop).resize(192, 192).png().toFile(path.join(publicDir, "icon.png"));

fs.unlinkSync(navRaw);
console.log("TPG + HERNA nav + favicons updated");
