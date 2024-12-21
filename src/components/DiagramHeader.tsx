import React from 'react';
import { Header } from '../types';
import { DiagramRow } from './diagram/DiagramRow';
import { DiagramCell } from './diagram/DiagramCell';
import { HeaderContent } from './header/HeaderContent';

interface DiagramHeaderProps {
  headers: Header[];
}

export const DiagramHeader: React.FC<DiagramHeaderProps> = ({ headers }) => {
  return (
    <div className="space-y-4 py-2">
      {headers.map((header) => (
        <DiagramRow key={header.id}>
          <DiagramCell 
            variant="header"
            className={header.color}
          >
            <HeaderContent header={header} />
          </DiagramCell>
        </DiagramRow>
      ))}
    </div>
  );
};