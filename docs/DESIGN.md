---
name: Justin Wong Portfolio
description: Direction B, Hand-Operated. A manual scoreboard, kept by hand, showing sports ML work.
colors:
  board: "#10271D"
  board-deep: "#0A1A13"
  board-raised: "#17352A"
  board-raised-hover: "#1C3D31"
  line: "#2F5243"
  line-control: "#5F8572"
  chalk: "#F1EBDD"
  chalk-dim: "#B4C0B1"
  chalk-faint: "#8FA394"
  gold: "#F2B632"
  gold-hover: "#F7C656"
  gold-pressed: "#D9A021"
  sport-baseball: "#D0714A"
  sport-basketball: "#CFA77E"
  sport-motorsport: "#8FA6B2"
  sport-core-ml: "#D9D2C0"
  bin-1: "#2F5C42"
  bin-2: "#4F7A48"
  bin-3: "#879A49"
  bin-4: "#C9AE3F"
  bin-5: "#F2B632"
typography:
  display-xl:
    fontFamily: "Big Shoulders Display, Impact, Haettenschweiler, sans-serif"
    fontSize: "clamp(2.75rem, 1.2rem + 6.2vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "0.01em"
  display-l:
    fontFamily: "Big Shoulders Display, Impact, Haettenschweiler, sans-serif"
    fontSize: "clamp(2rem, 1.4rem + 2.4vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.015em"
  display-m:
    fontFamily: "Big Shoulders Display, Impact, Haettenschweiler, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "0.02em"
  display-s:
    fontFamily: "Big Shoulders Display, Impact, Haettenschweiler, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "0.03em"
  numeral-xl:
    fontFamily: "Big Shoulders Display, Impact, Haettenschweiler, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0em"
  numeral-m:
    fontFamily: "Big Shoulders Display, Impact, Haettenschweiler, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0em"
  body-l:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-s:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
    fontVariation: "'wdth' 88"
  label-s:
    fontFamily: "Archivo, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.1em"
    fontVariation: "'wdth' 88"
rounded:
  none: "0px"
  plate: "2px"
  control: "3px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
  "32": "128px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.board}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.gold-hover}"
  button-primary-active:
    backgroundColor: "{colors.gold-pressed}"
  button-secondary:
    backgroundColor: "{colors.board}"
    textColor: "{colors.chalk}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "48px"
  box-score-card:
    backgroundColor: "{colors.board-raised}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.plate}"
    padding: "24px"
  box-score-card-hover:
    backgroundColor: "{colors.board-raised-hover}"
  result-tile:
    backgroundColor: "{colors.board-deep}"
    textColor: "{colors.chalk}"
    typography: "{typography.numeral-xl}"
    rounded: "{rounded.plate}"
  filter-plate:
    backgroundColor: "{colors.board}"
    textColor: "{colors.chalk-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "44px"
  filter-plate-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.board}"
  skill-plate:
    backgroundColor: "{colors.board}"
    textColor: "{colors.chalk}"
    typography: "{typography.body-s}"
    rounded: "{rounded.plate}"
    padding: "0 10px"
    height: "28px"
---

# DESIGN.md: Hand-Operated

Status: Phase 2 system for Direction B (logged in DECISIONS.md, 2026-11-15). This file overrides the design direction in BUILD_BRIEF.md. It does not override copy (PORTFOLIO_BRIEF.md) or logged decisions.

The frontmatter tokens are normative. Where prose and a token disagree, the token wins and the prose is a bug.

## Overview

The site is a hand-operated scoreboard: a dark green painted board, numbers on plates hung in recessed slots, everything else lettered in chalk white. Someone keeps this board by hand, so nothing glows, nothing bounces, and nothing is rounder or shinier than painted sheet metal.

Three rules carry the whole look:

1. **Numbers live in slots.** Every stat sits on plates inside a recessed tile (`board-deep`). A number set loose in a paragraph is body copy, not a stat.
2. **Chalk does the talking, gold does the pointing.** Text and numerals are chalk. Gold marks what you can act on or what is currently selected, plus the hottest bins in the hero chart. It is never a decorative fill.
3. **Depth goes in, not out.** Slots are recessed. Nothing floats, so there are no drop shadows anywhere.

One theme only. Set `color-scheme: dark` and do not build a light mode.

## Colors

### Tokens and roles

