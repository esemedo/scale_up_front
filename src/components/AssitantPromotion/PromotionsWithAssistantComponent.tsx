import React from 'react';

interface PromotionWithAssistant {
  promotionId: number;
  assistantId: number;
  name: string; 
  assistantName: string; 
}

interface PromotionWithAssistantComponentProps {
  promotionWithAssistant: PromotionWithAssistant[];
  promotions: Promotion[]; 
  assistants: Assistant[];
}

interface Promotion {
  id: number;
  name: string;
}

interface Assistant {
  id: number;
  name: string;
}

const PromotionWithAssistantComponent: React.FC<PromotionWithAssistantComponentProps> = ({ promotionWithAssistant, promotions, assistants }) => {
  
  return (
    <div>
      <h2>Liste des promotions avec assistants</h2>
      <ul>
        {promotionWithAssistant.map((item, index) => (
          <li key={index}> 
            {item.name || 'N/A'}
            ,{assistants.find(assistant => assistant.id === item.assistantId)?.name || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionWithAssistantComponent;
