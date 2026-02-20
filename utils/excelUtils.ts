import * as XLSX from 'xlsx';
import * as fs from 'fs';

export function exportToExcel(data: any[], fileName: string) {
  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // Write file
  XLSX.writeFile(workbook, fileName);

  console.log(`Excel file created: ${fileName}`);
}