| Token | Hex | Role |
|---|---|---|
| `board` | `#10271D` | Page ground. Logged decision. |
| `board-deep` | `#0A1A13` | Recessed slots: result tiles, hero chart plate, count tile. |
| `board-raised` | `#17352A` | Card and panel surface. |
| `board-raised-hover` | `#1C3D31` | Hover fill for a linked card only. |
| `line` | `#2F5243` | Hairlines and card borders. Decorative, never the only boundary of a control. |
| `line-control` | `#5F8572` | Borders that define a control (secondary button, inactive filter plate, skill plate). |
| `chalk` | `#F1EBDD` | Primary text and all numerals. |
| `chalk-dim` | `#B4C0B1` | Muted text: card body, dates, captions. |
| `chalk-faint` | `#8FA394` | Tertiary labels. Allowed on `board` and `board-deep` only. |
| `gold` | `#F2B632` | Accent. Primary button, active filter, focus ring, link underline. Logged decision. |
| `gold-hover` | `#F7C656` | Primary button hover. |
| `gold-pressed` | `#D9A021` | Primary button pressed. |
| `chalk-line` | `chalk` at 10% / 16% | Field markings. Resolves to `#263B30` / `#34463C` on `board`. See Field markings. |
| `court-line` | `chalk` at 60% | Hero court lines only. Resolves to `#95978C` on `board-deep`. |

### Sport accents

Four accents, used only as an 8px square swatch beside the sport's name. They are never text, never a border, never a fill larger than the swatch, and the sport name is always printed next to them, so colour is never the only signal.

| Token | Hex | Sport | vs `board` | vs `board-raised` |
|---|---|---|---|---|
| `sport-baseball` | `#D0714A` | Infield clay | 4.62 | 3.89 |
| `sport-basketball` | `#CFA77E` | Hardwood | 7.13 | 6.00 |
| `sport-motorsport` | `#8FA6B2` | Tarmac | 6.21 | 5.23 |
| `sport-core-ml` | `#D9D2C0` | Plain chalk (no sport) | 10.47 | 8.82 |

All four clear 3:1 as graphics on both surfaces. None clears 3:1 on gold, so on the active (gold) filter plate the swatch switches to `board`.

### Hero chart ramp

Sequential, monotonic in lightness, read against the `board-deep` chart plate. It runs moss to gold so the hottest bins are the only gold in the hero besides the button.

| Token | Hex | vs `board-deep` |
|---|---|---|
| `bin-1` | `#2F5C42` | 2.33 |
| `bin-2` | `#4F7A48` | 3.60 |
| `bin-3` | `#879A49` | 5.77 |
| `bin-4` | `#C9AE3F` | 8.21 |
| `bin-5` | `#F2B632` | 9.84 |

`bin-1` is below 3:1 on purpose: it is the quietest class and is always paired with size (bin size carries volume), so no information lives in `bin-1` colour alone. The ramp is only usable if the hero data blocker below is resolved in favour of a binned chart.

### Contrast: every text pair

WCAG 2.x ratios. AA needs 4.5 for body text and 3.0 for large text (24px+, or 18.66px+ bold) and UI graphics.

| Text | Background | Ratio | Verdict |
|---|---|---|---|
| `chalk` | `board` | 13.28 | AAA |
| `chalk` | `board-deep` | 15.10 | AAA |
| `chalk` | `board-raised` | 11.19 | AAA |
| `chalk` | `board-raised-hover` | 10.03 | AAA |
| `chalk-dim` | `board` | 8.36 | AAA |
| `chalk-dim` | `board-deep` | 9.50 | AAA |
| `chalk-dim` | `board-raised` | 7.04 | AAA |
| `chalk-dim` | `board-raised-hover` | 6.31 | AA |
| `chalk-faint` | `board` | 5.89 | AA |
| `chalk-faint` | `board-deep` | 6.70 | AA |
| `chalk-faint` | `board-raised` | 4.96 | AA, but not permitted (see below) |
| `chalk-faint` | `board-raised-hover` | 4.45 | **Fails. Not permitted.** |
| `gold` | `board` | 8.66 | AAA |
| `gold` | `board-deep` | 9.84 | AAA |
| `gold` | `board-raised` | 7.29 | AAA |
| `gold` | `board-raised-hover` | 6.54 | AA |
| `board` | `gold` | 8.66 | AAA |
| `board` | `gold-hover` | 9.90 | AAA |
| `board` | `gold-pressed` | 6.77 | AA |

Rules that follow from the table:

- `chalk-faint` never sits on a raised surface, because a card can enter its hover fill and drop the pair to 4.45. On cards, the lowest text colour is `chalk-dim`.
- Text on gold is always `board`. Chalk on gold is 1.53 and is banned.
- Any new text pair must be added to this table with its ratio before it ships.

