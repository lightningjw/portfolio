import { known, todo, type Field } from './field';

/** Filter categories, in display order. A category with no projects is not shown. */
export const SPORTS = [
  { id: 'baseball', label: 'Baseball' },
  { id: 'basketball', label: 'Basketball' },
  { id: 'motorsport', label: 'Motorsport' },
  { id: 'core-ml', label: 'Core ML' },
] as const;

export type SportId = (typeof SPORTS)[number]['id'];

/*
 * Result tile values are set one character per plate, four plates at most
 * (DESIGN.md, Tabular figures and stats). PlateValue rejects anything longer,
 * or anything that is not a digit or a decimal point, at compile time.
 */
type PlateChar = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '.';
type PlateChars<S extends string, Acc extends unknown[] = []> = S extends `${infer Head}${infer Tail}`
  ? Head extends PlateChar
    ? PlateChars<Tail, [...Acc, Head]>
    : never
  : Acc;
type PlateValue<S extends string> = [PlateChars<S>] extends [never]
  ? never
  : PlateChars<S>['length'] extends 1 | 2 | 3 | 4
    ? S
    : never;

export interface ResultTile {
  /** One to four characters: digits and at most a decimal point. */
  value: string;
  /** Sits after the plates, never on one. */
  unit: string;
  /** One line under the plates. */
  descriptor: string;
}

function tile<const S extends string>(value: PlateValue<S>, unit: string, descriptor: string): ResultTile {
  return { value, unit, descriptor };
}

export interface Project {
  id: string;
  sport: SportId;
  title: string;
  question: string;
  data: Field<string>;
  method: string;
  headlineResult: Field<string>;
  /** One-line form of `method` for the card. */
  cardMethod: string;
  /** Blank on the card until the headline result exists. */
  tile: Field<ResultTile>;
  link: Field<string>;
  whyItMatters: string;
}

