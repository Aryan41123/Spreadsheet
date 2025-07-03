import React from 'react';
import type { SpreadsheetRowData } from '../interfaces';
import { getStatusClasses, getPriorityClasses } from '../utils/stylehelpers';


interface TableRowProps {
  rowData: SpreadsheetRowData;
  rowIndex: number;
}

const TableRow: React.FC<TableRowProps> = ({ rowData, rowIndex }) => {
  return (
    <div className="grid grid-cols-[auto,repeat(9,minmax(120px,1fr))] border-b border-gray-100 hover:bg-gray-50 transition-colors duration-100">
      {/* Row number cell */}
      <div className="p-3 border-r border-gray-100 text-gray-500 text-sm flex items-center justify-center">
        {rowIndex + 1}
      </div>
      {/* Data cells */}
      <div className="p-3 border-r border-gray-100 text-gray-800 text-sm flex items-center">
        {rowData.jobRequest}
      </div>
      <div className="p-3 border-r border-gray-100 text-gray-800 text-sm flex items-center">
        {rowData.submitted}
      </div>
      <div className="p-2 border-r border-gray-100 flex items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClasses(rowData.status)}`}>
          {rowData.status}
        </span>
      </div>
      <div className="p-3 border-r border-gray-100 text-gray-800 text-sm flex items-center">
        {rowData.submitter}
      </div>
      <div className="p-3 border-r border-gray-100 text-blue-600 text-sm flex items-center">
        <a href={`http://${rowData.url}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {rowData.url}
        </a>
      </div>
      <div className="p-3 border-r border-gray-100 text-gray-800 text-sm flex items-center">
        {rowData.assigned}
      </div>
      <div className="p-2 border-r border-gray-100 flex items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityClasses(rowData.priority)}`}>
          {rowData.priority}
        </span>
      </div>
      <div className="p-3 border-r border-gray-100 text-gray-800 text-sm flex items-center">
        {rowData.dueDate}
      </div>
      <div className="p-3 text-gray-800 text-sm flex items-center">
        {rowData.estValue}
      </div>
    </div>
  );
};

export default TableRow;