Non-text contrast: `line-control` is 3.82 on `board`, 3.22 on `board-raised`, 4.35 on `board-deep`. `line` is 1.81 on `board` and is decorative only. The gold focus ring is 8.66 on `board` and 7.29 on `board-raised`.

## Typography

### Families

- **Big Shoulders Display** (variable, weights 600 to 800 used): all headings and all numerals. Always uppercase.
- **Archivo** (variable, `wght` and `wdth` axes): body at normal width; labels at `wdth 88`, weight 600, uppercase. The condensed label is Archivo, not a third family.

Self-host both as subsetted variable woff2 (Latin), `font-display: swap`, preload only the Big Shoulders file because the h1 is the LCP element. Two font files total, about 125KB together: Archivo with both axes is about 90KB and Big Shoulders Display about 35KB. Delete the Centra files.

Verified 2026-11-15 against the Fontsource variable builds:

- Archivo ships `wght` 100 to 900 and `wdth` 62 to 125 in one file, and has a real `tnum` feature. Use the file that carries both axes. The weight-only file is 55KB smaller but loses the condensed labels.
- Big Shoulders Display has only a `wght` axis, **no `tnum` feature, and proportional digits**: at weight 800 the 1 is 0.26em wide and every other digit is 0.45 to 0.48em. `font-variant-numeric: tabular-nums` does nothing in this face. Alignment for Big Shoulders numerals comes only from plates.

### Scale

| Step | Family | Size | Line height | Weight | Tracking | Used for |
|---|---|---|---|---|---|---|
| `display-xl` | Big Shoulders | clamp(2.75rem, 1.2rem + 6.2vw, 5.5rem) | 0.95 | 800 | 0.01em | Hero h1 only |
| `display-l` | Big Shoulders | clamp(2rem, 1.4rem + 2.4vw, 3.25rem) | 1.0 | 700 | 0.015em | Section titles (h2) |
| `display-m` | Big Shoulders | 1.625rem (26px) | 1.1 | 700 | 0.02em | Card titles (h3) |
| `display-s` | Big Shoulders | 1.25rem (20px) | 1.15 | 700 | 0.03em | Org names, wordmark, skill group names |
| `numeral-xl` | Big Shoulders | 3.5rem (56px) | 1.0 | 800 | 0 | Result tile |
| `numeral-m` | Big Shoulders | 1.5rem (24px) | 1.0 | 700 | 0 | Filter count tile |
| `body-l` | Archivo | 1.125rem (18px) | 1.6 | 400 | 0 | Bio, card question |
| `body` | Archivo | 1rem (16px) | 1.6 | 400 | 0 | Default |
| `body-s` | Archivo | 0.875rem (14px) | 1.5 | 400 | 0 | Captions, skill plates |
| `label` | Archivo wdth 88 | 0.8125rem (13px) | 1.2 | 600 | 0.08em | Nav, buttons, filter, field labels |
| `label-s` | Archivo wdth 88 | 0.75rem (12px) | 1.2 | 600 | 0.1em | Result unit, chart legend |

Rules:

- 12px is the floor. Nothing renders smaller.
- Body measure is capped at 65ch. Headings use `text-wrap: balance`; paragraphs use `text-wrap: pretty`.
- Big Shoulders is never used below 20px and never for a sentence longer than a title. Archivo is never used for a numeral inside a tile.
- Uppercase is applied in CSS (`text-transform`), never typed into the data, so screen readers and copy-paste get normal case.
- Emphasis in body copy is weight 600, not italics and not gold.
- No em dashes in site copy (PORTFOLIO_BRIEF.md rule). Date ranges use an en dash.

### Tabular figures and stats

- Every Archivo numeral that is a count or a date sets `font-variant-numeric: tabular-nums lining-nums`. This covers experience dates and any number in the chart legend or a caption.
- **A Big Shoulders numeral is always set one character per plate.** Each digit and the decimal point gets its own slot of fixed width (`0.62em` for digits, `0.34em` for the point), with the glyph centred in the slot. The widest digit is 0.48em at weight 800, so the slot leaves 0.07em of air each side. This is the only thing that aligns these numerals, because the face has no tabular figures. Maximum four plates. The typed data model rejects longer values at build time.
- Big Shoulders numerals never appear outside a plate where columns of numbers need to line up. A numeral inside a heading (a year in a title) is fine.
- The unit (`%`, `PTS`, `MPH`) is not on a plate. It sits after the plates in `label-s`, baseline-aligned to the numerals.
- Numbers inside sentences (bio, experience bullets) stay in Archivo body with proportional figures. They are prose.
- Never animate a count-up. A plate shows its value or it is blank.

## Layout

### Spacing scale

