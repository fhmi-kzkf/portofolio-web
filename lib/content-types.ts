export type Localized = {
  en: string;
  id: string;
};

export type SocialLink = {
  id: string;
  name: string;
  url: string;
};

export type Profile = {
  name: string;
  roles: string[];
  photoUrl: string;
  heroDescription: Localized;
  aboutGreeting: Localized;
  aboutContent: Localized;
  socials: SocialLink[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  url: string;
};

export type Education = {
  id: string;
  degree: string;
  institution: string;
  year: string;
  icon: string;
  description: string;
};

export type Skill = {
  id: string;
  name: string;
  tag1: string;
  tag2: string;
  icon: string;
  description: string;
};

export type SiteContent = {
  version: 1;
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
};

export type CollectionKey = 'projects' | 'experience' | 'education' | 'skills';

export type AdminSection = 'profile' | CollectionKey;
