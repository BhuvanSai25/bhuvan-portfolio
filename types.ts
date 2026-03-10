export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  features: string[];
  category: 'Full Stack' | 'Backend' | 'ML/AI' | 'Algorithm' | 'Other';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  icon?: string; // Icon name from Lucide or identifier for Logo
  category: 'Languages' | 'Core' | 'Frontend' | 'Cloud & Infra' | 'Others';
  isConcept?: boolean; // If true, use Lucide icon; if false, use brand logo
}

export interface Education {
  school: string;
  degree: string;
  year: string;
  score: string;
}