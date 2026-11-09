export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'IoT & Hardware' | 'Software & Full-Stack' | 'Videojuegos' | 'Ciberseguridad';
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  tags: string[];
  features: string[];
  metrics?: { label: string; value: string }[];
  githubUrl?: string;
  demoUrl?: string;
  badge?: string;
  iconName: string;
  imageUrl?: string;
  images?: string[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level: string;
    highlight?: boolean;
  }[];
}

export interface TimelineItem {
  period: string;
  role: string;
  institution: string;
  description: string;
  skills: string[];
}
