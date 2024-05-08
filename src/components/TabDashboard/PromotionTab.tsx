import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const PromotionTab = () => {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [needs, setNeeds] = useState<Need[]>([]);
    const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortCriterion, setSortCriterion] = useState('');

    useEffect(() => {
        getAllPromo();
        getNeeds();
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
        </div>
    );
};

export default PromotionTab;