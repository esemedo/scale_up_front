import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLightbulb } from 'react-icons/fa';

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

    const getSubjects = async () => {
        try {
            const response = await axios.get<Subject[]>('http://localhost:3000/api/subject/');
            setSubjects(response.data);
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

    const getPromotions = async () => {
        try {
            const response = await axios.get<Promotion[]>('http://localhost:3000/api/promotion/');
            setPromotions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addSubjectToPromotion = async () => {
        if (selectedSubject && selectedPromotion) {
            try {
                await axios.post('http://localhost:3000/api/subject/addSubjectToPromotion', {
                    subjectId: selectedSubject.id,
                    promotionId: selectedPromotion.id
                });
                setMessage('Sujet ajouté avec succès à la promotion.');
                const need = needs.find(need => need.idSubject === selectedSubject.id);
                if (need) {
                    await axios.delete(`http://localhost:3000/api/needs/${need.id}`);
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
        </div>
    );
};

export default SubjectsTab;