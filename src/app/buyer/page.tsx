"use client";

import React, { useState } from "react";
import { TypeList } from "@/components/acheteurCRUD/TypeList";
import { ElementFormSelect } from "@/components/acheteurCRUD/ElementFormSelect";

const BuyeurPage = () => {
  const [selectedInt, setSelectedInt] = useState<number | null | undefined>(
    null,
  );
  const [selectedType, setSelectedType] = useState<string | undefined>(
    "category",
  );
  const handleSelectedCard = (value?: number) => {
    setSelectedInt(value);
  };
  const handleTypeCard = (value?: string) => {
    setSelectedType(value);
  };

  return (
    <div className="flex flex-row">
      <div className="ml-48">
        <div>
          <div>
            <p>Searchbar</p>
          </div>
        </div>
        <div>
          <p>Choix type liste</p>
        </div>
        <div>
          <TypeList
            SelectElement={handleSelectedCard}
            TypeElement={handleTypeCard}
          />
        </div>
      </div>
      <div>
        <ElementFormSelect TypeCard={selectedType} IdCard={selectedInt} />
      </div>
    </div>
  );
};

export default BuyeurPage;
