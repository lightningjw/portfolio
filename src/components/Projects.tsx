import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { SPORTS } from '../data/projects';
import { useMotionTokens } from '../lib/motion';
import { useSiteData } from '../lib/siteData';
import { Diamond } from './FieldMarkings';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';
import { SportFilter, type FilterValue } from './SportFilter';

function statusFor(sportLabel: string | undefined, count: number): string {
  const noun = count === 1 ? 'project' : 'projects';
  return sportLabel ? `Showing ${count} ${sportLabel} ${noun}` : `Showing ${count} ${noun}`;
}

export function Projects() {
  const { projects } = useSiteData();
  const [selected, setSelected] = useState<FilterValue>('all');
  const tokens = useMotionTokens();
  /** A category with no projects is not a plate. */
  const activeSports = useMemo(
    () => SPORTS.filter((sport) => projects.some((project) => project.sport === sport.id)),
    [projects],
  );
  /** With fewer than two categories there is nothing to filter. */
  const showFilter = activeSports.length >= 2;
  const activeSport = activeSports.find((sport) => sport.id === selected);
  const filter = selected;
  // Filtering removes cards. The rest keep the order from the brief.
  const shown = filter === 'all' ? projects : projects.filter((project) => project.sport === filter);

  return (
    <Section id="projects" title="Projects" marking={<Diamond />}>
      {showFilter ? (
        <div data-reveal className="mb-6">
          <SportFilter
            sports={activeSports}
            value={filter}
            onChange={setSelected}
            count={shown.length}
            status={statusFor(activeSport?.label, shown.length)}
          />
        </div>
      ) : null}
      <ul data-reveal className="relative grid gap-4 lg:grid-cols-2 lg:gap-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project) => (
            <motion.li
              key={project.id}
              layout="position"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                // Starts as the leaving cards finish, alongside the reflow.
                transition: { duration: tokens.base, ease: tokens.easeOut, delay: tokens.fast },
              }}
              exit={{ opacity: 0, transition: { duration: tokens.fast, ease: tokens.easeOut } }}
              transition={{ layout: { duration: tokens.layout, ease: tokens.easeInOut } }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Section>
  );
}
