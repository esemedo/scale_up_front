import React, { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "@radix-ui/react-label";

interface Category {
  categoryId: number;
  name?: string;
}

const ReturnCategory = ({ categoryId }: Category) => {
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,
      );
      setCategory(data);
    };

    fetchCategory();
  }, [categoryId]);

  return (
    <div>
      {category ? (
        <div>
          <Label>Catégorie: {category.name}</Label>
        </div>
      ) : (
        <Label>Loading...</Label>
      )}
    </div>
  );
};

export default ReturnCategory;
