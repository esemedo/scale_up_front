"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { CheckCircleIcon, Download } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
interface Subject {
  id?: number;
  name: string;
  level: string;
  categoryId?: number | undefined;
}

export default function FormUpdateSubject(props: Subject) {
  const [subjectName, setSubjectName] = useState("");
  const [subjectLevel, setSubjectLevel] = useState("");
  const [subjectCategoryId, setSubjectCategoryId] = useState<
    number | undefined
  >(undefined);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [CategoryTable, setCategoryTable] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
      );
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
  const handleCategoryIdChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSubjectCategoryId(parseInt(event.target.value, 10));
  };

  const updateSubject = async () => {
    if (subjectName !== "") {
      if (subjectLevel !== "") {
        if (subjectCategoryId !== undefined) {
          const updateSubject: Subject = {
            name: subjectName,
            level: subjectLevel,
            categoryId: subjectCategoryId,
          };
          await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/subjects/` + props.id,
            updateSubject,
          );
          setSubjects([...subjects, updateSubject]);
          setSubjectName("");
          setSubjectLevel("");
          setSubjectCategoryId(undefined);
        } else {
          alert(
            `vous semblez avoir oublié de remplir le champ d'association de category. Veuillez le séléctionner pour valider.`,
          );
        }
      } else {
        alert(
          `vous semblez avoir oublié de remplir le champ level. Veuillez le remplir pour valider.`,
        );
      }
    } else {
      alert(
        `vous semblez avoir oublié de remplir le champ name. Veuillez le remplir pour valider.`,
      );
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <form className={cn("mr-20 flex grid items-start gap-4")}>
          <div className="grid gap-2">
            <Label>Name:</Label>
            <Input
              type="text"
              name="name"
              value={subjectName}
              onChange={handleNameChange}
              placeholder="write name of category here..."
              required
            />
          </div>
          <div>
            <Label>Level:</Label>
            <Input
              type="text"
              name="level"
              value={subjectLevel}
              onChange={handleLevelChange}
              placeholder="write name of category here..."
              required
            />
          </div>
          <div>
            <Label>Category:</Label>
            <select
              name="category"
              value={subjectCategoryId}
              onChange={handleCategoryIdChange}
              required
            >
              <option value={props.categoryId} selected>
                --select new category--
              </option>
              {CategoryTable.map((categoryElement) => (
                <option key={categoryElement.id} value={categoryElement.id}>
                  {categoryElement.name}
                </option>
              ))}
            </select>
          </div>
          <Button type="button" onClick={updateSubject}>
            <CheckCircleIcon className="mr-1" />
            Valider
          </Button>
        </form>
        <div className="mb-3 mr-5 mt-16  flex max-h-24 items-center justify-center rounded-full	bg-gray-200 px-10">
          <Download className="flex items-center justify-center " />
        </div>
      </div>
    </>
  );
}
