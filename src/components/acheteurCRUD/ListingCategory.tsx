"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { ButtonAddCategory } from "./ButtonAddCategory";

export interface Category {
  id?: number;
  name?: string;
}

interface ListingCategoryProps {
  onCategorySelect: (categoryId?: number) => void;
}

const ListingCategory = ({ onCategorySelect }: ListingCategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  const apiEndPoint = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

  useEffect(() => {
    const getCategories = async () => {
      try {
        console.log("Fetching categories from:", apiEndPoint);
        const { data: res } = await axios.get(apiEndPoint);
        console.log("API response:", res);
        setCategories(res);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error);
          setError(
            error.response?.data ||
              "An error occurred while fetching categories.",
          );
        } else {
          console.error("Unexpected error:", error);
          setError("An unexpected error occurred.");
        }
      }
    };
    getCategories();
  }, [apiEndPoint]);

  const handleCategoryCard = (categoryId?: number) => {
    onCategorySelect(categoryId); // Call the callback function to pass the selected id to the parent
  };

  return (
    <ScrollArea className="h-[600px] max-h-full rounded-md border bg-white pt-1">
      {error ? (
        <div className="overflow-auto">
          <h2>Error: {error}</h2>
          <ButtonAddCategory />
        </div>
      ) : categories.length === 0 ? (
        <div className="overflow-auto">
          <h2>No categories found in the database.</h2>
          <ButtonAddCategory />
        </div>
      ) : (
        <div className="overflow-auto">
          <ButtonAddCategory />
          {categories.map((category) => (
            <Card
              className="m-2 mt-1 grid h-[100px] content-center justify-items-center bg-[#F0F2FC]"
              key={category.id}
              onClick={() => handleCategoryCard(category.id)}
            >
              <Label className="flex text-2xl font-bold">{category.name}</Label>
            </Card>
          ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default ListingCategory;
