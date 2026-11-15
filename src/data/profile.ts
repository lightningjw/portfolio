import { known, todo, type Field } from './field';

export interface Profile {
  name: string;
  headline: string;
  bio: string;
  hero: {
    /** Follows the league, season and counts, which come from heroShotBins.json. */
    captionEncoding: string;
    sourceCredit: Field<string>;
  };
  contact: {
    /** DESIGN.md asks for one sentence here. The brief does not supply it. */
    sentence: Field<string>;
    email: Field<string>;
    github: Field<string>;
    linkedin: Field<string>;
  };
}

export const profile: Profile = {
  name: 'Justin Wong',
  headline: 'Sports analytics and machine learning, from raw data to decision.',
  bio: "I'm a Data Engineer at Abbott, and I hold a BSE in Computer Science and an MS in Data Science from the University of Michigan. Outside the day job I build sports analytics and machine learning projects, with baseball at the center: projection models, player evaluation, and the data pipelines underneath them. I also did lead data analysis for the Mets de Guaynabo, a professional basketball team in Puerto Rico's BSN league.",
  hero: {
    captionEncoding: 'Colour shows points per shot, size shows volume.',
    sourceCredit: todo('name of the site the shot locations were scraped from'),
  },
  contact: {
    sentence: todo('one-sentence contact line (DESIGN.md asks for it; not in PORTFOLIO_BRIEF.md)'),
    email: known('juswon@umich.edu'),
    github: known('https://github.com/lightningjw'),
    linkedin: known('https://www.linkedin.com/in/jusawon/'),
  },
};
