import React from 'react';
import { TechStackData, Header } from '../types';
import { DiagramRow } from './diagram/DiagramRow';
import { DiagramCell } from './diagram/DiagramCell';
import { TechList } from './tech/TechList';

interface DiagramContentProps {
  headers: Header[];
  data: TechStackData;
}

export const DiagramContent: React.FC<DiagramContentProps> = ({ headers, data }) => {
  return (
    <div className="space-y-4 py-2">
      {headers.map(header => (
        <DiagramRow key={header.id}>
          <DiagramCell>
            <TechList items={data[header.id as keyof TechStackData]} />
          </DiagramCell>
        </DiagramRow>
      ))}
    </div>
  );
};