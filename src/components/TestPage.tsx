import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

interface ResponseData {
  message?: string;
  error?: string;
}

interface Need {
  id: string;
  idSubject: number;
  idPromotion: number;
  status: number;
  idContributor: number;
  hoursVolume: number;
}

interface Status {
  name: string;
  color: string;
}

interface Statuses {
  [key: number]: Status;
}

const STATUS: Statuses = {
  0: { name: "DRAFT", color: "blue" },
  1: { name: "PUBLISHED", color: "green" },
  2: { name: "CANCELLED", color: "red" },
};

const TestPage = () => {
  const [message, setMessage] = useState("");
  const [needs, setNeeds] = useState<Need[]>([]);
  const [needsUpdated, setNeedsUpdated] = useState(false);

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await axios.get<Need[]>(
          "http://localhost:3000/api/needs",
        );
        setNeeds(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNeeds();
  }, [needsUpdated]);

  const handleUpdate = async (id: string) => {
    try {
      const response = await axios.put<ResponseData>(
        `http://localhost:3000/api/needs/${id}/draft`,
      );
      if (response.data && response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage("Déclaration de besoin mise à jour avec succès");
      }
      setNeedsUpdated(!needsUpdated);
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData>;
      setMessage(
        axiosError.response?.data?.error ||
          "Une erreur s'est produite lors de la mise à jour de la déclaration de besoin",
      );
    }
  };

  const handleCancel = async (id: string) => {
    try {
      const response = await axios.put<ResponseData>(
        `http://localhost:3000/api/needs/${id}/cancel`,
      );
      if (response.data && response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage("Déclaration de besoin annulée avec succès");
      }
      setNeedsUpdated(!needsUpdated);
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData>;
      setMessage(
        axiosError.response?.data?.error ||
          "Une erreur s'est produite lors de l'annulation de la déclaration de besoin",
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl">
        Test des fonctionnalités de mise à jour et d'annulation de la
        déclaration de besoin
      </h1>
      {needs.map((need) => (
        <div key={need.id} className="mb-4 rounded border p-4">
          <h2 className="mb-2 text-xl">Need ID: {need.id}</h2>
          <p style={{ color: STATUS[need.status].color }}>
            Status: {STATUS[need.status].name}
          </p>
          <button
            className="mr-2 rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => handleUpdate(need.id)}
          >
            Mettre à jour
          </button>
          <button
            className="rounded bg-red-500 px-4 py-2 text-white"
            onClick={() => handleCancel(need.id)}
          >
            Annuler
          </button>
        </div>
      ))}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};
export default TestPage;
