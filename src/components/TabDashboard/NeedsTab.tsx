import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Papa from "papaparse";

interface Category {
  id: number;
  name: string;
}

interface CsvRow {
  name: string;
  level: string;
}

const NeedsTab = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<CsvRow[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get<Category[]>("http://localhost:3000/api/categories");
      setCategories(response.data);
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
              name: row[0].toString(),
              level: row[1].toString(),
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

    const requestData = {
      data: JSON.stringify(csvData),
      categoryId: selectedCategory
    };

    axios
      .post("http://localhost:3000/api/upload/subjects", requestData)
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
    setMessage(null);
    setCsvData([]);
    setSelectedCategory("");
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
          <select
            name="categoryId"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Sélectionner une catégorie
            </option>
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
        <div className="mt-4">
          <h3 className="text-lg font-bold">Aperçu des données</h3>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Niveau
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {csvData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row.level}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default NeedsTab;
