import React, { useState } from 'react';
const api = process.env.NEXT_PUBLIC_API_URL;

interface AddAssistantProps {
  promotions: Promotion[];
  assistants: Assistant[];
  selectedAssistantId: number | null; 
  selectedPromotionId: number | null; 
  setSelectedAssistantId: React.Dispatch<React.SetStateAction<number | null>>; 
  setSelectedPromotionId: React.Dispatch<React.SetStateAction<number | null>>;
  onAddAssistantToPromotion: (promotionId: number, assistantId: number) => void;
}

interface Promotion {
  id: number;
  name: string;
}

interface Assistant {
  id: number;
  name: string;
}

const AddAssistantToPromotionComponent: React.FC<AddAssistantProps> = ({ promotions, assistants, onAddAssistantToPromotion }) => {
  const [selectedPromotionId, setSelectedPromotionId] = useState<number | null>(null);
  const [selectedAssistantId, setSelectedAssistantId] = useState<number | null>(null);
  
  
  

  const handleAddAssistant = async () => {

     console.log(selectedAssistantId);
  console.log(selectedPromotionId);
    if (selectedPromotionId !== null && selectedAssistantId !== null) {
      onAddAssistantToPromotion(selectedPromotionId, selectedAssistantId);
    }

    
  };

  return (
    <div>
      <h2>Ajouter un assistant à une promotion</h2>
      <div>
        <label htmlFor="promotion">Sélectionner une promotion :</label>
        <select
          id="promotion"
          value={selectedPromotionId || ''}
          onChange={(e) => setSelectedPromotionId(parseInt(e.target.value))}
          className="border p-2"
        >
          <option value="">Sélectionner une promotion</option>
          {promotions.map(promotion => (
            <option key={promotion.id} value={promotion.id}>{promotion.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="assistant">Sélectionner un assistant :</label>
        <select
          id="assistant"
          value={selectedAssistantId || ''}
          onChange={(e) => setSelectedAssistantId(parseInt(e.target.value))}
          className="border p-2"
        >
          <option value="">Sélectionner un assistant</option>
          {assistants.map(assistant => (
            <option key={assistant.id} value={assistant.id}>{assistant.name}</option>
          ))}
        </select>
      </div>
      <button onClick={handleAddAssistant} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Ajouter Assistant
      </button>
    </div>
  );
};

export default AddAssistantToPromotionComponent;
