"use client";

import axios from "axios";
import React from "react";
import { Button } from "../ui/button";

interface DeleteASubjectProps {
  subjectId: number;
}
export default function DeleteASubject({ subjectId }: DeleteASubjectProps) {
  const handleDelete = async () => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/subjects/${subjectId}`,
    );
  };
  return (
    <>
      <Button onClick={() => handleDelete()}>Delete</Button>
    </>
  );
}
