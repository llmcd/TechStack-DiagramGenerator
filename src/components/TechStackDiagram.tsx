import React from 'react';
import { TechStackData } from '../types';
import { DiagramLayout } from './layout/DiagramLayout';
import { DiagramHeader } from './DiagramHeader';
import { DiagramContent } from './DiagramContent';
import { useHeaders } from '../hooks/useHeaders';

interface TechStackDiagramProps {
  data: TechStackData;
}

export const TechStackDiagram: React.FC<TechStackDiagramProps> = ({ data }) => {
  const headers = useHeaders();

  return (
    <div data-diagram-content className="bg-white rounded-xl p-6">
      <DiagramLayout>
        <DiagramHeader headers={headers} />
        <DiagramContent headers={headers} data={data} />
      </DiagramLayout>
    </div>
  );
};