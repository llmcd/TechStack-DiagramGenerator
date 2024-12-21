import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { TechStackDiagram } from './TechStackDiagram';
import { ExportButton } from './ExportButton';
import { CaptureButton } from './CaptureButton';
import { TemplateDownloadButton } from './buttons/TemplateDownloadButton';
import { TechStackData } from '../types';
import { FileSpreadsheet } from 'lucide-react';
import { parseSpreadsheet } from '../utils/spreadsheetParser';

export default function App() {
  const [techStackData, setTechStackData] = useState<TechStackData | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      const data = await parseSpreadsheet(file);
      setTechStackData(data);
    } catch (error) {
      console.error('Error parsing spreadsheet:', error);
      alert('Error parsing spreadsheet. Please check the file format.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileSpreadsheet className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Technical Stack Diagram Generator
            </h1>
          </div>
          <p className="text-gray-600 mb-4">
            Upload your spreadsheet to generate a technical stack diagram
          </p>
          <TemplateDownloadButton show={!techStackData} />
        </div>

        {!techStackData ? (
          <div className="max-w-xl mx-auto">
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        ) : (
          <div>
            <div className="flex justify-end items-center gap-4 mb-6">
              <button
                onClick={() => setTechStackData(null)}
                className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Upload New File
              </button>
              <CaptureButton />
              <ExportButton data={techStackData} />
            </div>
            <TechStackDiagram data={techStackData} />
          </div>
        )}
      </div>
    </div>
  );
}