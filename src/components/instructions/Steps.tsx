import React from 'react';
import { FileDown, FileUp, FileSpreadsheet, Image } from 'lucide-react';

export const Steps = () => {
  const steps = [
    {
      icon: FileDown,
      text: 'Download the custom template spreadsheet'
    },
    {
      icon: FileSpreadsheet,
      text: 'Fill out custom template spreadsheet with your tech stack data'
    },
    {
      icon: FileUp,
      text: 'Upload completed custom template spreadsheet here'
    },
    {
      icon: Image,
      text: 'Enjoy creating diagram images for representations and reports'
    }
  ];

  return (
    <div className="flex justify-center mb-8">
      <ol className="flex flex-col gap-3 pl-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <li key={index} className="flex items-center gap-3 text-gray-600">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-medium">
                {index + 1}
              </span>
              <Icon className="w-4 h-4 text-blue-600" />
              <span>{step.text}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
};