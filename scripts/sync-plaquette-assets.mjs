import path from "node:path";
import sharp from "sharp";

const root = path.resolve("tmp-plaquette/extract");
const brand = path.resolve("public/brand");
const divisions = path.resolve("public/divisions");

async function knockOutDark(inputBuf, output, threshold = 55) {
  const { data, info } = await sharp(inputBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max - min;

    // Dark navy / black background → transparent
    if (max < threshold && sat < 24) {
      data[i + 3] = 0;
      continue;
    }
    // Soften edge
    if (max < threshold + 36 && sat < 28) {
      const a = Math.round(((max - threshold) / 36) * 255);
      data[i + 3] = Math.min(data[i + 3], Math.max(0, a));
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 12 })
    .png()
    .toFile(output);
}

# Equipment: dedicated plaquette page (yellow machinery yard)
await sharp(path.join(root, "img-12.jpg"))
  .extract({ left: 70, top: 340, width: 980, height: 360 })
  .jpeg({ quality: 93 })
  .toFile(path.join(divisions, "equipment.png"));

// Agriculture: dedicated plaquette page (tractor / precision farming)
await sharp(path.join(root, "img-14.jpg"))
  .extract({ left: 95, top: 345, width: 780, height: 280 })
  .jpeg({ quality: 93 })
  .toFile(path.join(divisions, "agriculture.png"));


// Logo lockup from dedicated logo page — center crop, tighter
const logoRaw = await sharp(path.join(root, "img-24.jpg"))
  .extract({ left: 560, top: 180, width: 640, height: 520 })
  .png()
  .toBuffer();

await knockOutDark(logoRaw, path.join(brand, "herna-logo-clear.png"), 58);

await sharp(path.join(brand, "herna-logo-clear.png"))
  .resize(720, 620, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(path.join(brand, "herna-logo-official.png"));

await sharp(path.join(brand, "herna-logo-clear.png"))
  .resize(720, 620, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(path.join(brand, "herna-logo.png"));

// Nav: slightly wider compact lockup
await sharp(path.join(brand, "herna-logo-clear.png"))
  .resize({
    width: 280,
    height: 96,
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(path.join(brand, "herna-logo-nav-clear.png"));

console.log("Refined crops done");
