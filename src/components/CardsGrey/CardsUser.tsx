import React, { useEffect, useState } from 'react';

interface CardData {
  id?: number;
  name: string;
  rate: string;
  status: string;
}

const CardsGrey: React.FC<CardData> = ({ name, rate, status }) => {
  return (
    <div className="bg-white mb-4 shadow rounded-lg">
      <div className="p-4 border-b">
        <h5 className="text-lg font-semibold">Demandeur : {name}</h5>
        <p className="text-sm text-gray-600">Taux horaire souhaité : {rate}</p>
      </div>
      <div className="p-4">
        <span className={`inline-block text-sm px-3 py-1 rounded-full ${status === 'En attente' ? 'text-yellow-600 bg-yellow-200' : 'text-green-600 bg-green-200'}`}>
          {status}
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
    { id: 1, name: 'François CORNET', rate: '50€/h', status: 'En attente' },
    { id: 2, name: 'Robin PENEA', rate: '70€/h', status: 'Approuvé' },
    { id: 3, name: 'lloana', rate: '65€/h', status: 'Rejeté' },
  ])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://3000');
  //       const data: CardData[] = await response.json();
  //       setCardsData(data);
  //     } catch (error) {
  //       console.error('erreur :', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className=" max-w-7xl w-full mx-auto px-4 py-6 overflow-visible">
      <h1 className="text-xl font-semibold whitespace-nowrap">Les dérogations récentes en cours</h1>
      {cardsData.map(cardsGrey => (
        <CardsGrey key={cardsGrey.id} name={cardsGrey.name} rate={cardsGrey.rate} status={cardsGrey.status} />
      ))}
      <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Voir toutes les demandes
      </button>
    </div>
  );
};

export default Dashboard;
