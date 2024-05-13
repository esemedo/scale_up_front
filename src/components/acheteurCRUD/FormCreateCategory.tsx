'use client'

import axios from "axios";
import React, { useState } from "react";
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircleIcon,Download } from "lucide-react";
import { Button } from "../ui/button";
interface Category {
    name: string;
}

function FormCreateCategory({ className }: React.ComponentProps<"form">) {
    const [categoryName, setCategoryName] = useState("");
    const [categorys, setCategorys] = useState<Category[]>([]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value);
    };

    const addCategory = async () => {
        if(categoryName!=null||categoryName!=""||categoryName!=undefined){
            const newCategory: Category = { name: categoryName };
            await axios.post('http://localhost:3000/api/category', newCategory);
            setCategorys([...categorys, newCategory]);
            setCategoryName("");
        }};

    return (
        <div className="flex flex-row">
            <form className={cn("flex grid items-start gap-4 mr-20", className) }>
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom de la catégorie</Label>
                    <Input type="name" id="name" value={categoryName} onChange={handleNameChange} placeholder="Ecrivez ici"/>
                </div>
                <Button type="button" onClick={addCategory}><CheckCircleIcon className="mr-1"/>Valider</Button>
            </form>
            <div className="flex justify-center items-center  mb-3 bg-gray-200 px-10 rounded-full"><Download className="flex justify-center items-center "/></div>
        </div>
      
    )
  }
  export default FormCreateCategory;
