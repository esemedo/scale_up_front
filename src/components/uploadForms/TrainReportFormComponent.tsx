'use client';

import { signIn, useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface User {
    uuid: string,
}

interface TrainReport {
    name: string,
    surname: string,
    email: string,
    phone: string,
    answer: string
}

export default function SubjectList() {
    const { data: session, status } = useSession(); //will use session to autogenerate personal info

    const [feedback, setFeedback] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [answer, setAnswer] = useState("");

    const params = useParams<{ offerID: string, needID: string }>();
    

    async function handleSubmit() {
        const trainingReport: TrainReport = {
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            answer: answer
        }
        console.log(trainingReport)
        try {
            await fetch('http://localhost:3000/api/generateTrainingReport', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(trainingReport),
            }).then(response => response.ok ? setFeedback('Generation successful.') : setFeedback('Error occurred: ' + response.statusText))
            window.open(`http://localhost:3000/api/downloadTrainingReport?name=${name}&surname=${surname}`, '_blank');
          } catch (error) {
            console.error('Error: ', error);
          }
    }

    useEffect(() => {
        /*if (status === "unauthenticated") {
            signIn("keycloak", {
              callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
            }); // Force sign in if not authenticated
            }*/
      }, [params.needID, status]);
      //will need to sanitize form to not have code injection issues
    return(
        <>
            <div className="bg-slate-50 shadow-md p-6 w-1/3 h-full mx-2 rounded-md">
                <p>Génération de bilan de formation :</p>
                <form className="bg-slate-200 flex flex-col h-full rounded-md my-2 p-2 items-center" action={() => handleSubmit()}>
                    <p>Informations personnelles :</p>
                        <input id="name" className="bg-slate-300 overflow-hidden text-ellipsis p-2 h-10 hover:bg-slate-400 m-2 active:bg-slate-500 rounded-md" placeholder="Nom" type="text" onChange={(e) => setName(e.target.value)} name="name"></input> 
                        <input id="surname" className="bg-slate-300 overflow-hidden text-ellipsis p-2 h-10 hover:bg-slate-400 m-2 active:bg-slate-500 rounded-md" placeholder="Prénom" type="text" onChange={(e) => setSurname(e.target.value)} name="surname"></input>                        
                        <input id="email" className="bg-slate-300 overflow-hidden text-ellipsis p-2 h-10 hover:bg-slate-400 m-2 active:bg-slate-500 rounded-md" placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} name="email"></input>                                                      
                        <input id="phone" className="bg-slate-300 overflow-hidden text-ellipsis p-2 h-10 hover:bg-slate-400 m-2 active:bg-slate-500 rounded-md" placeholder="Téléphone" type="text" onChange={(e) => setPhone(e.target.value)} name="phone"></input>                                                 
                    <p className="text-center">Comment avez-vous trouvé le contenu de la formation par rapport à vos besoins ?</p>
                        <textarea id="answer" className="bg-slate-300 text-pretty break-words p-2 hover:bg-slate-400 m-2 active:bg-slate-500 rounded-md" placeholder="Répondez ici." onChange={(e) => setAnswer(e.target.value)} name="answer"></textarea>                                               
                    <button type="submit" className="bg-slate-400 hover:bg-slate-500 m-2 active:bg-slate-600 w-1/4 rounded-md">Download</button>
                    {feedback == "" ? <></> : <p className="bg-slate-200 p-2 rounded-md">{feedback}</p>}
                </form> 
            </div>
        </>
    )
}