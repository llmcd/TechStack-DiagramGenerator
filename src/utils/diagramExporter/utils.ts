export const getTextWidth = (text: string): number => {
  // More accurate text width estimation based on character types
  return text.split('').reduce((width, char) => {
    if (char.match(/[A-Z]/)) return width + 9;
    if (char.match(/[a-z]/)) return width + 7;
    if (char.match(/[0-9]/)) return width + 8;
    return width + 4; // spaces and other characters
  }, 0);
};

export const calculateDiagramHeight = (rowCount: number): number => {
  const { titleHeight, rowHeight, padding } = EXPORT_DEFAULTS;
  return titleHeight + (rowCount * rowHeight) + (padding * 2);
};