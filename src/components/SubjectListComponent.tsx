'use client';

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

interface Subject {
    id: number,
    name: string
}

interface User {
    id: number,
}

interface Syllabus {
    subjectId: number,
    authorId: number,
    offerId: number,
    fileName: string,
    createdAt: Date,
    user: User
}

export default function SubjectList() {

    const params = useParams<{ offerID: string, needID: string }>();

    const [syllabusFileName, setSyllabusFileName] = useState("");
    const [syllabusFile, setSyllabusFile] = useState<Syllabus>();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [feedback, setFeedback] = useState("");

    const placeholderID = 1;
    
    function handleChange(e: React.FormEvent<HTMLInputElement>, subject: Subject) {
        if(e.currentTarget != null && e.currentTarget.files != null && e.currentTarget.files[0] != null){
            setSyllabusFileName(e.currentTarget?.files[0].name)
            const newSyllabus: Syllabus = {
                subjectId: subject.id,
                authorId: placeholderID,
                offerId: parseInt(params.offerID),
                fileName: e.currentTarget.files[0].name,
                createdAt: new Date(),
                user: { id: placeholderID } 
            }
            setSyllabusFile(newSyllabus)
        }
    }

    async function handleSubmit() {
        try {
            await fetch('http://localhost:3000/api/uploadSyllabusFile', {
              method: 'POST',
              body: new FormData(document.querySelector('form')!),
            }).then(() => {
                return fetch('http://localhost:3000/api/uploadSyllabus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(syllabusFile)
                }).then(response => response.ok ? setFeedback('Upload successful') : setFeedback('Error occurred'))
             })
          } catch (error) {
            console.error('Error:', error);
          }
    }

    useEffect(() => {
        fetch(`http://localhost:3000/api/getSubjects?needId=${params.needID}`)
        .then(response => response.json())
        .then(json => setSubjects(json))
        .catch(error => console.error(error));
      }, [params.needID]);

    return(
        <>
            <div className="bg-slate-50 shadow-md p-6 w-1/3 h-full mx-2 rounded-md">
                <p>Matières du contrat :</p>
                {subjects.map((subject, index) => {
                        return(
                            <>
                                <form key={index} className="flex bg-slate-200 h-full rounded-md my-2 p-2 items-center" action={() => handleSubmit()}>
                                    <p className="w-1/2 m-2">{subject.name}</p>
                                    <label htmlFor="syllabusBtn" className="bg-slate-300 overflow-hidden text-ellipsis p-2 h-20 hover:bg-slate-400 m-2 active:bg-slate-500 w-1/4 rounded-md">{syllabusFileName == "" ?
                                        "📎 upload syllabus" : syllabusFileName
                                    }</label>
                                    <input id="syllabusBtn" className="hidden" type="file" name="syllabus" onChange={(e) => handleChange(e, subject)}/>
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