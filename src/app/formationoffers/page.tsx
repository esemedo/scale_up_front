"use client";

import React from "react"
import { ButtonAddCategory } from "@/components/acheteurCRUD/ButtonAddCategory";
import { ButtonUpdateCategory } from "@/components/acheteurCRUD/ButtonUpdateCategory";

import ListingCategory from "@/components/acheteurCRUD/ListingCategory";

export default function Home() {
 return (
    <div>
        <h1>Offres de formations</h1>
        <ButtonAddCategory />
        <ButtonUpdateCategory />
        <ListingCategory onCategorySelect={function (): void {
             throw new Error("Function not implemented.");
         } } />
    </div>
 )
}
