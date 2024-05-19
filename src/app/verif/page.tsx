'use client';

import React, { useRef, useState } from "react";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/LoadingSpinner/LoadingSpinner";


export default function Factures() {
    const [preValidMp, setPreValidMp] = useState(false);
    const [validAssist, setValidAssist] = useState(false);
    let suivi = "Non-traité"
    async function auth(){
        const session  = await getSession();
        if (session == null){
            return (
                <div>
                  <LoadingSpinner />
                </div>
              );
        }
  
        if (session.user.roles.includes("educational-assistant")){
            return(
                <>
                <button className="bg-slate-400 hover:bg-slate-500 active:bg-slate-600 p-3 rounded-md"onClick={assist}>Valider</button>
                </>
            )
        }
        if (session.user.roles.includes ("program-manager")){
            return(
                <>
                <button className="bg-slate-400 hover:bg-slate-500 active:bg-slate-600 p-3 rounded-md" onClick={preValid}>Pré-valider</button>
                </>
            )
        }
    }

    function assist(){
        setValidAssist(true);
    }
    
    function preValid(){
        setPreValidMp(true)
    }
    
    function verif() {
        if(preValidMp != false && validAssist != false){
            suivi = "Validé"
            return(
                <>
                <p>Tu peux deposer tes factures sur Chorus https://www.youtube.com/watch?v=pGm9dK_L3xw</p>
                </>
            )
        }
        if(preValidMp != false && validAssist == false){
            suivi = "Pré-validé"
        }
      }

    return(
        <>
        <div className="flex bg-slate-200 p-4 rounded-md items-center">
            <p onChange={verif}>Votre contrat est: {suivi}</p>
        </div>
        </>
    )
}