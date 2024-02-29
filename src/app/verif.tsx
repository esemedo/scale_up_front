'use client';

import React, { useRef, useState } from "react";

export default function Factures() {
    const [preValidMp, setPreValidMp] = useState(false);
    const [validAssist, setValidAssist] = useState(false);
    const fctrRef = useRef<HTMLInputElement>(null);
    let suivi = "Non-traité"
    
    function verif() {
        if(preValidMp != false && validAssist != false){
            suivi = "Validé"
        }
        if(preValidMp != false && validAssist == false){
            suivi = "Pré-validé"
        }
      }

    return(
        <>
        <form className="flex bg-slate-200 p-4 rounded-md items-center" action="http://localhost:3000/api/uploadPDF" method="post" encType="multipart/form-data">
            <p>Votre contrat est: {suivi}</p>
        </form>
        </>
    )
}