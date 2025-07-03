// src/components/EmptyTableRow.tsx
import React from 'react';

interface EmptyTableRowProps {
  rowIndex: number;
  startingRowNumber: number; // The row number where empty rows begin
}

const EmptyTableRow: React.FC<EmptyTableRowProps> = ({ rowIndex, startingRowNumber }) => {
  return (
    <div className="grid grid-cols-[auto,repeat(9,minmax(120px,1fr))] border-b border-gray-100 h-12 hover:bg-gray-50 transition-colors duration-100">
      <div className="p-3 border-r border-gray-100 text-gray-500 text-sm flex items-center justify-center">
        {startingRowNumber + rowIndex}
      </div>
      {Array.from({ length: 9 }).map((_, cellIndex) => (
        <div key={cellIndex} className="p-3 border-r border-gray-100"></div>
      ))}
    </div>
  );
};

export default EmptyTableRow;