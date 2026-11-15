import { profile } from '../data/profile';
import { ButtonLink } from './Button';
import { ShotChart } from './ShotChart';

/** Headline beside the chart. The h1 and buttons are in their final state from the first frame. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="shell page-grid gap-y-12">
      <div className="col-span-full lg:col-span-5">
        <h1 id="hero-title" className="type-display-xl text-chalk">
          {profile.headline}
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="#projects" variant="primary">
            View projects
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </div>
      <figure className="col-span-full lg:col-span-7">
        <ShotChart />
      </figure>
    </section>
  );
}
