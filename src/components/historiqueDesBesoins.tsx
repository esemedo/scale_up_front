'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const HistoriqueBesoins: React.FC = () => {
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [needs, setNeeds] = useState<any[]>([]);
  const api = process.env.NEXT_PUBLIC_API_URL;
  const startYear = 2015;
  const futureYears = 5;

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
      const response = await axios.get<any[]>(`${api}/api/needs/${year}`);
      setNeeds(response.data);
    } catch (error) {
      console.error(`Error fetching needs for year ${year}:`, error);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    fetchNeedsByYear(selectedYear);
  };

  return (
    <div className='flex justify-center items-center h-screen bg-blue-500'>
      <div className='bg-white p-8 rounded-lg'>
        <h1 className='text-3xl font-bold mb-4'>Historique des besoins par année</h1>
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
                <span className='font-semibold'>Besoin n°{need.id}</span> - <span>Status : {need.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HistoriqueBesoins;
