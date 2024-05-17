import * as XLSX from 'xlsx';
import * as JqueryCSV from 'jquery-csv';

class FileReaderTool {
    public parseExcel(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader: FileReader = new FileReader();
    
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (!e.target) return reject('No target');
                const target: FileReader = e.target as FileReader;
                const data: string | ArrayBuffer | null = target.result;
                if (!data) return reject('No data');
                const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary', cellDates: true });
    
                const jsonObjects: unknown[] = [];
                workbook.SheetNames.forEach(sheetName => {
                    const XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                    jsonObjects.push(...XL_row_object);
                });
    
                resolve(JSON.stringify(jsonObjects));
            };
    
            reader.onerror = (ex: ProgressEvent<FileReader>) => {
                reject(ex);
            };
    
            reader.readAsBinaryString(file);
        });
    }
    

    public parseCSV(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader: FileReader = new FileReader();
    
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                if (!e.target) return reject('No target');
                const target: FileReader = e.target as FileReader;
                const data: string | ArrayBuffer | null = target.result;
                if (!data) return reject('No data');
                const csvData: string = data.toString();
                const jsonData = JqueryCSV.toObjects(csvData, { separator: ',' }); 
                resolve(JSON.stringify(jsonData));
            };
    
            reader.onerror = (ex: ProgressEvent<FileReader>) => {
                reject(ex);
            };
    
            reader.readAsText(file);
        });
    }
    

    public CheckNumberOfColumns(data: string): number {
        const dataParse = JSON.parse(data);
        
        dataParse.forEach((item: { [x: string]: unknown; }) => {
            Object.keys(item).forEach(key => {
                if (item[key] === '') {
                    delete item[key];
                }
            });
        });
        
        return Object.keys(dataParse[0]).length;
    }
}

export default FileReaderTool;
