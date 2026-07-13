# BBR Catalog Photo Intake

**Purpose:** Drop folder for catalog photos of artifacts that are *not yet shipped* to the live site. Co-located with `bbr-site/images/` so moving a piece from intake → live is a single `mv` rather than a copy + path rewrite.

**Created:** July 12, 2026 (after Butterfly Bannerstone intake)

---

## Workflow

### 1. Create a per-piece folder

```
images/incoming/<piece-slug>/
```

The `<piece-slug>` is the catalog `id:` from the product object (kebab-case, no spaces). For example: `butterfly-bannerstone`, `neuberger`, `holland-dalton`.

### 2. Drop photos in the order they should appear in the gallery

Photos will be renamed and arranged for the live catalog using this convention:

| Intake filename | Final filename | Position |
|---|---|---|
| `photo-1.jpg` | `<slug>-1.jpg` | Hero shot (front face, daylight, sticker legible) |
| `photo-2.jpg` | `<slug>-2.jpg` | Edge/profile view |
| `photo-3.jpg` | `<slug>-3.jpg` | Back face / reverse |
| `photo-4.jpg` | `<slug>-4.jpg` | Special: backlit, restoration callouts, provenance proof |

The hero shot goes first because it's the card-front image and the detail-page main image. The "special" photo (backlit, restoration callouts, etc.) goes last because the catalog listing walks the buyer through the piece in narrative order: **face → form → back → proof**.

### 3. Add a provenance.md in the same folder

Captures everything the catalog description needs:

```markdown
# <Title>

## Provenance chain
- Previous collector 1 → Previous collector 2 → ... → Barn Burner Relics

## Tier call
- T1 (Hero / Showcase) or T2 (BIN Premium) or T3 (BIN Accessible) or T4 (Held/Pass)

## Anchor time (T1 only)
- Hero #1 / #2 / #3 / #4 in this Monday's showcase

## Starting price
- $X,XXX

## Notes
- Restoration history, special features, anything that affects the description
```

### 4. Ship to live site

When the product object is added to `index.html`:

```bash
cd images/incoming/<piece-slug>/
mv photo-1.jpg ../<slug>-1.jpg
mv photo-2.jpg ../<slug>-2.jpg
# ... etc
cd ../../../
git add images/<slug>-*.jpg images/incoming/<piece-slug>/provenance.md
git commit -m "Ship <piece title> to catalog (T<1|2|3>)"
git push
```

The `incoming/<piece-slug>/` folder can stay (provenance record) or be removed after the piece ships — your call per piece.

---

## File-naming rules

- **Lowercase, kebab-case, no spaces.** Matches the `id:` field in the products JS array.
- **`<slug>-N.jpg`** for live catalog (N = position in gallery).
- **`photo-N.jpg`** in intake (translates to `<slug>-N.jpg` on ship).
- **One set per piece.** If a piece needs more than 4 photos (rare), add `photo-5.jpg`, `photo-6.jpg`, etc.

---

## Current pieces in intake

| Slug | Title | Tier | Status |
|---|---|---|---|
| `butterfly-bannerstone` | Butterfly Bannerstone (Quartz, Cuckler #3281) | T1 | Awaiting photos |

---

*Last updated: July 12, 2026*