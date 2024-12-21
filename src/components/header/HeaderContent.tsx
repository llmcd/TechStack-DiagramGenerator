import React from 'react';
import { Header } from '../../types';
import { HeaderArrow } from './HeaderArrow';
import { HeaderIcon } from './HeaderIcon';

interface HeaderContentProps {
  header: Header;
}

export const HeaderContent: React.FC<HeaderContentProps> = ({ header }) => {
  return (
    <>
      <div className="flex items-center">
        <HeaderIcon header={header} />
        <div className="flex flex-col">
          <span className="font-semibold text-[15px] leading-snug tracking-tight">
            {header.label}
          </span>
          {header.group && (
            <span className="text-sm mt-1 opacity-80">
              {header.group}
            </span>
          )}
        </div>
      </div>
      <HeaderArrow />
    </>
  );
};