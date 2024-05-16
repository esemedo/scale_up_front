"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddAssistantToPromotionComponent from '../../../components/AssitantPromotion/AddAssistantToPromotionComponent';
import PromotionComponent from '../../../components/AssitantPromotion/PromotionsComponent';
import AssistantComponent from '../../../components/AssitantPromotion/AssistantsComponent';
import PromotionWithAssistantComponent from '../../../components/AssitantPromotion/PromotionsWithAssistantComponent';
import { useSession } from 'next-auth/react';
const api = process.env.NEXT_PUBLIC_API_URL;

const Dashboard: React.FC = () => {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [assistants, setAssistants] = useState<any[]>([]);
  const [promotionWithAssistant, setPromotionWithAssistant] = useState<any[]>([]);
  const [selectedAssistantId, setSelectedAssistantId] = useState<number | null>(null);
  const [selectedPromotionId, setSelectedPromotionId] = useState<number | null>(null);
  const { data: session  } = useSession();



  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(`${api}/api/promotions`,{headers:{Authorization: `Bearer ${session?.accessToken}`}});
        setPromotions(response.data);
      } catch (error) {
        console.error('Error fetching promotions:', error);
      }
    };

    const fetchAssistants = async () => {
      try {
        const response = await axios.get(`${api}/api/users/assistants`,{headers:{Authorization: `Bearer ${session?.accessToken}`}});
        setAssistants(response.data);
      } catch (error) {
        console.error('Error fetching assistants:', error);
      }
    };

    const fetchPromotionsWithAssistant = async () => {
      try {
        const response = await axios.get(`${api}/api/promotions/promotions-with-assistants`,{headers:{Authorization: `Bearer ${session?.accessToken}`}});
        setPromotionWithAssistant(response.data);
      } catch (error) {
        console.error('Error fetching promotions with assistants:', error);
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
      await axios.post(`${api}/api/promotions/${promotionId}/assistants`, {
        assistantId: assistantId
      },{headers:{Authorization: `Bearer ${session?.accessToken}`}});

      alert('Assistant ajouté avec succès à la promotion !');
    } catch (error) {
      console.error('Error adding assistant to promotion:', error);
      alert('Erreur lors de l\'ajout de l\'assistant à la promotion.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md w-3/4">
        <h1 className="text-2xl font-bold my-4">Dashboard</h1>
        {/* Ajouter un assistant à une promotion */}
        <AddAssistantToPromotionComponent 
          promotions={promotions} 
          assistants={assistants} 
          onAddAssistantToPromotion={handleAddAssistantToPromotion} 
          selectedAssistantId={selectedAssistantId} 
          selectedPromotionId={selectedPromotionId} 
          setSelectedAssistantId={setSelectedAssistantId} 
          setSelectedPromotionId={setSelectedPromotionId} 
        />

        {/* Liste des promotions */}
        <PromotionComponent promotions={promotions} />

        {/* Liste des assistants */}
        <AssistantComponent assistants={assistants} />

        {/* Liste des promotions avec assistant */}
        <PromotionWithAssistantComponent promotionWithAssistant={promotionWithAssistant} promotions={promotions} assistants={assistants} />
      </div>
    </div>
  );
};

export default Dashboard;
