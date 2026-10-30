# Listing background textures

The individual collection pages use decorative, monochrome surface details inside a bounded panel. The product gallery remains sharp and in its original color. Crop coordinates and source dimensions are recorded in `sources.json` and compiled into `../listing-textures.js`.

October 30, 2026: all 54 visible listings mapped. 52 use reviewed areas of their own photographs. The Caddo frame (#19) and slabbed coin (#54) use the generated fine-stone swatch because their overview images have no clean surface-only crop at useful resolution.

## Generated fallback library

Open `index.html` to compare the three selections. These are generic generated decorative materials, not images of the listed relics and not identification or provenance evidence. They were created with the built-in image-generation tool on October 30, 2026, then encoded as WebP. The original PNGs and prompts are retained in the project audit folder.

- `fine-stone.webp`: soft, fine-grained weathered gray stone; default fallback.
- `banded-slate.webp`: gentle diagonal gray strata; fallback for titles containing slate or banded.
- `speckled-granite.webp`: gray mineral inclusions; fallback for granite, diorite or porphyry titles.

## Adding a listing

Choose a clean area of that listing's own photo. Avoid hands, labels, inscriptions, mounting hardware and photo backgrounds. Store its source URL, original width/height and `[x, y, width, height]` crop in pixels in both the manifest and `SOURCES` in `../listing-textures.js`. Crops are rendered by SVG without editing the original photo or stretching its aspect ratio.

If no clean crop is available, choose a named `fallback` entry. Unmapped future listings and failed source downloads use the library automatically. Do not guess a central crop. The fallback does not change the gallery or product description.

`../listing-textures.css` controls opacity, grayscale, the softer outer blur and central focal blur. The dark description inset protects readability; high-contrast preferences disable the decorative layer. No animation or extra texture images are loaded on the collection grid.
