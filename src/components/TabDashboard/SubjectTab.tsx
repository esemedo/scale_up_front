import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLightbulb } from 'react-icons/fa';
import Modal from "react-modal";
import Papa from "papaparse";
import XLSX from "xlsx";

interface Subject {
    id: number;
    name: string;
    level: string;
    categoryId: number;
}

interface Need {
    id: number;
    idSubject: number;
    idPromotion: number;
    status: number;
    idContributor: number;
    hoursVolume: number;
    startSchoolYear: number;
    endSchoolYear: number;
    createdAt: string;
    updatedAt: string;
}

interface Promotion {
    id: number;
    startSchoolYear: number;
    endSchoolYear: number;
    managerId: number;
}

interface Category {
    id: number;
    name: string;
  }
  
  interface CsvRow {
    name: string;
    level: string;
  }
  

const SubjectsTab: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [needs, setNeeds] = useState<Need[]>([]);
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortLevel, setSortLevel] = useState(false);
    const [sortNeed, setSortNeed] = useState(false);
    const [sortCategory, setSortCategory] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const api = process.env.NEXT_PUBLIC_API_URL;
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [csvData, setCsvData] = useState<CsvRow[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const getSubjects = async () => {
        try {
            const response = await axios.get<Subject[]>(`${api}/api/subjects/`);
            setSubjects(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getNeeds = async () => {
        try {
            const response = await axios.get<Need[]>(`${api}/api/needs/`);
            setNeeds(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getPromotions = async () => {
        try {
            const response = await axios.get<Promotion[]>(`${api}/api/promotion/`);
            setPromotions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addSubjectToPromotion = async () => {
        if (selectedSubject && selectedPromotion) {
            try {
                await axios.post(`${api}/api/subject/addSubjectToPromotion`, {
                    subjectId: selectedSubject.id,
                    promotionId: selectedPromotion.id
                });
                setMessage('Sujet ajouté avec succès à la promotion.');
                const need = needs.find(need => need.idSubject === selectedSubject.id);
                if (need) {
                    await axios.delete(`${api}/api/needs/${need.id}`);
                }
                getNeeds();
                getSubjects();
            } catch (error) {
                console.error(error);
                setMessage('Une erreur s\'est produite lors de l\'ajout du sujet à la promotion.');
            }
        }
    };
  
    useEffect(() => {
      getCategories();
    }, []);
  
    const getCategories = async () => {
      try {
        const response = await axios.get<Category[]>(`${api}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const fileExtension = file.name.split('.').pop()?.toLowerCase();
          if (fileExtension === 'csv') {
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
          } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
              const reader = new FileReader();
              reader.onload = (e) => {
                  const data = new Uint8Array(e.target?.result as ArrayBuffer);
                  const workbook = XLSX.read(data, { type: 'array' });
                  const sheetName = workbook.SheetNames[0];
                  const worksheet = workbook.Sheets[sheetName];
                  const jsonData: CsvRow[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
                      .filter((row: any) => row.length >= 2)
                      .map((row: any) => ({
                          name: row[0].toString(),
                          level: row[1].toString(),
                      }));
                  setCsvData(jsonData);
              };
              reader.readAsArrayBuffer(file);
          }
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
          .post("${api}/api/subjects/upload", requestData)
          .then((response) => {
              console.log(response.data);
              setMessage(response.data.message);
              closeModal();
              getSubjects();
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

    useEffect(() => {
        getSubjects();
        getNeeds();
        getPromotions();
    }, []);

    const filteredSubjects = subjects
    .filter(subject => subject && subject.name && subject.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
        if (sortLevel) {
            return a.level.localeCompare(b.level);
        } else if (sortNeed) {
            const aHasNeed = needs.some(need => need.idSubject === a.id);
            const bHasNeed = needs.some(need => need.idSubject === b.id);
            return aHasNeed === bHasNeed ? 0 : aHasNeed ? -1 : 1;
        } else if (sortCategory) {
            return a.categoryId - b.categoryId;
        } else {
            return 0;
        }
    });

    return (
        <div className="flex space-x-9 rounded-lg  p-4">
            <div className="w-1/3 p-4 border-r rounded-lg">
                <input 
                    type="text" 
                    placeholder="Recherche..." 
                    className="mb-4 p-2 border rounded" 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                />
                <select 
                    className="p-2 border rounded" 
                    onChange={e => {
                        switch (e.target.value) {
                            case 'level':
                                setSortLevel(true);
                                setSortNeed(false);
                                setSortCategory(false);
                                break;
                            case 'need':
                                setSortLevel(false);
                                setSortNeed(true);
                                setSortCategory(false);
                                break;
                            case 'category':
                                setSortLevel(false);
                                setSortNeed(false);
                                setSortCategory(true);
                                break;
                            default:
                                setSortLevel(false);
                                setSortNeed(false);
                                setSortCategory(false);
                                break;
                        }
                    }}
                >
                    <option value="" disabled selected>Trier par...</option>
                    <option value="level">Niveau</option>
                    <option value="need">Besoin</option>
                    <option value="category">Catégorie</option>
                </select>
                <button onClick={openModal} className="mt-4 rounded bg-blue-500 p-2 text-white">
            Importer les matières
                </button>
            </div>
            <div className="w-1/3 p-4 border-r rounded-lg overflow-auto max-h-[500px]">
                {filteredSubjects.map((subject) => {
                    const hasNeed = needs.some(need => need.idSubject === subject.id);
                    return (
                        <div key={subject.id} className="mb-2">
                            <div onClick={() => setSelectedSubject(subject)} className={`cursor-pointer p-4 rounded ${hasNeed ? 'border-2 border-black' : 'border'}`}>
                                <h2 className="font-bold">{subject.name}</h2>
                                <p>Niveau : {subject.level}</p>
                                <p>Catégorie : {subject.categoryId}</p>
                            </div>
                            {hasNeed && (
                                <div className="-mt-2 p-2 bg-black text-white border border-black rounded flex items-center justify-center text-xs">
                                    <FaLightbulb className="mr-2" />
                                    Une action de votre part est requise. Cliquer Pour afficher.
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="w-1/3 p-4 rounded-lg bg-gray-100">
                {selectedSubject && (
                    <div className="flex flex-col h-full">
                        <div>
                            <h2>{selectedSubject.name}</h2>
                            <p>Niveau : {selectedSubject.level}</p>
                            <p>Catégorie : {selectedSubject.categoryId}</p>
                            {needs.filter(need => need.idSubject === selectedSubject.id).map(need => (
                                <div key={need.id}>
                                    <p>Besoin : {need.hoursVolume} heures</p>
                                </div>
                            ))}
                            {needs.some(need => need.idSubject === selectedSubject.id) && (
                                <div className="mt-2">
                                    <select 
                                        className="w-full p-2 border rounded mb-2" 
                                        onChange={e => setSelectedPromotion(promotions.find(promotion => promotion.id === Number(e.target.value)) ?? null)}
                                    >
                                        <option value="">Select a promotion</option>
                                        {promotions.map(promotion => (
                                            <option key={promotion.id} value={promotion.id}>
                                                {promotion.startSchoolYear} - {promotion.endSchoolYear}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        {selectedPromotion && (
                            <div className="mt-auto">
                                {message && <p className="pb-5" >{message}</p>}
                                <button className="w-full p-2 bg-blue-500 text-white rounded" onClick={addSubjectToPromotion}>Add to promotion</button>
                            </div>
                        )}
                    </div>
                )}
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
            accept=".csv,.xls"
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

export default SubjectsTab;