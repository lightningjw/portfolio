import type { Entry } from '../data/experience';
import { dateRange } from '../lib/format';
import { useSiteData } from '../lib/siteData';
import { CentreCircle } from './FieldMarkings';
import { Section } from './Section';

/** One role: dates on the left from 1024, organisation, role line and bullets on the right. */
function EntryRow({ entry, headingLevel }: { entry: Entry; headingLevel: 'h3' | 'h4' }) {
  const Heading = headingLevel;
  return (
    <li className="page-grid gap-y-2 border-t border-line pt-6 pb-8">
      <p className="type-label tabular col-span-full text-chalk-dim lg:col-span-3">
        {dateRange(entry.start, entry.end)}
      </p>
      <div className="col-span-full lg:col-span-9">
        <Heading className="type-display-s text-chalk">{entry.org}</Heading>
        <p className="type-body mt-1 text-chalk-dim">{entry.detail.join(' · ')}</p>
        {entry.bullets.length > 0 ? (
          <ul className="measure mt-3 flex flex-col gap-2">
            {entry.bullets.map((bullet) => (
              <li key={bullet} className="bullet type-body text-chalk">
                {bullet}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

export function Experience() {
  const { education, experience } = useSiteData();
  return (
    <Section id="experience" title="Experience" divider={<CentreCircle />}>
      <ul data-reveal>
        {experience.map((entry) => (
          <EntryRow key={entry.id} entry={entry} headingLevel="h3" />
        ))}
      </ul>
      <h3 data-reveal className="type-display-m mt-12 mb-6 text-chalk">
        Education
      </h3>
      <ul data-reveal>
        {education.map((entry) => (
          <EntryRow key={entry.id} entry={entry} headingLevel="h4" />
        ))}
      </ul>
    </Section>
  );
}
