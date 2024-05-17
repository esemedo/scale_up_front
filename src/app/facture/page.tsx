'use client';

import React, { useState } from "react";
import {MdUnarchive} from "react-icons/md"
import {FiCheckSquare} from "react-icons/fi"

// import { useSession, signIn, signOut } from "next-auth/react";

interface Bill{
    contractId:  number;
    quotationId: number;
    total: number;
    fileName: string;
    status: number;
    validity: false;
}

export default function Factures() {
    const [billFileName, setBillFileName] = useState("");
    const [billFile, setBillFile] = useState<Bill>();
    const [feedback, setFeedback] = useState("");
    // const [preValidMp, setPreValidMp] = useState(false);
    // const [validAssist, setValidAssist] = useState(false);

    async function handleSubmit() {
        try{
        if(billFile != null) {
            const formData = new FormData();
            const fileInput = document.querySelector('input[name="bill"]') as HTMLInputElement;
            if (fileInput.files && fileInput.files.length > 0) {
                // Ajoutez le fichier sous le champ 'file' pour le serveur
                formData.append('file', fileInput.files[0]);
            } 
            await fetch('http://localhost:3000/api/bills', {
                method: 'POST',
                body: formData,
            }).catch((e)=>console.log(e))
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    
        function handleChange(e: React.FormEvent<HTMLInputElement>) {
            if(e.currentTarget != null && e.currentTarget.files != null && e.currentTarget.files[0] != null){
                const file = e.currentTarget.files[0]
                if(file.type == 'application/pdf' || file.type == 'application/docx') {
                    setBillFileName(file.name)
                    const newBill: Bill = {
                        contractId: 1,
                        quotationId: 1,
                        total: 199,
                        fileName: file.name,
                        status: 1,
                        validity: false, 
                    }
                    setBillFile(newBill)
                } else {
                    setFeedback('Please upload a PDF or DOCX')
                }
        } else {
            setFeedback('Please upload a PDF or DOCX')
        }
      }


      //getAllContracts (demande la fonction de Coralie stv)
      //tu affiches tous les contrats avec un .map comme dans mes autres listes (OfferList, SubjectList)
      //ensuite tu peux essayer de copier mes submits et mes requêtes, si t'y arrives pas tu reviens me voir


    return(
        <>
        <form className="flex bg-slate-200 p-4 rounded-md flex-col w-2/5 max-w-48" action={() => handleSubmit()}>
                                <div className="flex items-center mb-4 w-3/4 space-x-4">
                                <div className="bg-blue-700 p-2 px-4 hover:bg-blue-400 active:bg-slate-500 flex items-center justify-center space-x-2 rounded-full text-white">
                                        <MdUnarchive className=""/>
                                        <label htmlFor="billBtn">{billFileName == "" ?
                                            "Déposer une nouvelle facture" : billFileName}
                                        </label>
                                        <input id="billBtn" className="hidden" type="file" name="bill" onChange={(e) => handleChange(e)}/>
                                    </div>
                                    {/* <input id="offerID" className="hidden" type="text" name="offerID" value={bill.id}></input> */}
                                    <button type="submit" className="bg-black mr-4 p-2 px-4 hover:bg-gray-800 active:bg-slate-500 flex items-center justify-center  rounded-full text-white">Valider</button>
                                </div>

                                    
                                <button className="bg-black mr-4 p-2 px-6 hover:bg-gray-800 active:bg-slate-500 flex items-center justify-center space-x-2 rounded-full text-white w-3/4">
                                        <FiCheckSquare/>
                                    <p> Générer mon bilan</p>
                                </button>
                                    
                                </form>
        {feedback == "" ? <></> : <p className="bg-slate-200 p-2 rounded-md">{feedback}</p>}
        </>
    )
}