/*
 * Stress-test fixtures for the break-ui pass (BUILD_BRIEF.md, Phase 5).
 *
 * DEVELOPMENT ONLY. This module is reached through a dynamic import behind
 * import.meta.env.DEV in main.tsx, so a production build never emits it.
 * scripts/check-dev-only.mjs fails the build if FIXTURE_SENTINEL turns up
 * in dist/.
 *
 * Nothing here is a real project, role, metric or link. Every value is the
 * realistic worst case for its field, shaped exactly like the real data.
 */
import type { Entry } from '../data/experience';
import { known, todo } from '../data/field';
import type { Project } from '../data/projects';
import type { SkillGroup } from '../data/skills';
import { SITE_DATA, type SiteData } from '../lib/siteData';

export const FIXTURE_SENTINEL = 'BREAK-UI-FIXTURE-DO-NOT-SHIP';

/** Fields the cards never render; filled so the fixture matches the Project type. */
const UNRENDERED = {
  data: known(FIXTURE_SENTINEL),
  method: FIXTURE_SENTINEL,
  headlineResult: known(FIXTURE_SENTINEL),
  whyItMatters: FIXTURE_SENTINEL,
} as const;

const worstProjects: readonly Project[] = [
  {
    // 90-character title that opens on an 18-letter word; long unit and descriptor.
    ...UNRENDERED,
    id: 'worst-long-title',
    sport: 'baseball',
    title: 'Heteroskedasticity-Robust Hierarchical Bayesian Projections of Minor-League Plate Approach',
    question:
      'Can a projection system put honest error bars on a hitter who has never faced upper-level pitching, without pretending every league and park is the same?',
    cardMethod:
      'Partially pooled Bayesian regression with league, level and park effects, fit by Hamiltonian Monte Carlo.',
    tile: known({
      value: '12.4',
      unit: 'RUNS / 600 PA',
      descriptor: 'Mean absolute error on held-out 2024 and 2025 upper-minors seasons',
    }),
    link: known('https://example.com/projects/heteroskedasticity-robust-projections'),
  },
  {
    // The state several real cards ship in: no metric and no link. Shortest plausible title.
    ...UNRENDERED,
    id: 'worst-no-metric-no-link',
    sport: 'baseball',
    title: 'xG',
    question: 'Is it any good?',
    cardMethod: 'TBD.',
    tile: todo(FIXTURE_SENTINEL),
    link: todo(FIXTURE_SENTINEL),
  },
  {
    // A repository name used as the title: 30 characters with nowhere to break.
    ...UNRENDERED,
    id: 'worst-unbreakable-title',
    sport: 'basketball',
    title: 'bsn_shot_outcome_prediction_v2',
    question:
      'Does adding defender distance, shot-clock pressure, lineup spacing and the previous three possessions to a shot model change which shots a coaching staff should actually be asking for late in close games?',
    cardMethod:
      'Gradient-boosted trees against the logistic-regression baseline, with possession-level grouped cross-validation, isotonic calibration, permutation importance and a hold-out playoff series.',
    tile: known({ value: '9', unit: '%', descriptor: 'Lift' }),
    link: known('https://example.com/a'),
  },
  {
    // A metric with no unit and no descriptor, and no link.
    ...UNRENDERED,
    id: 'worst-bare-metric',
    sport: 'motorsport',
    title: 'Tyre Degradation Curves',
    question: 'When does the undercut stop working?',
    cardMethod: 'Piecewise regression on stint lap times.',
    tile: known({ value: '1', unit: '', descriptor: '' }),
    link: todo(FIXTURE_SENTINEL),
  },
  {
    // A link but no metric.
    ...UNRENDERED,
    id: 'worst-link-no-metric',
    sport: 'core-ml',
    title: 'Paramètres d’entraînement Réplicables: Đặng Thị Ngọc Hân’s Seeds',
    question: 'How much of a benchmark gain survives ten random seeds?',
    cardMethod: 'Seed sweeps with bootstrap confidence intervals.',
    tile: todo(FIXTURE_SENTINEL),
    link: known('https://example.com/b'),
  },
];

const worstExperience: readonly Entry[] = [
  {
    // Very long job title, long organisation, a long location.
    id: 'worst-long-title',
    org: 'Mitsubishi UFJ Morgan Stanley Sports Analytics Research Collaborative',
    detail: [
      'Senior Staff Machine Learning Engineer, Baseball Research & Development and Player Evaluation Systems',
      'San Francisco, CA (hybrid, three days on site)',
    ],
    start: '2026-07',
    end: null,
    bullets: [
      'Owned the nightly projection pipeline end to end, from ingestion of pitch-level tracking data through model training, calibration checks and delivery to the front office, including the on-call rotation, the migration off the legacy scheduler and the documentation nobody else wanted to write.',
    ],
  },
  {
    // No bullets, shortest names, a role that started and ended in the same month.
    id: 'worst-bare',
    org: 'X',
    detail: ['PM'],
    start: '2025-06',
    end: '2025-06',
    bullets: [],
  },
  {
    // Four detail parts, an unbreakable bullet.
    id: 'worst-many-details',
    org: 'Seán O’Brien-Ó Súilleabháin & Partners',
    detail: ['Data Science Intern', 'Player Development', 'Remote', 'Part-time'],
    start: '2020-02',
    end: '2023-08',
    bullets: [
      'https://example.com/workspaces/acme/projects/q3-launch/docs/9f8e7d6c5b4a?tab=comments&filter=unresolved',
      'Short one.',
    ],
  },
];

const worstEducation: readonly Entry[] = [
  {
    id: 'worst-education',
    org: 'Massachusetts Institute of Technology and Woods Hole Oceanographic Institution Joint Program',
    detail: ['MS, Computational Science and Engineering with a Concentration in Statistics', 'GPA 4.00'],
    start: '2025-08',
    end: '2026-05',
    bullets: [],
  },
];

const worstSkills: readonly SkillGroup[] = [
  {
    id: 'worst-long-skill',
    name: 'Experimentation and causal inference',
    items: [
      // 40 characters, no break opportunities.
      'torch.nn.functional.binary_cross_entropy',
      'R',
      'computer vision (CNNs, ResNet, vision transformers)',
      'C',
    ],
    sublist: {
      label: 'Sports data and tracking providers',
      items: ['IMG_20250914_183022_HDR_portrait_edited.HEIC', 'Statcast / Baseball Savant'],
    },
  },
  { id: 'worst-single', name: 'Go', items: ['Go'] },
];

/** One dataset that hits every field at once. */
const worst: SiteData = {
  headline:
    'Heteroskedasticity-aware sports analytics and reinforcement learning, from raw tracking data to the front-office decision.',
  projects: worstProjects,
  experience: worstExperience,
  education: worstEducation,
  skills: worstSkills,
};

/** Real data with one filter category emptied: Motorsport has zero projects. */
const zeroSport: SiteData = {
  ...SITE_DATA,
  projects: SITE_DATA.projects.filter((project) => project.sport !== 'motorsport'),
};

/** Real data cut to a single project: the one that ships with no metric and no link. */
const oneProject: SiteData = {
  ...SITE_DATA,
  projects: SITE_DATA.projects.filter((project) => project.id === 'gpt-pretraining'),
};

export const DATASETS = [
  { id: 'real', label: 'Real data', data: SITE_DATA },
  { id: 'worst', label: 'Worst case', data: worst },
  { id: 'zero-sport', label: 'Empty sport', data: zeroSport },
  { id: 'one', label: 'One project', data: oneProject },
] as const;

export type DatasetId = (typeof DATASETS)[number]['id'];
