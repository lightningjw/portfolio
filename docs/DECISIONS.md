# DECISIONS: Portfolio rebuild

Append one line per decision: date, decision, short reason. Newest at the bottom.

- 2026-11-14: Rebuild rather than restyle: Vite + React + TS + Tailwind + Motion, GitHub Pages via Actions. Reason: CRA is deprecated and the existing content is placeholder.
- 2026-11-14: Sports theme expressed through data viz and field geometry, not mascots or clip-art. Reason: it signals sports ML engineer, not template.
- 2026-11-14: Site copy comes only from PORTFOLIO_BRIEF.md, written in the Full Time Job Search project. Reason: one reviewed checkpoint for what goes public.
- 2026-11-14: Positioning targets the ML engineer / data scientist role family with a baseball-analytics edge, not individual postings.
- 2026-11-14: Contact form backend removed; replaced with mailto + GitHub/LinkedIn.
- 2026-11-15: Visual direction is B, Hand-Operated: manual-scoreboard world, board green #10271D ground, chalk numerals in inset tiles, gold #F2B632 accent, Big Shoulders Display + Archivo. Reason: preferred palette, type, hero and box score card.
- 2026-11-15: Hero is the binned BSN shot chart on a FIBA half court, from the BSN Shot Outcome Prediction project. Data comes from lightningjw/Guaynabo-Mets-Reports and is redrawn in the portfolio's design system, not copied. Aggregate BSN and SynergySports data is cleared to show publicly.
- 2026-11-15: Sport filter is All / Baseball / Basketball / Motorsport / Core ML, replacing All / Soccer / Basketball / Baseball. Reason: matches the projects that exist.
- 2026-11-15: Motion rule amended: stroke-drawn lines are allowed in the hero only; everything else stays transform and opacity.
- 2026-11-15: TODO placeholders are visible in development and PR preview builds and hidden on the deployed site. Blank result tiles are acceptable; content gets filled in after the rebuild.
- 2026-11-15: Degree is BSE in Computer Science, not BS. Bio in PORTFOLIO_BRIEF.md updated.
- 2026-11-15: DESIGN.md approved as written and is the visual source of truth. Single dark theme, no light mode.
- 2026-11-15: Surfaces are board #10271D, board-deep #0A1A13 (recessed slots), board-raised #17352A (cards). Text is chalk #F1EBDD, chalk-dim #B4C0B1, chalk-faint #8FA394 (not allowed on raised surfaces).
- 2026-11-15: Gold is reserved for the primary button, active filter, focus ring, link underline and the top chart bin. Stat numerals are chalk.
- 2026-11-15: Stats render one character per plate in a recessed tile, max four plates, unit outside the plates. A blank result is two empty plates.
- 2026-11-15: Sport accents are an 8px swatch only: baseball #D0714A, basketball #CFA77E, motorsport #8FA6B2, Core ML #D9D2C0.
- 2026-11-15: Labels use Archivo at wdth 88, weight 600, uppercase. Big Shoulders Display is headings and numerals only, never below 20px.
- 2026-11-15: Radii stop at 3px. No drop shadows; depth is inset only.
- 2026-11-15: Motion tokens set (80 / 140 / 220 / 260 / 600ms, no springs). Hero sequence is 1,800ms in five beats, once per load. Hover colour changes are instant.
- 2026-11-15: Hero chart is non-interactive in v1.
- 2026-11-15: Field markings limited to four (court in hero, diamond, centre circle, baseline), max three outside the hero, never behind paragraph text.
- 2026-11-15: Skills render as rectangular non-interactive plates. Nav collapses to a labelled MENU button below 1024px.
- 2026-11-15: Eldridge card tile is 95.6 MPH, descriptor "Avg exit velocity, 37-PA debut". Reason: fastest-stabilizing metric at that sample, legible to non-baseball readers, and the figure reconciled to Baseball Savant.
- 2026-11-15: Each project in PORTFOLIO_BRIEF.md gets a Card method line and a Card tile field, derived from its Method and Headline result.
- 2026-11-15: Fonts verified. Use the Archivo file with both wght and wdth axes. Big Shoulders Display has no tabular figures, so its numerals are aligned by plates only.
- 2026-11-15: OPEN, needs a decision: Guaynabo-Mets-Reports has no shot coordinates (shot type and point value only; the existing shot chart script uses synthetic positions). The hex-binned hero logged above cannot be built from it without inventing data.
