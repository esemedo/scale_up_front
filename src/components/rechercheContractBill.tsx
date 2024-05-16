import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Contract {
  id: number;
  intervenant: string;
  matiere: string;
  promotion: string;
  startDate: string;
  endDate: string;
}

const RechercheContrats = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [searchParams, setSearchParams] = useState({ intervenant: '', matiere: '', promotion: '' });

  const fetchContracts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/contracts', { params: searchParams });
      setContracts(response.data);
    } catch (error) {
      console.error('Error fetching contracts:', error);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md w-3/4 h-[700px]">
        <div className="flex space-x-9 rounded-lg p-4">
          <div className="w-1/3 p-4 border-r rounded-lg">
            <input
              type="text"
              name="intervenant"
              placeholder="Nom de l'intervenant"
              className="mb-4 p-2 border rounded"
              onChange={handleChange}
            />
            <input
              type="text"
              name="matiere"
              placeholder="Matière"
              className="mb-4 p-2 border rounded"
              onChange={handleChange}
            />
            <input
              type="text"
              name="promotion"
              placeholder="Promotion"
              className="mb-4 p-2 border rounded"
              onChange={handleChange}
            />
          </div>
          <div className="w-2/3 p-4 border-r rounded-lg overflow-auto max-h-[500px]">
            {contracts.map((contract) => (
              <div key={contract.id} className="mb-2">
                <div className="p-4 rounded border">
                  <h2 className="font-bold">{`Contrat ID: ${contract.id}`}</h2>
                  <p>Intervenant: {contract.intervenant}</p>
                  <p>Matière: {contract.matiere}</p>
                  <p>Promotion: {contract.promotion}</p>
                  <p>Date de début: {contract.startDate}</p>
                  <p>Date de fin: {contract.endDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechercheContrats;
