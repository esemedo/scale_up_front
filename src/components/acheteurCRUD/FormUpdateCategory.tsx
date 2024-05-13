'use client'

import axios from 'axios';
import React,{useState} from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { CheckCircleIcon,Download } from 'lucide-react';
import { cn } from "@/lib/utils"
import { Category } from './ListingCategory';



export default function FormUpdateCategory(props:Category) {
    const [categoryName, setCategoryName] = useState("");
    const [categorys, setCategorys] = useState<Category[]>([]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value);
    };

    const updateCategory = async () => {
        if(categoryName!=null||categoryName!=""||categoryName!=undefined){
            const updateCategory: Category = { name: categoryName };
            await axios.put(`${process.env.API_URL}/category`+'/'+props.id, updateCategory);
            setCategorys([...categorys, updateCategory]);
            setCategoryName("");
        }else{
            return null;
        }
       
    };
  return(
    <>
      <div className="flex flex-row">
            <form className={cn("grid items-start gap-4 mr-20") }>
                <div className="grid gap-2">
                    <Label>Name:</Label>
                    <Input type="text" name="name" value={categoryName} onChange={handleNameChange} placeholder="Écrivez ici..."/>
                </div>
                    <Button type="button" onClick={updateCategory}><CheckCircleIcon className="mr-1"/>Valider</Button>

            </form>
            <div className="flex justify-center items-center  mb-3 bg-gray-200 px-10 rounded-full"><Download className="flex justify-center items-center "/></div>
        </div>
    </>
    )
}