import type { CSSProperties } from 'react';
import { profile } from '../data/profile';
import { SHOW_TODOS } from '../lib/env';
import { BACKBOARD, CHART_META, COURT, COURT_LINES, LEGEND_HEX, PPS_BOUNDS, RIM, RINGS } from '../lib/shotChart';
import { TodoNote } from './TodoNote';

const BIN_FILL = ['fill-bin-1', 'fill-bin-2', 'fill-bin-3', 'fill-bin-4', 'fill-bin-5'] as const;
const BIN_BG = ['bg-bin-1', 'bg-bin-2', 'bg-bin-3', 'bg-bin-4', 'bg-bin-5'] as const;

const count = new Intl.NumberFormat('en-US');
const bound = (value: number) => value.toFixed(2);

/** Lower bound of each points-per-shot class, as shown under the ramp. */
const CLASS_LABELS = [`<${bound(PPS_BOUNDS[0])}`, ...PPS_BOUNDS.map((value, index) =>
  index === PPS_BOUNDS.length - 1 ? `${bound(value)}+` : bound(value),
)];

const SUMMARY = `Shot chart on a FIBA half court. Each hexagon is a court location with at least ${CHART_META.minAttempts} attempts. Colour shows points per shot in five classes from under ${bound(PPS_BOUNDS[0])} to ${bound(PPS_BOUNDS[3])} and above, and size shows how many shots were taken there. ${count.format(CHART_META.binCount)} hexagons cover ${count.format(CHART_META.shotsInBins)} of ${count.format(CHART_META.shots)} shot attempts.`;

const CAPTION = `${CHART_META.league} ${CHART_META.season}. ${count.format(CHART_META.shots)} shot attempts, all ${CHART_META.teams} teams. ${profile.hero.captionEncoding}`;

function Lines({ paths, beat }: { paths: readonly string[]; beat: string }) {
  return (
    <>
      {paths.map((d) => (
        <path key={d} d={d} pathLength={1} data-beat={beat} className="court-line" />
      ))}
    </>
  );
}

/** The binned BSN shot chart. One image, no interactive states. */
export function ShotChart() {
  const credit = profile.hero.sourceCredit;

  return (
    <>
      <div className="slot p-4 md:p-6">
        <svg
          viewBox={`0 0 ${COURT.width} ${COURT.depth}`}
          role="img"
          aria-label={`${CHART_META.league} ${CHART_META.season} shot chart: points per shot by court location`}
          className="block h-auto w-full overflow-visible"
        >
          <Lines paths={COURT_LINES.beat1} beat="1" />
          <Lines paths={COURT_LINES.beat2} beat="2" />
          <Lines paths={COURT_LINES.beat3} beat="3" />
          <g data-beat="rim">
            <path d={BACKBOARD} className="court-line" />
            <circle cx={RIM.cx} cy={RIM.cy} r={RIM.r} className="court-line" />
          </g>
          {RINGS.map((ring, index) => (
            // One custom property per ring; the bins inherit their delay from it.
            <g key={index} data-ring={index} style={{ '--ring-index': index } as CSSProperties}>
              {ring.map((bin) => (
                <polygon key={bin.key} points={bin.points} data-beat="4" className={BIN_FILL[bin.ppsClass]} />
              ))}
            </g>
          ))}
        </svg>
      </div>
      <p className="sr-only">{SUMMARY}</p>

      <figcaption data-beat="5" className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
          <div>
            <p className="type-label-s mb-2 text-chalk-dim">Points per shot</p>
            <ol className="grid grid-cols-5 gap-1">
              {CLASS_LABELS.map((label, index) => (
                <li key={label} className="type-label-s tabular flex w-12 flex-col gap-1 text-chalk-dim">
                  <span aria-hidden="true" className={`block h-2 ${BIN_BG[index]}`} />
                  {label}
                </li>
              ))}
            </ol>
          </div>
          <p className="type-label-s flex items-center gap-2 text-chalk-dim">
            <svg viewBox={`0 0 ${LEGEND_HEX.size} ${LEGEND_HEX.size}`} aria-hidden="true" className="size-4 fill-chalk-dim">
              <polygon points={LEGEND_HEX.small} />
            </svg>
            Fewer shots
            <svg viewBox={`0 0 ${LEGEND_HEX.size} ${LEGEND_HEX.size}`} aria-hidden="true" className="ml-2 size-4 fill-chalk-dim">
              <polygon points={LEGEND_HEX.large} />
            </svg>
            More shots
          </p>
        </div>
        <div className="md:max-w-(--size-tile-md) md:text-right lg:max-w-none">
          <p className="type-body-s tabular text-chalk-dim">{CAPTION}</p>
          {credit.value ? <p className="type-body-s text-chalk-faint">{credit.value}</p> : null}
          {SHOW_TODOS && credit.todo ? <TodoNote>{credit.todo}</TodoNote> : null}
        </div>
      </figcaption>
    </>
  );
}
