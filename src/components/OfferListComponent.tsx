'use client';

import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Offer {
    id: number,
    needId: number
}

export default function OfferListComponent() {

    const [offers, setOffers] = useState<Offer[]>([]);

    async function getOffers() {
        await fetch('http://localhost:3000/api/getOffers')
          .then(response => response.json())
          .then(json => setOffers(json))
          .catch(error => console.error(error));
    }

    function getPath(offer: Offer): string {
        return `/offers/subject/${offer.id}/${offer.needId}`
    }

    const [ptfFileName, setSyllabusFileName] = useState("");
    const [feedback, setFeedback] = useState("");
    
    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        if(e.currentTarget != null && e.currentTarget.files != null && e.currentTarget.files[0] != null){
            setSyllabusFileName(e.currentTarget?.files[0].name)
        }
    }

    async function handleSubmit() {
        try {
            await fetch('http://localhost:3000/api/uploadPTF', {
              method: 'POST',
              body: new FormData(document.querySelector('form')!),
            }).then(response => response.ok ? setFeedback('Upload successful') : setFeedback('Error occurred'))
          } catch (error) {
            console.error('Error:', error);
          }
    }

    useEffect(() => {
        getOffers()
      }, []);

    return(
        <>
            <div className="bg-slate-50 shadow-md p-6 w-1/3 h-full mx-2 rounded-md">
                <p>Contrats :</p>
                {offers.length <= 0 ? <>
                    <p className="my-2 p-2 h-full rounded-md bg-slate-200">Vous n&apos;avez pas de d&apos;offres</p>
                </> : offers.map((offer, index) => {
                        return(
                            <>
                                <form key={index} className="flex bg-slate-200 h-full rounded-md my-2 p-2 items-center" action={() => handleSubmit()}>
                                    <Link key={index} href={getPath(offer)} className="w-1/2 px-1 py-6 m-2 rounded-md bg-slate-300 hover:bg-slate-400 active:bg-slate-500">Contrat n°{offer.id}</Link>
                                    <label htmlFor="ptfBtn" className="bg-slate-300 overflow-hidden text-ellipsis p-2 h-20 hover:bg-slate-400 m-2 active:bg-slate-500 w-1/4 rounded-md">{ptfFileName == "" ?
                                        "📎 upload PTF" : ptfFileName
                                    }</label>
                                    <input id="ptfBtn" className="hidden" type="file" name="ptf" onChange={(e) => handleChange(e)}/>
                                    <input id="offerID" className="hidden" type="text" name="offerID" value={offer.id}></input>
                                    <button type="submit" className="bg-slate-400 hover:bg-slate-500 m-2 active:bg-slate-600 w-1/4 rounded-md">Upload</button>
                                </form> 
                                {feedback == "" ? <></> : <p className="bg-slate-200 p-2 rounded-md">{feedback}</p>}
                            </>
                        )
                    })}
            </div>
        </>
    )
}