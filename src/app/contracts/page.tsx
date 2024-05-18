import React from 'react'

// import { IoDocumentText,IoEyeOutline} from "react-icons/io5";
// import { Progress } from "@/components/ui/progress";
// import { CiImport } from "react-icons/ci";
import CardContract from '@/components/card/CardContract';
import { Contract } from '@/types/contracts';

export default async function page() {
  const contracts: Contract[] = await fetch("http://127.0.0.1:3000/api/contracts",{ cache: 'no-store' }).then((res) => res.json());

  console.log(contracts);

  return (
    
    <div className='border-2 flex flex-col mx-auto gap-3 w-2/3 items-center shadow-red-400 justify-center '>
   
   <div className='flex text-center h-10 w-50 font-bold text-xl'>
   <div className=''>Mes contrats</div>
   </div>

   {contracts.map((contract,index) => (
        <CardContract key={index} contract={contract} />
    ))}
    </div>
  )
}
