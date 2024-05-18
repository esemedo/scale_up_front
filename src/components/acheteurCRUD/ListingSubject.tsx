"use client";

import axios from "axios";
import { useState, useEffect } from "react";

import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "../ui/label";
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

  const apiEndPoint = `${process.env.NEXT_PUBLIC_API_URL}/subjects`;
  useEffect(() => {
    const getSubjects = async () => {
      const { data } = await axios.get(`${apiEndPoint}`);
      setSubjects(data);
    };

    getSubjects();
  }, [apiEndPoint]);

  const handleSelectedCard = (subjectId: number) => {
    onSubjectSelect(subjectId); // Appel de la fonction de rappel pour transmettre l'id sélectionné au parent
  };

  if (subjects.length === 0) {
    return (
      <ScrollArea className="h-[600px] max-h-full rounded-md	border bg-white pt-1">
        <div className="overflow-auto">
          <ButtonAddSubject />

          <Card className="m-2 mt-1 grid h-[100px] content-center justify-items-center bg-[#F0F2FC]">
            <Label className="flex text-2xl font-bold">{`Il n'y a aucune matière/module dans la base de donnée. `}</Label>
          </Card>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-[600px] max-h-full rounded-md	border bg-white pt-1">
      <div className="overflow-auto">
        <ButtonAddSubject />
        {subjects.map((subject) => (
          <Card
            className="m-2 mt-1 grid h-[100px] content-center justify-items-center bg-[#F0F2FC] "
            key={subject.id}
            onClick={() => handleSelectedCard(subject.id)}
          >
            <Label className="flex text-2xl font-bold">{subject.name}</Label>
            <DeleteASubject subjectId={subject.id} />
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