4px base: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. No values outside the scale except the 1px and 2px strokes and the plate widths above.

Rhythm: 8 or 12 inside a group, 24 between groups in a component, 48 between components, 96 between sections (64 below 768).

### Grid and breakpoints

Designed at 360 first. Breakpoints are min-width.

| Breakpoint | Columns | Margin | Gutter | Content max | Notes |
|---|---|---|---|---|---|
| 360 (base) | 4 | 16 | 12 | fluid | Single column. Hero chart under the headline. Nav collapses to a MENU button. |
| 768 | 8 | 32 | 16 | fluid | Card result tile moves to the right of the text. Experience stays stacked. |
| 1024 | 12 | 40 | 24 | fluid | Hero splits 5 / 7 (text / chart). Project grid goes to 2 columns. Experience splits 3 / 9. Full nav. |
| 1440 | 12 | auto | 24 | 1200 | Content stops growing. Extra width becomes margin. Background markings may extend into the margin. |

Rules:

- No horizontal scroll at any width from 360 up, including with the filter wrapped onto two rows.
- Touch targets are at least 44 by 44 at every breakpoint.
- Sections use `scroll-margin-top` equal to the nav height plus 16.
- Section order is fixed: Hero, Projects, About, Experience, Skills, Contact.

## Elevation & Depth

Flat, with one direction of depth: inward.

- **Recessed slot** (`board-deep` fill): `box-shadow: inset 0 1px 0 #050E0A, inset 0 -1px 0 #2F5243`. A dark lip on top, a lit lip on the bottom. Static.
- **Raised plate** (cards): `board-raised` fill with a 1px `line` border. No shadow.
- No blur, no drop shadow, no glow, no backdrop-filter, no gradient, anywhere.
- z-order has three levels: content, sticky nav, open mobile menu.

## Shapes

- Radii: `0` for sections, the nav and the chart plate; `2px` for plates, tiles and cards; `3px` for buttons and filter plates. Nothing is rounder than 3px. No pills, no circles except true circles in field markings and the chart.
- Borders are 1px. The focus ring is 2px.
- Icons: none in v1 other than a right arrow glyph on links, drawn as a 1.5px stroke. No icon library.

## Components

Shared interaction rules for everything below:

- **Focus-visible:** `outline: 2px solid gold; outline-offset: 2px`. Same ring on every interactive element. Never removed, never replaced by a colour change alone.
- **Pressed:** `transform: scale(0.98)` over `press` (80ms). Buttons and filter plates only.
- **Hover** is wrapped in `@media (hover: hover)` so touch devices do not get stuck hover states.
- **Disabled** does not exist in v1. If a thing cannot be used, it is not rendered.

### Buttons and links (primitives)

- **Primary button:** gold fill, `board` label, 48px tall, 24px side padding. Hover `gold-hover`, pressed `gold-pressed` plus the press scale. One primary button per viewport at most.
- **Secondary button:** `board` fill, 1px `line-control` border, chalk label. Hover: border becomes chalk. Pressed: press scale.
- **Text link** (in body copy): chalk, 1px gold underline with 3px offset. Hover: underline 2px. Visited is not styled.
- **Arrow link** ("View project"): `label` type, chalk, with a right arrow. Hover: arrow moves 3px right over `fast`. Colour does not change.

### Nav

Anatomy: a sticky bar, 56px tall below 1024 and 64px from 1024, solid `board` fill, 1px `line` bottom edge. Left: wordmark "Justin Wong" in `display-s`, links to the top. Right: section links in `label` (Projects, About, Experience, Skills, Contact). Below 1024 the links are replaced by a text button reading MENU that opens a full-width panel under the bar with the same links at 48px row height. A skip link to main content is the first focusable element.

States:

- Link default `chalk-dim`; hover chalk; current section chalk with a 2px gold bar under it.
- The gold bar moves between links by transform (`base`, `out`). It is one element, not five.
- MENU button: `aria-expanded`, label switches to CLOSE. Escape closes and returns focus to the button.
- Focus-visible: the shared ring.

Never:

- Never translucent, blurred or shadowed. Solid fill only.
- Never hides on scroll down or resizes on scroll.
- Never uses a hamburger icon without the word, and never animates link text.
- Never holds a CTA button. Contact is a link like the others.

### Hero

> **Open blocker, found 2026-11-15. Do not build the chart until this is resolved.** The play-by-play files in `Guaynabo-Mets-Reports` (all five BSN seasons) carry no shot coordinates. The shot field is a shot type only (Jumper, Layup, Dunk, Floater/Runner, Hook Shot, Tip Shot), plus 2 or 3 point value in the play string. The existing `shot_chart_profile.R` draws random uniform coordinates and titles itself a synthetic example. A hex-binned shot chart built from this repo would be invented data, which the project rules forbid. The hero as logged in DECISIONS.md needs either real shot-location data or an amended decision. Everything below that mentions bins is conditional on that.

