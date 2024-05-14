import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Papa from 'papaparse';
import { FaLightbulb } from 'react-icons/fa';

interface Promotion {
    id: number;
    startSchoolYear: number;
    endSchoolYear: number;
    managerId: number;
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

interface User {
    id: number;
    name: string;
}

interface PromotionCsvRow {
    startSchoolYear: string;
    endSchoolYear: string;
}

const PromotionTab = () => {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [needs, setNeeds] = useState<Need[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriterion, setSortCriterion] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [csvData, setCsvData] = useState<PromotionCsvRow[]>([]);
    const [selectedManager, setSelectedManager] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        getAllPromo();
        getNeeds();
        getUsers();
    }, []);

    const getAllPromo = async () => {
        try {
            const response = await axios.get<Promotion[]>('http://localhost:3000/api/promotion');
            setPromotions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getNeeds = async () => {
        try {
            const response = await axios.get<Need[]>('http://localhost:3000/api/needs/');
            setNeeds(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getUsers = async () => {
        try {
            const response = await axios.get<User[]>('http://localhost:3000/api/users');
            setUsers(response.data);
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
                            startSchoolYear: row[0].toString(),
                            endSchoolYear: row[1].toString(),
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
            managerId: selectedManager
        };

        axios
            .post("http://localhost:3000/api/upload/promotions", requestData)
            .then((response) => {
                console.log(response.data);
                setMessage(response.data.message);
                closeModal();
                getAllPromo();
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
        setSelectedManager('');
    };

    const promotionNeeds = needs.filter(need => need.idPromotion === selectedPromotion?.id);

    const filteredPromotions = promotions.filter(promotion => 
        (promotion.startSchoolYear?.toString().includes(searchTerm) || 
        promotion.endSchoolYear?.toString().includes(searchTerm))
    );

    const sortedPromotions = [...filteredPromotions].sort((a, b) => {
        if (sortCriterion === 'manager') {
            return a.managerId - b.managerId;
        } else if (sortCriterion === 'need') {
            const aNeeds = needs.filter(need => need.idPromotion === a.id);
            const bNeeds = needs.filter(need => need.idPromotion === b.id);
            return bNeeds.length - aNeeds.length;
        } else {
            return 0;
        }
    });

    return (
        <div className="flex space-x-9 rounded-lg p-4">
            {message && <p>{message}</p>}
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
                    onChange={e => setSortCriterion(e.target.value)}
                >
                    <option value="" disabled selected>Trier par...</option>
                    <option value="manager">Manager</option>
                    <option value="need">Besoin</option>
                </select>
                <button onClick={openModal} className="mt-4 rounded bg-blue-500 p-2 text-white">
                    Importer les promotions
                </button>
            </div>
            <div className="w-1/3 p-4 border-r rounded-lg overflow-auto max-h-[500px]">
                {sortedPromotions.map((promotion) => {
                    const hasNeed = needs.some(need => need.idPromotion === promotion.id);
                    return (
                        <div key={promotion.id} className="mb-2">
                            <div onClick={() => setSelectedPromotion(promotion)} className={`cursor-pointer p-4 rounded ${hasNeed ? 'border-2 border-black' : 'border'}`}>
                                <h2 className="font-bold">{promotion.startSchoolYear} - {promotion.endSchoolYear}</h2>
                                <p>Manager ID: {promotion.managerId}</p>
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
                {selectedPromotion && (
                    <div>
                        <h2>{selectedPromotion.startSchoolYear} - {selectedPromotion.endSchoolYear}</h2>
                        <p>Manager ID: {selectedPromotion.managerId}</p>
                        <h3>Needs:</h3>
                        {promotionNeeds.map(need => (
                            <div key={need.id}>
                                <p>Need ID: {need.id}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Import Promotions"
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
                <h2 className="mb-4 text-2xl font-bold">Importer les promotions</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="file"
                        name="file"
                        accept=".csv,.xls"
                        className="border-gray-300 p-2"
                        onChange={handleFileChange}
                    />
                    <select
                        name="managerId"
                        value={selectedManager}
                        onChange={(e) => setSelectedManager(e.target.value)}
                    >
                        <option value="" disabled>
                            Sélectionner un manager
                        </option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.id}
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
                                    Année de début
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Année de fin
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {csvData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {row.startSchoolYear}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {row.endSchoolYear}
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

export default PromotionTab;
