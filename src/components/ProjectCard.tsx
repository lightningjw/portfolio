import { SPORTS, type Project } from '../data/projects';
import { SHOW_TODOS } from '../lib/env';
import { ArrowLink } from './ArrowLink';
import { BLANK_PLATES, Plates } from './Plates';
import { SportSwatch } from './SportSwatch';
import { TodoNote } from './TodoNote';

function sportLabel(project: Project): string {
  return SPORTS.find((sport) => sport.id === project.sport)?.label ?? project.sport;
}

function ResultTile({ project }: { project: Project }) {
  const tile = project.tile.value;

  if (!tile) {
    // Blank result: two empty plates and no text. An empty slot reads as "not played yet".
    return (
      <div className="slot area-tile mt-6 flex h-(--size-tile-height) items-center rounded-plate px-3 md:mt-0 md:h-auto md:self-start md:py-3">
        {SHOW_TODOS && project.tile.todo ? (
          <TodoNote>{project.tile.todo}</TodoNote>
        ) : (
          <Plates chars={BLANK_PLATES} size="xl" />
        )}
      </div>
    );
  }

  return (
    <div className="slot area-tile mt-6 flex h-(--size-tile-height) items-center gap-x-4 rounded-plate px-3 md:mt-0 md:h-auto md:flex-col md:items-start md:gap-y-2 md:self-start md:py-3">
      <p className="flex shrink-0 items-baseline gap-2">
        <span className="sr-only">
          {tile.value} {tile.unit}
        </span>
        <Plates chars={[...tile.value]} size="xl" />
        <span aria-hidden="true" className="type-label-s text-chalk">
          {tile.unit}
        </span>
      </p>
      <p className="type-label-s text-chalk-dim">{tile.descriptor}</p>
    </div>
  );
}

/** The project "box score" card: sport, title, question, method, one result tile, optional link. */
export function ProjectCard({ project }: { project: Project }) {
  const href = project.link.value;
  const linked = href !== undefined;
  const showLinkTodo = SHOW_TODOS && !linked && project.link.todo !== undefined;

  return (
    <article
      className={`card-layout group relative h-full rounded-plate border border-line bg-board-raised p-4 md:p-6 ${
        linked ? 'hover:border-line-control hover:bg-board-raised-hover active:bg-board-raised' : ''
      }`}
    >
      <div className="area-text">
        <p className="type-label flex items-center gap-2 text-chalk-dim">
          <SportSwatch sport={project.sport} />
          {sportLabel(project)}
        </p>
        <h3 className="type-display-m mt-3 text-chalk">{project.title}</h3>
        <p className="type-body-l mt-3 text-chalk">{project.question}</p>
        <p className="mt-6">
          <span className="type-label-s block text-chalk-dim">Method</span>
          <span className="type-body-s mt-1 block text-chalk-dim">{project.cardMethod}</span>
        </p>
      </div>
      <ResultTile project={project} />
      {linked || showLinkTodo ? (
        <div className="area-link mt-4">
          {linked ? (
            <ArrowLink href={href} stretched>
              View project
            </ArrowLink>
          ) : (
            <TodoNote>{project.link.todo}</TodoNote>
          )}
        </div>
      ) : null}
    </article>
  );
}
