/**
 * Generates the favicon set from the ItsAydrian Mark SVG.
 * Run with: bun run build:favicons
 *
 * Outputs:
 *   public/favicon.svg        — SVG favicon for modern browsers
 *   public/favicon.ico        — 32x32 ICO for legacy browsers
 *   public/apple-touch-icon.png — 180x180 PNG for iOS
 */
import fs from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const MARK_PATH = path.join(ROOT, "app/images/ItsAydrian Mark.svg");
const TEMP_PNG = "/tmp/mark-512.png";

// Step 1: Create public/favicon.svg — strip width/height attrs so browsers scale freely
const svgSource = fs.readFileSync(MARK_PATH, "utf-8");
const faviconSvg = svgSource.replace(
  /(<svg[^>]*?)\s+width="[^"]*"\s+height="[^"]*"/,
  "$1"
);
const svgOutPath = path.join(ROOT, "public/favicon.svg");
fs.writeFileSync(svgOutPath, faviconSvg);
console.log(`✓ Generated ${path.relative(ROOT, svgOutPath)}`);

// Step 2: Render SVG at 512x512 via Playwright for raster variants
const svgB64 = Buffer.from(svgSource).toString("base64");
const svgDataUrl = `data:image/svg+xml;base64,${svgB64}`;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; }
  body { width: 512px; height: 512px; background: transparent; }
</style>
</head>
<body>
  <img src="${svgDataUrl}" width="512" height="512" style="display:block;" />
</body>
</html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 512, height: 512 });
await page.setContent(html, { waitUntil: "networkidle" });
await page.screenshot({ path: TEMP_PNG, type: "png", omitBackground: true });
await browser.close();
console.log(`✓ Rendered mark at 512x512`);

// Step 3: Generate apple-touch-icon.png (180x180)
const touchIconPath = path.join(ROOT, "public/apple-touch-icon.png");
execSync(`sips -z 180 180 ${TEMP_PNG} --out ${touchIconPath}`);
console.log(`✓ Generated ${path.relative(ROOT, touchIconPath)}`);

// Step 4: Generate favicon.ico (32x32)
const icoPath = path.join(ROOT, "public/favicon.ico");
execSync(
  `sips -z 32 32 ${TEMP_PNG} -s format com.microsoft.ico --out ${icoPath}`
);
console.log(`✓ Generated ${path.relative(ROOT, icoPath)}`);

// Cleanup
fs.unlinkSync(TEMP_PNG);
