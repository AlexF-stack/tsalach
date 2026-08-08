import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = path.resolve("public/partners");

async function clearLightBg(input, output, { maxLum = 228, maxChroma = 28 } = {}) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);

    if (lum >= maxLum && chroma <= maxChroma) {
      data[i + 3] = 0;
      continue;
    }

    // Soft edge for near-white fringes
    if (lum > maxLum - 28 && chroma <= maxChroma + 18) {
      const t = Math.min(1, Math.max(0, (lum - (maxLum - 28)) / 40));
      data[i + 3] = Math.round(data[i + 3] * (1 - t * 0.95));
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 10 })
    .png({ compressionLevel: 9 })
    .toFile(output);

  await log(output);
}

async function tpgFromLuma(input, output, { ink = false } = {}) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    let a = Math.round(((lum - 36) / 219) * 255);
    a = Math.max(0, Math.min(255, a));
    if (a < 14) a = 0;

    if (ink) {
      data[i] = 18;
      data[i + 1] = 22;
      data[i + 2] = 28;
    } else {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
    data[i + 3] = a;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 12 })
    .png({ compressionLevel: 9 })
    .toFile(output);

  await log(output);
}

async function log(output) {
  const meta = await sharp(output).metadata();
  console.log(
    path.basename(output),
    `${meta.width}x${meta.height}`,
    `${fs.statSync(output).size}b`,
    `alpha=${meta.hasAlpha}`,
  );
}

await clearLightBg(path.join(dir, "hmd.jpg"), path.join(dir, "hmd-clear.png"), {
  maxLum: 226,
  maxChroma: 40,
});
await clearLightBg(path.join(dir, "osgb.jpg"), path.join(dir, "osgb-clear.png"), {
  maxLum: 218,
  maxChroma: 32,
});
await tpgFromLuma(path.join(dir, "tpg.jpg"), path.join(dir, "tpg-white.png"), {
  ink: false,
});
await tpgFromLuma(path.join(dir, "tpg.jpg"), path.join(dir, "tpg-clear.png"), {
  ink: true,
});
console.log("done");