Anatomy, in DOM order: h1 (the headline from PORTFOLIO_BRIEF.md section 1, `display-xl`, chalk); a button row (primary "View projects", secondary "Get in touch"); the chart figure. The figure is a `board-deep` recessed slot holding the SVG half court, and under it a caption row in `label-s`: the legend (five ramp swatches with low and high labels, plus a size key if size is encoded) and a one-line source caption built only from facts in the brief (league, team, 34K+ shot attempts). Half court proportions are fixed at FIBA regulation: viewBox 150 by 140 (15m wide, 14m deep, 1 unit is 10cm).

Layout: stacked below 1024 with the chart full width under the buttons. From 1024, text spans 5 columns and the chart 7, top-aligned. The h1 is never overlaid on the chart.

States:

- The chart has no interactive states in v1. No hover tooltips, no focusable bins. It is one `role="img"` with an `aria-label` and a visually hidden text summary of what the chart shows.
- Buttons follow the primitives.

Never:

- Never delays the h1 or the buttons. They render in their final state in the first frame, with no entrance animation.
- Never loops, replays on scroll, or reacts to the pointer.
- Never shows shot-level or player-level marks. Aggregates only.
- Never plots a position the data does not contain. No synthetic, jittered or randomly placed marks.
- Never adds a second headline, a typing effect, a tagline pill above the h1, or a row of stat counters.
- Never uses the portrait. The portrait lives in About.

### Project "box score" card

Anatomy, top to bottom:

1. **Sport line:** 8px accent swatch, then the sport name in `label`, `chalk-dim`.
2. **Title:** h3, `display-m`, chalk.
3. **Question:** the project's question, `body-l`, chalk. This is the lead. It is never truncated.
4. **Method row:** the field label METHOD in `label-s` `chalk-dim`, then a short method line in `body-s` `chalk-dim`. The short line is a tightened form of the brief's method text and lives in `projects.ts` as its own field. It must be approved before it ships (see TODOs).
5. **Result tile:** a recessed slot holding the headline value on plates (`numeral-xl`, chalk), the unit in `label-s`, and under the plates a one-line descriptor in `label-s` `chalk-dim` (for example the baseline it is measured against). One tile per card.
6. **Link:** an arrow link, present only if the project has a URL.

Layout: below 768 the tile is full width under the method row, 96px tall. From 768 the tile sits to the right of the text at 200px wide. From 1024 the grid is 2 columns and the tile is 168px wide at the card's top right. Card padding 24 (16 at 360). Cards in a row share height; the question grows, the tile stays pinned.

States:

- **Linked card:** the whole card is the click target through a stretched link on the arrow link (one link, one tab stop). Hover: fill becomes `board-raised-hover`, border becomes `line-control`, arrow moves 3px. Focus-visible: the ring wraps the card. Pressed: no scale on the card, the fill returns to `board-raised`.
- **Unlinked card:** no hover, no pointer cursor, no tab stop. It must look inert, not broken.
- **Blank result (production):** the tile renders with two empty plates and no text, `aria-hidden`. On a hand-operated board, an empty slot reads as "not played yet", which is the truth.
- **TODO (dev and PR preview only):** a missing field shows `TODO: ...` in `body-s` `chalk-dim` inside a 1px dashed `line-control` outline. This styling never ships to production.

Never:

- Never a thumbnail, screenshot, logo or icon. The number is the picture.
- Never gold numerals, never a second tile, never a tile value that is not written in PORTFOLIO_BRIEF.md.
- Never "N/A", "0", "Coming soon" or a dash in a blank tile.
- Never a coloured edge stripe, corner ribbon or badge for the sport. The swatch and label are the only sport marking.
- Never lifts, tilts, scales or casts a shadow on hover.
- Never truncates with an ellipsis. Long titles wrap.

### Sport filter

Anatomy: a group labelled "Filter projects by sport" holding one plate per category (All, Baseball, Basketball, Motorsport, Core ML, in that order), and a count tile at the right end: a small recessed slot with the number of projects shown, two plates, `numeral-m`. Each plate is a `button` with `aria-pressed`, 44px tall, containing the sport swatch (none for All) and the name in `label`. Plates wrap onto a second row at 360. They do not scroll sideways. A polite live region announces the result ("Showing 3 Baseball projects").

