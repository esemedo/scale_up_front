'use client'

import axios from "axios";
import { useState, useEffect } from "react";

import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "../ui/label"
import { Card } from "../ui/card";
import { ButtonAddCategory } from "./ButtonAddCategory";

export interface Category {
    id?:number
    name?: string;
}

interface ListingCategoryProps {
  onCategorySelect: (categoryId?: number) => void;
}

const ListingCategory = ({ onCategorySelect }: ListingCategoryProps)  => {

  const [categorys, setCategorys] = useState<Category[]>([]);

  const apiEndPoint = 'localhost:3000/api/category/';
  console.log(apiEndPoint);
  useEffect(() => {
    const getCategorys = async () => {
      const { data: res } = await axios.get(apiEndPoint);
      setCategorys(res);
    };
    getCategorys();
  }, []);


  const handleCategoryCard = (categoryId?: number) => {
    onCategorySelect(categoryId); // Appel de la fonction de rappel pour transmettre l'id sélectionné au parent
};

  return (
    <ScrollArea className="rounded-md border bg-white	h-[600px] max-h-full pt-1">
      {categorys.length===0 ?
        <div className="overflow-auto">
          <h2>Aucune catégorie dans la base de données trouvée.</h2>
          <ButtonAddCategory/>
        </div>
        :
      <div className="overflow-auto">
        <ButtonAddCategory/>
        {categorys.map((category) => (
          <Card className="bg-[#F0F2FC] mt-1 h-[100px] grid justify-items-center content-center m-2" key={category.id} onClick={() => handleCategoryCard(category.id)}>
            <Label className="flex text-2xl font-bold">{category.name}</Label>
          </Card>
            ))}
      </div>
}
    </ScrollArea>
  )
}

export default ListingCategory;