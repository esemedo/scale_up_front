import React from 'react';
import Spreadsheet, { CellBase, Matrix } from 'react-spreadsheet';


interface PopUpEditionListProps {
    data: string;
    onClose: () => void;
    onSave: (data: string) => void;
}



const PopUpEditionList = ({ data, onClose, onSave }: PopUpEditionListProps) => {
    const [content, setContent] = React.useState<Matrix<CellBase<string>>>([]);

    
    React.useEffect(() => {
        const parseData = () => {
        let dataParse = JSON.parse(data);
    
        dataParse = dataParse.map((item: { [x: string]: unknown; }) => {
            return Object.keys(item).map((key) => {
                return { value: item[key] }
            });
        }
        );

        setContent(dataParse);
    }
    parseData();

    }, [data]);

    return (
        <div className='absolute min-w-full min-h-full bg-black bg-opacity-70 flex justify-center items-center'>
            <div className='bg-transparent p-8 flex flex-col'>
                <Spreadsheet darkMode={false} data={content} onChange={(event) => { setContent(event); }} className='!overflow-y-scroll max-h-[700px] relative'/>
                <div className='mt-2 flex items-center justify-end'>
                    <button onClick={() => onClose()} className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Close</button>
                    <button onClick={() => onSave(JSON.stringify(content))} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Save</button>
                </div>
            </div>
        </div>
    );
}

export default PopUpEditionList;