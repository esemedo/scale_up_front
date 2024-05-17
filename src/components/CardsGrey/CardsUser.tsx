import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CardData {
  id?: number;
  name: string;
  hourlyrate: string;
  status: string;
}

const CardsGrey: React.FC<CardData> = ({ name, hourlyrate, status }) => {
  return (
    <div className="bg-white mb-4 shadow rounded-lg">
      <div className="p-4 border-b">
        <h5 className="text-lg font-semibold">Demandeur : {name}</h5>
        <p className="text-sm text-gray-600">Taux horaire souhaité : {hourlyrate}</p>
      </div>
      <div className="p-4">
      <span className={`inline-block text-sm px-3 py-1 rounded-full ${status === 'En attente' ? 'text-yellow-600 bg-yellow-200' : 'text-green-600 bg-green-200'} ${status === 'Rejeté' ? 'text-red-600 bg-red-200' : 'text-green-600 bg-green-200'} `}>{status}
</span>
      </div>
      <div className="p-4">
        <button className="text-blue-800 hover:bg-blue-800 hover:text-white rounded px-4 py-2 transition-colors duration-200">
          Examiner la demande
        </button>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  // const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [cardsData, setCardsData] = useState<CardData[]>([
    { id: 1, name: 'François CORNET', hourlyrate: '50€/h', status: 'En attente' },
    { id: 2, name: 'Robin PENEA', hourlyrate: '70€/h', status: 'Approuvé' },
    { id: 3, name: 'lloana', hourlyrate: '65€/h', status: 'Rejeté' },
  ])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://3000'); // Remplacez l'URL par votre endpoint réel
  //       const data: CardData[] = response.data;
  //       setCardsData(data);
  //     } catch (error) {
  //       console.error('erreur :', error);
  //     }
  //   };

  //   fetchData();
  // }, []);



  return (
    <div>
      {cardsData.map((card) => (
        <CardsGrey key={card.id} name={card.name} hourlyrate={card.hourlyrate} status={card.status} />
      ))}
    </div>
  );
};

export default Dashboard;

