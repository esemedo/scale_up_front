'use client'


import axios from "axios";
import { useState, useEffect } from "react";

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "../ui/label"
import { Card } from "../ui/card";
import { ButtonAddSubject } from "./ButtonAddSubject";
import DeleteASubject from "./DeleteASubject";

export interface Subjects {
  id: number;
  name: string;
  level: string;
  categoryId: number;
}
interface ListingSubjectProps {
  onSubjectSelect: (subjectId: number) => void;
}

export const ListingSubject = ({ onSubjectSelect }: ListingSubjectProps) => {

  const [subjects, setSubjects] = useState<Subjects[]>([]);

  const apiEndPoint = `${process.env.API_URL}/subject`;
  useEffect(() => {
    const getSubjects = async () => {
      const { data } = await axios.get(`${process.env.API_URL}/subject`);
      setSubjects(data);
    };

    getSubjects();
  }, [apiEndPoint]);

  
  const handleSelectedCard = (subjectId: number) => {
    onSubjectSelect(subjectId); // Appel de la fonction de rappel pour transmettre l'id sélectionné au parent
  };

  if (subjects.length === 0) {
    return (
      <ScrollArea className="rounded-md border bg-white	h-[600px] max-h-full pt-1">
        <div className="overflow-auto">
        <ButtonAddSubject/>

          <Card className="bg-[#F0F2FC] mt-1 h-[100px] grid justify-items-center content-center m-2">
            <Label className="flex text-2xl font-bold">{`Il n'y a aucune matière/module dans la base de donnée. `}</Label>
          </Card>
        </div>
      </ScrollArea>
    )
  };


  return (
    <ScrollArea className="rounded-md border bg-white	h-[600px] max-h-full pt-1">
      <div className="overflow-auto">
        <ButtonAddSubject/>
        {subjects.map((subject) => (
          <Card className="bg-[#F0F2FC] mt-1 h-[100px] grid justify-items-center content-center m-2 " key={subject.id} onClick={() => handleSelectedCard(subject.id)}>
            <Label className="flex text-2xl font-bold">{subject.name}</Label>
            <DeleteASubject subjectId={subject.id}/>
          </Card>
            ))}
      </div>
    </ScrollArea>
  )
}
