# BUILD_BRIEF: Portfolio rebuild (lightningjw/portfolio)

## Current state (verify against the repo)
- Create React App + react-bootstrap + animate.css, last updated Dec 2023. CRA is deprecated.
- Projects section is placeholder: six "Business Startup" cards, lorem ipsum, tabs named "Tab 1/2/3".
- Banner bio is outdated (says undergrad CS student) and is one long paragraph with a typing-text effect.
- server.js is an Express/Nodemailer contact backend that can't run on GitHub Pages and logs env vars. Remove it.
Treat this as a rebuild. Keep only my portrait and anything else genuinely worth keeping.

## Stack
Use these unless there's a concrete reason not to (and say so if there is).
- Vite + React + TypeScript
- Tailwind, with design tokens defined once and taken from DESIGN.md
- Motion (motion.dev) for animation; plain SVG for the sports graphics; no Lottie, no canvas game engines
- Project data in a typed data file (src/data/projects.ts) so projects can be added without touching components
- GitHub Pages deploy via a GitHub Actions workflow, with the correct Vite `base` for a project repo
- Contact: mailto link plus GitHub/LinkedIn links. No backend.
Remove: bootstrap, react-bootstrap, animate.css, the carousel libraries, react-on-screen, express, cors, nodemailer, react-mailchimp-subscribe.

## Design direction
The sports theme (soccer, basketball, baseball) comes through data and field geometry, not mascots, stock photos, emoji or clip-art balls.
- **Hero:** one signature animation built from sports data, e.g. an SVG shot chart that plots in, pitch trajectories drawn as path animations, or a soccer pass network forming. Use real output from one of my projects if one has suitable data; otherwise a clearly representative sample.
- **Field markings:** the structural motif. Thin chalk-line SVG details (pitch arcs, court key, base paths) as section dividers and backgrounds, subtle and low-contrast.
- **Project cards as "box scores":** each leads with the sport, the question asked, the method/model and one headline result metric, set in tabular numerals.
- **Sport filter:** All / Soccer / Basketball / Baseball, with an animated layout transition.
- **Palette:** warm and earthy, not neon or esports. Hardwood, leather, turf, chalk, with a yellow-gold accent. A dark default is fine if it serves the palette.
- **Type:** one confident display face for headings, a clean sans for body, tabular figures for stats. Drop the Centra font files unless there's a strong reason to keep them.

## Motion rules
- One showpiece (the hero). Everything else is quiet: fast entrances, real press/hover feedback, a shared-layout transition for the sport filter.
- Animate transform and opacity only. Hold 60fps on a mid-range phone.
- Full prefers-reduced-motion support: the hero renders its final state statically.
- No typing-text effect, no scroll-jacking, nothing that delays reading content.

## Content
PORTFOLIO_BRIEF.md is the source of truth for all copy. Don't invent metrics or projects. Carry every TODO from the brief into the site as a visible placeholder, and list them in the PR description.
Sections: Hero, Projects, About, Experience, Skills (compact grouped list, no progress meters), Contact.

## Phase plan (one chat per phase)
1. **Critique + direction.** Use impeccable to critique the current site, then propose 2 visual directions within this brief, with a short rationale each. Stop and wait for my pick.
2. **System.** Use impeccable to write DESIGN.md for the chosen direction (tokens, type scale, spacing, components, motion rules).
3. **Build.** Rebuild the site against DESIGN.md and PORTFOLIO_BRIEF.md on a feature branch, and open a PR.
4. **Polish.** Run emil-design-eng, then review-animations, against the motion rules. Fix what they flag.
5. **Stress test.** Run break-ui on the project cards and filter: long titles, missing metrics, a sport with zero projects, a single project total.
6. **Verify.** Build passes; Lighthouse ≥ 95 on performance and accessibility (mobile); keyboard navigation works; no console errors; layout holds from 360px to 1440px. Screenshots go in the PR.
7. **Codify.** Run learn-taste on the corrections I made across phases 1–6 and fold the rules into DESIGN.md.

## Done means
A merged PR with the rebuilt site, DESIGN.md, the Pages workflow and an updated README, plus a list of every remaining TODO (bio, metrics, project picks).
