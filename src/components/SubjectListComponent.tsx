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
    file: string,
    createdAt: Date,
    user: User
}

export default function SubjectList() {

    const params = useParams<{ needId: string }>();

    const [syllabusFileName, setSyllabusFileName] = useState("");
    const [syllabusFile, setSyllabusFile] = useState<Syllabus>();
    const [subjects, setSubjects] = useState<Subject[]>([]);
    
    function handleChange(e: React.FormEvent<HTMLInputElement>, subject: Subject) {
        if(e.currentTarget != null && e.currentTarget.files != null && e.currentTarget.files[0] != null){
            setSyllabusFileName(e.currentTarget?.files[0].name)
            const newSyllabus: Syllabus = {
                subjectId: subject.id,
                authorId: 1,
                offerId: 1,
                file: e.currentTarget.files[0].name,
                createdAt: new Date(),
                user: { id: 1 } 
            }
            setSyllabusFile(newSyllabus)
        }
      }

    function handleSubmit() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(syllabusFile)
        };
        fetch('http://localhost:3000/api/uploadSyllabus', requestOptions)
        .then(response => response.json())
        .then(res => console.log(res));
    }

    useEffect(() => {
        fetch(`http://localhost:3000/api/getSubjects?needId=${params.needId}`)
        .then(response => response.json())
        .then(json => setSubjects(json))
        .catch(error => console.error(error));
      }, []);

    return(
        <>
            <div className="bg-slate-50 shadow-md p-6 w-1/3 h-full mx-2 rounded-md">
                <p>Matières du contrat :</p>
                {subjects.map((subject, index) => {
                        return(
                            <form key={index} className="flex bg-slate-200 h-full rounded-md my-2 items-center" action={() => handleSubmit()}>
                                <p className="w-1/2 m-2">{subject.name}</p>
                                <label htmlFor="syllabusBtn" className="bg-slate-300 hover:bg-slate-400 m-2 active:bg-slate-500 w-1/4 rounded-md">{syllabusFileName == "" ?
                                    "📎 upload syllabus" : syllabusFileName
                                }</label>
                                <input id="syllabusBtn" className="hidden" type="file" name="syllabus" onChange={(e) => handleChange(e, subject)}/>
                                <button type="submit" className="bg-slate-400 hover:bg-slate-500 m-2 active:bg-slate-600 w-1/4 rounded-md">Upload</button>
                            </form>
                        )
                    })}
            </div>
        </>
    )
}