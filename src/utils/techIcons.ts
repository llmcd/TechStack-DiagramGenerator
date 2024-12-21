import { 
  Blocks, 
  Code2, 
  Database, 
  Globe, 
  Layout, 
  Network, 
  Server, 
  Wrench,
  LucideIcon
} from 'lucide-react';
import { TechStackData } from '../types';

interface TechIconMap {
  [key: string]: LucideIcon;
}

// Map of technology names to their corresponding icons (case-insensitive)
export const techIconMap: TechIconMap = {
  'react': Layout,
  'vue': Layout,
  'angular': Layout,
  'javascript': Code2,
  'typescript': Code2,
  'python': Code2,
  'java': Code2,
  'mongodb': Database,
  'postgresql': Database,
  'mysql': Database,
  'aws': Globe,
  'azure': Globe,
  'gcp': Globe,
  'kubernetes': Blocks,
  'docker': Blocks,
  'nginx': Network,
  'apache': Network,
  'redis': Database,
  'graphql': Server,
  'rest': Server
};

export const getIconForTech = (techName: string): LucideIcon => {
  const normalizedName = techName.toLowerCase();
  for (const [key, icon] of Object.entries(techIconMap)) {
    if (normalizedName.includes(key.toLowerCase())) {
      return icon;
    }
  }
  return Wrench; // Default icon
};