/** Order is intentional: baseball first, then other sports, then core ML. */
export const projects: readonly Project[] = [
  {
    id: 'ops-forecasting',
    sport: 'baseball',
    title: 'MLB Player OPS Forecasting',
    question:
      "Can a model that accounts for a hitter's run environment project next-season OPS more accurately than MARCEL?",
    data: known(
      'Lahman database historical MLB batting data, plus team offensive efficiency (runs per game) lagged one and two years, and age adjustments.',
    ),
    method:
      'Random Forest regression in R (randomForest, dplyr, tidyverse, RSQLite), 70/30 train/test split, evaluated on mean squared error against the MARCEL benchmark. The lagged team runs-per-game feature separates player skill from the offensive context around him.',
    headlineResult: known('9% lower mean squared error than MARCEL.'),
    cardMethod:
      'Random Forest regression in R with a lagged team run environment feature, tested against MARCEL.',
    tile: known(tile('9', '%', 'Lower mean squared error than MARCEL')),
    link: todo('repo or write-up URL'),
    whyItMatters:
      'Projection systems sit underneath trade, free-agency and roster decisions, and a model that beats a standard public baseline with transparent, explainable features is the kind of foundation an analytics group can extend.',
  },
  {
    id: 'eldridge-evaluation',
    sport: 'baseball',
    title: 'Prospect Evaluation: Bryce Eldridge Archetype and Contact Quality',
    question:
      'How do you value a top prospect with almost no MLB sample? Which established hitters is he physically built like, and where does he already match or trail them?',
    data: known(
      'Physical and developmental attributes (height, weight, handedness, draft position, debut age, amateur path, speed grade) from Baseball Reference; Statcast metrics from Baseball Savant via pybaseball; FanGraphs leaderboards; Baseball America scouting grades.',
    ),
    method:
      "K-means and hierarchical clustering on stat-independent physical attributes (silhouette analysis to choose K, PCA to visualize) to find his nearest physical comps; Statcast comparison against those comps across exit velocity, barrel rate, xwOBA, K%, BB% and chase rate; development-arc trajectories and bootstrap confidence intervals. Before finalizing, he caught that pybaseball's pitch-level exit velocity and xwOBA conflicted with Baseball Savant's published figures and corrected the analysis to the published numbers.",
    headlineResult: known(
      "Nearest physical comps were James Wood, Aaron Judge, Matt Olson, Yordan Alvarez and Ryan Mountcastle. In his 37-PA 2025 debut, Eldridge's contact quality (95.6 mph average exit velocity, .362 xwOBA) already matched or exceeded those comps, while his 35.1% strikeout rate was driven by in-zone misses rather than chasing (chase rate about 17%). That isolates in-zone contact as the development variable that decides his ceiling.",
    ),
    cardMethod:
      'K-means and hierarchical clustering to find physical comps, then a Statcast comparison with bootstrap confidence intervals.',
    tile: known(tile('95.6', 'MPH', 'Avg exit velocity, 37-PA debut')),
    link: todo('repo or notebook URL'),
    whyItMatters:
      'It shows how to evaluate a player when the sample is too small to trust, by combining physical-archetype comps with process metrics, and it shows the habit of reconciling data sources before a number reaches a decision-maker.',
  },
  {
    id: 'play-outcome-classification',
    sport: 'baseball',
    title: 'Baseball Play Outcome Classification',
    question:
      'Can free-text play-by-play descriptions be classified into nine play outcomes without hand-labeling the data?',
    data: known(
      'A curated dataset of about 1,400 baseball play descriptions.',
      'where the play-by-play text came from',
    ),
    method:
      'Weak supervision: rule-based labeling to generate training labels, then fine-tuned DistilBERT (Python, PyTorch, Hugging Face Transformers, pandas).',
    headlineResult: known(
      '15-point accuracy improvement over the rule-based baseline.',
      'absolute accuracy, if Justin wants it shown',
    ),
    cardMethod: 'Weak supervision: rule-based labels, then a fine-tuned DistilBERT classifier.',
    tile: known(tile('15', 'PTS', 'Accuracy gain over the rule-based baseline')),
    link: todo('repo URL'),
    whyItMatters:
      'A lot of baseball information still lives in text, and a cheap labeling pipeline turns it into structured, queryable data without weeks of manual tagging.',
  },
  {
    id: 'bsn-shot-outcome',
    sport: 'basketball',
    title: 'BSN Shot Outcome Prediction (Mets de Guaynabo)',
    question: 'Can shot success be predicted using only information available at the moment of the shot?',
    data: known(
      'SynergySports API data combined with web-scraped BSN play-by-play; 34K+ shot attempts after cleaning, processed through a Python ETL pipeline into MySQL.',
    ),
    method:
      'Engineered features for game clock (plus a quadratic clock term for late-game pressure), zone defense, situational flags (after timeout, sideline and baseline out-of-bounds), shot type, home/away, and one-hot shooter and defender identities. Logistic regression as an interpretable baseline, compared against random forest, KNN, naive Bayes and a neural network, tuned with GridSearchCV. Logistic regression won.',
    headlineResult: known(
      '64.7% cross-validated accuracy, 11 percentage points above a baseline using only zone defense and game quarter, with a minimal train/test gap. The ETL pipeline cut processing time by 90%. Results reached coaches through an R Shiny dashboard used for game strategy and scouting.',
    ),
    cardMethod:
      'Logistic regression on engineered game-context features, compared against four other models.',
    tile: known(tile('64.7', '%', 'Cross-validated accuracy')),
    link: known('https://lightningjw.github.io/bsn-pbp-analysis/'),
    whyItMatters:
      'It is the complete loop an analytics department runs every day: messy multi-source event data, a model tested against simpler alternatives, and output delivered in a form coaches actually used.',
  },
  {
    id: 'f1-constructor-classification',
    sport: 'motorsport',
    title: 'Formula One Constructor Image Classification',
    question: 'Can a model identify which of eight F1 constructors a car belongs to from a single image?',
    data: todo('image source and dataset size'),
    method:
      'A preprocessing pipeline that cleaned corrupted files and rebalanced classes, then a comparison of shallow CNNs, vision transformers and a pre-trained ResNet-50 (Python, PyTorch).',
    headlineResult: known(
      '96% validation accuracy with ResNet-50, outperforming shallow CNNs and vision transformers on limited data.',
    ),
    cardMethod:
      'Transfer learning with a pre-trained ResNet-50, compared against shallow CNNs and vision transformers.',
    tile: known(tile('96', '%', 'Validation accuracy with ResNet-50')),
    link: todo('repo URL'),
    whyItMatters:
      'Video and image data is a growing source of player and game information, and this shows how to get a strong vision model out of a small labeled set through transfer learning and careful data cleaning.',
  },
  {
    id: 'gpt-pretraining',
    sport: 'core-ml',
    title: 'GPT-Style Language Model Pretraining and Fine-Tuning',
    question: 'What does it take to build, pretrain and fine-tune a decoder-only transformer from scratch?',
    data: known('A 1B-token text corpus.', 'corpus name'),
    method:
      'Decoder-only transformer with multi-head self-attention and causal masking, GPU-accelerated training, reproducible training pipelines with Weights & Biases experiment tracking and hyperparameter tuning, benchmarked on instruction following (Python, PyTorch).',
    headlineResult: todo('a result to show (for example, a benchmark score or loss), or leave this field out'),
    cardMethod: 'Decoder-only transformer built from scratch in PyTorch, pretrained then fine-tuned.',
    tile: todo('headline result for the tile'),
    link: todo('repo URL'),
    whyItMatters:
      'Sequence models are a natural fit for pitch sequences and possessions, and building one from the ground up means understanding the model well enough to debug and adapt it rather than treating it as a black box.',
  },
];