Data rules: a category with zero projects is not rendered. If fewer than two categories exist, the whole filter is not rendered.

States:

- **Inactive:** `board` fill, 1px `line-control` border, `chalk-dim` label. Hover: label chalk, border chalk.
- **Active filter:** gold fill, `board` label, swatch switches to `board`, no border. The gold is one shared element that travels from the old plate to the new one by transform.
- **Pressed:** press scale.
- **Focus-visible:** the shared ring, on top of either fill.
- **Count tile:** when the count changes, the old plates slide up and out of the slot and the new ones slide up into it (clipped by the slot).

Never:

- Never a dropdown, a segmented pill, or tabs with an underline.
- Never changes the URL hash or scroll position, and never moves focus off the pressed plate.
- Never reorders cards. Filtering removes cards and the rest keep the order from the brief.
- Never shows an empty state. Zero-project categories do not exist as plates.

### About block

Anatomy: h2, the bio from the brief in `body-l` (65ch cap), and the portrait. The portrait is cropped 4:5, 2px radius, 1px `line` border, full colour, no filter or duotone. From 1024: text 7 columns, portrait 4 columns with one column of air between. No states. It never gets a decorative frame, tilt or blob mask.

### Experience entry

Anatomy: a row split by a 1px `line` rule above it. Left: the date range in `label`, tabular, `chalk-dim` (for example JUL 2026 – PRESENT). Right: organisation in `display-s` chalk; role and location on one line in `body` `chalk-dim`, separated by a middle dot; then the description as bullets in `body` chalk, using a 6px chalk-dim square as the marker. From 1024 the dates take 3 columns and the content 9. Below 1024 the dates stack above the organisation.

States: none. Entries are not links and not collapsible.

Never:

- Never a vertical timeline line, dots, logos or company colours.
- Never more than the single résumé line for Abbott. No product, system, team or metric detail (project hard rule).
- Never proportional figures in the date column.

### Skills group

Anatomy: four groups in the brief's order. Each has a group name in `display-s` and a wrapped list of skill plates: 28px tall, 2px radius, 1px `line-control` border, `board` fill, `body-s` chalk, 8px gaps. Marked up as a `ul`. From 1024 the group name takes 3 columns and the plates 9, matching the Experience split. The "Sports data" sub-list in Data engineering gets its own inline label in `label-s` before its plates.

States: none. Plates are not buttons. No hover, default cursor, not focusable.

Never:

- Never meters, bars, stars, percentages or "years of experience".
- Never pill shapes, filled or coloured plates, or logos.
- Never a hover effect that implies the plates filter anything.

### Contact

Anatomy: h2, one sentence, then a primary button that is a `mailto:` link, and two secondary buttons for GitHub and LinkedIn. Buttons stack full width at 360 and sit in a row from 768. One field marking is allowed here (see Field markings).

States: the button primitives.

Never:

- Never a form, never a "copied!" toast, never social icons without text labels.
- Never an email address invented or guessed. If the address is not in PORTFOLIO_BRIEF.md, the button is hidden in production and shows a TODO in preview.

### Footer

Anatomy: a 1px `line` rule, then one row in `body-s` `chalk-dim`: the name and year on the left; GitHub, LinkedIn and "Back to top" text links on the right. 32px vertical padding.

States: text link states.

Never:

- Never a second nav, a newsletter, a "built with" credit wall, or a logo lockup.

## Motion

Stance: plates are hung, lines are chalked. Things arrive and stop. Nothing overshoots, bounces, loops or follows the cursor.

Property rule (logged): transform and opacity only, everywhere. The single exception is the hero court lines, which may animate `stroke-dashoffset`.

### Tokens

