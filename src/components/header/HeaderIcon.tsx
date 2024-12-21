import React from 'react';
import { LucideIcon } from 'lucide-react';
import { 
  Layout, 
  Code2, 
  Blocks, 
  Database, 
  Cloud, 
  Server, 
  Network, 
  Wrench 
} from 'lucide-react';
import { Header } from '../../types';

const headerIconMap: Record<string, LucideIcon> = {
  'presentation': Layout,
  'programmingLanguages': Code2,
  'frameworks': Blocks,
  'databases': Database,
  'cloudPlatforms': Cloud,
  'compute': Server,
  'network': Network,
  'services': Wrench
};

interface HeaderIconProps {
  header: Header;
}

export const HeaderIcon: React.FC<HeaderIconProps> = ({ header }) => {
  const Icon = headerIconMap[header.id] || Wrench;
  
  return (
    <Icon className="w-5 h-5 mr-3 opacity-80" />
  );
};