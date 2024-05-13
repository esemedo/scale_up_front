'use client'
import axios from "axios";
import React, { useState,useEffect } from "react";

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircleIcon,Download } from "lucide-react";
import { Button } from "../ui/button";
import { z } from 'zod';

const subjectSchema = z.object({
  name: z.string().min(1),
  level: z.string().min(1),
  categoryId: z.number().int()
});


interface Subject {
    name: string;
    level: string;
    categoryId: number|undefined;
}

function FormCreateSubject({ className }: React.ComponentProps<"form">) {
    const [subjectName, setSubjectName] = useState("");
    const [subjectLevel, setSubjectLevel] = useState("");
    const [subjectCategoryId, setsubjectCategoryId] = useState<number|undefined>(undefined);

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [CategoryTable, setCategoryTable] = useState<{ id: number, name: string }[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get(`${process.env.API_URL}/category`);
          setCategoryTable(response.data);
        };
    
        fetchData();
      }, []);
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubjectName(event.target.value);
    };
    const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubjectLevel(event.target.value);
    };
    const handleCategoryIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setsubjectCategoryId(parseInt(event.target.value, 10));
    };

    const addSubject = async () => {
        try {
            const validatedData = subjectSchema.parse({
                name: subjectName,
                level: subjectLevel,
                categoryId: subjectCategoryId
            });
            
            const newSubject = {
                name: validatedData.name,
                level: validatedData.level,
                categoryId: validatedData.categoryId
            };
    
            await axios.post(`${process.env.API_URL}/subject`, newSubject);
            setSubjects([...subjects, newSubject]);
            setSubjectName("");
            setSubjectLevel("");
            setsubjectCategoryId(undefined);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error(error);
            }
            alert("Veuillez remplir tous les champs.");
        }
       
    };

    return (
        <div className="flex flex-row">
            <form className={cn("grid items-start gap-4 mr-20", className) }>
                <div className="grid gap-2">
                    <Label>Name:</Label>
                    <Input type="text" name="name" value={subjectName} onChange={handleNameChange} placeholder="write name of category here..." required/>
                </div>
                <div>
                    <Label>Level:</Label>
                    <Input type="text" name="level" value={subjectLevel} onChange={handleLevelChange} placeholder="write name of category here..." required/>
                </div>
                <div>
                    <Label>Category:</Label>
                    
                    <select name="category" value={subjectCategoryId} onChange={handleCategoryIdChange} required>
                        <option value="" selected>--select category--</option>
                        {CategoryTable.map((categoryElement) => (
                            <option key={categoryElement.id} value={categoryElement.id}>{categoryElement.name}</option>
                        ))}
                    </select>
                </div>
                <Button type="button" onClick={addSubject}><CheckCircleIcon className="mr-1"/>Valider</Button>
            </form>
            <div className="flex justify-center items-center  mb-3 bg-gray-200 px-10 rounded-full max-h-24	mt-16 mr-5"><Download className="flex justify-center items-center "/></div>

        </div>

    );
}


export default FormCreateSubject;