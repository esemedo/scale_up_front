'use client';

import React, { useRef, useState } from "react";

export default function ListeDesMatieres() {
    const [ptfFileName, setPtfFileName] = useState("");
    const [syllabusFileName, setSyllabusFileName] = useState("");

    const ptfRef = useRef<HTMLInputElement>(null);
    const syllabusRef = useRef<HTMLInputElement>(null);
    
    function handleChange() {
        if(ptfRef.current != null && ptfRef.current.files != null && ptfRef.current.files[0] != null){
            setPtfFileName(ptfRef.current.files[0].name)
        }
        if(syllabusRef.current != null && syllabusRef.current.files != null && syllabusRef.current.files[0] != null){
            setSyllabusFileName(syllabusRef.current?.files[0].name)
        }
      }

    return(
        <>
        <form className="flex bg-slate-200 p-4 rounded-md items-center" action="http://localhost:3000/api/uploadPDF" method="post" encType="multipart/form-data">
            <p className="p-2 pr-16">Matière 1</p>
            <label htmlFor="ptfBtn" className="bg-slate-300 mr-4 p-2 hover:bg-slate-400 active:bg-slate-500 rounded-md">{ptfFileName == "" ?
                "📎 upload PTF" : ptfFileName
            }</label>
            <label htmlFor="syllabusBtn" className="bg-slate-300 mr-4 p-2 hover:bg-slate-400 active:bg-slate-500 rounded-md">{syllabusFileName == "" ?
                "📎 upload syllabus" : syllabusFileName
            }</label>
            <input ref={ptfRef} id="ptfBtn" className="hidden" type="file" name="ptf" onChange={handleChange}/>
            <input ref={syllabusRef} id="syllabusBtn" className="hidden" type="file" name="syllabus" onChange={handleChange}/>
            <button type="submit" className="bg-slate-400 hover:bg-slate-500 active:bg-slate-600 p-3 rounded-md">Upload</button>
        </form>
        </>
    )
}