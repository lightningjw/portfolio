# Justin Wong: portfolio

Personal portfolio site, served at <https://lightningjw.github.io/portfolio/>.

Built with Vite, React, TypeScript, Tailwind CSS v4 and Motion. There is no backend: contact is a `mailto:` link plus GitHub and LinkedIn.

## Run it

Needs Node 22 or newer.

```sh
npm install
npm run dev        # dev server at http://localhost:5173/portfolio/
npm run check      # lint, token check, type check and production build
npm run preview    # serve the production build locally
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc -b` then `vite build` into `dist/` |
| `npm run lint` | ESLint, then `scripts/check-tokens.mjs` |
| `npm run check` | `lint` then `build`. Run this before opening a PR. |

## Where things live

```
docs/                 Sources of truth: DESIGN.md, PORTFOLIO_BRIEF.md, BUILD_BRIEF.md, DECISIONS.md
src/styles/tokens.css Every design token from DESIGN.md. The only file with raw colours, sizes or durations.
src/styles/index.css  Base styles, layout utilities and the hero keyframes
src/data/             All site copy, typed: profile.ts, projects.ts, experience.ts, skills.ts
src/data/heroShotBins.json  Aggregated shot bins for the hero chart
src/components/       One file per section and primitive
src/lib/              Shot chart geometry, motion token reader, small hooks
scripts/build_shot_bins.py  Rebuilds heroShotBins.json from the raw shot file
scripts/check-tokens.mjs    Fails lint if a component bypasses the tokens
```

## Editing content

All copy comes from `docs/PORTFOLIO_BRIEF.md` and lives in `src/data/`. Components hold no copy of their own beyond section names and button labels.

**Add a project:** append an object to `projects` in `src/data/projects.ts`. Its `sport` must be one of the ids in `SPORTS`. The filter builds itself from the projects that exist, so a category with no projects is never shown.

**Result tiles:** `tile('64.7', '%', 'Cross-validated accuracy')`. The value is one to four characters, digits and a decimal point only. Anything else fails the type check, because each character is hung on its own plate.

**Unconfirmed fields:** a field the brief marks TODO is written `todo('what is missing')` and is hidden on the site: a missing link renders no link, and a missing result renders a blank tile. TODO text never renders unless you opt in locally:

```sh
VITE_SHOW_TODOS=true npm run dev
```

The deploy workflow never sets that variable.

## Design tokens

`src/styles/tokens.css` defines the tokens once and clears Tailwind's default theme, so only DESIGN.md values are available as utilities (`bg-board`, `text-chalk-dim`, `p-6`, `type-display-m`, and so on). Component dimensions are used through the variable form, for example `h-(--size-button)`.

`npm run lint` fails on a raw hex colour, a Tailwind arbitrary value like `w-[200px]`, or a literal `px`, `rem` or `ms` anywhere in `src/` outside `tokens.css`. JavaScript-driven animation reads its durations and curves from the same CSS variables (`src/lib/motion.ts`).

## Hero chart data

The hero is a hex-binned shot chart of the 2024 BSN season. Only bin totals are public. The raw shot file names players and must never be committed (`team_shots*.csv` is git-ignored).

```sh
python3 scripts/build_shot_bins.py path/to/team_shots.csv
```

## Deploy

`.github/workflows/pages.yml` lints and builds every pull request, and deploys `main` to GitHub Pages with the Vite `base` set to `/portfolio/`.

The repository's Pages source is set to **GitHub Actions**. The `gh-pages` branch belongs to the old site and is no longer used.

## Fonts

Big Shoulders Display and Archivo, self-hosted as variable woff2 in `src/assets/fonts/`. Both are licensed under the SIL Open Font License 1.1.
