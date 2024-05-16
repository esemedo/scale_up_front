import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface Bill {
  id: number;
  total: number;
  status: number;
  validity: boolean;
  contract: {
    id: number;
    hourlyPrice: number;
    hoursVolume: number;
    total: number;
    status: number;
    startDate: string;
    endDate: string;
  };
}

interface ErrorResponse {
  error: string;
}

const ValidationFactures = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [message, setMessage] = useState('');
  const api = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get<Bill[]>(`${api}/api/bills`);
        setBills(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBills();
  }, []);

  const validateBill = async (id: number) => {
    try {
      await axios.put(`${api}/api/bills/${id}/validate`);
      setMessage('Facture validée avec succès');
      setBills(bills.map(bill => bill.id === id ? { ...bill, status: 1, validity: true } : bill));
      setSelectedBill(null);
    } catch (error) {
      const axiosError = error as AxiosError;
      const data = axiosError.response?.data as ErrorResponse;
      setMessage(data?.error || 'Erreur lors de la validation de la facture');
    }
  };
  
  const cancelBill = async (id: number) => {
    try {
      await axios.put(`${api}/api/bills/${id}/cancel`);
      setMessage('Facture annulée avec succès');
      setBills(bills.map(bill => bill.id === id ? { ...bill, status: 2, validity: false } : bill));
      setSelectedBill(null);
    } catch (error) {
      const axiosError = error as AxiosError;
      const data = axiosError.response?.data as ErrorResponse;
      setMessage(data?.error || 'Erreur lors de l\'annulation de la facture');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md w-3/4 h-[700px]">
        <div className="flex space-x-9 rounded-lg p-4">
          <div className="w-1/3 p-4 border-r rounded-lg">
            <input
              type="text"
              placeholder="Recherche..."
              className="mb-4 p-2 border rounded"
            />
            <button className="mt-4 rounded bg-blue-500 p-2 text-white" onClick={() => selectedBill && validateBill(selectedBill.id)}>
              Valider les factures
            </button>
          </div>
          <div className="w-1/3 p-4 border-r rounded-lg overflow-auto max-h-[500px]">
            {bills.map((bill) => (
              <div key={bill.id} className="mb-2">
                <div onClick={() => setSelectedBill(bill)} className="cursor-pointer p-4 rounded border">
                  <h2 className="font-bold">{`Facture ID: ${bill.id}`}</h2>
                  <p>Montant : {bill.total}</p>
                  <p>Date de début : {bill.contract.startDate}</p>
                  <p>Date de fin : {bill.contract.endDate}</p>
                  <div className={`p-1 rounded ${bill.status === 1 ? 'bg-green-500' : bill.status === 2 ? 'bg-red-500' : 'bg-gray-500'}`}>
                    {bill.status === 1 ? 'Validé' : bill.status === 2 ? 'Annulé' : 'En attente'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/3 p-4 rounded-lg bg-gray-100">
            {selectedBill && (
              <div className="flex flex-col h-full">
                <div>
                  <h2>{`Facture ID: ${selectedBill.id}`}</h2>
                  <p>Montant : {selectedBill.total}</p>
                  <p>Date de début : {selectedBill.contract.startDate}</p>
                  <p>Date de fin : {selectedBill.contract.endDate}</p>
                </div>
                <div className="mt-auto">
                  <button className="w-full p-2 bg-blue-500 text-white rounded mb-2" onClick={() => validateBill(selectedBill.id)}>Valider la facture</button>
                  <button className="w-full p-2 bg-red-500 text-white rounded" onClick={() => cancelBill(selectedBill.id)}>Annuler la facture</button>
                </div>
              </div>
            )}
          </div>
        </div>
        {message && <p className="text-center mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ValidationFactures;
