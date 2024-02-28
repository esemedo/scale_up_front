'use client';

import React, { useState } from "react";

export default function ListeDesMatieres() {
    const [syllabusFileName, setSyllabusFileName] = useState("");
    
    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        if(e.currentTarget != null && e.currentTarget.files != null && e.currentTarget.files[0] != null){
            setSyllabusFileName(e.currentTarget?.files[0].name)
        }
      }

    const matières = [{
        name: 'Matiere1'
    },
    {
        name: 'Matiere2'
    },
    {
        name: 'Matiere3'
    }]

    return(
        <>
            <div className="bg-slate-50 shadow-md p-6 w-1/3 h-full mx-2 rounded-md">
                <p>Matières du contrat :</p>
                {matières.map((matiere, index) => {
                        return(
                            <form key={index} className="flex bg-slate-200 h-full rounded-md my-2 items-center" action="http://localhost:3000/api/uploadSyllabus" method="post" encType="multipart/form-data">
                                <p className="w-1/2 m-2">{matiere.name}</p>
                                <label htmlFor="syllabusBtn" className="bg-slate-300 hover:bg-slate-400 m-2 active:bg-slate-500 w-1/4 rounded-md">{syllabusFileName == "" ?
                                    "📎 upload syllabus" : syllabusFileName
                                }</label>
                                <input id="syllabusBtn" className="hidden" type="file" name="syllabus" onChange={handleChange}/>
                                <button type="submit" className="bg-slate-400 hover:bg-slate-500 m-2 active:bg-slate-600 w-1/4 rounded-md">Upload</button>
                            </form>
                        )
                    })}
            </div>
        </>
    )
}