// src/interfaces/index.ts
export interface SpreadsheetRowData {
  id: number;
  jobRequest: string;
  submitted: string;
  status: 'in-process' | 'need to start' | 'complete' | 'blocked';
  submitter: string;
  url: string;
  assigned: string;
  priority: 'Medium' | 'High' | 'Low';
  dueDate: string;
  estValue: string;
}