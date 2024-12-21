export interface TechStackData {
  presentation: string[];
  programmingLanguages: string[];
  frameworks: string[];
  databases: string[];
  cloudPlatforms: string[];
  compute: string[];
  network: string[];
  services: string[];
}

export interface Header {
  id: keyof TechStackData;
  label: string;
  color: string;
  group: string;
}

export interface HeaderConfig {
  id: keyof TechStackData;
  label: string;
  color: string;
  column: string;
}