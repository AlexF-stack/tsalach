import { chromium, devices } from "@playwright/test";
import fs from "fs";

const BASE = process.env.AUDIT_URL || "http://127.0.0.1:3005";

async function measure(label, opts) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(opts);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  const started = Date.now();
  const response = await page.goto(`${BASE}/fr`, {
    waitUntil: "domcontentloaded",
    timeout: 120000,
  });
  const dcl = Date.now() - started;

  await page.waitForTimeout(800);
  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const paints = Object.fromEntries(
      performance.getEntriesByType("paint").map((p) => [p.name, Math.round(p.startTime)]),
    );
    const resources = performance.getEntriesByType("resource");
    const byType = {};
    let transfer = 0;
    for (const r of resources) {
      const t = r.initiatorType || "other";
      byType[t] = (byType[t] || 0) + 1;
      transfer += r.transferSize || 0;
    }
    const imgs = [...document.querySelectorAll("img")].map((img) => ({
      broken: img.complete && img.naturalWidth === 0,
      lazy: img.loading === "lazy",
      w: img.naturalWidth,
      src: (img.currentSrc || img.src || "").slice(-60),
    }));
    const sections = [...document.querySelectorAll("section[id]")].map((s) => s.id);
    const h1 = document.querySelectorAll("h1").length;
    const skip = !!document.querySelector(".skip-link, a[href='#main']");
    const overflow =
      Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) >
      document.documentElement.clientWidth + 2;

    // contrast-ish: muted on soft bg sample
    const sample = document.querySelector("#dna p, #story p, #about p");
    let sampleColor = null;
    if (sample) {
      const cs = getComputedStyle(sample);
      sampleColor = { color: cs.color, bg: getComputedStyle(sample.parentElement || sample).backgroundColor };
    }

    return {
      title: document.title,
      sections,
      h1,
      skip,
      overflow,
      imgCount: imgs.length,
      brokenImgs: imgs.filter((i) => i.broken).length,
      lazyImgs: imgs.filter((i) => i.lazy).length,
      paints,
      navTiming: nav
        ? {
            ttfb: Math.round(nav.responseStart - nav.requestStart),
            domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
            load: Math.round(nav.loadEventEnd - nav.startTime),
            transferSize: nav.transferSize,
          }
        : null,
      resourceCount: resources.length,
      resourcesByType: byType,
      approxTransferKb: Math.round(transfer / 1024),
      sampleColor,
      heroOpacity: (() => {
        const h = document.querySelector("#hero-heading");
        return h ? getComputedStyle(h).opacity : null;
      })(),
    };
  });

  // network idle timing
  const idleStart = Date.now();
  try {
    await page.waitForLoadState("networkidle", { timeout: 30000 });
  } catch {}
  const idleMs = Date.now() - idleStart;

  await page.screenshot({
    path: `tmp-plaquette/audit-${label}.png`,
    fullPage: false,
  });

  await browser.close();
  return {
    label,
    status: response?.status() ?? 0,
    dclMs: dcl,
    networkIdleExtraMs: idleMs,
    errors: errors.slice(0, 8),
    ...metrics,
  };
}

const results = [];
results.push(await measure("desktop", { viewport: { width: 1440, height: 900 } }));
results.push(await measure("mobile", devices["iPhone 13"]));
results.push(await measure("tablet", { viewport: { width: 768, height: 1024 } }));

fs.writeFileSync("tmp-plaquette/audit-runtime.json", JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
