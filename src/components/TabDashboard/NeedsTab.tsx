import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Papa from "papaparse";

interface Category {
  id: number;
  name: string;
}

const NeedsTab = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        "http://localhost:3000/api/categories",
      );
      setCategories(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: function (results: Papa.ParseResult<string[][]>) {
          const data = results.data
            .filter((row) => row.length >= 2)
            .map((row) => ({
              name: row[0],
              level: row[1],
            }));
          setCsvData(data);
        },
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (csvData.length === 0) {
      console.error("No data parsed from file");
      return;
    }
  
    // Récupérer l'ID de la catégorie sélectionnée
    const categoryId = event.currentTarget.categoryId.value;
  
    // Créer un objet FormData
    const formData = new FormData();
    formData.append("data", JSON.stringify(csvData));
    formData.append("categoryId", categoryId);
  
    // Afficher les données envoyées
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
  
    axios
      .post("http://localhost:3000/api/upload/subjects", formData)
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.message);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="flex space-x-9 rounded-lg p-4">
      {message && <p>{message}</p>}
      <div className="w-1/3 rounded-lg border-r p-4">
        <input
          type="text"
          placeholder="Recherche..."
          className="mb-4 rounded border p-2"
        />
        <select className="rounded border p-2">
          <option value="" disabled selected>
            Trier par...
          </option>
          <option value="manager">Manager</option>
          <option value="need">Besoin</option>
        </select>
      </div>

      <div className="max-h-[500px] w-1/3 overflow-auto rounded-lg border-r p-4"></div>
      <div className="w-1/3 rounded-lg bg-gray-100 p-4">
        <button onClick={openModal}>Importer les matières</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Import Subjects"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            height: "50%",
          },
        }}
      >
        <h2 className="mb-4 text-2xl font-bold">Importer les matières</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            name="file"
            accept=".csv,.xlsx"
            className="border-gray-300 p-2"
            onChange={handleFileChange}
          />
          <select name="categoryId">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="ml-5 rounded bg-blue-500 p-2 text-white"
          >
            Importer
          </button>
        </form>
        <button
          onClick={closeModal}
          className="mt-4 rounded bg-red-500 p-2 text-white"
        >
          Fermer
        </button>
        {csvData.map((row, rowIndex) => (
          <table key={rowIndex}>
            <tbody>
              <tr>
                <td>{row.name}</td> {/* Nom */}
                <td>{row.level}</td> {/* Level */}
              </tr>
            </tbody>
          </table>
        ))}
      </Modal>
    </div>
  );
};

export default NeedsTab;
