# /// script
# requires-python = ">=3.10"
# dependencies = ["pillow>=10.0"]
# ///
"""Render a 1200x630 share image (OG card) in the itsaydrian.com style, for blog posts and pages.

Left: the domain, a category eyebrow, an Instrument Serif headline, an Inter
subline, and an optional row of round image "chips". Right: a full-bleed photo.

Usage (from the repo root):
    uv run tools/og-card/og_card.py tools/og-card/cards/<post>.json [...]

Page cards live in tools/og-card/cards/page-*.json and render to public/assets/og/.

Card config (paths are relative to the repo root):
    {
      "out": "public/images/<post>/<post>-og.jpg",
      "photo": "public/images/<post>/<photo>.jpg",
      "focusX": 0.5,            # optional, 0 = left edge, 1 = right edge of the crop
      "focusY": 0.5,            # optional, 0 = top, 1 = bottom
      "eyebrow": "Japan · Day trip from Osaka",  # optional
      "headline": "Post title, ideally under ~45 characters",
      "subline": "One sentence that says what the reader gets.",
      "chips": [                # optional, up to ~6
        {"src": "public/images/....webp", "x": 198, "y": 1086, "r": 84}
      ]
    }
A chip crops a circle of radius r centred on (x, y) in the source image's pixels.
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[2]
FONTS = Path(__file__).resolve().parent / "fonts"

W, H = 1200, 630
PAD = 64
PHOTO_W = 520
COL_W = W - PHOTO_W - PAD * 2 + 8

# Colors from src/styles/global.css (light theme).
PAPER = (244, 239, 238)  # --angel-feather
INK = (20, 17, 14)  # --ink
INK_SOFT = (90, 83, 77)  # --ink-soft
HYDRO = (60, 100, 112)  # --hydro
HOT = (227, 75, 38)  # --scoville-high


def serif(size):
    return ImageFont.truetype(str(FONTS / "InstrumentSerif-Regular.ttf"), size)


def inter(size, weight="Regular"):
    f = ImageFont.truetype(str(FONTS / "Inter-Variable.ttf"), size)
    f.set_variation_by_name(weight)
    return f


def wrap(draw, text, font, width):
    lines, cur = [], ""
    for word in text.split():
        trial = f"{cur} {word}".strip()
        if draw.textlength(trial, font=font) <= width or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def tracked(draw, xy, text, font, fill, tracking):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking


def fit_headline(draw, text, width, max_lines=3, start=88, floor=56):
    for size in range(start, floor - 1, -2):
        font = serif(size)
        lines = wrap(draw, text, font, width)
        if len(lines) <= max_lines:
            return font, lines
    font = serif(floor)
    return font, wrap(draw, text, font, width)


def photo_panel(path, focus_x, focus_y):
    im = Image.open(path).convert("RGB")
    target = PHOTO_W / H
    w, h = im.size
    if w / h > target:
        nw = int(h * target)
        x0 = int((w - nw) * focus_x)
        im = im.crop((x0, 0, x0 + nw, h))
    else:
        nh = int(w / target)
        y0 = int((h - nh) * focus_y)
        im = im.crop((0, y0, w, y0 + nh))
    return im.resize((PHOTO_W, H), Image.LANCZOS)


def circle_mask(d, ss=4):
    m = Image.new("L", (d * ss, d * ss), 0)
    ImageDraw.Draw(m).ellipse((0, 0, d * ss - 1, d * ss - 1), fill=255)
    return m.resize((d, d), Image.LANCZOS)


def chip(img, d, ring=5, margin=8):
    """A round image with a white ring and a soft drop shadow, as RGBA."""
    size = d + ring * 2
    out = Image.new("RGBA", (size + margin * 2, size + margin * 2), (0, 0, 0, 0))
    shadow_mask = Image.new("L", out.size, 0)
    ImageDraw.Draw(shadow_mask).ellipse((margin, margin + 3, margin + size, margin + 3 + size), fill=70)
    shadow = Image.new("RGBA", out.size, INK + (0,))
    shadow.putalpha(shadow_mask.filter(ImageFilter.GaussianBlur(4)))
    out = Image.alpha_composite(out, shadow)
    out.paste((255, 255, 255, 255), (margin, margin), circle_mask(size))
    out.paste(img.resize((d, d), Image.LANCZOS).convert("RGB"), (margin + ring, margin + ring), circle_mask(d))
    return out


def load_chips(specs):
    cache, chips = {}, []
    for spec in specs or []:
        src = ROOT / spec["src"]
        if src not in cache:
            cache[src] = Image.open(src).convert("RGB")
        x, y, r = spec["x"], spec["y"], spec["r"]
        chips.append(cache[src].crop((x - r, y - r, x + r, y + r)))
    return chips


def render(card):
    canvas = Image.new("RGB", (W, H), PAPER)
    photo = photo_panel(ROOT / card["photo"], card.get("focusX", 0.5), card.get("focusY", 0.5))
    canvas.paste(photo, (W - PHOTO_W, 0))
    draw = ImageDraw.Draw(canvas)
    chips = load_chips(card.get("chips"))

    draw.text((PAD, PAD - 6), "itsaydrian.com", font=inter(22, "SemiBold"), fill=HYDRO)

    eyebrow_font = inter(19, "Bold")
    sub_font = inter(25, "Regular")
    sub_lines = wrap(draw, card["subline"], sub_font, COL_W - 10)
    sub_lh = 36
    top = PAD + 60
    bottom = H - PAD - (96 if chips else 0)

    # Largest headline (max 3 lines) whose whole text block still fits between
    # the domain line and the chip row, so text never runs into the chips.
    eyebrow = card.get("eyebrow", "").strip()
    eyebrow_h = 48 if eyebrow else 0
    start = 88
    while True:
        headline_font, headline_lines = fit_headline(draw, card["headline"], COL_W, start=start)
        headline_lh = int(headline_font.size * 1.02)
        block = eyebrow_h + headline_lh * len(headline_lines) + 22 + sub_lh * len(sub_lines)
        if block <= bottom - top or headline_font.size <= 56:
            break
        start = headline_font.size - 2
    y = top + max(0, (bottom - top - block) // 2)

    if eyebrow:
        tracked(draw, (PAD, y), eyebrow.upper(), eyebrow_font, HOT, 2.2)
    y += eyebrow_h
    for line in headline_lines:
        draw.text((PAD - 2, y - int(headline_font.size * 0.18)), line, font=headline_font, fill=INK)
        y += headline_lh
    y += 22
    for line in sub_lines:
        draw.text((PAD, y), line, font=sub_font, fill=INK_SOFT)
        y += sub_lh

    if chips:
        d = 76
        x, cy = PAD - 8, H - PAD - d - 18
        for img in chips:
            c = chip(img, d)
            canvas.paste(c, (x, cy), c)
            x += d - 4

    out = ROOT / card["out"]
    out.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(out, quality=88, optimize=True, progressive=True)
    print(f"wrote {out.relative_to(ROOT)}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    for arg in sys.argv[1:]:
        render(json.loads(Path(arg).read_text()))
