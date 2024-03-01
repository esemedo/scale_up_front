'use client';
import { Progress } from '@/components/ui/progress'
import { Contract } from '@/types/contracts'
import React from 'react'
import { CiImport } from 'react-icons/ci'
import { IoDocumentText, IoEyeOutline } from 'react-icons/io5'

interface CardContractProps {
    contract: Contract
}

function downloadContract(contract: Contract){
    
        
        const fileData = JSON.stringify(contract);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "contract.txt";
        link.href = url;
        link.click();
      
}

function CardContract(
    {
        contract
    }: CardContractProps) {
        console.log(contract.status)


        let statusText, statusColor, progressValue;

        if (contract.status === 0) {
          statusText = "Signé";
          statusColor = "blue"; 
          progressValue = 10;
        } else if (contract.status === 1) {
          statusText = "En attente";
          statusColor = "orange"; 
          progressValue = 50;
        } else if (contract.status === 2) {
          statusText = "Terminé";
          statusColor = "green"; 
          progressValue = 100;
        }
       

  return (
    <div className='border-2  h-28 w-full bg-slate-100 rounded-md flex flex-row'>
    <div><IoDocumentText className=' text-8xl'/> </div>

    <div className='w-full'> <p className='font-semibold'>Contrat n°{contract.id}</p>
    <div>Texte a mettre en dessous le contrat</div>

    <Progress statusColor={statusColor} value={ contract.status == 0 ? 10 : contract.status == 1 ? 50 : 100 } className='w-3/4'/>
    <div className={`flex justify-center ${statusColor}`}>
        <p >{statusText} </p>
      </div>

    {/* <div className='flex justify-center'><p>En attente</p></div> */}

 


    </div>

    <div className='flex items-end gap-3'>
        <IoEyeOutline className=' text-xl cursor-pointer'/>
        <div onClick={()=>downloadContract(contract)}>
         <CiImport  className=' text-xl cursor-pointer mr-4' />
        </div>
    </div>

 </div>
  )
}

export default CardContract