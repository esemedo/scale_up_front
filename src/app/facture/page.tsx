'use client';

import React, { useState } from "react";
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
            await fetch('http://localhost:3000/api/uploadBillFile', {
                method: 'POST',
                body: new FormData(document.querySelector('form')!),
            }).then(async () => {
                const response = await fetch('http://localhost:3000/api/uploadBill', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(billFile)
                });
                return response.ok ? setFeedback('Upload successful') : setFeedback('Error occurred');
            })
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
        <form className="flex bg-slate-200 p-4 rounded-md items-center" action={() => handleSubmit()}>
                                    <label htmlFor="billBtn" className="bg-slate-300 mr-4 p-2 hover:bg-slate-400 active:bg-slate-500 rounded-md">{billFileName == "" ?
                                        "📎 upload bill" : billFileName
                                    }</label>
                                    <input id="billBtn" className="hidden" type="file" name="bill" onChange={(e) => handleChange(e)}/>
                                    {/* <input id="offerID" className="hidden" type="text" name="offerID" value={bill.id}></input> */}
                                    <button type="submit" className="bg-slate-400 hover:bg-slate-500 active:bg-slate-600 p-3 rounded-md">Upload</button>
                                </form>
        {feedback == "" ? <></> : <p className="bg-slate-200 p-2 rounded-md">{feedback}</p>}
        </>
    )
}
