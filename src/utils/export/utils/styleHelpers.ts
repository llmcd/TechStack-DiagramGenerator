export const getHeaderColor = (key: string): string => {
  const colors: Record<string, string> = {
    presentation: '#dbeafe',
    programmingLanguages: '#dcfce7',
    frameworks: '#fef3c7',
    databases: '#f3e8ff',
    cloudPlatforms: '#ffe4e6',
    compute: '#e0e7ff',
    network: '#fae8ff',
    services: '#ffedd5'
  };
  return colors[key] || '#f3f4f6';
};