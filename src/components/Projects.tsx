import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { projects, SPORTS } from '../data/projects';
import { useMotionTokens } from '../lib/motion';
import { Diamond } from './FieldMarkings';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';
import { SportFilter, type FilterValue } from './SportFilter';

/** A category with no projects is not a plate. */
const ACTIVE_SPORTS = SPORTS.filter((sport) => projects.some((project) => project.sport === sport.id));
/** With fewer than two categories there is nothing to filter. */
const SHOW_FILTER = ACTIVE_SPORTS.length >= 2;

function statusFor(filter: FilterValue, count: number): string {
  const noun = count === 1 ? 'project' : 'projects';
  const sport = ACTIVE_SPORTS.find((option) => option.id === filter);
  return sport ? `Showing ${count} ${sport.label} ${noun}` : `Showing ${count} ${noun}`;
}

export function Projects() {
  const [filter, setFilter] = useState<FilterValue>('all');
  const tokens = useMotionTokens();
  // Filtering removes cards. The rest keep the order from the brief.
  const shown = filter === 'all' ? projects : projects.filter((project) => project.sport === filter);

  return (
    <Section id="projects" title="Projects" marking={<Diamond />}>
      {SHOW_FILTER ? (
        <div data-reveal className="mb-6">
          <SportFilter
            sports={ACTIVE_SPORTS}
            value={filter}
            onChange={setFilter}
            count={shown.length}
            status={statusFor(filter, shown.length)}
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
                transition: { duration: tokens.base, ease: tokens.easeOut, delay: tokens.layout },
              }}
              exit={{ opacity: 0, transition: { duration: tokens.fast, ease: tokens.easeIn } }}
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
