export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tech: string[];
  category: string;
  liveUrl?: string;
  githubUrl?: string;
  color: string;
  accentColor: string;
  features: string[];
  challenges: string[];
}

export interface Skill {
  name: string;
  category: string;
  tier: "Expert" | "Proficient" | "Learning";
  icon: string;
}

export interface Experience {
  id: string;
  title: string;
  org: string;
  period: string;
  location: string;
  description: string[];
  color: string;
  type: "leadership" | "hackathon" | "internship" | "event";
}

export interface LeadershipRole {
  id: string;
  org: string;
  role: string;
  period: string;
  description: string;
  stats: { label: string; value: string }[];
  color: string;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  color: string;
  year: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  duration: string;
  description: string;
  skills: string[];
  color: string;
}

export interface TimelineStage {
  id: string;
  stage: string;
  year: string;
  description: string;
  icon: string;
}

export interface TechItem {
  name: string;
  icon: string;
  color: string;
  category: string;
}
