import React from 'react';

export const UploadInstruction: React.FC = () => {
  return (
    <div className="mt-2 space-y-2">
      <p className="text-sm text-gray-600">
        Drag and drop your spreadsheet here, or click to select file
      </p>
      <p className="text-xs text-gray-500">
        Supported formats: .xlsx, .xls, .csv
      </p>
    </div>
  );
};