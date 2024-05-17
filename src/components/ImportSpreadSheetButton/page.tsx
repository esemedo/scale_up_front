'use client';
import { useState, ChangeEvent } from 'react';
import FileReaderTool from '@/lib/FileReaderTool';
import PopUpEditionList from '@/components/PopUpEditionList/PopUpEditionList';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ImportSpreadSheetButton() {
    const [data, setData] = useState<string>('');
    const [popup, setPopup] = useState(false);

    const handleFileUpload = async (file: File | null) => {
        if (!file) return;
        if (file.type === 'text/csv') {
            const fileReaderTool = new FileReaderTool();

            const jsonData = await fileReaderTool.parseCSV(file);
            const numberOfColumns = fileReaderTool.CheckNumberOfColumns(jsonData);

            if (numberOfColumns > 3 || numberOfColumns < 2) {
                toast.error('Le format du fichier n\'est pas correcte. Veuillez vérifier le nombre de colonnes.');
                return;
            }

            setData(jsonData);
        } else if (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const fileReaderTool = new FileReaderTool();
            const jsonData = await fileReaderTool.parseExcel(file);
            const numberOfColumns = fileReaderTool.CheckNumberOfColumns(jsonData);

            if (numberOfColumns > 3 || numberOfColumns < 2) {
                toast.error('Le format du fichier n\'est pas correcte. Veuillez vérifier le nombre de colonnes.');
                return;
            }

            setData(jsonData);
        } else {
            toast.error('Le format du fichier n\'est pas correcte. Veuillez vérifier le format du fichier.');
        }

        setPopup(true);
    }

    interface LogItem {
        value: string;
    }

    interface ConvertedData {
        promo: string;
        course: string;
        listOfDate: string[];
    }


    const onSave = async (data: string) => {
        const dataParse = JSON.parse(data);

        const convertLogToData = (log: LogItem[]): ConvertedData => {
            const promo = log[0]?.value || "";
            const course = log[1]?.value || "";
            const listOfDate = log[2]?.value?.split(',').map((date: string) => date.trim()) || [];
            return { promo, course, listOfDate };
        };

        const convertedDataArray = dataParse.map((item: LogItem[]) => {
            return convertLogToData(item);
        });


        const response = await axios.post('http://localhost:3000/api/administrative/export', {
            data: JSON.stringify(convertedDataArray),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
            }
        })

        console.log(response);

    }

    const onClose = () => {
        setPopup(false);
        setData('');
        const input = document.getElementById('dropzone-file') as HTMLInputElement;
        input.value = '';
    }


    return (
        <>
            {popup && <PopUpEditionList data={data} onClose={onClose} onSave={onSave} />}
            <div className="flex items-center justify-center w-6/12">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquer pour upload</span> ou drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">CSV ou XLSX ou XLSM</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden"  onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileUpload(e.target.files && e.target.files[0])} accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                </label>
            </div>

        </>
    );
};