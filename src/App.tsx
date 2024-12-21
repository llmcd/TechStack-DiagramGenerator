import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { TechStackDiagram } from './components/TechStackDiagram';
import { ExportButton } from './components/ExportButton';
import { CaptureButton } from './components/CaptureButton';
import { InstructionsContainer } from './components/instructions/InstructionsContainer';
import { FeedbackSection } from './components/feedback/FeedbackSection';
import { Footer } from './components/layout/Footer';
import { parseSpreadsheet } from './utils/spreadsheetParser';
import { TechStackData } from './types';
import { FileSpreadsheet } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      <main className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileSpreadsheet className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Technical Stack Diagram Generator
              </h1>
            </div>
            <p className="text-gray-600 mb-6">
              Convert spreadsheets data to technical stack diagrams
            </p>
            <InstructionsContainer show={!techStackData} />
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
              <FeedbackSection />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}