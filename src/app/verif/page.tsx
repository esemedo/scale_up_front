'use client';

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";


export default function Factures() {
    const [preValidMp, setPreValidMp] = useState(false);
    const [validAssist, setValidAssist] = useState(false);
    const [suivi, setSuivi] = useState('Non-traite')
    const { data: session, status } = useSession();
    useEffect(() => {
        console.log(session, status)
        if (status === "unauthenticated") {
            redirect("/home")
        }
      }, [session]);
    async function auth(){
    
        if (session && session.user.roles.includes("educational-assistant")){
            setValidAssist(true)
        }
        if (session && session.user.roles.includes ("program-manager")){
            setPreValidMp(true)
        }
    }
 
        useEffect(() => {
            if(preValidMp != false && validAssist != false){
                setSuivi("Validé")
            }
            if(preValidMp != false && validAssist == false){
                setSuivi("Pré-validé")
            }
        }, [preValidMp, validAssist])
        
        return(
            <>
            <div className="flex bg-slate-200 p-4 rounded-md items-center">
                <p>Votre contrat est: {suivi}</p>
                {session && (session.user.roles.includes("program-manager") || session && session.user.roles.includes("educational-assistant")) && <button onClick={auth}>Valider</button>}
            </div>
            </>
        )

}