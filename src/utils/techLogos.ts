interface TechLogo {
  name: string;
  url: string;
  backgroundColor?: string;
}

// Map of technology names to their corresponding logo URLs (case-insensitive)
export const techLogoMap: Record<string, TechLogo> = {
  'react': {
    name: 'React',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    backgroundColor: '#20232a'
  },
  'vue': {
    name: 'Vue.js',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    backgroundColor: '#41B883'
  },
  'angular': {
    name: 'Angular',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    backgroundColor: '#DD0031'
  },
  'javascript': {
    name: 'JavaScript',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    backgroundColor: '#F7DF1E'
  },
  'typescript': {
    name: 'TypeScript',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    backgroundColor: '#3178C6'
  },
  'python': {
    name: 'Python',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    backgroundColor: '#3776AB'
  },
  'java': {
    name: 'Java',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    backgroundColor: '#007396'
  },
  'mongodb': {
    name: 'MongoDB',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    backgroundColor: '#47A248'
  },
  'postgresql': {
    name: 'PostgreSQL',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    backgroundColor: '#336791'
  },
  'mysql': {
    name: 'MySQL',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    backgroundColor: '#4479A1'
  },
  'aws': {
    name: 'AWS',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    backgroundColor: '#232F3E'
  },
  'azure': {
    name: 'Azure',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
    backgroundColor: '#0089D6'
  },
  'kubernetes': {
    name: 'Kubernetes',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    backgroundColor: '#326CE5'
  },
  'docker': {
    name: 'Docker',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    backgroundColor: '#2496ED'
  },
  'nginx': {
    name: 'Nginx',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    backgroundColor: '#009639'
  },
  'redis': {
    name: 'Redis',
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    backgroundColor: '#DC382D'
  }
};

export const getLogoForTech = (techName: string): TechLogo | null => {
  const normalizedName = techName.toLowerCase();
  for (const [key, logo] of Object.entries(techLogoMap)) {
    if (normalizedName.includes(key.toLowerCase())) {
      return logo;
    }
  }
  return null;
};