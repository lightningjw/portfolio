/*
 * DEVELOPMENT ONLY (see fixtures.ts). Swaps the page's data at the
 * SiteDataContext boundary and renders the switch for it. The choice lives
 * in the URL as ?data=worst, so a reload or a shared link keeps it.
 */
import { useState, type ReactNode } from 'react';
import { SiteDataContext } from '../lib/siteData';
import { DATASETS, FIXTURE_SENTINEL, type DatasetId } from './fixtures';

const PARAM = 'data';

function initialId(): DatasetId {
  const requested = new URLSearchParams(window.location.search).get(PARAM);
  return DATASETS.find((dataset) => dataset.id === requested)?.id ?? 'real';
}

export function DevData({ children }: { children: ReactNode }) {
  const [id, setId] = useState<DatasetId>(initialId);
  const dataset = DATASETS.find((option) => option.id === id) ?? DATASETS[0];

  const select = (next: DatasetId) => {
    const url = new URL(window.location.href);
    if (next === 'real') url.searchParams.delete(PARAM);
    else url.searchParams.set(PARAM, next);
    window.history.replaceState(null, '', url);
    setId(next);
  };

  return (
    <SiteDataContext value={dataset.data}>
      {children}
      {/* Plain chrome, not part of the design under test. Instant, no animation. */}
      <div
        role="group"
        aria-label="Development data set"
        data-dev-toggle={FIXTURE_SENTINEL}
        className="type-body-s fixed bottom-2 left-1/2 z-50 flex w-max max-w-full -translate-x-1/2 flex-wrap justify-center gap-1 border border-line-control bg-board-deep p-1"
      >
        {DATASETS.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={option.id === id}
            onClick={() => select(option.id)}
            className={`cursor-pointer px-2 py-1 ${option.id === id ? 'bg-chalk text-board' : 'text-chalk-dim'}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </SiteDataContext>
  );
}