| Token | Value | Use |
|---|---|---|
| `duration-press` | 80ms | Press scale |
| `duration-fast` | 140ms | Hover, focus, arrow nudge, exits |
| `duration-base` | 220ms | Section entrances, nav bar slide, count plate swap |
| `duration-layout` | 260ms | Filter gold plate travel, card reflow |
| `duration-draw` | 600ms | One court line stroke |
| `duration-bin` | 240ms | One hero bin ring |
| `ease-out` | cubic-bezier(0.22, 1, 0.36, 1) | Default for everything that enters or moves |
| `ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) | Card reflow, gold plate travel |
| `ease-draw` | cubic-bezier(0.33, 1, 0.68, 1) | Court line strokes |
| `ease-in` | cubic-bezier(0.5, 0, 0.75, 0) | Exits only |
| `stagger-section` | 40ms, max 5 items | Section entrances |
| `stagger-ring` | 60ms | Hero bin rings |
| `distance-enter` | 8px | Section entrance rise |
| `distance-nudge` | 3px | Arrow link |

No springs. Motion is configured as tweens with these curves so there is no overshoot.

### Hero animation, beat by beat

Runs once per page load, starting when the page is visible. Total 1,800ms. The h1 and buttons are not part of it and are fully rendered before beat 1.

| Beat | Window | What happens | Properties |
|---|---|---|---|
| 0 | 0ms | h1, buttons and the empty `board-deep` chart plate are present and static. | none |
| 1 | 0 to 600ms | Baseline, sidelines and the half-court line stroke on, each from its baseline end. | `stroke-dashoffset`, `ease-draw` |
| 2 | 200 to 800ms | The key, the free-throw circle and the no-charge arc stroke on. | `stroke-dashoffset`, `ease-draw` |
| 3 | 400 to 1,000ms | The three-point line strokes on from the left corner around to the right. The rim and backboard fade in at 800ms over 140ms. | `stroke-dashoffset`; opacity for rim |
| 4 | 900 to 1,560ms | Bins plot from the rim outward in 8 distance rings. Each ring: opacity 0 to 1 and scale 0.7 to 1 about each bin's own centre, 240ms, rings 60ms apart. | opacity, transform, `ease-out` |
| 5 | 1,560 to 1,800ms | Legend and caption row fade in and rise 8px. | opacity, transform, `ease-out` |

Constraints:

- Court lines use `pathLength="1"` so every stroke shares one dash setup. Lines are `court-line`, 1.5px, `vector-effect: non-scaling-stroke`, round caps.
- Bins are grouped per ring in the SVG (8 `g` elements) and capped at 200 bins total, so the stagger is 8 timers, not 200.
- Performance gate (Phase 6): on a mid-range phone profile (4x CPU throttle), beat 4 must hold 60fps. If it does not, drop the per-bin scale and keep ring opacity only. Do not move the chart to canvas.
- If the tab is hidden at load, the sequence waits for visibility. If the user scrolls past before it ends, it finishes anyway and is never replayed.
- With JavaScript disabled or failed, the chart renders in its final state. The initial hidden state is applied by script, not by default CSS.

### Everything else

| Element | Motion | Reduced-motion fallback |
|---|---|---|
| Hero court lines | Stroke-draw, beats 1 to 3 | Rendered fully drawn in the first frame. No draw. |
| Hero bins | Ring plot-in, beat 4 | Rendered at final opacity and scale in the first frame. |
| Hero legend and caption | Fade and rise, beat 5 | Rendered in place in the first frame. |
| Section entrance (h2, then content blocks) | Once, on first entry to the viewport: opacity 0 to 1, rise 8px, `base`, `ease-out`, stagger 40ms up to 5 items | No animation. Content is visible from the first frame. |
| Nav current-section bar | Slides between links, `base`, `ease-out` | Jumps to the new link. No slide. |
| Mobile menu panel | Opacity 0 to 1 and 8px drop, `fast`, `ease-out`; exit `fast`, `ease-in` | Appears and disappears instantly. |
| Button and filter press | Scale to 0.98, `press` | No scale. Colour change only. |
| Button, link and card hover fills | None. Colour changes are instant, which keeps the transform-and-opacity rule without exceptions. | Same. |
| Arrow link nudge | 3px translate, `fast`, `ease-out` | No translate. |
| Filter gold plate | Shared-layout travel to the new plate, `layout`, `ease-in-out` | Jumps. No travel. |
| Filter card reflow | Leaving cards: opacity to 0, `fast`, `ease-in`. Staying cards: FLIP to new positions, `layout`, `ease-in-out`. Entering cards: opacity 0 to 1, `base`, after reflow. No stagger. | Instant swap: cards are removed and added with no transition. |
| Filter count plates | Old plates translate up 100% and out, new translate up in, `base`, `ease-out`, clipped by the slot | Number changes instantly. |
| Field markings | None. Always static. | Same. |
| Anchor scrolling | Native `scroll-behavior: smooth` | `scroll-behavior: auto` |

Reduced motion is honoured through `prefers-reduced-motion: reduce` in CSS and Motion's reduced-motion config together, so neither path can leak. Under reduced motion nothing on the site moves or fades.

Other motion rules:

- Section entrances must not hide content from the first paint below the fold for no-JS or slow-JS visitors. Hidden states are applied by script after hydration, and only to sections not yet in view.
- Nothing animates for longer than 600ms except the hero sequence.
- No scroll-linked animation, no parallax, no scroll-jacking, no cursor effects, no marquee, no typing effect, no count-up.
- The filter is interruptible: a second press during a reflow retargets from the current position. It never queues.

## Field markings

The structural motif. Chalk lines from real playing surfaces, drawn at regulation proportions and cropped by the section they sit in. They are surveying marks, not illustration.

### Which markings

| Marking | Source geometry | Where |
|---|---|---|
| Court (key, free-throw circle, three-point arc) | FIBA half court | Hero only, as the chart's own structure, at `court-line` strength |
| Diamond (base paths, infield arc, home plate) | Baseball infield, 90ft base paths, 95ft infield arc | Projects section header band, right side, cropped |
| Centre circle and halfway line | Pitch / court centre | Divider between About and Experience |
| Baseline with hash marks | Court baseline | Divider above Contact, and the footer rule |

Four markings in total. No track or kerb marking for motorsport and nothing for Core ML: a marking is not owed to every filter category.

### Stroke and opacity

| Use | Stroke | Colour |
|---|---|---|
| Background marking | 1.5px (1px below 768) | chalk at 10% (`#263B30` on `board`, 1.32:1) |
| Divider marking | 1.5px (1px below 768) | chalk at 16% (`#34463C` on `board`, 1.57:1) |
| Hero court lines | 1.5px at all sizes | chalk at 60% (`#95978C` on `board-deep`, 6.05:1) |

