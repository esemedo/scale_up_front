import React from 'react';

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
      <ul>
        {promotions.map(promotion => (
          <li key={promotion.id}>{promotion.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionComponent;
