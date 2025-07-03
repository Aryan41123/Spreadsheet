// src/utils/styleHelpers.ts
import type { SpreadsheetRowData } from '../interfaces';
export const getStatusClasses = (status: SpreadsheetRowData['status']): string => {
    switch (status) {
        case 'in-process':
            return 'bg-blue-100 text-blue-800';
        case 'need to start':
            return 'bg-yellow-100 text-yellow-800';
        case 'complete':
            return 'bg-green-100 text-green-800';
        case 'blocked':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export const getPriorityClasses = (priority: SpreadsheetRowData['priority']): string => {
    switch (priority) {
        case 'Medium':
            return 'bg-orange-100 text-orange-800';
        case 'High':
            return 'bg-red-100 text-red-800';
        case 'Low':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};