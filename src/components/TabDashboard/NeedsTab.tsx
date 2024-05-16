import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface ResponseData {
  message?: string;
  error?: string;
}

interface Subject {
  name: string;
}

interface Need {
  id: string;
  subject: Subject[];
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
  [index: number]: Status;
}

const STATUS: Statuses = {
  0: { name: "DRAFT", color: "bg-blue-500" },
  1: { name: "PUBLISHED", color: "bg-green-500" },
  2: { name: "CANCELLED", color: "bg-red-500" },
};
const NeedsTab = () => {
  const [message, setMessage] = useState("");
  const [needs, setNeeds] = useState<Need[]>([]);
  const [needsUpdated, setNeedsUpdated] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [sortStatus, setSortStatus] = useState("");
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);

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

  const updateNeedStatus = async (id: string, status: string) => {
    if (status === "DRAFT") {
      handleUpdate(id);
    } else if (status === "CANCELLED") {
      handleCancel(id);
    } else if (status === "PUBLISHED") {
      handlePublish(id);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      const response = await axios.put<ResponseData>(
        `http://localhost:3000/api/needs/${id}/publish`,
      );
      if (response.data && response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage("Need successfully published");
      }
      setNeedsUpdated(!needsUpdated);
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData>;
      setMessage(
        axiosError.response?.data?.error ||
          "An error occurred while publishing the need",
      );
    }
  };

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
    <div className="flex space-x-9 rounded-lg  p-4">
      <div className="w-1/3 rounded-lg border-r p-4">
        <input
          type="text"
          placeholder="Recherche..."
          className="mb-4 rounded border p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="rounded border p-2"
          onChange={(e) => setSortStatus(e.target.value)}
        >
          <option value="" disabled selected>
            Trier par...
          </option>
          <option value="0">DRAFT</option>
          <option value="1">PUBLISHED</option>
          <option value="2">CANCELLED</option>
        </select>
      </div>
      <div className="max-h-[500px] w-1/3 overflow-auto rounded-lg border-r p-4">
        {needs.map((need) => (
          <div key={need.id} className="mb-2">
            <div
              onClick={() => setSelectedNeed(need)}
              className="cursor-pointer rounded border p-4"
            >
              <h2 className="font-bold">{`Need ID: ${need.id}`}</h2>
              <span
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-white ${
                  STATUS[need.status].color
                }`}
              >
                {STATUS[need.status].name}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/3 rounded-lg bg-gray-100 p-4">
        {selectedNeed && (
          <div className="flex h-full flex-col">
            <div>
              <h2>{selectedNeed.subject[0]?.name}</h2>
              <p>Status : {selectedNeed.status}</p>
              <p>Besoin : {selectedNeed.hoursVolume} heures</p>
              <button
                onClick={() => updateNeedStatus(selectedNeed.id, "PUBLISHED")}
                className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
              >
                Publish
              </button>
              <button
                onClick={() => updateNeedStatus(selectedNeed.id, "DRAFT")}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                DRAFT
              </button>
              <button
                onClick={() => updateNeedStatus(selectedNeed.id, "CANCELLED")}
                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NeedsTab;
