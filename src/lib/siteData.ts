import { createContext, useContext } from 'react';
import { education, experience, type Entry } from '../data/experience';
import { profile } from '../data/profile';
import { projects, type Project } from '../data/projects';
import { skills, type SkillGroup } from '../data/skills';

/**
 * The data-driven content the page renders. Components read it through
 * useSiteData() instead of importing the data files, so a development build
 * can swap in stress-test fixtures at this one boundary (src/dev/). A
 * production build has no provider and always gets SITE_DATA.
 */
export interface SiteData {
  headline: string;
  projects: readonly Project[];
  experience: readonly Entry[];
  education: readonly Entry[];
  skills: readonly SkillGroup[];
}

export const SITE_DATA: SiteData = {
  headline: profile.headline,
  projects,
  experience,
  education,
  skills,
};

export const SiteDataContext = createContext<SiteData>(SITE_DATA);

export function useSiteData(): SiteData {
  return useContext(SiteDataContext);
}
