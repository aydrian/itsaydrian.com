/**
 * Generates the Tiny Maintenance OG image (1200×630).
 * Run with: bun run scripts/generate-og-images.ts
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");

const iconPath = path.join(
  ROOT,
  "public/images/apps/tiny-maintenance/icon.png"
);
const iconB64 = fs.readFileSync(iconPath).toString("base64");
const iconDataUrl = `data:image/png;base64,${iconB64}`;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;1,9..144,300&display=swap" rel="stylesheet" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    background: #1A2535;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px;
    position: relative;
    overflow: hidden;
  }
  .icon {
    width: 156px;
    height: 156px;
    border-radius: 34px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.55);
    margin-bottom: 40px;
    display: block;
  }
  h1 {
    font-family: 'Fraunces', serif;
    font-size: 66px;
    font-weight: 500;
    color: #F0F4F8;
    line-height: 1.05;
    margin-bottom: 18px;
    letter-spacing: -0.5px;
  }
  .tagline {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-weight: 300;
    font-size: 28px;
    color: #7AA3D4;
    line-height: 1.5;
  }
  .site {
    position: absolute;
    bottom: 28px;
    right: 36px;
    font-family: 'Fraunces', serif;
    font-size: 18px;
    color: #4A6A8C;
    letter-spacing: 0.3px;
  }
</style>
</head>
<body>
  <img class="icon" src="${iconDataUrl}" alt="" />
  <h1>Tiny Maintenance</h1>
  <p class="tagline">
    Remember everything that needs doing.<br />
    Never let upkeep slip through the cracks.
  </p>
  <span class="site">itsaydrian.com</span>
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ height: 630, width: 1200 });
await page.setContent(html, { waitUntil: "networkidle" });

const outPath = path.join(
  ROOT,
  "public/images/apps/tiny-maintenance/og.png"
);
await page.screenshot({ path: outPath, type: "png" });
await browser.close();

console.log(`✓ Generated ${path.relative(ROOT, outPath)}`);
