// src/components/SpreadsheetTable.tsx
import React from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import EmptyTableRow from './EmptyTableRow';
import type { SpreadsheetRowData } from '../interfaces';

interface SpreadsheetTableProps {
  data: SpreadsheetRowData[];
  headers: string[];
  emptyRowsCount: number;
}

const SpreadsheetTable: React.FC<SpreadsheetTableProps> = ({ data, headers, emptyRowsCount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden min-w-max">
      <TableHeader headers={headers} />
      {data.map((row, index) => (
        <TableRow key={row.id} rowData={row} rowIndex={index} />
      ))}
      {Array.from({ length: emptyRowsCount }).map((_, index) => (
        <EmptyTableRow key={`empty-${index}`} rowIndex={index} startingRowNumber={data.length + 1} />
      ))}
    </div>
  );
};

export default SpreadsheetTable;