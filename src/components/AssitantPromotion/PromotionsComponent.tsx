import React, { useState, useEffect } from 'react';
const api = process.env.NEXT_PUBLIC_API_URL;


interface Promotion {
  id: number;
  name: string;
}

interface PromotionComponentProps {
  promotions: Promotion[];
}

const PromotionComponent: React.FC<PromotionComponentProps> = ({ promotions }) => {
  return (
    <div>
      <h2>Liste des promotions</h2>
      <ul>
        {promotions.map(promotion => (
          <li key={promotion.id}>{promotion.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionComponent;
