import { chromium, devices } from "@playwright/test";
import fs from "fs";

fs.mkdirSync("tmp-plaquette", { recursive: true });

async function audit(label, contextOptions) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:3000/fr", {
    waitUntil: "networkidle",
    timeout: 120000,
  });
  await page.waitForTimeout(1200);

  const report = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const overflowing = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      if (r.right > vw + 2 || r.left < -2) {
        overflowing.push({
          tag: el.tagName.toLowerCase(),
          id: el.id ? `#${el.id}` : "",
          cls: String(el.className || "").slice(0, 80),
          left: Math.round(r.left),
          right: Math.round(r.right),
          w: Math.round(r.width),
        });
        if (overflowing.length > 20) break;
      }
    }
    const smallTaps = [];
    for (const el of document.querySelectorAll("a, button")) {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      if (r.width > 0 && r.height > 0 && (r.height < 40 || r.width < 40)) {
        const t = (el.textContent || "").trim().slice(0, 40);
        if (t)
          smallTaps.push({
            t,
            h: Math.round(r.height),
            w: Math.round(r.width),
          });
        if (smallTaps.length > 12) break;
      }
    }
    const header = document.querySelector("header");
    const float = document.querySelector("a.fixed");
    const floatBox = float ? float.getBoundingClientRect() : null;
    return {
      vw,
      overflowX:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1,
      scrollW: document.documentElement.scrollWidth,
      headerH: header
        ? Math.round(header.getBoundingClientRect().height)
        : 0,
      overflowing: overflowing.slice(0, 12),
      smallTaps: smallTaps.slice(0, 10),
      float: floatBox
        ? {
            bottom: Math.round(window.innerHeight - floatBox.bottom),
            right: Math.round(vw - floatBox.right),
            h: Math.round(floatBox.height),
            w: Math.round(floatBox.width),
          }
        : null,
    };
  });

  await page.screenshot({
    path: `tmp-plaquette/resp-${label}.png`,
    fullPage: false,
  });

  let menu = null;
  const burger = page.locator("button[aria-controls='tsa-mobile-nav']");
  if (await burger.count()) {
    const visible = await burger.isVisible();
    if (visible) {
      await burger.click();
      await page.waitForTimeout(350);
      const open = await page.locator("#tsa-mobile-nav").isVisible();
      const menuOverflow = await page.evaluate(
        () =>
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth + 1,
      );
      await page.screenshot({
        path: `tmp-plaquette/resp-${label}-menu.png`,
        fullPage: false,
      });
      menu = { open, menuOverflow };
    }
  }

  await browser.close();
  return { label, ...report, menu, errors: errors.slice(0, 5) };
}

const results = [
  await audit("iphone", devices["iPhone 13"]),
  await audit("iphonese", devices["iPhone SE"]),
  await audit("pixel", devices["Pixel 5"]),
  await audit("ipad", devices["iPad Mini"]),
  await audit("desktop", { viewport: { width: 1280, height: 800 } }),
  await audit("wide", { viewport: { width: 1536, height: 900 } }),
];

console.log(JSON.stringify(results, null, 2));
