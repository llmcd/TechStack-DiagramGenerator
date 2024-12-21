import { read, utils } from 'xlsx';
import { TechStackData } from '../types';

export const parseSpreadsheet = async (file: File): Promise<TechStackData> => {
  try {
    const data = await file.arrayBuffer();
    const workbook = read(data);
    
    if (!workbook.SheetNames.length) {
      throw new Error('Spreadsheet is empty');
    }

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    if (!worksheet) {
      throw new Error('First sheet is empty');
    }

    const jsonData = utils.sheet_to_json(worksheet, { 
      header: 1,
      blankrows: false,
      defval: '' // Default value for empty cells
    });

    const techStack: TechStackData = {
      presentation: [],
      programmingLanguages: [],
      frameworks: [],
      databases: [],
      cloudPlatforms: [],
      compute: [],
      network: [],
      services: [],
    };

    // Start from row 3 (index 2) to skip headers
    for (let i = 2; i < jsonData.length; i++) {
      const row = jsonData[i] as string[];
      if (!Array.isArray(row)) continue;

      // Safely add non-empty values
      if (row[0]?.toString().trim()) techStack.presentation.push(row[0].toString().trim());
      if (row[1]?.toString().trim()) techStack.programmingLanguages.push(row[1].toString().trim());
      if (row[2]?.toString().trim()) techStack.frameworks.push(row[2].toString().trim());
      if (row[3]?.toString().trim()) techStack.databases.push(row[3].toString().trim());
      if (row[4]?.toString().trim()) techStack.cloudPlatforms.push(row[4].toString().trim());
      if (row[5]?.toString().trim()) techStack.compute.push(row[5].toString().trim());
      if (row[6]?.toString().trim()) techStack.network.push(row[6].toString().trim());
      if (row[7]?.toString().trim()) techStack.services.push(row[7].toString().trim());
    }

    return techStack;
  } catch (error) {
    console.error('Error parsing spreadsheet:', error);
    throw error;
  }
};