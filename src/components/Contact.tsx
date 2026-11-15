import { profile } from '../data/profile';
import { SHOW_TODOS } from '../lib/env';
import { ButtonLink } from './Button';
import { Baseline } from './FieldMarkings';
import { Section } from './Section';
import { TodoNote } from './TodoNote';

/** A mailto button and two profile links. No form. Each button renders only if the brief has its target. */
export function Contact() {
  const { sentence, email, github, linkedin } = profile.contact;

  return (
    <Section id="contact" title="Contact" divider={<Baseline />}>
      {sentence.value ? (
        <p data-reveal className="type-body-l measure mb-8 text-chalk">
          {sentence.value}
        </p>
      ) : null}
      {SHOW_TODOS && sentence.todo ? (
        <p className="mb-8">
          <TodoNote>{sentence.todo}</TodoNote>
        </p>
      ) : null}
      <div data-reveal className="flex flex-col gap-3 md:flex-row">
        {email.value ? (
          <ButtonLink href={`mailto:${email.value}`} variant="primary">
            Email
          </ButtonLink>
        ) : null}
        {github.value ? (
          <ButtonLink href={github.value} variant="secondary">
            GitHub
          </ButtonLink>
        ) : null}
        {linkedin.value ? (
          <ButtonLink href={linkedin.value} variant="secondary">
            LinkedIn
          </ButtonLink>
        ) : null}
      </div>
    </Section>
  );
}
