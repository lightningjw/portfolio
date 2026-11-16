import { profile } from '../data/profile';

const LINK = 'text-link inline-flex min-h-(--size-touch) items-center';
const YEAR = new Date().getFullYear();

export function Footer() {
  const { github, linkedin } = profile.contact;

  return (
    <footer className="shell">
      <div className="type-body-s flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-8 text-chalk-dim">
        <p className="tabular">
          {profile.name} · {YEAR}
        </p>
        <ul className="flex flex-wrap gap-x-6">
          {github.value ? (
            <li>
              <a href={github.value} target="_blank" rel="noreferrer" className={LINK}>
                GitHub
              </a>
            </li>
          ) : null}
          {linkedin.value ? (
            <li>
              <a href={linkedin.value} target="_blank" rel="noreferrer" className={LINK}>
                LinkedIn
              </a>
            </li>
          ) : null}
          <li>
            <a href="#top" className={LINK}>
              Back to top
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
