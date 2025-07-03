// src/components/TableHeader.tsx
import React from 'react';

interface TableHeaderProps {
  headers: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ headers }) => {
  return (
    <div className="grid grid-cols-[auto,repeat(9,minmax(120px,1fr))] bg-gray-50 border-b border-gray-200 text-gray-600 text-xs font-semibold uppercase">
      <div className="p-3 border-r border-gray-200 flex items-center justify-center">#</div> {/* Row number column */}
      {headers.map((header, index) => (
        <div key={index} className="p-3 border-r border-gray-200 flex items-center justify-between">
          <span>{header}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default TableHeader;