All strokes use `vector-effect: non-scaling-stroke`, round caps and joins, and no fill.

### Where they are allowed

- At most one marking per section, and at most three on the page outside the hero.
- Only on `board`. Never on a card, a tile, the nav or the chart caption.
- Background markings sit in a section's header band or in the outer margin from 1024 up. Below 1024 background markings are not rendered. Dividers render at every width.
- A marking may pass behind a heading. It never passes behind paragraph text, cards or controls.
- Orientation is the surface's true orientation or a 90 degree turn. The diamond keeps its natural 45 degrees. No arbitrary rotation, no mirroring for balance.
- Always `aria-hidden="true"` and `pointer-events: none`. Never animated outside the hero.

### What they must never do

- Never appear as a repeating pattern, a texture, or a full-bleed watermark.
- Never include balls, players, bats, hoops with nets, or any object. Lines only.
- Never get brighter than 16% outside the hero, and never take the gold.
- Never be invented geometry. If a line does not exist on a real field, it does not exist here.

## Do's and Don'ts

### Do

- Put every stat on plates in a recessed tile, in chalk.
- Keep gold for the primary action, the active filter, focus, link underlines and the top chart bin.
- Let blank tiles stay blank.
- Keep text on `board`, `board-deep` and `board-raised` only, using the pairs in the contrast table.
- Render content first. Motion is added on top of a page that already works.

### Don't: choices that would make this look templated

1. No gradient text, gradient buttons or gradient section backgrounds. The old site's magenta-to-violet highlight goes.
2. No glassmorphism: no blur, no translucent nav, no frosted cards.
3. No drop shadows, glows or neon. Depth is inset only.
4. No card hover lift, tilt, scale or spotlight-follows-cursor.
5. No coloured left-edge stripe on cards, and no corner ribbons or badges.
6. No pill shapes anywhere. Radius stops at 3px.
7. No project thumbnails, device mockups, stock photos, mascots, emoji or clip-art balls.
8. No skill meters, progress rings, star ratings or proficiency percentages.
9. No typing effect, no rotating job titles, no "Hi, I'm Justin" with a waving hand.
10. No animated stat counters and no hero strip of big numbers. Stats belong to the project that earned them.
11. No vertical timeline with dots for Experience.
12. No hamburger icon without a label, no nav that hides on scroll.
13. No scroll-triggered animation on every element. One entrance per section, once.
14. No particles, parallax, cursor trails, marquees or scroll-jacking.
15. No dark-mode toggle and no light theme.
16. No icon library, no social icon row without text.
17. No third typeface, no monospace "code" accent font, no lowercase Big Shoulders.
18. No gold body text, gold headings or gold numerals. No chalk text on gold.
19. No esports palette: no pure black, pure white, electric green, cyan or purple. Every colour comes from the token table.
20. No centred hero with a tagline pill above the headline and two buttons below. The hero is the headline beside the chart.
21. No fake dashboard chrome around the chart: no window dots, no fake axes, no fake tabs.
22. No "LIVE" badges, pulsing dots, fake tickers or fake timestamps.
23. No scoreboard cosplay: no LED or dot-matrix fonts, no rivets, wood grain, rust or painted-metal textures. The board is a flat colour.
24. No field markings as wallpaper. Four markings, placed as listed.
25. No invented numbers to fill a tile, a legend or a caption.
