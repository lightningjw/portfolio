import portraitLarge from '../assets/img/portrait-960.webp';
import portraitSmall from '../assets/img/portrait-480.webp';
import { profile } from '../data/profile';
import { Section } from './Section';

// The sizes attribute cannot read CSS variables, so this mirrors --breakpoint-md and --breakpoint-lg.
const PORTRAIT_SIZES = '(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw'; // tokens-ok: img sizes

export function About() {
  return (
    <Section id="about" title="About">
      <div className="page-grid gap-y-8">
        <p data-reveal className="type-body-l measure col-span-full text-chalk lg:col-span-7">
          {profile.bio}
        </p>
        <img
          data-reveal
          src={portraitSmall}
          srcSet={`${portraitSmall} 480w, ${portraitLarge} 960w`}
          sizes={PORTRAIT_SIZES}
          width={480}
          height={600}
          loading="lazy"
          decoding="async"
          alt={`Portrait of ${profile.name}`}
          className="col-span-full aspect-4/5 w-full rounded-plate border border-line object-cover md:col-span-4 lg:col-span-4 lg:col-start-9"
        />
      </div>
    </Section>
  );
}
