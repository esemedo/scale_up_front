"use client";

import React from "react";

import ListingCategory from "@/components/acheteurCRUD/ListingCategory";

export default function Home() {
 return (
    <div>
        <h1>Offres de formations</h1>
        <ListingCategory onCategorySelect={function (): void {
             throw new Error("Function not implemented.");
         } } />
    </div>
 )
}
