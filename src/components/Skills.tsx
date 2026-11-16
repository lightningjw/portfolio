import { useSiteData } from '../lib/siteData';
import { Section } from './Section';

const PLATE =
  'type-body-s flex min-h-(--size-skill-plate) items-center rounded-plate border border-line-control bg-board px-(--size-skill-plate-pad) text-chalk';

function PlateList({ items, labelledBy }: { items: readonly string[]; labelledBy: string }) {
  return (
    <ul aria-labelledby={labelledBy} className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className={PLATE}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Grouped skill plates. Not buttons: no hover, no focus, no ratings. */
export function Skills() {
  const { skills } = useSiteData();
  return (
    <Section id="skills" title="Skills">
      <div data-reveal className="flex flex-col gap-8">
        {skills.map((group) => {
          const groupId = `skills-${group.id}`;
          const sublistId = `${groupId}-sub`;
          return (
            <div key={group.id} className="page-grid gap-y-3">
              <h3 id={groupId} className="type-display-s col-span-full text-chalk lg:col-span-3">
                {group.name}
              </h3>
              <div className="col-span-full flex flex-col gap-3 lg:col-span-9">
                <PlateList items={group.items} labelledBy={groupId} />
                {group.sublist ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <p id={sublistId} className="type-label-s mr-1 text-chalk-dim">
                      {group.sublist.label}
                    </p>
                    <PlateList items={group.sublist.items} labelledBy={sublistId} />
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
