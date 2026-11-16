/** Year and month, for example "2026-07". `null` as an end means the role is current. */
export type YearMonth = `${number}-${'01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'}`;

export interface Entry {
  id: string;
  org: string;
  /** Shown on the line under the organisation, separated by middle dots. */
  detail: readonly string[];
  start: YearMonth;
  end: YearMonth | null;
  bullets: readonly string[];
}

/**
 * Reverse chronological, one entry per role.
 * Abbott is title, dates and one résumé-level line only (project hard rule).
 */
export const experience: readonly Entry[] = [
  {
    id: 'abbott',
    org: 'Abbott',
    detail: ['Data Engineer', 'Chicago, IL'],
    start: '2026-07',
    end: null,
    bullets: ['Build data pipelines that support analytics and machine learning.'],
  },
  {
    id: 'mets-de-guaynabo',
    org: 'Mets de Guaynabo',
    detail: ['Lead Data Analyst', 'BSN, professional basketball', 'Guaynabo, Puerto Rico'],
    start: '2023-03',
    end: '2026-05',
    bullets: [
      'Trained and evaluated supervised ML models on 34K+ shot attempts with engineered game-context and matchup features, improving predictive accuracy by 11 percentage points to support scouting and play-calling.',
      'Architected Python ETL pipelines to scrape and merge multi-source play-by-play data, cutting processing time by 90% and powering an R Shiny dashboard coaches and analysts used for game strategy.',
    ],
  },
  {
    id: 'nestle-purina',
    org: 'Nestlé Purina PetCare',
    detail: ['Applied Data Scientist Intern', 'St. Louis, MO'],
    start: '2025-05',
    end: '2025-08',
    bullets: [
      'Built SQL and Python analytics pipelines and Power BI dashboards on Azure SQL production data (robotics telemetry and manufacturing KPIs across 23 factories), enabling real-time monitoring and contributing to $21M in projected cost savings.',
      'Automated maintenance analytics and ROI reporting with reproducible Python pipelines, reducing manual reporting effort by 85%.',
    ],
  },
  {
    id: 'in-person-away',
    org: 'In-Person Away Virtual Events',
    detail: ['Software Engineer', 'Ann Arbor, MI'],
    start: '2023-01',
    end: '2024-01',
    bullets: [
      'Built a modular control system using computer vision for real-time localization and navigation, validated across 3 hardware prototypes and 5+ live trials.',
      'Led a 5-member engineering team translating stakeholder requirements into system architecture and a prioritized roadmap.',
    ],
  },
  {
    id: 'ritz-deli',
    org: 'Ritz Deli Mobile Gaming Company',
    detail: ['Data Science Intern', 'Oakland, CA'],
    start: '2020-02',
    end: '2023-08',
    bullets: [
      'Analyzed telemetry from 5,000+ beta testers with SQL and Python to train predictive models and trend forecasts for in-game economy tuning.',
      'Led A/B testing and experiment analysis that drove a 25% increase in player retention.',
    ],
  },
];

/** PORTFOLIO_BRIEF.md section 6. Rendered with the same entry component. */
export const education: readonly Entry[] = [
  {
    id: 'umich-ms',
    org: 'University of Michigan, Ann Arbor',
    detail: ['MS, Data Science', 'GPA 4.00'],
    start: '2025-08',
    end: '2026-05',
    bullets: ['Engineering Global Leadership Honors Program, International Minor, Tauber Institute Fellow'],
  },
  {
    id: 'umich-bse',
    org: 'University of Michigan, Ann Arbor',
    detail: ['BSE, Computer Science', 'GPA 3.90'],
    start: '2021-08',
    end: '2025-05',
    bullets: ['Tau Beta Pi, Mcity research, Robotic Submarine project team, study abroad at University College Dublin'],
  },
];
