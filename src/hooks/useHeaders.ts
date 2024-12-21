import { Header } from '../types';

export const useHeaders = (): Header[] => {
  return [
    { 
      id: 'presentation', 
      label: 'Presentation - Frontend (UI)', 
      color: 'bg-blue-200 text-blue-900',
      group: 'Frontend'
    },
    { 
      id: 'programmingLanguages', 
      label: 'Programming Languages', 
      color: 'bg-emerald-200 text-emerald-900',
      group: 'Backend'
    },
    { 
      id: 'frameworks', 
      label: 'Frameworks', 
      color: 'bg-amber-200 text-amber-900',
      group: 'Backend'
    },
    { 
      id: 'databases', 
      label: 'Databases', 
      color: 'bg-purple-200 text-purple-900',
      group: 'Data'
    },
    { 
      id: 'cloudPlatforms', 
      label: 'Cloud Platforms', 
      color: 'bg-rose-200 text-rose-900',
      group: 'Infrastructure'
    },
    { 
      id: 'compute', 
      label: 'Compute', 
      color: 'bg-indigo-200 text-indigo-900',
      group: 'Infrastructure'
    },
    { 
      id: 'network', 
      label: 'Network', 
      color: 'bg-fuchsia-200 text-fuchsia-900',
      group: 'Infrastructure'
    },
    { 
      id: 'services', 
      label: 'Services', 
      color: 'bg-orange-200 text-orange-900',
      group: 'Infrastructure'
    }
  ];
};