import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from 'next-auth/react';
const api = process.env.NEXT_PUBLIC_API_URL;


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
  const [message, setMessage] = useState("");
  const api = process.env.NEXT_PUBLIC_API_URL;
  const { data: session  } = useSession();

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get<Bill[]>(`${api}/api/bills`,{headers:{Authorization: `Bearer ${session?.accessToken}`}});
        setBills(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (session){
      fetchBills();
    }

  }, [api,session]);

  const validateBill = async (id: number) => {
    try {
      await axios.put(`${api}/api/bills/${id}/validate`,{headers:{Authorization: `Bearer ${session?.accessToken}`}});
      setMessage("Facture validée avec succès");
      setBills(
        bills.map((bill) =>
          bill.id === id ? { ...bill, status: 1, validity: true } : bill,
        ),
      );
      setSelectedBill(null);
    } catch (error) {
      const axiosError = error as AxiosError;
      const data = axiosError.response?.data as ErrorResponse;
      setMessage(data?.error || "Erreur lors de la validation de la facture");
    }
  };

  const cancelBill = async (id: number) => {
    try {
      await axios.put(`${api}/api/bills/${id}/cancel`,{headers:{Authorization: `Bearer ${session?.accessToken}`}});
      setMessage("Facture annulée avec succès");
      setBills(
        bills.map((bill) =>
          bill.id === id ? { ...bill, status: 2, validity: false } : bill,
        ),
      );
      setSelectedBill(null);
    } catch (error) {
      const axiosError = error as AxiosError;
      const data = axiosError.response?.data as ErrorResponse;
      setMessage(data?.error || "Erreur lors de l'annulation de la facture");
    }
  };

  const downloadBill = (id: number) => {
    const link = document.createElement("a");
    link.href = `${api}/api/bills/${id}/download`;
    link.setAttribute("download", `bill_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewBill = (id: number) => {
    const url = `${api}/api/bills/${id}/view`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <div className="mb-5 rounded p-5 text-center text-3xl font-bold text-blue-500">
        Validation des factures
      </div>
      <div className="h-[700px] w-3/4 rounded-lg bg-white p-8 shadow-md">
        <div className="flex space-x-9 rounded-lg p-4">
          <div className="w-1/3 rounded-lg border-r p-4">
            <input
              type="text"
              placeholder="Recherche..."
              className="mb-4 rounded border p-2"
            />
          </div>
          <div className="max-h-[500px] w-1/3 overflow-auto rounded-lg border-r p-4">
            {bills.map((bill) => (
              <div key={bill.id} className="mb-2">
                <div
                  onClick={() => setSelectedBill(bill)}
                  className="cursor-pointer rounded border p-4"
                >
                  <h2 className="font-bold">{`Facture ID: ${bill.id}`}</h2>
                  <p>Montant : {bill.total}</p>
                  {bill.contract && (
                    <>
                      <p>Date de début : {bill.contract.startDate}</p>
                      <p>Date de fin : {bill.contract.endDate}</p>
                    </>
                  )}
                  <div
                    className={`rounded p-1 ${
                      bill.status === 1
                        ? "bg-green-500"
                        : bill.status === 2
                          ? "bg-red-500"
                          : "bg-gray-500"
                    }`}
                  >
                    {bill.status === 1
                      ? "Validé"
                      : bill.status === 2
                        ? "Annulé"
                        : "En attente"}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-1/3 rounded-lg bg-gray-100 p-4">
            {selectedBill && (
              <div className="flex h-full flex-col">
                <div>
                  <h2>{`Facture ID: ${selectedBill.id}`}</h2>
                  <p>Montant : {selectedBill.total}</p>
                  {selectedBill.contract && (
                    <>
                      <p>Date de début : {selectedBill.contract.startDate}</p>
                      <p>Date de fin : {selectedBill.contract.endDate}</p>
                    </>
                  )}
                </div>
                <div className="mt-auto">
                  <button
                    className="mb-2 w-full rounded bg-green-500 p-2 text-white"
                    onClick={() => validateBill(selectedBill.id)}
                  >
                    Valider la facture
                  </button>
                  <button
                    className="w-full rounded bg-red-500 p-2 text-white"
                    onClick={() => cancelBill(selectedBill.id)}
                  >
                    Annuler la facture
                  </button>
                  <button
                    className="mt-4 rounded bg-blue-500 p-2 text-white"
                    onClick={() =>
                      selectedBill && downloadBill(selectedBill.id)
                    }
                  >
                    Télécharger la facture
                  </button>
                  <button
                    className="mt-4 rounded bg-blue-500 p-2 text-white"
                    onClick={() => selectedBill && viewBill(selectedBill.id)}
                  >
                    Ouvrir la facture
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* {message && <p className="mt-4 text-center text-red-500">{message}</p>} */}
      </div>
    </div>
  );
};

export default ValidationFactures;
