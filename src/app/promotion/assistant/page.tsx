"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddAssistantToPromotionComponent from '../../../components/AssitantPromotion/AddAssistantToPromotionComponent';
import PromotionComponent from '../../../components/AssitantPromotion/PromotionsComponent';
import AssistantComponent from '../../../components/AssitantPromotion/AssistantsComponent';
import PromotionWithAssistantComponent from '../../../components/AssitantPromotion/PromotionsWithAssistantComponent';
import { useSession } from 'next-auth/react';

const PromotionAssistant: React.FC = () => {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [assistants, setAssistants] = useState<any[]>([]);
  const [promotionWithAssistant, setPromotionWithAssistant] = useState<any[]>([]);
  const [selectedAssistantId, setSelectedAssistantId] = useState<number | null>(null);
  const [selectedPromotionId, setSelectedPromotionId] = useState<number | null>(null);
  const { data: session  } = useSession();
  const api = process.env.NEXT_PUBLIC_API_URL;




  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(`${api}/promotions`,{headers:{Authorization: `Bearer ${session?.accessToken}`}});
        setPromotions(response.data);
      } catch (error) {
        alert('Erreur lors de la récupération des promotions.');
      }
    };

    const fetchAssistants = async () => {
      try {
        const response = await axios.get(`${api}/users/assistants`,{headers:{Authorization: `Bearer ${session?.accessToken}`}});
        setAssistants(response.data);
      } catch (error) {
        alert('Erreur lors de la récupération des assistants.');
      }
    };

    const fetchPromotionsWithAssistant = async () => {
      try {
        const response = await axios.get(`${api}/promotions/promotions-with-assistants`,{headers:{Authorization: `Bearer ${session?.accessToken}`}});
        setPromotionWithAssistant(response.data);
      } catch (error) {
        alert('Erreur lors de la récupération des assistant avec promotions.');
      }
    };

    if (session){
      fetchPromotions();
      fetchAssistants();
      fetchPromotionsWithAssistant(); 
    }
    
  }, [session]);

  const handleAddAssistantToPromotion = async (promotionId: number, assistantId: number) => {
    try {
      await axios.post(`${api}/promotions/${promotionId}/assistants`, {
        assistantId: assistantId
      },{headers:{Authorization: `Bearer ${session?.accessToken}`}});

      alert('Assistant ajouté avec succès à la promotion !');
    } catch (error) {
      alert('Erreur lors de l\'ajout de l\'assistant à la promotion.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
  
        {/* Ajouter un assistant à une promotion */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Ajouter un assistant à une promotion</h2>
          <AddAssistantToPromotionComponent 
            promotions={promotions} 
            assistants={assistants} 
            onAddAssistantToPromotion={handleAddAssistantToPromotion} 
            selectedAssistantId={selectedAssistantId} 
            selectedPromotionId={selectedPromotionId} 
            setSelectedAssistantId={setSelectedAssistantId} 
            setSelectedPromotionId={setSelectedPromotionId} 
          />
        </div>
  
        {/* Liste des promotions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Liste des promotions</h2>
          <PromotionComponent promotions={promotions} />
        </div>
  
        {/* Liste des assistants */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Liste des assistants</h2>
          <AssistantComponent assistants={assistants} />
        </div>
  
        {/* Liste des promotions avec assistant */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Liste des promotions avec assistant</h2>
          <PromotionWithAssistantComponent promotionWithAssistant={promotionWithAssistant} promotions={promotions} assistants={assistants} />
        </div>
      </div>
    </div>
  );
  
};

export default PromotionAssistant;
