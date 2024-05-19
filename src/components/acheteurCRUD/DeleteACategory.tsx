"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

interface Category {
  categoryId: number;
}
interface Subject {
  id: number;
  name: string;
  level: string;
  categoryId: number;
}
export default function DeleteACategory(props: Category) {
  const [subjectUsCategory, setSubjectUsCategory] = useState<Subject[]>([]);

  const apiEndPoint = `${process.env.NEXT_PUBLIC_API_URL}/subjects/category/${props.categoryId}`;
  useEffect(() => {
    const getCategorys = async () => {
      const { data: res } = await axios.get(apiEndPoint);
      setSubjectUsCategory(res);
    };
    getCategorys();
  }, [apiEndPoint]);
  const handleDelete = async () => {
    if (subjectUsCategory.length === 0) {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${props.categoryId}`,
      );
    } else {
      alert(
        "vous ne pouvez pas supprimer une categorie utilisé dans une matière existante",
      );
    }
  };
  return (
    <>
      <button onClick={() => handleDelete()}>Delete</button>
    </>
  );
}
