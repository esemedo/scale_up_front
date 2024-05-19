"use client";

import axios from "axios";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CheckCircleIcon, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from "./ListingCategory";

export default function FormUpdateCategory(props: Category) {
  const [categoryName, setCategoryName] = useState("");
  const [categorys, setCategorys] = useState<Category[]>([]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const updateCategory = async () => {
    if (
      categoryName != null ||
      categoryName != "" ||
      categoryName != undefined
    ) {
      const updateCategory: Category = { name: categoryName };
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/categories` + "/" + props.id,
        updateCategory,
      );
      setCategorys([...categorys, updateCategory]);
      setCategoryName("");
    } else {
      return null;
    }
  };
  return (
    <>
      <div className="flex flex-row">
        <form className={cn("mr-20 grid items-start gap-4")}>
          <div className="grid gap-2">
            <Label>Name:</Label>
            <Input
              type="text"
              name="name"
              value={categoryName}
              onChange={handleNameChange}
              placeholder="Écrivez ici..."
            />
          </div>
          <Button type="button" onClick={updateCategory}>
            <CheckCircleIcon className="mr-1" />
            Valider
          </Button>
        </form>
        <div className="mb-3 flex items-center  justify-center rounded-full bg-gray-200 px-10">
          <Download className="flex items-center justify-center " />
        </div>
      </div>
    </>
  );
}
