'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
const api = process.env.NEXT_PUBLIC_API_URL;


const HistoriqueBesoins: React.FC = () => {
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [needs, setNeeds] = useState<any[]>([]);
  const api = process.env.NEXT_PUBLIC_API_URL;
  const startYear = 2015;
  const futureYears = 5;
  const { data: session  } = useSession();


  const statusCode: { [key: number]: string } = {
    0: 'Refusée',
    1: 'En attente',
    2: 'Traitée',
    3: 'Validée',
    4: 'Brouillon',
  }

  const fetchYears =  () => {
    const schoolYears = [];
    const currentYear = new Date().getFullYear();
    for (let i = startYear; i <= currentYear + futureYears; i++) {
      schoolYears.push(`${i}-${i + 1}`);
    }
    setYears(schoolYears);
  };

  const fetchNeedsByYear = async (year: string) => {
    try {
      const response = await axios.get<any[]>(`${api}/needs/${year}`,{headers:{Authorization: `Bearer ${session?.accessToken}`}});
      setNeeds(response.data);
    } catch (error) {
      console.error(`Error fetching needs for year ${year}:`, error);
    }
  };

  useEffect(() => {
    if (session){
      fetchYears();
    }
  }, [session]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    fetchNeedsByYear(selectedYear);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
                      <div className="rounded p-5 text-center text-4xl font-bold mb-5 text-blue-500">
                      Historique des besoins par année
        </div>
      <div className="p-8 bg-white rounded-lg shadow-md w-3/4 h-[700px]">
        <div className='year-selector mb-4'>
          <label htmlFor="year" className='mr-2'>Sélectionnez une année :</label>
          <select id="year" value={selectedYear || ''} onChange={handleYearChange} className='border rounded-md px-2 py-1'>
            <option value="">-- Choisissez une année --</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className='needs-list'>
          <h2 className='text-lg font-bold'>Besoins pour l'année {selectedYear} :</h2>
          <ul>
            {needs.map((need, index) => (
              <li key={index} className='mb-2'>
                <span className='font-semibold'>Déclaration de besoin n°{need.id}</span> - <span>Statut : {statusCode[need.status]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HistoriqueBesoins;
